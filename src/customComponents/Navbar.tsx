"use client";
import { User } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShoppingCart, Soup } from "lucide-react";
import useFoodStore from "@/store/useStore";

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const { clearCartOnLogout, cartItems } = useFoodStore();

  return (
    // <>
    //   <div className="h-20"></div>
    //   <nav className="fixed top-0 left-0 z-50 right-0 bg-background shadow-md dark:shadow-[0_2px_4px_hsl(0,0%,14.9%)]">
    //     <div className="container p-4 mx-auto flex md:flex-row justify-between items-center">
    //       <div className="pl-5">
    //         <Link href="/home-page">
    //           <span className="text-red-600 text-4xl text-center font-bold">
    //             FeastFlow
    //           </span>
    //         </Link>
    //       </div>

    //       {/* <div className="flex gap-6 items-center justify-center font-bold text-3xl">
    //         <Link href="#">
    //           <span className="text-2xl text-center font-bold">Menu</span>
    //         </Link>
    //         <Link href="#">
    //           <span className="text-2xl text-center font-bold">Contact Us</span>
    //         </Link>
    //       </div> */}

    //       <div className="flex gap-8 items-center">
    //         <ThemeToggle />

    //         <Link href="/my-cart">
    //           <ShoppingCart
    //             className={`${
    //               Object.keys(cartItems).length > 0 ? "animate-pulse" : null
    //             } outline-none  cursor-pointer`}
    //           />
    //         </Link>

    //         {session ? (
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Avatar>
    //                 <AvatarImage src="https://github.com/shadcn.png" />
    //                 <AvatarFallback>NA</AvatarFallback>
    //               </Avatar>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className="w-56">
    //               <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //               <DropdownMenuSeparator />
    //               <DropdownMenuGroup>
    //                 <DropdownMenuItem>
    //                   <Link href="/my-orders">My Orders</Link>
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem>
    //                   <span onClick={() => signOut()}>Logout</span>
    //                 </DropdownMenuItem>
    //               </DropdownMenuGroup>
    //             </DropdownMenuContent>
    //           </DropdownMenu>
    //         ) : (
    //           <Link href="/sign-in">
    //             <Button
    //               className="w-full md:w-auto bg-slate-100 text-black"
    //               variant={"outline"}
    //             >
    //               Login
    //             </Button>
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </nav>
    // </>

    <>
      {/* This spacer can be removed since we'll use sticky */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container p-4 mx-auto flex md:flex-row justify-between items-center">
          <div className="flex justify-center items-center">
            <Link href="/">
              <span className="text-red-600 text-4xl text-center font-bold">
                FeastFlow <Soup size={40} className="inline-block pb-2"/>
              </span>
            </Link>
          </div>

          <div className="flex gap-8 items-center">
            <ThemeToggle  />

            {/* {Object.keys(cartItems).length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ShoppingCart
                    className={`${
                      Object.keys(cartItems).length > 0 ? "animate-pulse" : ""
                    } outline-none cursor-pointer`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup className="flex">
                    <DropdownMenuItem>
                      <Link href="/my-cart">Go to cart</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button onClick={() => clearCart()}>Clear Cart</Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/my-cart">
                <ShoppingCart
                  className={`${
                    Object.keys(cartItems).length > 0 ? "animate-pulse" : ""
                  } outline-none cursor-pointer`}
                />
              </Link>
            )} */}

            <Link href="/my-cart">
              <ShoppingCart
                className={`${
                  Object.keys(cartItems).length > 0 ? "animate-pulse text-red-500" : ""
                } outline-none cursor-pointer`}
                // fill={`${Object.keys(cartItems).length > 0 ? "red" : null}`}
              />
            </Link>

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                      <Link href="/my-orders">
                    <DropdownMenuItem>
                      My Orders
                    </DropdownMenuItem>
                      </Link>
                    <DropdownMenuItem onClick={() => { clearCartOnLogout(); signOut()}}>
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black"
                  variant={"outline"}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
