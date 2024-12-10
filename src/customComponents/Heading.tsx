"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import food_background_image from "../../public/food_background.webp";
import { Button } from "@/components/ui/button";

export default function Heading() {
  return (
    <div className="flex flex-col justify-center relative px-[10%] pb-[5%] pt-[5%] gap-10">
      <Link href="/home-page" className="group">
        <AspectRatio
          ratio={16 / 9}
          className="relative rounded-lg dark:shadow-[0px_10px_20px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <Image
            src={food_background_image}
            fill
            className="h-full w-full rounded-lg object-cover brightness-[0.7] group-hover:brightness-[0.5] transition-all duration-300"
            priority
            alt="food-background"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 p-10 text-white">
            <div className="max-w-[90%] space-y-7">
              <h2 className="text-6xl font-bold">Explore our menu</h2>
              <p className="text-2xl mb-4">
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise. Our mission is to satisfy your cravings and elevate
                your dining experience, one delicious meal at a time.
              </p>
              <Button size="lg">View Menu</Button>
            </div>
          </div>
        </AspectRatio>
      </Link>
    </div>
  );
}