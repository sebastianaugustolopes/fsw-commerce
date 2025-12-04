import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import { db } from "@/src/db";
import { shippingAddressTable } from "@/src/db/schema";

import CartSummary from "../components/cart-sumary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Container principal com layout responsivo */}
      <main className="w-full flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {/* Layout de duas colunas no desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Coluna principal - Endereços (ocupa 7 colunas no desktop) */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h1 className="mb-2 text-2xl font-bold lg:text-3xl">
                  Endereço de Entrega
                </h1>
                <p className="text-sm text-gray-600 lg:text-base">
                  Selecione ou adicione um endereço para entrega
                </p>
              </div>

              <Addresses
                shippingAddresses={shippingAddresses}
                defaultShippingAddressId={cart.shippingAddress?.id || null}
              />
            </div>

            {/* Coluna lateral - Resumo do carrinho (ocupa 5 colunas no desktop) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-6">
                <CartSummary
                  subtotalInCents={cartTotalInCents}
                  totalInCents={cartTotalInCents}
                  products={cart.items.map((item) => ({
                    id: item.productVariant.id,
                    name: item.productVariant.product.name,
                    variantName: item.productVariant.name,
                    quantity: item.quantity,
                    priceInCents: item.productVariant.priceInCents,
                    imageUrl: item.productVariant.imageUrl,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IdentificationPage;
