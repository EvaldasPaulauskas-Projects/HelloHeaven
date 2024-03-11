'use client';
import Loader from "@/app/components/Loader/Loader";
import { useEffect, useState } from "react";
import Image from "next/image";
import cartIcon from "../../../../../public/icons/bag-icon.png";
import ProductCards from "@/app/components/ProductCard/ProductCard";

export default function ProductDetails({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [productsLike, setProductsLike] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/mongo");
        const data = await response.json();

        const shuffledData = data.allData.slice();
        for (let i = shuffledData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
        }

        setProductsLike(shuffledData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/mongo/${params.productId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.data) {
            setProduct(data.data);
          } else {
            console.error("Invalid data structure. 'data' property is missing.");
          }
        } else {
          console.error("Error fetching data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, [params.productId]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleAddToCart = () => {
    const existingCartData = sessionStorage.getItem('cartStoredItemsData') || '[]';
    const parsedCartData = JSON.parse(existingCartData);
  
    // Check if the product is already in the cart
    const existingProductIndex = parsedCartData.findIndex(item => item.productId === params.productId);
  
    if (existingProductIndex !== -1) {
      // If the product is in the cart, update the quantity
      parsedCartData[existingProductIndex].quantity += parseInt(quantity);
    } else {
      // If the product is not in the cart, add a new entry
      parsedCartData.push({
        productId: params.productId,
        productName: product.productName,
        quantity: parseInt(quantity),
        maxQuantity: parseInt(product.quantity),
        price: product.finalPrice,
        images: product.images[0],
      });
    }
  
    sessionStorage.setItem('cartStoredItemsData', JSON.stringify(parsedCartData));

    window.location.reload();
  };

  return (
    <div className="w-full my-32">
      {product ? (
        <div className="w-full flex flex-col md:flex-row lg:gap-12">
          <div className="p-4 md:ml-[8rem] lg:ml flex flex-col md:flex-row">
            <ul className="flex flex-row md:flex-col gap-4 mr-7 mb-4 md:mb-0">
              {product.images.map((imageUrl, index) => (
                <li
                  key={index}
                  className="bg-black w-24 h-24 hover:scale-110 cursor-pointer transition-transform duration-300 ease-in-out"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={() => handleImageClick(index)}
                ></li>
              ))}
            </ul>
            <img
              className="bg-black w-full md:w-[36rem] h-[34rem] object-cover mb-4 md:mb-0"
              src={product.images[selectedImageIndex]}
              alt="Product"
            />
          </div>
  
          <div className="w-full md:w-[36rem] p-4 lg:ml-20">
            <h1 className="text-3xl font-black pt-4 sniglet-extrabold text-[#fb90b0]">{product.productName}</h1>
  
            {product.onSale ? (
              <>
                <h1 className=" w-44 p-1 sniglet-extrabold text-2xl px-4 my-4 pl-6 bg-[#ff6b86] text-white rounded-2xl">Save {product.salePercentage} %</h1>
                <div className="flex gap-5">
                  <span className="sniglet-extrabold text-2xl my-5 text-[#7a666c]">{product.finalPrice} $</span>
                  <h1 className="sniglet-extrabold text-2xl my-3 text-[#ff6b86] line-through">{product.price} $</h1>
                </div>
              </>
            ) : (
              <>
                <h1 className="sniglet-extrabold text-2xl my-3 text-[#7a666c]">{product.finalPrice} $</h1>
              </>
            )}
  
            <p className="sniglet-regular my-6 pb-5">{product.description}</p>
  
            <div className="flex items-center my-4 pb-8">
              <label className="sniglet-regular mr-2">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.quantity}
                className="border border-gray-300 p-2 w-16 sniglet-regular"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
  
            <button
              onClick={handleAddToCart}
              className="bg-neutral-700 mt-10 flex gap-4 items-center text-1xl hover:text-1xl text-white uppercase sniglet-extrabold p-3 px-24 hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <Image alt="/" className="h-8 w-8 invert" src={cartIcon} />
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <div className=" ml-0 md:ml-80"> 
          <Loader />
        </div>
      )}

      {
        product ? (
          <div className="w-full my-32 sniglet-regular">
          <h1 className="text-4xl flex items-center justify-center gap-8 font-black">
            <div className="w-52 h-1 bg-[#ffcedd]"></div>
            You May Also Like
            <div className="w-52 h-1 bg-[#ffcedd]"></div>
          </h1>
    
          <ul className="flex flex-wrap flex-row gap-8 justify-center items-centerr my-16">
            {productsLike.map((productLike, index) => (
              <ProductCards key={index} product={productLike} />
            ))}
          </ul>
        </div>
        ) : (
          <div> </div>
        )
      }
    </div>
  );
}