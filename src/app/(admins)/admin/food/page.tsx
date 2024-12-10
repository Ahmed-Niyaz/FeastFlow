"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FooodItemInterface } from "@/model/newFoodModel";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Food() {
  const [foodList, setFoodList] = useState<FooodItemInterface[]>([]);
  const { toast } = useToast();
  const fetchFoods = async () => {
    try {
      const response = await axios.get("/api/list-food");

      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.data.message || "Failed to remove food item",
        });
      }
    } catch (error) {
      console.error("Error fetching food List", error);
    }
  };
  useEffect(() => {
    fetchFoods();
  }, []);

  const removeFood = async (foodId: string) => {
    try {
      const response = await axios.post("/api/remove-single-food", { foodId });

      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error removing food", error);
    }
  };

  
  return (
    <div className="h-[85vh] flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10 border-none rounded-md">
            <TableRow className="rounded-md border-none">
              <TableHead className="w-[20%]">Image</TableHead>
              <TableHead className="w-[20%]">Food</TableHead>
              <TableHead className="w-[20%]">Category</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[20%] text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableBody>
            {foodList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No food items available</p>
                </TableCell>
              </TableRow>
            ) : (
              foodList.map((food) => (
                <TableRow key={food._id as string}>
                  <TableCell className="w-[20%]">
                    <div className="relative w-16 h-16">
                      <Image
                        src={food.imageUrl}
                        alt={`${food.name}-image`}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-[20%]">{food.name}</TableCell>
                  <TableCell className="w-[20%]">{food.category}</TableCell>
                  <TableCell className="w-[20%]">$ {food.price}</TableCell>
                  <TableCell className="w-[20%] text-right">
                    <Button
                      onClick={() => removeFood(food._id as string)}
                      variant="destructive"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
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

