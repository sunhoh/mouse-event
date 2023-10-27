'use client'
import { useState } from 'react'

const DragExample = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const { x, y } = position

  return (
    <div className='py-4'>
    <div className='mb-4'>
        <h1 className='text-3xl font-bold'>Drag</h1>
        <span>console screen</span>
        <span className='ml-4'>x:{x} y:{y}</span>
    </div>
    <div className=' border border-solid overflow-hidden h-64 rounded-xl bg-gray-200  flex items-center justify-center'>
        <div 
          className='w-24 h-24'
          style={{ transform: `translateX(${x}px) translateY(${y}px)`}}
          onMouseDown={(e)=>{
            const initX = e.screenX;
            const initY = e.screenY;
            
            const mouseMoveHandler = (e:MouseEvent) => {
              setPosition({
                x: x + e.screenX - initX,
                y: y + e.screenY - initY,
                
              })
            }

            const mouseUpHandler = () => {
              document.removeEventListener('mousemove',mouseMoveHandler)
            }

            document.addEventListener('mousemove',mouseMoveHandler)
            document.addEventListener('mouseup',mouseUpHandler,{ once:true })
          }}
        >
          <div className='w-full h-full rounded-xl bg-white shadow-xl ring-1 ring-gray-100 cursor-move transition-[shadow,transform] active:scale-95 active:shadow-lg' />
        </div>
        
      </div>
    </div>
  )
}

export default DragExample