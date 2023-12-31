/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { inrange } from '@/utils'
import registDragEvent from '@/utils/carouselEvent';


const imageList = [
    'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker37.png',
    'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker38.png',
    'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker40.png',
    'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker39.png',
    'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker46.png',
    // 'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker19.png',
    // 'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker29.png',
    // 'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker20.png',
    // 'https://d3vsvt1iq0xruo.cloudfront.net/images/img-bg-sticker24.png',
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
        className="overflow-hidden"
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
              transition: `transform ${transX ? 0 : 300}ms ease-in-out 0s`,
            }}
            {...registDragEvent({
                onDragChange: (deltaX) => {                  
                  setTransX(inrange(deltaX, -SLIDER_WIDTH, SLIDER_WIDTH));
                },
                onDragEnd: (deltaX) => {
                  const maxIndex = imageList.length - 1;

                  if (deltaX < -100) setCurrentIndex(inrange(currentIndex + 1, 0, maxIndex));
                  if (deltaX > 100) setCurrentIndex(inrange(currentIndex - 1, 0, maxIndex));
                  setTransX(0);
                },
              })}
              
        >
            {/* Slide */}
            {imageList.map((url, i) => (
                <div key={i} className="flex-shrink-0 bg-gray-100">
                    <img src={url} alt="img" width={SLIDER_WIDTH} draggable={false} />
                </div>
            ))}
      </div>
    </div>
  </>
  )
}

export default CarouselExample