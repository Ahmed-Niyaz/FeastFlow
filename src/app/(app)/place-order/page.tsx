"use client";
import useFoodStore from "@/store/useStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { deliveryInfoSchema } from "@/zod-schemas/deliveryInfoSchema";
import axios from "axios";
import { IFoodItem } from "@/model/foodModel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PlaceOrder() {
  const { fetchCartFromDatabase, cartItems, foodList, getTotalCartAmount } =
    useFoodStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchCartFromDatabase();
    }
  }, [status, fetchCartFromDatabase]);

  const form = useForm<z.infer<typeof deliveryInfoSchema>>({
    resolver: zodResolver(deliveryInfoSchema),
    defaultValues: {
      name: "John Doe",
      email: "johndoe@email.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      phone: "987654312",
      pincode: "502200",
    },
  });

  const onSubmit = async (data: z.infer<typeof deliveryInfoSchema>) => {
    setIsSubmitting(true);

    try {
      const orderItems = foodList
        .filter((item) => cartItems[item._id as string] > 0) // Filter items in the cart
        .map((item) => ({
          _id: item._id?.toString(), // Ensure _id is string
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          quantity: cartItems[item._id as string], // Add quantity from cart
        }));

      if (orderItems.length < 1) {
        toast({
          title: "No items to place order",
          description: "Add items to place order",
          variant: "destructive",
        });
        return;
      }
      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 5, // 5 is delivery charge
      };

      const response = await axios.post("/api/place-order", orderData);

      if (response.data.success && response.data.session_url) {
        window.location.href = response.data.session_url;
      }
    } catch (error) {
      console.error("Error placing order", error);
      toast({
        title: "Error placing order",
        description: "Please re-order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (Object.keys(cartItems).length < 1) {
    return (
      <div className="px-[10%] py-[5%] select-none h-[90vh] flex flex-col justify-center items-center gap-[10vh]">
        <span className="text-2xl">No items in cart to checkout.</span>
        <Link href="/home-page">
          <Button>Add Items</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex px-[10%] py-[5%] h-[90vh] justify-between items-center">
      <div className="w-full max-w-xl border border-gray-300 shadow-lg p-6 rounded-md">
        <p className="mb-4 text-red-500 animate-pulse">Dummy detail is added to checkout</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Name and Email in separate rows */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-lg">Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-lg">Email</FormLabel>
                    <Input {...field} type="email" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City and State in same row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-2 text-lg">City</FormLabel>
                      <Input {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-2 text-lg">State</FormLabel>
                      <Input {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Remaining fields in separate rows */}
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-2 text-lg">Pincode</FormLabel>
                      <Input {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-2 text-lg">Country</FormLabel>
                      <Input {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pl-2 text-lg">Phone</FormLabel>
                    <Input {...field} type="text" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Proceed to pay"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="flex items-center justify-center w-[30vw] border border-gray-300 shadow-lg p-6 rounded-md">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cart Total</TableHead>
              <TableHead className="text-right" colSpan={5}>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="">Subtotal</TableCell>
              <TableCell className="text-right" colSpan={5}>
                $ {getTotalCartAmount()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">Delivery Fee</TableCell>
              <TableCell className="text-right" colSpan={5}>
                $ 5
              </TableCell>
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
      </div>
    </div>
  );
}
