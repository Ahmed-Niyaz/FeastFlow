"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CircleMinus, CirclePlus, Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { useTheme } from "next-themes";
import useFoodStore from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { foodCategories } from "@/foodData";

const imgUrl =
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const { theme } = useTheme();

  const {
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    isLoading,
    clearCart,
  } = useFoodStore();

  if (isLoading) {
    return (
      <div
        id="menu"
        className="flex flex-col p-[10%] pt-[5%] gap-[13vh] select-none"
      >
        <div className="flex justify-between items-center">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton className="h-[200px] w-[200px] rounded-full" />
            ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-10 gap-y-10">
          {Array(15)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-3"
              >
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="menu"
        className="flex flex-col p-[10%] pt-[5%] gap-[13vh] select-none"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl">Explore our menu</h1>
          <p className="text-xl">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
        </div>
        <Separator className="h-[2px]" />
        <div className="my-[-6vh]">
          <h2 className="text-center text-3xl">Categories</h2>
        </div>
        <div className="flex gap-6 justify-between items-center pt-3">
          {foodCategories.map((item) => {
            return (
              <div
                key={item.category}
                onClick={() =>
                  setCategory((prevItem) => (prevItem === item.category ? "All" : item.category))
                }
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div
                  className={`
                            rounded-full 
                            overflow-hidden 
                            relative
                            w-[150px] 
                            h-[150px]
                            ${
                              category === item.category
                                ? "ring-4 ring-red-500 ring-offset-2"
                                : ""
                            }
                            transition-all 
                            duration-300
                        `}
                >
                  <Image
                    src={item.imageUrl}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`${item} category`}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw"
                  />
                </div>
                <p
                  className={`text-center mt-2 ${
                    category === item.category ? "text-red-500" : ""
                  }`}
                >
                  {item.category}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-10 gap-y-10">
            {foodList.map((item) => {
              if (category === "All" || category === item.category) {
                return (
                  <div
                    key={item._id as string}
                    className="w-full mx-auto rounded-[15px] shadow-[0px_10px_20px_#00000015] dark:shadow-[0px_10px_20px_hsl(0,0%,14.9%)] transition duration-300 animate-fadeIn flex flex-col justify-center items-center gap-y-2"
                  >
                    <div className="image-container rounded-[15px] relative w-full h-[300px]">
                      <Image
                        src={item.imageUrl}
                        fill
                        alt={item.name}
                        style={{ objectFit: "cover" }}
                        className="rounded-t-[15px]"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw"
                      />
                      {!cartItems[item._id as string] ||
                      cartItems[item._id as string] === 0 ? (
                        <CirclePlus
                          size={40}
                          fill="red"
                          className="absolute cursor-pointer bottom-[7%] right-[6%]"
                          onClick={() => addToCart(item._id as string)}
                        />
                      ) : (
                        <div className="absolute flex justify-center items-center bottom-[7%] right-[6%] gap-1 bg-white text-black m-0 p-1 w-[100px] rounded-full ">
                          <CircleMinus
                            size={30}
                            onClick={() => removeFromCart(item._id as string)}
                            className="cursor-pointer text-red-400"
                          />
                          <p className="text-xl w-[35px] text-center cursor-text">
                            {cartItems[item._id as string]}
                          </p>
                          <CirclePlus
                            size={30}
                            onClick={() => addToCart(item._id as string)}
                            className="cursor-pointer text-green-400"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-3 w-full flex flex-col gap-5 min-h-[180px] max-h-[200px]">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2 justify-center items-start">
                          <p className="text-2xl">{item.name}</p>
                          <div className="flex justify-center items-center ">
                            <Star size={13} className="fill-yellow-500" />
                            <Star size={13} className="fill-yellow-500" />
                            <Star size={13} className="fill-yellow-500" />
                            <Star size={13} className="fill-yellow-500" />
                            <Star size={15} fill="" />
                          </div>
                        </div>
                        <p className="pr-3 text-2xl text-red-500">
                          ${item.price}
                        </p>
                      </div>

                      <p className="text-md">{item.description}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      {Object.keys(cartItems).length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 w-full bg-background/80 backdrop-blur-sm p-4 border-t z-48 transition-opacity duration-300">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              onClick={() => clearCart()}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <span>Clear Cart</span>
              <X className="h-5 w-5" />
            </Button>
            
            <Link href="/my-cart">
              <Button className="flex items-center gap-2">
                <span>Go to Cart</span>
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
