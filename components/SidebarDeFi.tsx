'use client'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarDeFiProps {
  endpoints: [string, string][],
}

function SidebarDeFi({ endpoints }: SidebarDeFiProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Кнопка бургер */}
      <button
        onClick={toggleSidebar}
        className={`mt-5 ml-5 fixed top-0 left-0 z-30 p-2 cursor-pointer rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-purple-400 transition-all duration-300 ease-in-out ${
          isOpen ? 'rotate-90 scale-0 opacity-0 ' : 'rotate-0 scale-100 opacity-100'
        }`}
      >
        <Menu size={20} />
      </button>

      {/* Сайдбар */}
      <aside className={`left-0 z-50 h-screen w-52 bg-zinc-950 border-r border-zinc-800/80  fixed lg:sticky top-0 inset-y-0 transform transition-all duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:ml-[-13rem]'}`}>

        <div className='bg-zinc-900/40 border-b border-zinc-800/60 flex h-16 items-center justify-between px-6  text-white relative'>
          <span className='font-bold font-geist tracking-wide text-zinc-200'>Dashboard</span>
          
          <button 
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer text-zinc-400 hover:text-purple-400 hover:bg-zinc-900 transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        <nav className='flex flex-col gap-1 p-3 font-geist overflow-y-auto '>
          {endpoints.map((item) => {
            const href = item[0];
            const name = item[1]; 
            const isActive = href === pathname;
            return (
              <Link 
                href={href} 
                key={href} 
                className={`flex items-center px-4 py-2.5 rounded-lg text-md font-medium transition-all  ${
                  isActive 
                    ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  )
}

export default SidebarDeFi;