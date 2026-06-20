"use client";
import React, { use, useEffect, useRef, useState } from "react";

export interface DataDropdownSymbol {
  symbols: string[];
  onChangeCurrentSymbol: (symbol: string) => void;
  symbol: string;
}

const DropdownSymbol = ({
  symbols,
  onChangeCurrentSymbol,
  symbol,
}: DataDropdownSymbol) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickMousedown = (event: MouseEvent) =>{
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown',handleClickMousedown)
    return () => document.removeEventListener('mousedown',handleClickMousedown)
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSelect = (item:string) => {
    setIsOpen((prev) => !prev);
    onChangeCurrentSymbol(item)
  }

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen((prev) => !prev)}
       className={`text-lg font-bold text-zinc-3 bg-zinc-800/50 p-2 w-30 justify-center flex cursor-pointer hover:bg-zinc-900/50  transition-colors border ${
    isOpen ? 'border-purple-500/50' : 'border-zinc-800/60'
  }`}
      >
        {symbol}
      </button>
      {isOpen && (
        <div className="rounded-t-none  absolute top-full z-10 w-full bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-lg font-geist border-t-none">
          <ul className="flex flex-col gap-1 p-[4px] max-h-60">
            {symbols
              ?.filter((item) => item !== symbol)
              .map((item) => (
                <li 
                  onClick={() => handleSelect(item)}
                  key={item}
                  className="flex items-center justify-center px-2 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors text-center font-medium cursor-pointer"
                >
                  {item}
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default DropdownSymbol;

// 'use client'
// import React, { useState, useRef, useEffect } from 'react'

// export interface DataDropdownSymbol {
//   symbols: string[],
//   onChangeCurrentSymbol: (symbol: string) => void;
//   symbol: string,
// }

// const DropdownSymbol = ({ symbols, onChangeCurrentSymbol, symbol }: DataDropdownSymbol) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Закрытие при клике вне компонента
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSelect = (item: string) => {
//     onChangeCurrentSymbol(item);
//     setIsOpen(false); // Закрываем после выбора
//   };

//   return (
//     // relative нужен, чтобы абсолютный список позиционировался относительно этого div
//     <div className="relative flex flex-col items-center" ref={dropdownRef}>

//       {/* Кнопка-триггер (бывший span) */}
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="text-lg font-bold text-zinc-3 bg-black/50 p-2 border-b border-zinc-800/60 rounded-t-sm w-30 justify-center flex cursor-pointer hover:bg-black/70 transition-colors"
//       >
//         {symbol}
//       </button>

//       {/* Выпадающий список */}
//       {isOpen && (
//         <div className="absolute top-full mt-1 z-10 w-full bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden shadow-lg font-geist">
//           <ul className="flex flex-col gap-1 p-[4px] max-h-60 overflow-y-auto [scrollbar-gutter:stable]">
//             {symbols
//               ?.filter((item) => item !== symbol)
//               .map((item) => (
//                 <li
//                   onClick={() => handleSelect(item)}
//                   key={item}
//                   className="flex items-center justify-center px-2 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors text-center font-medium cursor-pointer"
//                 >
//                   {item}
//                 </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DropdownSymbol
