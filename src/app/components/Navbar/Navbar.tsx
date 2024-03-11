'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import bagIcon from '../../../../public/icons/bag-icon.png';
import Link from 'next/link';
import Cart from "../Cart/Cart";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const openCart = () => {
        setCartOpen(true);
    };

    const updateCartData = (newCartData) => {
        setCartData(newCartData);
    };

    useEffect(() => {
        const storedCartData = sessionStorage.getItem('cartStoredItemsData');
        if (storedCartData) {
            setCartData(JSON.parse(storedCartData));
        }
    }, []);

    const isCheckoutPage = usePathname();

    return (
        <div>
          {isCheckoutPage === '/checkout' || isCheckoutPage === '/checkout/orderCompleted' ? (
            ''
          ) : (
            <nav className='fixed top-0 left-0 right-0 p-8 w-full h-24 bg-white shadow-lg z-50'>
              {/* Desktop navigation */}
              <ul className='hidden md:flex lg:flex xl:flex items-center text-center justify-center gap-10 text-3xl uppercase sniglet-extrabold text-[#c5bce9]'>

                <Link href='/' className=" absolute mr-[38rem] xl:text-4xl text-3xl text-red-400 xl:mr-[72rem]">Hello Heaven</Link>
                <Link href='/'>
                  <span className='mr-36 absolute border-transparent w-24 h-10 border-b-4 transition hover:border-[#cdc7e9]'></span>
                  Home
                </Link>
                <Link href='/shop-all'>
                  <span className='mr-36 absolute border-transparent w-40 h-10 border-b-4 transition hover:border-[#cdc7e9]'></span>
                  Shop All
                </Link>
              </ul>
    
              {/* Mobile and Tablet navigation */}
              <div className='md:hidden lg:hidden xl:hidden'>
                <button onClick={toggleMobileMenu} className='text-3xl'>
                  ☰
                </button>
              </div>
    
              {/* Mobile and Tablet menu */}
              {mobileMenuOpen && (
              <div className='md:hidden lg:hidden xl:hidden bg-white fixed -ml-10 -my-10 w-96 h-screen'>
                <button
                className=' ml-10 text-gray-700 focus:outline-none border-b-2 border-black w-80 p-2 py-3'
                onClick={toggleMobileMenu}
                >
                    {/* Add your X icon or text for the close button */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                    >
                        
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                    d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                
                <ul className='flex flex-col items-center text-center gap-8 text-2xl uppercase sniglet-extrabold text-[#c5bce9] py-9'>
                    <Link href='/' onClick={toggleMobileMenu}>Home</Link>
                    <Link href='/shop-all' onClick={toggleMobileMenu}>Shop All</Link>
                </ul>
            </div>
            )}
    
              <button
                onClick={() => openCart()}
                className='w-52 flex flex-col ml-auto md:-mr-0 -mr-32 sniglet-regular text-base text-gray-800'
              >
                <Image alt='/' className='ml-[auto] mr-32 -my-10 h-10 w-10' src={bagIcon} />
                {/* Hide on tablet or mobile */}
                <span className='hidden md:inline-block lg:inline-block xl:inline-block ml-24'>
                  Shopping Cart : <span className='font-bold'>{cartData.reduce((total, item) => total + item.quantity, 0)} Items</span>
                </span>
              </button>
              {cartOpen && <Cart onClose={() => setCartOpen(false)} updateCartData={updateCartData} />}
            </nav>
          )}
        </div>
      );
    
};