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
            {
                isCheckoutPage === "/checkout" ? "" : (
                    <nav className='fixed top-0 left-0 right-0 p-8 w-full h-24 bg-white shadow-lg z-50'>
                    <ul className='flex items-center text-center justify-center gap-10 text-3xl uppercase sniglet-extrabold text-[#c5bce9]'>
                        
                        <Link href='/'>
                            <span className="mr-36 absolute border-transparent w-24 h-10 border-b-4 transition hover:border-[#cdc7e9]"></span>
                            Home
                        </Link>
                        <Link href='/shop-all'>
                            <span className="mr-36 absolute border-transparent w-40 h-10 border-b-4 transition hover:border-[#cdc7e9]"></span>
                            Shop All
                        </Link>
                    </ul>
                    <button onClick={() => openCart()} className="w-52 flex flex-col ml-auto sniglet-regular text-base text-gray-800">
                        <Image alt="/" className='ml-[auto] mr-32 -my-10 h-10 w-10' src={bagIcon}/>
                        <span className="ml-24">Shopping Cart : <span className="font-bold">{cartData.reduce((total, item) => total + item.quantity, 0)} Items</span></span>
                    </button>
                    {cartOpen && <Cart onClose={() => setCartOpen(false)} updateCartData={updateCartData} />}
                </nav>
                )}
        </div>
        
    );
    
};