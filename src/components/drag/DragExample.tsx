'use client'
import { useState, useRef, useEffect } from 'react'
import {inrange} from '@/utils'
import  registDragEvent from '@/utils/dragEvent'

import Boundary from '@/components/Boundary'
import Box from '@/components/Box'


const DEFAULT_W = 96;
const DEFAULT_H = 96;
const MIN_W = 80;
const MIN_H = 80;

const DragExample = () => {
    const [config, setConfig] = useState({ x: 0, y: 0, w: 0, h: 0 });
    const  { x, y, w, h } = config

    const [show, setShow] = useState({
      resize: false,
      boundary: false
    });

    const boundaryRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState<string>('Reset')
    const [BOUNDARY_MARGIN ,setBOUNDARY_MARGIN] = useState(12)

    const dragOptionHandler = (item:string) =>{
      setTitle(item)
      if(item === 'Reset') {
        const boundary = boundaryRef.current?.getBoundingClientRect();
        if (boundary) {
          setShow({resize:false, boundary:false })
          setConfig({
            x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
            y: Math.floor(boundary.height / 2 - DEFAULT_H / 2 ),
            w: DEFAULT_W,
            h: DEFAULT_H
          });
        }
        
      } 
      if(item === 'Resize') return setShow({resize:!show.resize, boundary:false })
      if(item === 'Boundary') return setShow({resize:false, boundary:true })
    }

    useEffect(() => {
      const boundary = boundaryRef.current?.getBoundingClientRect();

      if (boundary) {
        setConfig({
          x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
          y: Math.floor(boundary.height / 2 - DEFAULT_H / 2 ),
          w: DEFAULT_W,
          h: DEFAULT_H
        });
      }
    }, []);
  
  return (
    <div className='py-4'>
      <div className='mb-4'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold'>Drag {title !== 'Reset' ? title : ''}</h1>
          </div>
          <span>console screen</span>
          <span className='ml-4'>x:{x} y:{y}</span> 

          <div className='gap-3 my-4'>
            {['Reset','Resize','Boundary'].map(item => {
              return (
              <div key={`darg-${item}`} className="flex items-center gap-1 cursor-pointer">
                
                <label 
                  htmlFor={item}
                  className='rounded-xl text-sm flex items-center gap-2 cursor-pointer drop-shadow-lg  active:drop-shadow-md' 
                >
                  {item}
                </label>
                <input id={item} type="checkbox" checked={show.resize} className={item ==='Resize' ? 'display' : 'hidden'}  onChange={() => dragOptionHandler(item)} />
                {item ==='Boundary' && 
                  <input 
                    type="range" 
                    disabled={!show.boundary} 
                    value={BOUNDARY_MARGIN} 
                    onChange={(e) => setBOUNDARY_MARGIN(Number(e.target.value))}
                  />
                }
              </div>
              )
            })}
          </div>
      </div>

      <Boundary ref={boundaryRef} >
        <div 
          className="relative"
          style={{ width: w, height: h, left: x, top: y }}
          {...registDragEvent((deltaX, deltaY) => {
            if (!boundaryRef.current) return  
            const boundary = boundaryRef.current.getBoundingClientRect();

            title === 'Reset'
            ? setConfig((prev)=>(
              {
                ...prev,
                x: x + deltaX,
                y: y + deltaY,
              }
            ))
            : setConfig((prev)=>(
              {
                ...prev,
                x: inrange(x + deltaX, BOUNDARY_MARGIN, Math.floor(boundary.width - w - BOUNDARY_MARGIN)),
                y: inrange(y + deltaY, BOUNDARY_MARGIN, Math.floor(boundary.height - h - BOUNDARY_MARGIN)),
              }
            ))
            
          })}
        
        >
          <Box />
          {/* 좌상단 */}
          <div
            className="absolute -top-1 -left-1 h-4 w-4 cursor-nw-resize"
            style={{ backgroundColor: show.resize ? '#12121250' : 'transparent' }}
            {...registDragEvent((deltaX, deltaY) => {
              setConfig({
                x: inrange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
                y: inrange(y + deltaY, BOUNDARY_MARGIN, y + h - MIN_H),
                w: inrange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
                h: inrange(h - deltaY, MIN_H, y + h - BOUNDARY_MARGIN),
              });
            }, true)}
          />
          {/* 우상단 */}
          <div
            className="absolute -top-1 -right-1 h-4 w-4 cursor-ne-resize"
            style={{ backgroundColor: show.resize ? '#12121250' : 'transparent' }}
            {...registDragEvent((deltaX, deltaY) => {
              if (!boundaryRef.current) return;
              const boundary = boundaryRef.current.getBoundingClientRect();

              setConfig({
                x,
                y,
                w: inrange(w + deltaX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
                h: inrange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
              });
            }, true)}
          />
          {/* 좌하단 */}
          <div
            className="absolute -bottom-1 -left-1 h-4 w-4 cursor-sw-resize"
            style={{ backgroundColor: show.resize ? '#12121250' : 'transparent' }}
            {...registDragEvent((deltaX, deltaY) => {
              if (!boundaryRef.current) return;

              const boundary = boundaryRef.current.getBoundingClientRect();

              setConfig({
                x: inrange(x + deltaX, BOUNDARY_MARGIN, x + w - MIN_W),
                y,
                w: inrange(w - deltaX, MIN_W, x + w - BOUNDARY_MARGIN),
                h: inrange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
              });
            }, true)}
          />
          {/* 우하단 */}
          <div
            className="absolute -bottom-1 -right-1 h-4 w-4 cursor-se-resize"
            style={{ backgroundColor: show.resize ? '#12121250' : 'transparent' }}
            {...registDragEvent((deltaX, deltaY) => {
              if (!boundaryRef.current) return;
              const boundary = boundaryRef.current.getBoundingClientRect();

              setConfig({
                x,
                y,
                w: inrange(w + deltaX, MIN_W, boundary.width - x - BOUNDARY_MARGIN),
                h: inrange(h + deltaY, MIN_H, boundary.height - y - BOUNDARY_MARGIN),
              });
            }, true)}
          />
        </div>
      </Boundary>
    </div>
  )
}

export default DragExample