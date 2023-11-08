/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import {inrange} from '@/utils'
import registDragEvent from '@/utils/carouselEvent';


const imageList = [
    'https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg',
    'https://blog.kakaocdn.net/dn/BGT7X/btqUzvTqi5h/flp39GdJH0GU6mo7cTbbhk/img.jpg',
    'https://blog.kakaocdn.net/dn/bWnmfv/btqUBwqZvwA/3CiXGt3SR0TXoOveRJxV91/img.jpg',
    'https://blog.kakaocdn.net/dn/XsLCO/btqUL8PQLwp/NZWCU2jAYKkKSXwcohBKTK/img.jpg',
    'https://blog.kakaocdn.net/dn/bG3iVL/btqUvCZPaRL/ofIjkNWJP1mj2bOG9fie51/img.jpg',
  ];

const SLIDER_WIDTH = 400;
const SLIDER_HEIGHT = 400;

const CarouselExample = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transX, setTransX] = useState(0);
  return (
    <>
    {/* Viewer */}
        <div
        className="overflow-hidden border border-solid"
            style={{
                width: SLIDER_WIDTH,
                height: SLIDER_HEIGHT,
            }}
        >
      {/* Slider */}
        <div
            className="flex"
            style={{
              transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
            }}
            {...registDragEvent({
                onDragChange: (deltaX) => {
                  // 2️⃣
                  setTransX(inrange(deltaX, -SLIDER_WIDTH, SLIDER_WIDTH));
                },
                onDragEnd: (deltaX) => {
                  const maxIndex = imageList.length - 1;
            
                  // 3️⃣
                  if (deltaX < -100) setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
                  if (deltaX > 100) setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));
            
                  // 4️⃣
                  setTransX(0);
                },
              })}
        >
            {/* Slide */}
            {imageList.map((url, i) => (
                <div key={i} className="flex-shrink-0">
                    <img src={url} alt="img" width={SLIDER_WIDTH} draggable={false} />
                </div>
            ))}
      </div>
    </div>
  </>
  )
}

export default CarouselExample