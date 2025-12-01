"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { categoryTable } from "@/src/db/schema";

interface NavbarCategoriesDropdownProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export const NavbarCategoriesDropdown = ({
  categories,
}: NavbarCategoriesDropdownProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHoveredCategory("categories")}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <button className="text-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors">
        Categorias
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      {/* Dropdown menu */}
      {hoveredCategory === "categories" && (
        <div className="border-border bg-background absolute top-full left-0 z-50 w-48 rounded-md border py-1 shadow-lg">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-foreground hover:bg-muted block px-4 py-2 text-sm transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
