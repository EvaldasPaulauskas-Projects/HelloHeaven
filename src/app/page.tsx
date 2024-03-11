'use client'
import Link from "next/link";
import ProductCards from "./components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import backgroundHomeImage from "../../public/imgs/backgroundImageHome.webp";


export default function Home() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/api/mongo");
          const data = await response.json();

          setProducts(data.allData.slice(-4));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
  }, []);

  return (
    <div>
      {/* Load from server */}
      <div className="relative w-full h-[28rem] my-28 flex items-center justify-center cursor-default">
        <Image
        src={backgroundHomeImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-red-500 drop-shadow-[0_8px_4px_rgba(0,0,0,1)] sniglet-extrabold uppercase text-6xl max-w-[36rem] text-center">one stop shop for all your hello kitty needs!</h1>
        </div>
      </div>
 

      <div className="w-full text-center sniglet-regular -my-4">

        <h1 className="text-4xl flex items-center justify-center gap-8 font-black">
          <div className="w-52 h-1 bg-[#ffcedd]"></div>
          Latest Products
          <div className="w-52 h-1 bg-[#ffcedd]"></div>
        </h1>

        <div className="w-full h-[36rem] flex justify-center my-8">
          <ul className="w-[86rem] h-[34rem] flex flex-wrap flex-row gap-8 justify-center items-centerr">
          {products.map((product,index) => (
          <ProductCards key={index} product={product} />
          ))}
          
          <li>
            <Link
            className="p-3 px-16 md:px-36 sniglet-regular text-[#f57ca0] border-[#f57ca0] border border-x-1 hover:text-xl transition-all duration-300 hover:bg-[#f57ca0] hover:text-white hover:border-0 hover:border-opacity-0 capitalize bg-transparent shadow-lg shadow-[#ffcedd]"
            href="/shop-all">
              View All
            </Link>
          </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
