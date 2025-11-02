"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { formatCentsToBRL } from "@/src/helpers/money";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const firstVariant = product.variants[0];
  const selectedVariant =
    product.variants[selectedVariantIndex] || firstVariant;

  if (!firstVariant) {
    return null;
  }

  const hasMultipleVariants = product.variants.length > 1;

  return (
    <div className="flex w-[160px] shrink-0 flex-col gap-4 lg:w-full">
      <Link href={`/product/${product.slug}`} className="relative block w-full">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
          <Image
            src={selectedVariant.imageUrl}
            alt={selectedVariant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 20vw, 300px"
          />
          {hasMultipleVariants && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {product.variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIndex(index);
                  }}
                  className={cn(
                    "h-3 w-3 rounded-full border-2 border-white transition-all",
                    selectedVariantIndex === index
                      ? "bg-white"
                      : "bg-transparent hover:bg-white/50",
                  )}
                  style={{ backgroundColor: variant.color }}
                  aria-label={`Selecionar variante ${variant.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="flex min-h-[80px] flex-col gap-1">
        <Link href={`/product/${product.slug}`}>
          <p className="truncate text-sm font-medium">{product.name}</p>
        </Link>
        <p className="text-muted-foreground line-clamp-2 text-xs font-medium">
          {product.description}
        </p>
        {hasMultipleVariants && (
          <p className="text-muted-foreground truncate text-xs">
            {product.variants.length} cores disponíveis
          </p>
        )}
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(selectedVariant.priceInCents)}
        </p>
        {hasMultipleVariants && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() =>
                  setSelectedVariantIndex(
                    product.variants.findIndex((v) => v.id === variant.id),
                  )
                }
                className={cn(
                  "h-6 w-6 rounded-full border-2 transition-all",
                  selectedVariantIndex ===
                    product.variants.findIndex((v) => v.id === variant.id)
                    ? "scale-110 border-gray-900"
                    : "border-gray-300 hover:scale-110",
                )}
                style={{ backgroundColor: variant.color }}
                aria-label={`Cor ${variant.name}`}
                title={variant.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
