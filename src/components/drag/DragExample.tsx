'use client'
import { useState, useRef } from 'react'

const DragExample = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const { x, y } = position
    
    const [isBoundary, setIsBoundary] = useState(false)
    const boundaryRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [BOUNDARY_MARGIN ,setBOUNDARY_MARGIN] = useState(12)


    const inrange = (v: number, min: number, max: number) => {
      if (v < min) return min;
      if (v > max) return max;
      return v;
    };

 
  return (
    <div className='py-4'>
    <div className='mb-4'>
        <h1 className='text-3xl font-bold'>Drag</h1>
        <span>console screen</span>
        <span className='ml-4'>x:{x} y:{y}</span>

        <div className="flex items-center gap-1">
          <label htmlFor="show" className={isBoundary ? 'cursor-pointer':'cursor-pointer text-gray-400 line-through'}>boundary setting</label>
          <input type="number" disabled={!isBoundary} className={isBoundary ? ' w-[40px]' :' w-[40px] text-gray-400 line-through' } value={BOUNDARY_MARGIN} onChange={(e) => setBOUNDARY_MARGIN(Number(e.target.value))}/>
          <input id="show" type="checkbox" checked={isBoundary} onChange={() => setIsBoundary(!isBoundary)} className='hidden'/>
        </div>
    </div>
    
    
    <div ref={boundaryRef} className='h-[400px] rounded-xl bg-gray-200  overflow-hidden flex items-center justify-center'>
        <div 
          className='w-24 h-24'
          style={{ transform: `translateX(${x}px) translateY(${y}px)`}}
          onMouseDown={(e)=>{
            const initX = e.screenX;
            const initY = e.screenY;

            const mouseMoveHandler = (e:MouseEvent) => {
              
              
              if (boundaryRef.current && boxRef.current) {
                const boundary = boundaryRef.current.getBoundingClientRect();
                const box = boxRef.current.getBoundingClientRect();
                
                const newX = e.screenX - initX;
                const newY = e.screenY - initY;

                isBoundary 
                ?  setPosition({
                    x: inrange(
                      x + newX,
                      Math.floor(-boundary.width / 2 + box.width / 2 + BOUNDARY_MARGIN),
                      Math.floor(boundary.width / 2 - box.width / 2 - BOUNDARY_MARGIN),
                    ),
                    y: inrange(
                      y + newY,
                      Math.floor(-boundary.height / 2 + box.height / 2 + BOUNDARY_MARGIN),
                      Math.floor(boundary.height / 2 - box.height / 2 - BOUNDARY_MARGIN),
                    ),
                  })
                : setPosition({
                  x :x + newX,
                  y :y + newY
                });
              }
            }

            const mouseUpHandler = (e:MouseEvent) => {
              console.warn('mouse Up >> ',e.screenX)
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

export default DragExample