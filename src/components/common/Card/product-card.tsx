import ImageBlocks from "@/src/components/common/Card/ImageBlocks";

const ProductCard = () => {
  return (
    <div className="bg-background min-h-auto p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col gap-6 md:hidden">
          {/* Text Section */}
          <div className="space-y-4">
            <h1 className="text-foreground text-5xl font-black tracking-tight">
              DESCUBRA O
              <br />
              FUTURO DO MOVIMENTO
            </h1>
            <p className="text-muted-foreground max-w-md text-lg font-medium">
              A nova geração Nike chega com tecnologia criada para impulsionar
              você. Sinta o poder da inovação, do conforto extremo e do design
              que redefine performance.
            </p>
          </div>

          {/* Content Blocks - Mobile */}
          <ImageBlocks isMobile />
        </div>

        {/* Desktop/Tablet Layout - Side by Side */}
        <div className="hidden items-start gap-8 md:grid md:grid-cols-2 lg:gap-12">
          {/* Left Column - Text Content */}
          <div className="space-y-6 pt-8 lg:space-y-8 lg:pt-16">
            <div className="space-y-4">
              <h1 className="text-foreground text-6xl leading-[0.9] font-black tracking-tight lg:text-7xl xl:text-8xl">
                DESCUBRA O
                <br />
                FUTURO DO MOVIMENTO
              </h1>
              <p className="text-muted-foreground max-w-lg text-xl leading-relaxed font-medium lg:text-2xl">
                Explore nossa curadoria de produtos Nike desenvolvidos para quem
                vive em constante evolução. Peças projetadas para acompanhar seu
                ritmo, unir leveza e resistência e elevar cada passo.
              </p>
            </div>

            <div className="text-muted-foreground space-y-3">
              <p className="text-base lg:text-lg">
                Performance não é só velocidade — é sensação, conforto e
                confiança em cada movimento. A Nike desenvolve tecnologia para
                levar você além, sem limites.
              </p>
              <p className="text-base lg:text-lg">
                Cada peça é pensada nos mínimos detalhes: materiais avançados,
                construção precisa e design que une estilo e propósito. Nike é
                mais do que produto — é experiência.
              </p>
            </div>
          </div>

          {/* Right Column - Content Blocks Desktop */}
          <div className="grid h-full grid-rows-2 gap-4 lg:gap-6">
            <ImageBlocks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard