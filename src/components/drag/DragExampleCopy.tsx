'use client'
import { useState, useRef } from 'react'
import  { inrange } from '@/utils/dragEvent'

const DragExample = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const { x, y } = position
    
    const [isBoundary, setIsBoundary] = useState<string | null>(null)
    const boundaryRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [BOUNDARY_MARGIN ,setBOUNDARY_MARGIN] = useState(12)


    const dragOptionHandler = (item:string) =>{
      setIsBoundary(item) 
      if(item === 'Reset') return setPosition({ x:0, y:0 })
    }
 
  return (
    <div className='py-4'>
      <div className='mb-4'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold'>Drag {isBoundary !== 'Reset' ? isBoundary : ''}</h1>
          </div>
          <span>console screen</span>
          <span className='ml-4'>x:{x} y:{y}</span> 

          <ul className='gap-3 my-4'>
            {['Reset','Boundary', 'Resize'].map(item => (
              <li 
                key={item}
                className='rounded-xl p-1 text-sm flex items-center gap-2 cursor-pointer drop-shadow-lg  active:drop-shadow-md'  
                onClick={() => dragOptionHandler(item)}
              >
                <span>{item}</span>
                {item === 'Boundary' &&
                  <input 
                    type="range" 
                    disabled={isBoundary !== 'Boundary'} 
                    className='border border-solid'
                    value={BOUNDARY_MARGIN} 
                    onChange={(e) => {
                      setBOUNDARY_MARGIN(Number(e.target.value))
                    }}
                  />
                }
              </li>
            ))}
          </ul>          
      </div>
    
      <div ref={boundaryRef} className='h-80 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center'>
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
                const newX = e.screenX - initX + x;
                const newY = e.screenY - initY + y;

                isBoundary === 'Boundary'
                ? setPosition({ 
                    x: inrange(newX, Math.floor(-boundary.width / 2 + box.width / 2 + BOUNDARY_MARGIN), Math.floor(boundary.width / 2 - box.width / 2 - BOUNDARY_MARGIN)),
                    y: inrange(newY, Math.floor(-boundary.height / 2 + box.height / 2 + BOUNDARY_MARGIN), Math.floor(boundary.height / 2 - box.height / 2 - BOUNDARY_MARGIN)) })
                : setPosition({ x :newX, y :newY });
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