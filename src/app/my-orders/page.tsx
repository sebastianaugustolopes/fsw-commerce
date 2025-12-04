import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Header } from "@/src/components/common/header";
import { db } from "@/src/db";
import { orderTable } from "@/src/db/schema";

import Orders from "./components/orders";

interface Props {
  searchParams?: { page?: string };
}

const PAGE_SIZE = 10;

const MyOrdersPage = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session?.user.id) {
    redirect("/login");
  }

  const page = Math.max(1, Number(searchParams?.page || "1"));
  const limit = PAGE_SIZE + 1;
  const offset = (page - 1) * PAGE_SIZE;

  const rawOrders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    orderBy: [desc(orderTable.createdAt)],
    limit,
    offset,
    with: {
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

  const hasNextPage = rawOrders.length > PAGE_SIZE;
  const orders = hasNextPage ? rawOrders.slice(0, PAGE_SIZE) : rawOrders;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 px-4 py-6 sm:px-6 lg:container lg:mx-auto lg:px-8 lg:py-10">
        {/* Header da página */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Meus Pedidos
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">
            Acompanhe o histórico de suas compras
          </p>
        </div>

        {/* Container de conteúdo */}
        <div className="bg-white rounded-lg shadow-sm lg:shadow border lg:p-6">
          {orders.length === 0 ? (
            // Estado vazio melhorado
            <div className="py-16 lg:py-24 text-center px-4">
              <div className="max-w-md mx-auto">
                {/* Ícone ilustrativo */}
                <div className="mx-auto w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h2>
                <p className="text-gray-600 text-sm lg:text-base mb-6">
                  Você ainda não fez nenhum pedido. Visite a loja e faça sua
                  primeira compra.
                </p>
                
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Ir para a loja
                </Link>
              </div>
            </div>
          ) : (
            // Lista de pedidos
            <div className="space-y-4 lg:space-y-6">
              <Orders
                orders={orders.map((order) => ({
                  id: order.id,
                  totalPriceInCents: order.totalPriceInCents,
                  status: order.status,
                  createdAt: order.createdAt,
                  items: order.items.map((item) => ({
                    id: item.id,
                    imageUrl: item.productVariant.imageUrl,
                    productName: item.productVariant.product.name,
                    productVariantName: item.productVariant.name,
                    priceInCents: item.productVariant.priceInCents,
                    quantity: item.quantity,
                  })),
                }))}
              />
            </div>
          )}
        </div>

        {/* Paginação melhorada */}
        {orders.length > 0 && (
          <div className="mt-6 lg:mt-8">
            <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
              <div className="flex items-center justify-between gap-4">
                {/* Botão Anterior */}
                <div>
                  {page > 1 ? (
                    <Link
                      href={`?page=${page - 1}`}
                      className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="hidden sm:inline">Página </span>Anterior
                    </Link>
                  ) : (
                    <div className="w-[120px] lg:w-[140px]" />
                  )}
                </div>

                {/* Indicador de página */}
                <div className="text-sm text-gray-600 font-medium">
                  Página {page}
                </div>

                {/* Botão Próxima */}
                <div>
                  {hasNextPage ? (
                    <Link
                      href={`?page=${page + 1}`}
                      className="inline-flex items-center px-4 py-2 lg:px-5 lg:py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Próxima<span className="hidden sm:inline"> Página</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <div className="w-[120px] lg:w-[140px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrdersPage;