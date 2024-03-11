import { useEffect, useRef, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Link from "next/link";
import CheckoutPage from "@/app/checkout/page";

export default function Cart({ onClose, updateCartData }) {
  const [cartData, setCartData] = useState([]);
  const ref = useRef(null);


  const closeCart = () => {
    onClose();
  };

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        closeCart();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, closeCart]);

  useEffect(() => {
    const storedCartData = sessionStorage.getItem('cartStoredItemsData');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity !== cartData.find(item => item.productId === productId)?.quantity) {
      const updatedCartData = cartData.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartData(updatedCartData);
      sessionStorage.setItem('cartStoredItemsData', JSON.stringify(updatedCartData));
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCartData = cartData.filter(item => item.productId !== productId);
    setCartData(updatedCartData);
    sessionStorage.setItem('cartStoredItemsData', JSON.stringify(updatedCartData));
    updateCartData(updatedCartData);
  };

  const totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="-ml-8 md:-ml-8 -mt-[4.8rem] w-screen h-screen bg-[#00000031] absolute">
      <div className="ml-auto w-full md:w-[30rem] h-screen border-4 bg-white border-b-[54rem] border-white">
        <div className="mx-4 md:mx-10 my-2" ref={ref}>
          <div className="border-b-2 border-[#7a666c] w-full p-4 pl-2 flex items-center justify-center md:gap-48">
            <h1 className="sniglet-extrabold text-2xl md:text-2xl text-center">Your Cart</h1>
            <button className="sniglet-regular text-5xl ml-auto md:text-5xl" onClick={closeCart}>
              x
            </button>
          </div>
          <div className="overflow-y-auto h-[20rem] md:h-[32rem] max-h-[32rem]">
            <ul className="flex flex-col gap-4 md:gap-8">
              {cartData.map((item, index) => (
                <ProductItem key={index} product={item} onRemove={handleRemoveItem} onQuantityChange={handleQuantityChange} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 sniglet-extrabold">
            <div className="border-t-2 py-2 border-[#7a666c] flex justify-between items-center text-neutral-700">
              <h1 className="text-[1rem] md:text-[1.3rem]">Total :</h1>
              <span className="ml-auto text-[1rem] md:text-[1.3rem]">{totalAmount.toFixed(2)}$</span>
            </div>
            <Link href="/checkout">
              <button className="w-full p-3 bg-neutral-700 text-white -my-0 md:-my-8">Checkout Page</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}