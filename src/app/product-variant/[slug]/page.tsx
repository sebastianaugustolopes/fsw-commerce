import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/src/components/common/footer";
import { Header } from "@/src/components/common/header";
import ProductList from "@/src/components/common/product-list";
import { db } from "@/src/db";
import { productTable, productVariantTable } from "@/src/db/schema";
import { formatCentsToBRL } from "@/src/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        {/* Main Product Section */}
        <div className="border-b px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_380px] lg:gap-8">
              {/* Left: Vertical Thumbnails (Desktop Only) */}
              <div className="hidden lg:block">
                <div className="flex flex-col gap-2">
                  {productVariant.product.variants.map((v) => (
                    <Link
                      key={v.id}
                      href={`/product-variant/${v.slug}`}
                      className={`block shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:shadow-md ${
                        v.slug === productVariant.slug
                          ? "border-primary shadow-md"
                          : "border-border"
                      }`}
                    >
                      <Image
                        src={v.imageUrl}
                        alt={v.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Center: Main Image */}
              <div className="flex flex-col gap-4">
                <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-2xl sm:aspect-square lg:rounded-3xl">
                  <Image
                    src={productVariant.imageUrl}
                    alt={productVariant.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Mobile: Variant Selector Under Image */}
                <div className="lg:hidden">
                  <VariantSelector
                    selectedVariantSlug={productVariant.slug}
                    variants={productVariant.product.variants}
                  />
                </div>
              </div>

              {/* Right: Details & Actions */}
              <div className="flex flex-col gap-4">
                {/* Title & Price */}
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium uppercase">
                    {productVariant.product.name}
                  </p>
                  <h1 className="text-xl font-bold sm:text-2xl lg:text-xl">
                    {productVariant.name}
                  </h1>
                  <p className="text-2xl font-bold sm:text-3xl lg:text-2xl">
                    {formatCentsToBRL(productVariant.priceInCents)}
                  </p>
                </div>

                {/* Desktop: Variant Thumbnails Inline */}
                <div className="hidden lg:block">
                  <div className="flex flex-wrap gap-2">
                    {productVariant.product.variants.map((v) => (
                      <Link
                        key={v.id}
                        href={`/product-variant/${v.slug}`}
                        className={`shrink-0 overflow-hidden rounded-lg border-2 transition-transform hover:scale-105 ${
                          v.slug === productVariant.slug
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <Image
                          src={v.imageUrl}
                          alt={v.name}
                          width={60}
                          height={60}
                          className="object-cover"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions: Quantity & Buttons */}
                <div className="space-y-3">
                  <ProductActions productVariantId={productVariant.id} />
                </div>

                {/* Description */}
                <div className="space-y-2 border-t pt-4">
                  <h3 className="text-sm font-semibold">Descrição</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                    {productVariant.product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ProductList title="Talvez você goste" products={likelyProducts} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
