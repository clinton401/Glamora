import Image, {StaticImageData} from 'next/image'
import {useState} from 'react'
function ImagesComp({
  imgSrc,
  alt,
}: {
  imgSrc: (string | StaticImageData);
  alt: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      //   placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      //   style={{ borderRadius: "6px", objectFit: "contain" }}
      className={`w-ful h-full object-cover overflow-hidden rounded ${
        isLoading
          ? " blur-sm grayscale"
          : " blur-0 grayscale-0"
      }`}
      fill={true}
      onLoad={() => setIsLoading(false)}
    />
  );
}

export default ImagesComp
