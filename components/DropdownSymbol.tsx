"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
    const handleClickMousedown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickMousedown)
    return () => document.removeEventListener('mousedown', handleClickMousedown)
  }, []);

  const handleSelect = (item: string) => {
    setIsOpen((prev) => !prev);
    onChangeCurrentSymbol(item)
  }

  return (
    <div className={`relative flex flex-col items-center `} ref={dropdownRef}>
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`text-lg rounded-md font-bold text-zinc-3 bg-zinc-800/50 p-3 w-30 justify-center cursor-pointer hover:bg-zinc-900/50 transition-colors border ${isOpen ? 'border-purple-500/50' : 'border-zinc-800/60'}`}
        >
          {symbol}
        </button>

        <ChevronDown
          className={`absolute top-0.5 right-0.5 pointer-events-none transition-all duration-300 transform ${isOpen ? 'rotate-180 scale-100' : 'rotate-0 scale-120 text-zinc-200'}`}
          size={16}

        />
      </div>


      <div className={`ease-in transition-all duration-100 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'} rounded-t-none  absolute top-full z-10 w-full bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-lg font-geist border-t-none`}>
        <ul className="flex flex-col gap-1 p-[4px] max-h-60">
          {symbols
            ?.filter((item) => item !== symbol)
            .map((item, index) => (
              <li
                onClick={() => handleSelect(item)}
                key={index}
                className="flex items-center justify-center px-2 py-3 rounded-lg text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors text-center font-medium cursor-pointer"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>

    </div>
  )
};

export default DropdownSymbol;

