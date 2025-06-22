'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

interface GlobalNavbarProps {
  middleSlot?: ReactNode;
}

export default function GlobalNavbar({ middleSlot }: GlobalNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Blog', href: '/' },
    { label: 'Photography', href: '/projects' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex justify-between items-center px-4 py-3 sm:px-6">
        {/* 左側 LOGO */}
        <Link href="/" className="font-bold text-lg">
          PO-FENG
        </Link>

        {middleSlot && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center z-0">
            {middleSlot}
          </div>
        )}

        <div className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? 'text-black font-semibold border-b-2 border-black pb-1'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm font-medium transition ${
                  isActive
                    ? 'text-black font-semibold underline'
                    : 'text-gray-700 hover:text-black'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
