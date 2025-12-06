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
      <main className="min-h-screen bg-background">
        {/* Main Product Section */}
        <div className="border-b px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[100px_1fr_400px] lg:gap-8">
              {/* Left: Vertical Thumbnails (Desktop Only) */}
              <div className="hidden lg:block">
                <div className="sticky top-6 flex flex-col gap-2">
                  {productVariant.product.variants.map((v) => (
                    <Link
                      key={v.id}
                      href={`/product-variant/${v.slug}`}
                      className={`block h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:shadow-md ${
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
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Center: Main Image */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full overflow-hidden rounded-2xl bg-muted lg:rounded-3xl">
                  {/* Container com aspect ratio responsivo */}
                  <div className="aspect-square w-full sm:aspect-[4/3] lg:aspect-square">
                    <Image
                      src={productVariant.imageUrl}
                      alt={productVariant.name}
                      fill
                      priority
                      className="object-contain object-center p-4 sm:p-6 lg:p-8"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    />
                  </div>
                </div>

                {/* Mobile/Tablet: Variant Selector Under Image */}
                <div className="lg:hidden">
                  <VariantSelector
                    selectedVariantSlug={productVariant.slug}
                    variants={productVariant.product.variants}
                  />
                </div>
              </div>

              {/* Right: Details & Actions */}
              <div className="flex flex-col gap-4 md:gap-6">
                {/* Title & Price */}
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase text-muted-foreground">
                    {productVariant.product.name}
                  </p>
                  <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-2xl xl:text-3xl">
                    {productVariant.name}
                  </h1>
                  <p className="text-3xl font-bold sm:text-4xl lg:text-3xl xl:text-4xl">
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
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 hover:shadow-sm ${
                          v.slug === productVariant.slug
                            ? "border-primary shadow-sm"
                            : "border-border"
                        }`}
                      >
                        <Image
                          src={v.imageUrl}
                          alt={v.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions: Quantity & Buttons */}
                <div className="space-y-3 lg:space-y-4">
                  <ProductActions productVariantId={productVariant.id} />
                </div>

                {/* Description */}
                <div className="space-y-2 border-t pt-4">
                  <h3 className="text-sm font-semibold lg:text-base">
                    Descrição
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {productVariant.product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
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