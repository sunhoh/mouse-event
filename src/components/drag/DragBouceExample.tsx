'use client'
import { useState, useRef } from 'react'

const DragBouceExample = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const { x, y } = position

    const boundaryRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);


    

     const inrange = (v: number, min: number, max: number) => {
        if (v < min) return min;
        if (v > max) return max;
        return v;
      };

  return (
    <div className='py-4'>
        <div className=' mb-4'>
            <h1 className='text-3xl font-bold'>Drag Boundary</h1>
            <span>console screen</span>
            <span className='ml-4'>x:{x} y:{y}</span>
        </div>

        <div ref={boundaryRef} className=' border border-solid overflow-hidden h-64 rounded-xl bg-gray-200  flex items-center justify-center'>
            <div 
            className='w-24 h-24'
            style={{ transform: `translateX(${x}px) translateY(${y}px)`}}
            onMouseDown={(e)=>{
                const initX = e.pageX;
                const initY = e.pageY;    
                
                const mouseMoveHandler = (e:MouseEvent) => {
                    if(boundaryRef.current && boxRef.current ) {
                        const boundary = boundaryRef.current.getBoundingClientRect();
                        const box = boxRef.current.getBoundingClientRect();
                        const BOUNDARY_MARGIN = 12;
        
                        const deltaX = e.pageX - initX;
                        const deltaY = e.pageY - initY;

                        // 좌측 끝 = -boundary.width/2 + box.width/2 + margin
                        // 우측 끝 = boundary.width/2 - box.width/2 - margin
    
                        setPosition({
                            x: inrange(
                                x + deltaX,
                                Math.floor(-boundary.width / 2 + box.width / 2 + BOUNDARY_MARGIN),
                                Math.floor(boundary.width / 2 - box.width / 2 - BOUNDARY_MARGIN),
                            ),
                            y: inrange(
                                y + deltaY,
                                Math.floor(-boundary.height / 2 + box.height / 2 + BOUNDARY_MARGIN),
                                Math.floor(boundary.height / 2 - box.height / 2 - BOUNDARY_MARGIN),
                            ),
                        });
                    }
                }

                const mouseUpHandler = () => {
                document.removeEventListener('mousemove',mouseMoveHandler)
                }

                document.addEventListener('mousemove',mouseMoveHandler)
                document.addEventListener('mouseup',mouseUpHandler,{ once:true })
            }}
            >
                <div ref={boxRef} className='w-full h-full rounded-xl bg-white shadow-xl ring-1 ring-gray-100 cursor-move transition-[shadow,transform] active:scale-95 active:shadow-lg' />
            </div>
        </div>
    </div>
  )
}

export default DragBouceExample