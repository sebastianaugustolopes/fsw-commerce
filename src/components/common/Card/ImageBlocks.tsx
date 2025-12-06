import Image from "next/image";
import Link from "next/link";

import { Card } from "@/src/components/ui/card";

interface ImageBlocksProps {
  isMobile?: boolean;
}

const ImageBlocks = ({ isMobile = false }: ImageBlocksProps) => {
  return (
    <>
      {/* Banner Principal */}
      <Link href="/category/tnis">
        <Card
          className={`bg-accent relative cursor-pointer overflow-hidden border-0 ${
            isMobile
              ? "aspect-video rounded-3xl shadow-lg"
              : "row-span-1 min-h-[280px] rounded-3xl shadow-xl lg:min-h-[350px]"
          }`}
        >
          <Image
            src="/banner.jpg"
            alt="Banner Nike"
            fill
            className="object-cover object-center"
          />
        </Card>
      </Link>

      {/* Grade de 3 Imagens Pequenas */}
      <div className="grid grid-cols-3 gap-4 lg:gap-6">
        <Link href="/category/tnis">
          <Card
            className={`bg-accent relative aspect-square cursor-pointer overflow-hidden border-0 ${
              isMobile
                ? "rounded-2xl shadow-md"
                : "rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl lg:rounded-3xl"
            }`}
          >
            <Image
              src="/desktop-banner-02.jpg"
              alt="Produto 1"
              fill
              className="object-cover object-center"
            />
          </Card>
        </Link>
        <Link href="/category/tnis">
          <Card
            className={`bg-accent relative aspect-square cursor-pointer overflow-hidden border-0 ${
              isMobile
                ? "rounded-2xl shadow-md"
                : "rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl lg:rounded-3xl"
            }`}
          >
            <Image
              src="/desktop-banner-03.jpg"
              alt="Produto 2"
              fill
              className="object-cover object-center"
            />
          </Card>
        </Link>
        <Link href="/category/tnis">
          <Card
            className={`bg-accent relative aspect-square cursor-pointer overflow-hidden border-0 ${
              isMobile
                ? "rounded-2xl shadow-md"
                : "rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl lg:rounded-3xl"
            }`}
          >
            <Image
              src="/desktop-banner-04.jpg"
              alt="Produto 3"
              fill
              className="object-cover object-center"
            />
          </Card>
        </Link>
      </div>
    </>
  );
};

export default ImageBlocks;
