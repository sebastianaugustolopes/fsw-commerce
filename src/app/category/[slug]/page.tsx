import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/src/components/common/header";
import ProductItem from "@/src/components/common/product-item";
import { db } from "@/src/db";
import { categoryTable, productTable } from "@/src/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });

  if (!category) {
    notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <main className="px-5 pb-6 lg:container lg:mx-auto lg:px-8 lg:py-10">
        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-xl font-semibold lg:text-3xl">{category.name}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
