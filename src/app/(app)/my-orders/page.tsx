"use client";
import axios from "axios";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dot, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const previousOrdersRef = useRef<any[]>([]);

  const areOrdersEqual = (prevOrders: any[], newOrders: any[]) => {
    if (prevOrders.length !== newOrders.length) return false;

    return prevOrders.every((prevOrder, index) => {
      const newOrder = newOrders[index];
      return (
        prevOrder._id === newOrder._id &&
        prevOrder.status === newOrder.status &&
        prevOrder.amount === newOrder.amount &&
        JSON.stringify(prevOrder.items) === JSON.stringify(newOrder.items)
      );
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("api/my-orders");

      if (response.data.success) {
        const newOrders = response.data.orderData;

        // Compare with previous orders stored in ref
        if (!areOrdersEqual(previousOrdersRef.current, newOrders)) {
          previousOrdersRef.current = newOrders;
          setOrders(newOrders);
        }
      }
    } catch (error) {
      console.error(
        "Error fetching orders, this error log is from my-orders page",
        error
      );
    }
  };

  // Memoize total amount calculation
  const totalAmount = useMemo(() => {
    return orders.reduce((acc, order) => acc + order.amount, 0);
  }, [orders]);

  // Memoize the rendered orders
  const renderedOrders = useMemo(() => {
    return orders.map((order) => (
      <TableRow key={order._id}>
        <TableCell className="font-medium w-1/8">
          <Package
            className={
              order.status === "Processing"
                ? "text-red-500"
                : order.status === "Delivered"
                ? "text-green-500"
                : "text-yellow-500"
            }
          />
        </TableCell>
        <TableCell className="w-1/2">
          <p>
            {order.items.map(
              (item: any, index: number) =>
                `${item.name} x ${item.quantity}${
                  index === order.items.length - 1 ? "" : ", "
                }`
            )}
          </p>
        </TableCell>
        <TableCell className="w-1/5">
          <Dot
            className={`inline-block ${
              order.status === "Processing"
                ? "text-red-500"
                : order.status === "Delivered"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          />{" "}
          {order.status}
        </TableCell>
        <TableCell className="w-1/6">{order.items.length}</TableCell>
        <TableCell className="w-1/6 text-right">$ {order.amount}</TableCell>
      </TableRow>
    ));
  }, [orders]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await fetchOrders();
      setIsLoading(false);
    };

    loadInitialData();

    const intervalId = setInterval(fetchOrders, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <span className="loading"></span>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="px-[10%] py-[5%] select-none h-[90vh] flex flex-col justify-center items-center gap-[10vh]">
        <span className="text-2xl">No orders found.</span>
        <Link href="/home-page">
          <Button>Order Items</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-[10%] py-[5%] select-none h-[90vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/8"></TableHead>
              <TableHead><span className="text-center w-1/2">Food</span></TableHead>
              <TableHead className="w-1/5"><span className="pl-8">Status</span></TableHead>
              <TableHead className="w-1/6">Items</TableHead>
              <TableHead className="w-1/6 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderedOrders}</TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="w-1/2 text-md" colSpan={4}>
                Total Amount Spent on Foods
              </TableCell>
              <TableCell className="text-right text-lg w-1/6">
                $ {totalAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
    </div>
  );
}
