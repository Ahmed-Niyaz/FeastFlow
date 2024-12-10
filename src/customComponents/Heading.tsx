"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import headerImage from "./clear-back.png"

export default function Heading() {
  return (
    <div className="flex flex-col justify-center relative px-[10%] pb-[5%] pt-[5%]">
      <AspectRatio ratio={16 / 9} className="rounded-lg dark:shadow-[0px_10px_20px_rgba(0,0,0,0.5)]">
        <Image
          src="https://images.unsplash.com/photo-1631515242808-497c3fbd3972?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full rounded-lg object-cover brightness-30"
          priority
        />
        <div className="absolute flex flex-col justify-center items-start gap-[2vw] left-[6vw] bottom-[10%] max-w-[80%] text-left">
          <h2 className="text-6xl font-bold mb-4">Grab a bite!</h2>
          {/* <p className="max-w-2xl text-2xl">
            Choose from a diverse menu crafted with the finest ingredients and
            culinary expertise to satisfy your cravings and elevate your dining
            experience.
          </p> */}
          <Button>
            <Link href="#menu">View Menu</Link>
          </Button>
        </div>
      </AspectRatio>
    </div>
  );
}
