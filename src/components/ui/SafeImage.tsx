"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError" | "src"> {
  src?: string | StaticImageData | null;
  fallbackSrc?: string | StaticImageData;
}

export default function SafeImage({
  src,
  fallbackSrc = "/images/fallback-image.png",
  alt,
  ...props
}: SafeImageProps) {
  // Handle empty string or null src by using fallback immediately
  const validSrc = src && src !== "" ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<typeof validSrc>(validSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc as typeof validSrc);
    }
  };

  // Don't render if we have no valid src
  if (!imgSrc) {
    return null;
  }

  // Check if src is an SVG or external placeholder URL that might be SVG
  const isSvgUrl =
    typeof imgSrc === "string" &&
    (imgSrc.includes(".svg") ||
      imgSrc.includes("placehold.co") ||
      imgSrc.includes("via.placeholder"));

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={isSvgUrl}
    />
  );
}
