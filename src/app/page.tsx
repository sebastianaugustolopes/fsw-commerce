import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import CategorySelector from "@/src/components/common/category-selector";
import ProductList from "@/src/components/common/product-list";
import { db } from "@/src/db";
import { productTable } from "@/src/db/schema";

import PartnerBrandsCarousel from "../components/common/brands-logos";
import ProductCard from "../components/common/Card/product-card";
import Footer from "../components/common/footer";
import { Header } from "../components/common/header";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Link href={"/category/jaquetas-moletons"}>
            <Image
              src="/mobile-banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="block h-auto w-full lg:hidden"
            />
          </Link>
          <Link href={"/category/jaquetas-moletons"}>
            <Image
              src="/desktop-banner-01.jpg"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-sreen hidden w-screen lg:block"
            />
          </Link>
        </div>
        <div className="hidden lg:block">
          <PartnerBrandsCarousel />
        </div>

        <ProductList products={products} title="Mais vendidos" />
        <div className="block lg:hidden">
          <CategorySelector categories={categories} />
        </div>
        <ProductCard />
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
