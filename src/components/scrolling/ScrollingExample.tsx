'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import registHoverEvent from '@/utils/scrollingEvent';

const ScrollingExample = ({ image }: { image: string }) => {
  const [isHover, setIsHover] = useState(false);
  const [bgImage, setBgImage] = useState<string>(`url('${image}')`);
  const [bgSize, setBgSize] = useState<string>('');
  const [bgPosition, setBgPosition] = useState<string>('');
  const boxRef = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    return () => {
      if (ulRef.current) {
        ulRef.current.remove();
        ulRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="h-[300px] relative overflow-hidden"
      {...registHoverEvent({
        boxRef,
        ulRef,
        image,
        setBgImage,
        setBgSize,
        setBgPosition,
        setIsHover,
      })}
      style={{
        minHeight: 300,
        backgroundImage: bgImage,
        backgroundSize: bgSize, // String(Number(bgSize) * 0.31640625)
        backgroundPosition: bgPosition,
      }}
    >
      {!isHover && (
        <Image
          src={image}
          alt="thumbnail"
          width={450}
          height={253}
        />
      )}
    </div>
  );
};
export default React.memo(ScrollingExample);
