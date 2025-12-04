import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { db } from "@/src/db";

import CartSummary from "../components/cart-sumary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
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
  
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-6 sm:px-6 lg:container lg:mx-auto lg:px-8 lg:py-10">
        {/* Título da página (visível apenas no desktop) */}
        <div className="mb-8 hidden lg:block">
          <h1 className="text-3xl font-bold">Confirmação do Pedido</h1>
          <p className="text-gray-600 mt-2">
            Revise suas informações antes de finalizar
          </p>
        </div>

        {/* Layout de duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Coluna principal - Identificação e Botão (ocupa 7 colunas) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card de Identificação */}
            <Card className="shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Identificação</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Endereço de Entrega */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Endereço de Entrega
                  </h3>
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="py-4">
                      <p className="text-sm leading-relaxed">
                        {formatAddress(cart.shippingAddress)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Botão de Finalizar Pedido */}
                <div className="pt-4">
                  <FinishOrderButton />
                </div>
              </CardContent>
            </Card>

            {/* Card adicional de informações (opcional) */}
            <Card className="shadow-sm hidden lg:block">
              <CardContent className="py-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 mt-0.5 text-blue-500 flex-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>
                    Ao finalizar o pedido, você receberá um e-mail de
                    confirmação com os detalhes da compra e informações de
                    acompanhamento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna lateral - Resumo do Carrinho (ocupa 5 colunas) */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default ConfirmationPage;