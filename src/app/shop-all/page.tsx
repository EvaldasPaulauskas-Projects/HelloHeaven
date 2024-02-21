'use client'
import { useEffect, useState } from "react";
import ProductCards from "../components/ProductCard/ProductCard";
import Loader from "../components/Loader/Loader";
import NotFound from "../components/NotFound/NotFound";
import Image from "next/image";

import essiantialIcon from "../../../public/imgs/cia-book-icon.png"
import fashionIcon from "../../../public/imgs/hello-kitty-fashion.png"
import plushiesIcon from "../../../public/imgs/cinnamon roll-plushie.png"

export default function ShopAll() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 150]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/mongo");
        const data = await response.json();
        setProducts(data.allData);
        setFilteredProducts(data.allData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      filterProducts();
    }
  }, [priceFilter, categoryFilter]);

  const filterProducts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
  
    try {
      let filtered = [...products];
  
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      // Check if priceFilter[0] is greater than 0 before applying price filter
      if (priceFilter[0] > 0) {
        filtered = filtered.filter(
          (product) => product.finalPrice >= 10 && product.finalPrice <= priceFilter[0]
        );
      }
  
      if (categoryFilter.length > 0) {
        filtered = filtered.filter((product) => categoryFilter.includes(product.category));
      }
  
      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error filtering data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full my-24 sniglet-regular">

      <div className="my-8 ml-12 w-80 ">
        <h1 className="w-full h-20 text-2xl font-bold py-4 uppercase">Shop All</h1>
        <h1 className="border-b-2 border-[#b5b0b1] sniglet-extrabold font-black uppercase pb-2">Filter By:</h1>
        <label className={`sniglet-regular ${loading ? "pointer-events-none " : "pointer-events-auto"}`}>
          <h1 className=" text-sm border-b-2 border-[#b5b0b1] font-extrabold uppercase my-5 pb-2">Price </h1>
          <div>
          <h1 className="text-center font-extrabold text-lg">{priceFilter[0]} $</h1>
            <span className="p-2 font-bold">0 $</span>
            <input
            disabled={loading ? true : false}
            type="range"
            min="0"
            max="150"
            step="1"
            value={priceFilter[0]}
            onChange={(e) => setPriceFilter([parseInt(e.target.value), priceFilter[1]])}
            className="w-56 ml-1 h-3 cursor-pointer"
            />
            <span className="p-2 font-bold">{priceFilter[1]} $</span>
          </div>
        </label>

        <label className={` ${loading ? "pointer-events-none" : "pointer-events-auto"}`}>
          <h1 className=" text-sm border-b-2 border-[#b5b0b1] font-extrabold uppercase my-10 pb-2">Product Type </h1>
          <div className="flex flex-col gap-16">
            <label className="flex items-center gap-6 -my-6 border-b pb-2 border-[#dcdbdb] cursor-pointer">
              <input
                type="checkbox"
                value="essentials"
                checked={categoryFilter.includes("essentials")}
                onChange={() => setCategoryFilter((prevFilters) => {
                  if (prevFilters.includes("essentials")) {
                    return prevFilters.filter((filter) => filter !== "essentials");
                  } else {
                    return [...prevFilters, "essentials"];
                  }
                })}
                className="h-5 w-5 accent-pink-500 cursor-pointer"
              />
              <h1>Essentials</h1>
              <Image alt="/essentials" className="ml-auto" src={essiantialIcon} height={35} width={65} />
            </label>
            <label className="flex items-center gap-6 -my-6 border-b pb-2 border-[#dcdbdb] cursor-pointer">
              <input
                type="checkbox"
                value="fashion"
                checked={categoryFilter.includes("fashion")}
                onChange={() => setCategoryFilter((prevFilters) => {
                  if (prevFilters.includes("fashion")) {
                    return prevFilters.filter((filter) => filter !== "fashion");
                  } else {
                    return [...prevFilters, "fashion"];
                  }
                })}
                className="h-5 w-5 accent-pink-500 cursor-pointer"/>
              <h1>Fashion</h1>
              <Image alt="/fashion" className="ml-auto" src={fashionIcon} height={35} width={75} />
            </label>
            <label className="flex items-center gap-6 -my-6 border-b pb-2 border-[#dcdbdb] cursor-pointer">
              <input
                type="checkbox"
                value="plushies"
                checked={categoryFilter.includes("plushies")}
                onChange={() => setCategoryFilter((prevFilters) => {
                  if (prevFilters.includes("plushies")) {
                    return prevFilters.filter((filter) => filter !== "plushies");
                  } else {
                    return [...prevFilters, "plushies"];
                  }
                })}
                className="h-5 w-5 accent-pink-500 cursor-pointer"
              />
              <h1>Plushies</h1>
              <Image alt="/plushies" className="ml-auto" src={plushiesIcon} height={35} width={75} />
            </label>
          </div>
        </label>
      </div>
      {loading ? (
        <div className="-my-[38rem] ml-36 pb-96">
          <Loader />
        </div>
      ) : (
        <div className="w-[68rem] ml-auto -my-[28rem] flex flex-row flex-wrap gap-6 pb-96">
          {filteredProducts.length === 0 ? (
            <NotFound />
          ) : (
            filteredProducts.map((product,index) => (
              <ProductCards key={index} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}