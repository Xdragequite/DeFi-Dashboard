'use client'
import React,{useState} from 'react'
import { Menu, X, House, Settings, User } from 'lucide-react';
import Link from 'next/link';

function SidebarDeFi() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev)=>!prev);
  return (
    <>
    {isOpen && (
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden" onClick={toggleSidebar}></div>
    )}
    <Menu onClick={toggleSidebar} size={24} className={`mt-5 ml-5 absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    <aside className={`fixed lg:relative inset-y-0 rounded-b-xl w-52 bg-zinc-950 border-r border-b border-zinc-800/80 transform transition-all duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:ml-[-13rem]'}`}>

    <div className='flex h-16 items-center justify-between px-6 bg-zinc-900/40 border-b border-zinc-800/60 text-white gap-12'>
      <span className='font-bold font-geist tracking-wide text-zinc-200'>Dashboard</span>
      <button 
        onClick={toggleSidebar}
        className={`absolute ${isOpen ? '-right-0' : '-right-12'} flex h-12 w-12 items-center justify-center  text-zinc-400 hover:text-purple-400  transition-all duration-300 ease-in-out`}
      >

        <X size={24} className={`absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
      </button>

    </div>

    <nav className='flex flex-col gap-1 p-2 font-geist'>
      <Link href="/binance" className='flex items-center justify-center px-4 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors text-center font-medium'>Binance</Link>
      <Link href="/bybit" className='flex items-center justify-center px-4 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors font-medium'>ByBit</Link>
      <Link href="/huobi" className='flex items-center justify-center px-4 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors font-medium'>Huobi</Link>
      <Link href="/mexc" className='flex items-center justify-center px-4 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors font-medium'>MEXC</Link>
      <Link href="/okx" className='flex items-center justify-center px-4 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors font-medium'>OKX</Link>
    </nav>
    </aside>
    </>
  )
}

export default SidebarDeFi