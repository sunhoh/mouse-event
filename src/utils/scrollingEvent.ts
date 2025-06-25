import React from 'react';

/**
 * hoverEventProps... (style image, size, position)
 * boxRef
 * ulRef
 * image
 * setBgImage
 * setBgSize
 * setBgPosition
 * setIsHover
 */

// block tag style(background url) 크기 지정
const createImageGrid = (width: number, height: number, size: string, src: string) => {
  const ul = document.createElement('ul');
  ul.style.display = 'none';

  // block tag style(background url) 크기 지정
  ['_y1.jpg', '_y2.jpg', '_y3.jpg'].forEach(suffix => {
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const li = document.createElement('li');
        const img = document.createElement('img');

        img.src = '';
        img.style.width = `${width}px`;
        img.style.height = `${height}px`;

        const left = `${width * x * -1}px`;
        const top = `${height * y * -1}px`;
        const position = `left ${left} top ${top}`;

        img.style.backgroundImage = `url('${src + suffix}')`;
        img.style.backgroundSize = size;
        img.style.backgroundRepeat = 'no-repeat';
        img.style.backgroundPosition = position;

        li.appendChild(img);
        ul.appendChild(li);
      }
    }
  });

  return ul;
};

const calculateBackgroundSize = (element: HTMLDivElement) => {
  const width = element.offsetWidth;
  const height = width * 0.61667;
  const itemsPerRow = 5;
  return {
    width,
    height,
    size: `${width * itemsPerRow}px ${height * itemsPerRow}px`,
  };
};

export default function registHoverEvent(props: {
  boxRef: React.RefObject<HTMLDivElement>;
  ulRef: React.MutableRefObject<HTMLUListElement | null>;
  image: string;
  setBgImage: React.Dispatch<React.SetStateAction<string>>;
  setBgSize: React.Dispatch<React.SetStateAction<string>>;
  setBgPosition: React.Dispatch<React.SetStateAction<string>>;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { boxRef, ulRef, image, setBgImage, setBgSize, setBgPosition, setIsHover } = props;

  return {
    onMouseEnter: () => {
      console.time('🟢 Total onMouseEnter Time');
      setIsHover(true);

      if (!boxRef.current) return;

      const { width, height, size } = calculateBackgroundSize(boxRef.current);
      setBgImage(`url('${image}')`);
      setBgSize(size);

      //  최적화화
      if (!ulRef.current) {
        // ex) image = https://media.tvcf.co.kr/Media/Print/0000529/A000529935968F.jpg
        const src = image.replace(/print/gi, 'sbImg').replace(/.jpg/gi, '');
        ulRef.current = createImageGrid(width, height, size, src);
      }

      if (boxRef.current.parentNode && !boxRef.current.parentNode.contains(ulRef.current)) {
        boxRef.current.parentNode.appendChild(ulRef.current);
      }

      ulRef.current.style.display = 'block';
      console.timeEnd('🟢 Total onMouseEnter Time');
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      if (!boxRef.current || !ulRef.current) return;

      const x = e.nativeEvent.offsetX;
      const w = boxRef.current.offsetWidth;
      const n = Math.floor((x / w) * 75);

      const img = ulRef.current.querySelector(`li:nth-child(${n + 1}) > img`) as HTMLImageElement;

      if (img) {
        setBgImage(img.style.backgroundImage);
        setBgSize(img.style.backgroundSize);
        setBgPosition(img.style.backgroundPosition);
      }
    },
    onMouseLeave: () => {
      setIsHover(false);

      const src = image.replace(/sbImg/gi, 'print');

      setBgImage(`url('${src}')`);
      setBgSize('');
      setBgPosition('');

      if (ulRef.current) {
        ulRef.current.style.display = 'none'; // 최적화화
        // ulRef.current.remove();
        // ulRef.current = null;
      }
    },
  };
}
