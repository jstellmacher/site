'use client';

import { useState, useEffect, Children, isValidElement, cloneElement } from 'react';
import './global.css';
import Navigation from '../components/Navigation';
import { Montserrat, Playfair_Display } from 'next/font/google';

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const Layout = ({ children }) => {
  const [isBraveBrowser, setIsBraveBrowser] = useState(false);

  useEffect(() => {
    const detectBrave = async () => {
      if (navigator.brave && await navigator.brave.isBrave()) {
        setIsBraveBrowser(true);
      }
    };

    detectBrave();
  }, []);

  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className='bg-gradient-to-r from-green-400 to-blue-500 font-sans'>
        <header className="bg-white/30 backdrop-blur-md text-white p-4 shadow-md fixed w-full top-0 left-0 z-50" aria-label="Site Header">
          <div className="container mx-auto">
            <Navigation />
          </div>
        </header>
        <main className="pt-16 flex-grow">
          {Children.map(children, child =>
            isValidElement(child)
              ? cloneElement(child, { isBraveBrowser })
              : child
          )}
        </main>
        <footer className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 text-center" aria-label="Site Footer">
          <p>&copy; {new Date().getFullYear()} Jai Stellmacher. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;