import Link from "next/link";

const ProductCards = ({ product }) => {
  const isOutOfStock = product.quantity == 0;

  return (
    <Link className={`${isOutOfStock ? "pointer-events-none" : " pointer-events-auto"}`} href={`/shop-all/product/${product._id}`} >
    <div className="group w-80 relative rounded-md p-4 bg-transparent transition-transform duration-300 ease-in-out cursor-pointer sniglet-extrabold">
      <img
        className={`${isOutOfStock  ? "grayscale" : "grayscale-0"} w-64 h-64 rounded-[2rem] object-cover mb-4 mx-auto group-hover:scale-110 transition-transform relative z-10`}
        src={product.images[0]}
        alt="Product"
      />
      {isOutOfStock ? "" : product.onSale && (
        <div className="absolute top-0 right-0 mr-12 my-8 bg-[#ff6b86] w-12 h-12 p-1 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10">
          <span className="text-white text-sm font-bold group-hover:scale-110 transition-transform">-{product.salePercentage}%</span>
        </div>
      )}
      <h1 className="text-[#fb90b0] text-lg mb-2 py-4 whitespace-normal text-center group-hover:text-xl font-bold transition-all">
        {product.productName}
      </h1>
      <h1 className={`text-lg text-center ${isOutOfStock ? "text-[#ff5656]" :"text-[#7a666c]"} text-[#7a666c] font-bold group-hover:text-xl transition-all`}>
        {isOutOfStock ? "OUT OF STOCK" : product.onSale ? (
          <>
            <span>{product.finalPrice} $</span>
            {' '}
            <span className="text-[#ff6b86] line-through relative top-[-0.5rem]">{product.finalPrice} $</span>
          </>
        ) : (`${product.price} $`)}
      </h1>
    </div>
    </Link>
  );
};

export default ProductCards;