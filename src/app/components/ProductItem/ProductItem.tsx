import { useEffect } from "react";


const ProductItem = ({ product, onRemove, onQuantityChange }) => {
  const totalAmount = product.price * product.quantity;
  
  const handleQuantityChange = (newQuantity) => {
    // Ensure the new quantity is within the limits [0, 10]
    const clampedQuantity = Math.min(Math.max(newQuantity, 1), product.maxQuantity);
    onQuantityChange(product.productId, clampedQuantity);
  };

  useEffect(() => {
    // Call handleQuantityChange to update clampedQuantity after each render
    handleQuantityChange(product.quantity);
  }, [product.quantity, product.maxQuantity, onQuantityChange, product.productId]);

  return (
    <li className="border-b border-[#7a666c42] relative py-6">
      <div className="flex">
        <img className="bg-black w-24 h-24 object-cover" src={product.images} alt="Product Image" />
        <h1 className="sniglet-regular ml-5 my-2 w-40 text-base whitespace-no-wrap truncate">{product.productName}</h1>

        <div className="absolute flex gap-2 ml-28 my-20 sniglet-regular">
          <button className="bg-neutral-700 w-6 h-6 text-white text-1xl" onClick={() => handleQuantityChange(product.quantity - 1)}>-</button>
          <h1 className="">Quantity : {product.quantity} x</h1>
          <button className="bg-neutral-700 w-6 h-6 text-white text-1xl" onClick={() => handleQuantityChange(product.quantity + 1)}>+</button>
        </div>

        <h1 className="sniglet-regular font-bold ml-auto mt-auto w-28 text-center -my-4 text-2xl text-scale-80">{totalAmount.toFixed(2)} $</h1>
        <button className="sniglet-regular absolute top-0 right-0 p-1 pt-7 border-b-2 border-[#ff6b86]" onClick={() => onRemove(product.productId)}>Remove</button>
      </div>
    </li>
  );
};

export default ProductItem;