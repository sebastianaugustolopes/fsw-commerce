"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable,
} from "@/src/db/schema";

export const finishOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  });

  if (!cart) throw new Error("Cart not found");

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  const shipping = cart.shippingAddress;

  const totalPriceInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  let orderId: string | undefined;

  await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orderTable)
      .values({
        email: shipping.email,
        zipCode: shipping.zipCode,
        country: shipping.country,
        phone: shipping.phone,
        cpfOrCnpj: shipping.cpfOrCnpj,
        city: shipping.city,
        complement: shipping.complement,
        neighborhood: shipping.neighborhood,
        number: shipping.number,
        recipientName: shipping.recipientName,
        state: shipping.state,
        street: shipping.street,
        userId: session.user.id,
        totalPriceInCents,
        shippingAddressId: shipping.id,
      })
      .returning();

    if (!order) throw new Error("Failed to create order");

    orderId = order.id;

    const orderItemsPayload = cart.items.map((item) => ({
      orderId: order.id,
      productVariantId: item.productVariant.id,
      quantity: item.quantity,
      priceInCents: item.productVariant.priceInCents,
    }));

    await tx.insert(orderItemTable).values(orderItemsPayload);

    await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });

  if (!orderId) throw new Error("Failed to create order");

  return { orderId };
};
