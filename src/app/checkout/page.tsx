'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductItem from "../components/ProductItem/ProductItem";
import Link from "next/link";

const handleSubmit = async (orderSchema) => {
  try {
    const response = await fetch('/api/mongo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderSchema),
    });

    if (response.ok) {
      console.log('Order added to the mongoDB');
    } else {
      console.log('MongoDB error');
    }
  } catch (error) {
    console.log(error);
  }
};

export default function CheckoutPage({ updateCartData }) {
  const [cartData, setCartData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

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
  const orderCompleted = false;

  const handlePlaceOrder = () => {
    if (cartData.length === 0) {
      setErrorMessage("Error: Cart is empty. Please add items to your cart before placing an order.");
      return;
    }

    const inputs = ["email", "firstName", "lastName", "city", "addressLine1", "zipCode"];
    const orderSchema = inputs.reduce((schema, inputId) => {
      const input = document.getElementById(inputId);
      schema[inputId] = input.value;
      return schema;
    }, {});

    orderSchema.cartData = cartData;
    orderSchema.orderCompleted = orderCompleted;

    if (inputs.every(inputId => document.getElementById(inputId).checkValidity())) {
      console.log("Order Details:", orderSchema);
      handleSubmit(orderSchema);
      sessionStorage.clear();
      router.push("/checkout/orderCompleted");
    } else {
      inputs.forEach(inputId => {
        const validationMessage = document.getElementById(`${inputId}-validation-message`);
        validationMessage.innerText = document.getElementById(inputId).validationMessage;
      });
    }
  };

  return (
    <div className="sniglet-regular">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Link href="/shop-all" className="flex items-center gap-2">
          <span className="text-2xl font-black">◀</span>
          <span className="underline underline-offset-2">Continue Shopping</span>
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative"></div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-5 pt-8 pl-1 -pr-32 border mr-1 -ml-20">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <ul className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 flex flex-col">
            {cartData.map((item, index) => (
              <ProductItem key={index} product={item} onRemove={handleRemoveItem} onQuantityChange={handleQuantityChange} />
            ))}
          </ul>
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6"></form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">Complete your order by providing your payment details.</p>
          <div className="">
            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                required  
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <span id="email-validation-message" className="text-red-600"></span>
            </div>
            <label htmlFor="firstName" className="mt-4 mb-2 block text-sm font-medium">
              First Name
            </label>
            <input
              required  
              type="text"
              id="firstName"
              name="firstName"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your first name"
            />
            <span id="firstName-validation-message" className="text-red-600"></span>
            <label htmlFor="lastName" className="mt-4 mb-2 block text-sm font-medium">
              Last Name
            </label>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your last name"
            />
            <span id="lastName-validation-message" className="text-red-600"></span>
            <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium">
              City
            </label>
            <input
              required
              type="text"
              id="city"
              name="city"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your city"
            />
            <span id="city-validation-message" className="text-red-600"></span>
            <label htmlFor="addressLine1" className="mt-4 mb-2 block text-sm font-medium">
              Address Line 1
            </label>
            <input
              required
              type="text"
              id="addressLine1"
              name="addressLine1"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your address line 1"
            />
            <span id="addressLine1-validation-message" className="text-red-600"></span>
            <label htmlFor="zipCode" className="mt-4 mb-2 block text-sm font-medium ">
              Zip Code
            </label>
            <input
              required
              type="text"
              id="zipCode"
              name="zipCode"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your zip code"
            />
            <span id="zipCode-validation-message" className="text-red-600"></span>
          </div>
          <div className="mt-6 border-t border-b py-2 sniglet-extrabold flex flex-col gap-4">
            <div className="flex items-center justify-between text-neutral-700">
              <p className="text-sm font-medium t">Subtotal</p>
              <p className="font-semibold ">{totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between sniglet-extrabold text-neutral-700">
              <p className="text-sm font-medium">Shipping</p>
              <p className="font-semibold">FREE</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-neutral-700">
            <p className="text-2xl font-medium sniglet-extrabold">Total</p>
            <p className="text-2xl font-semibold sniglet-extrabold">{totalAmount.toFixed(2)} $</p>
          </div>
          {errorMessage && (
            <div className="mt-4 mb-4 text-red-600 text-sm">{errorMessage}</div>
          )}
          <button onClick={handlePlaceOrder} className="mt-4 mb-8 w-full rounded-md bg-neutral-700 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
      </div>
    </div>
  );
}