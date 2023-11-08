'use client'
import { useState, useRef } from 'react'
import  { inrange } from '@/utils'
import Boundary from '@/components/Boundary'
import Box from '@/components/Box'

const BOUNDARY_MARGIN = 12

const TouchExample = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });  
    const { x, y } = position
    const boundaryRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
 
  return (
    <div className='py-4'>
      <div className='mb-4'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold'>Touch</h1>
          </div>
          <span>console screen</span>
          <span className='ml-4'>x:{x} y:{y}</span>
      </div>
    
      <Boundary ref={boundaryRef} className='flex items-center justify-center'>
        <div 
          className='w-36 h-24'
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

                // setPosition({ x :newX, y :newY });

                setPosition({ 
                  x: inrange(newX, Math.floor(-boundary.width / 2 + box.width / 2 + BOUNDARY_MARGIN), Math.floor(boundary.width / 2 - box.width / 2 - BOUNDARY_MARGIN)),
                  y: inrange(newY, Math.floor(-boundary.height / 2 + box.height / 2 + BOUNDARY_MARGIN), Math.floor(boundary.height / 2 - box.height / 2 - BOUNDARY_MARGIN)) 
                })
              }
            }

            const mouseUpHandler = (e:MouseEvent) => {
              document.removeEventListener('mousemove',mouseMoveHandler)
            }

            document.addEventListener('mousemove',mouseMoveHandler)
            document.addEventListener('mouseup',mouseUpHandler,{ once:true })
          }}
        >
          <Box ref={boxRef}/>
        </div>
      </Boundary>
    </div>
  )
}

export default TouchExample