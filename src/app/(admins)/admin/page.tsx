import Image from "next/image";
import Link from "next/link";
import add_food_image from "./add-food.png";
import orders_image from "./orders.png";
import food_image from "./food.png";

export default function AdminsPage() {
  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative group">
          <Link href="/admin/food">
            <Image
              alt="Food Image"
              width={400}
              height={400}
              src={food_image}
              className="rounded-xl bg-muted/50"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl">
              <span className="text-white text-xl font-semibold">Food</span>
            </div>
          </Link>
        </div>

        <div className="relative group">
          <Link href="/admin/orders">
            <Image
              alt="Orders Image"
              width={400}
              height={400}
              src={orders_image}
              className="rounded-xl bg-muted/50"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl">
              <span className="text-white text-xl font-semibold">Orders</span>
            </div>
          </Link>
        </div>

        <div className="col-span-2 flex justify-self-center relative group">
          <Link href="/admin/add-food">
            <Image
              alt="Add Food Image"
              width={400}
              height={400}
              src={add_food_image}
              className="rounded-xl bg-muted/50"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl">
              <span className="text-white text-xl font-semibold">Add Food</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
