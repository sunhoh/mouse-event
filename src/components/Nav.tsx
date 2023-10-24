'use client'
import React from 'react'
import Link from 'next/link'
import { PAGES } from '@/constants/index'
import { usePathname } from 'next/navigation';


const Nav = () => { 
    const pathname= usePathname()

  return (
    <nav className='mx-auto max-w-3xl'>
        <ul className='flex flex-wrap items-center gap-4 p-4'>
            {PAGES.map((page)=>{
                const isPath = pathname === page.href
                return (
                    <li key={page.title} className={isPath ? 'text-lg transition-all hover:drop-shadow-lg font-bold' :'text-gray-500'}>
                        <Link href={page.href} >{page.title}</Link>
                    </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default Nav