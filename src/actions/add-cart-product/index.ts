"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { cartItemTable, cartTable } from "@/src/db/schema";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  addProductToCartSchema.parse(data); // validate the data

  // get the session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // if the session is not found, throw an error
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Search the database (productVariantTable) for the product that the user wants to add.
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, data.productVariantId),
  });
  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  // Search the database (cartTable) for the cart that the user wants to add the product to.
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  // If the cart is not found, create a new cart.
  let cartId = cart?.id;
  if (!cartId) {
    // Create a new cart.
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning(); // return the new cart
    cartId = newCart.id;
  }

  // Search the database (cartItemTable) for an item that:
  // 1. Belongs to the user's cart (cartId)
  // 2. Is the same product (data.productVariantId)
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) =>
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, data.productVariantId),
  });

  // If the item is found, update the quantity of the item.
  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        // update the quantity of the item
        quantity: cartItem.quantity + data.quantity,
      })
      // update the quantity of the item
      .where(eq(cartItemTable.id, cartItem.id));
    return;
  }
  // If the item is not found, create a new item.
  await db.insert(cartItemTable).values({
    cartId, // belongs to the user's cart
    productVariantId: data.productVariantId, // is the same product
    quantity: data.quantity, // has the quantity that the user wants to add
  });
};
