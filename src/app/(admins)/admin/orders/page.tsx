"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

type OrderStatus = "Processing" | "Out for Delivery" | "Delivered";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Address {
  name: string;
  city: string;
  pincode: string;
  state: string;
  phone: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  address: Address;
  amount: number;
  status: OrderStatus;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/admin");
      console.log("this is running the fetch all orders");
      if (response.data.success) {
        setOrders(response.data.ordersData);
      }
    } catch (error) {
      console.error("Error fetching all orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, value: OrderStatus) => {
    try {
      const response = await axios.post("/api/admin", {
        orderId,
        status: value,
      });

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: value } : order
          )
        );
      }
    } catch (error) {
      console.log("Error updating order status", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading">Loading...</span>
      </div>
    );
  }

  return (
    <div className="h-[85vh] flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10 border-none">
            <TableRow className="border-none rounded-md">
              <TableHead className="w-[5%] text-center">Order</TableHead>
              <TableHead className="w-[40%]">Items</TableHead>
              <TableHead className="w-[15%] text-center">Quantity</TableHead>
              <TableHead className="w-[15%] text-center">Amount</TableHead>
              <TableHead className="w-[15%] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No orders available</p>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="w-[5%] text-center">
                    <ShoppingCart 
                      className={
                        order.status === "Processing"
                          ? "text-red-500 mx-auto"
                          : order.status === "Delivered"
                          ? "text-green-500 mx-auto"
                          : "text-yellow-500 mx-auto"
                      } 
                      size={30} 
                    />
                  </TableCell>
                  <TableCell className="w-[40%]">
                    <div>
                      <p className="text-md font-medium">
                        {order.items.map((item, index) => 
                          `${item.name}x${item.quantity}${index < order.items.length - 1 ? ', ' : ''}`
                        )}
                      </p>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <p>{order.address.name}</p>
                        <p>{`${order.address.city}, ${order.address.pincode}, ${order.address.state}`}</p>
                        <p>{order.address.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[15%] text-center">{order.items.length} Items</TableCell>
                  <TableCell className="w-[15%] text-center">${order.amount}</TableCell>
                  <TableCell className="w-[15%] text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full" variant="default" size="sm">
                          {order.status || "Set Status"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup
                          value={order.status}
                          onValueChange={(value) =>
                            updateOrderStatus(order._id, value as OrderStatus)
                          }
                        >
                          <DropdownMenuRadioItem value="Processing">
                            Processing
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Out for Delivery">
                            Out for Delivery
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Delivered">
                            Delivered
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
