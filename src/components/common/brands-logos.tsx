"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const brands = [
  { name: "Nike", logo: "/nike-logo.png" },
  { name: "Adidas", logo: "/adidas-logo.png" },
  { name: "Puma", logo: "/puma-logo.png" },
  { name: "New Balance", logo: "/new-balance-logo.png" },
  { name: "Converse", logo: "/converse-logo.png" },
  { name: "Polo", logo: "/polo-logo.png" },
  { name: "Zara", logo: "/zara-logo.png" },
];

const PartnerBrandsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, brands.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h2 className="text-foreground mb-2 text-3xl font-bold">
          Marcas parceiras
        </h2>
        <div className="bg-primary h-1 w-20"></div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="bg-card hover:bg-muted absolute top-1/4 left-0 z-10 -translate-x-4 -translate-y-1/2 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Previous brands"
        >
          <ChevronLeft className="text-foreground h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="bg-card hover:bg-muted absolute top-1/4 right-0 z-10 translate-x-4 -translate-y-1/2 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Next brands"
        >
          <ChevronRight className="text-foreground h-6 w-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group border-border bg-card cursor-pointer rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-10 items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-card-foreground group-hover:text-primary mt-4 text-center text-lg font-semibold transition-colors duration-300">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerBrandsCarousel;
