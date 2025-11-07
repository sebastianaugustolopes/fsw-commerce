import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/src/db";
import { categoryTable, productTable } from "@/src/db/schema";
import { Header } from "@/src/components/common/header";
import ProductItem from "@/src/components/common/product-item";

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
      <div className="space-y-6 px-5 pb-6">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
