"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFoodStore from "@/store/useStore";
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function MyCart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    foodList,
    getTotalCartAmount,
    removeItemCompletely,
  } = useFoodStore();

  return (
    <>
      {Object.keys(cartItems).length > 0 ? (
        <div className="px-[10%] py-[5%] select-none min-h-[90vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]"></TableHead>
                <TableHead className="w-[20%]">Food</TableHead>
                <TableHead className="w-[20%]">Price</TableHead>
                <TableHead className="w-[20%]">Quantity</TableHead>
                <TableHead className="w-[15%]">Remove</TableHead>
                <TableHead className="text-right w-[15%]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodList.map((item) => {
                if (cartItems[item._id as string] > 0) {
                  const { _id: id, name, price, imageUrl } = item;
                  return (
                    <TableRow key={id as string}>
                      <TableCell className="font-medium w-[10%]">
                      <div className="relative w-16 h-16">
                      <Image
                        src={imageUrl}
                        alt={`${name}-image`}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                      </TableCell>
                      <TableCell className="w-[20%]">{name}</TableCell>
                      <TableCell className="w-[20%]">${price}</TableCell>
                      <TableCell className="w-[20%]">
                        <div className="flex items-center gap-2">
                          <ChevronLeft
                            className="cursor-pointer"
                            size={15}
                            onClick={() => removeFromCart(id as string)}
                          />
                          <span>{cartItems[id as string]}</span>
                          <ChevronRight
                            className="cursor-pointer"
                            size={15}
                            onClick={() => addToCart(id as string)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="w-[15%]">
                        <CircleX
                          size={25}
                          className="cursor-pointer text-center text-red-500 ml-4"
                          onClick={() => removeItemCompletely(id as string)}
                        />
                      </TableCell>
                      <TableCell className="text-right w-[15%] text-lg">
                        $ {price * cartItems[id as string]}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
              <TableRow>
                <TableCell className="text-lg" colSpan={5}>
                  Delivery Fee
                </TableCell>
                <TableCell className="text-right text-lg">$ 5</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-lg" colSpan={5}>
                  Total
                </TableCell>
                <TableCell className="text-right text-lg">
                  $ {getTotalCartAmount() + 5}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="pt-[10%] flex justify-end">
            <Link href="/place-order">
              <Button>Proceed to checkout</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-[10%] py-[5%] select-none h-[90vh] flex flex-col justify-center items-center gap-[10vh]">
          <span className="text-2xl">No items in cart</span>
          <Link href="/home-page">
            <Button>Add Items</Button>
          </Link>
        </div>
      )}
    </>
  );
}
