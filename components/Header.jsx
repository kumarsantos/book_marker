"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const Header = () => {
    const pathname=usePathname();
  return (
    <nav className='sm:flex justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 z-50'>
        <section>
          <Image priority src="https://content-hub-rho.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.dd1f4b93.png&w=256&q=75" alt="logo" width={100} height={100} className=' w-[100px] h-[48px] sm:w-[140px] sm:h-[64px]' />
        </section>
        <section className='flex items-center gap-4  mt-4 sm:mt-0'>
            <Link href="/" className={`${pathname==="/" ? "border  px-2 py-1 rounded-md":"text-white "}   w-[100px] flex items-center justify-center`}>Home</Link>
            <Link href="/todo" className={`${pathname==="/todo" ? "border  px-2 py-1 rounded-md":"text-white "}  w-[100px] flex items-center justify-center`}>Todo</Link>
            <Link href="/book_mark" className={`${pathname==="/book_mark" ? "border  px-2 py-1 rounded-md":"text-white "}   w-[110px] flex items-center justify-center`}>Book Marks</Link>
        </section>
    </nav>
  )
}

export default Header