// components/Slide.tsx
import Image from 'next/image';

interface SlideProps {
  src: string;
  alt: string;
  caption?: string;
}

const Slide = ({ src, alt, caption }: SlideProps) => {
  return (
    <div className="relative h-96 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
      {caption && <figcaption className="absolute bottom-4 left-4 text-white">{caption}</figcaption>}
    </div>
  );
};

export default Slide;

