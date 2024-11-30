'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageProps {
  mobile: string;
  tablet: string;
  desktop: string;
}

const ResponsiveImage = ({ image }: { image: ImageProps }) => {
  const [src, setSrc] = useState(image.mobile);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth >= 1024) {
        setSrc(image.desktop);
      } else if (window.innerWidth >= 768) {
        setSrc(image.tablet);
      } else {
        setSrc(image.mobile);
      }
    };

    // Atualiza ao carregar a página
    updateImage();

    // Adiciona um listener para mudanças no tamanho da janela
    window.addEventListener("resize", updateImage);

    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", updateImage);
  }, [image]);

  return (
    <Image
      src={src}
      alt="Responsive Dessert"
      width={500}
      height={500}
      className="w-[300px] h-[150px] rounded-lg md:w-[320px] md:h-[320px]"
    />
  );
};

export default ResponsiveImage;
