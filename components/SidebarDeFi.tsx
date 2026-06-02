'use client'
import React,{useState} from 'react'
import { Menu, X, House, Settings, User } from 'lucide-react';

function SidebarDeFi() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev)=>!prev);
  return (
    <>
    {/* Оверлей для мобилок */}
    {isOpen && (
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden" onClick={toggleSidebar}></div>
    )}
    {/* Боковая панель */}
    <aside className=''>
      
    </aside>
    </>
  )
}

export default SidebarDeFi