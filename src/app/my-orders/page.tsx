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
  const limit = PAGE_SIZE + 1; // fetch one extra to detect next page
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
    <>
      <Header />
      <div className="px-5">
        {orders.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-lg font-semibold">Nenhum pedido encontrado</h2>
            <p className="text-muted-foreground text-sm">
              Você ainda não fez nenhum pedido. Visite a loja e faça sua
              primeira compra.
            </p>
            <div className="mt-4">
              <Link href="/" className="underline">
                Voltar para a loja
              </Link>
            </div>
          </div>
        ) : (
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
        )}

        <div className="flex items-center justify-between py-6">
          <div>
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="rounded-md border px-3 py-2"
              >
                Anterior
              </Link>
            )}
          </div>
          <div>
            {hasNextPage && (
              <Link
                href={`?page=${page + 1}`}
                className="rounded-md border px-3 py-2"
              >
                Próxima
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
