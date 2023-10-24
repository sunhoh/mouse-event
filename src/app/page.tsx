'use client'
import { useRef, useEffect } from 'react'
import { rendomAnimation } from '@/utils'

export default function Home() {
  const ref = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      rendomAnimation(ref);
    }, 1500);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-full flex place-content-center'>
      <div className='relative flex justify-center my-8 w-[570px] h-[400px]'>
        {Array.from({length: 10}, (_, i) => i + 1).map((_,i)=>{
          return (
            <span key={i} ref={(ele)=> (ref.current[i] = ele  as HTMLDivElement)} 
              className='absolute inset-y-1/2 h-[1px] rounded-full animation-random border border-solid'
            >
            </span>
          )
        })}
      </div>
    </div>
  )
}