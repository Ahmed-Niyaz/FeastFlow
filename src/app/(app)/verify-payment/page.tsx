"use client";
import { useToast } from "@/hooks/use-toast";
import useFoodStore from "@/store/useStore";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPaymentPage() {
  const { clearCart } = useFoodStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const successParam = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const isSuccess = successParam === "true";

    const verifyPayment = async () => {
      if (isSuccess && orderId) {
        try {
          const response = await axios.post("api/verify-payment", { orderId });

          if (response.data.success) {
            clearCart();
            router.replace("/my-orders");
          } else {
            // If verification fails but we want to keep the order context
            toast({
              title: "Payment Verification Failed",
              description: "Please try placing the order again.",
              variant: "destructive",
            });
            router.replace("/place-order");
          }
        } catch (error) {
          toast({
            title: "Error Processing Payment",
            description: "Please try again.",
            variant: "destructive",
          });
          router.replace("/place-order");
        }
      } else {
        toast({
          title: "Payment cancelled",
          description: "Please re-order",
          variant: "destructive",
        });
        router.replace("/place-order");
      }
    };

    verifyPayment();
  }, [searchParams, router, toast, clearCart]);

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <span className="loading"></span>
    </div>
  );
}
