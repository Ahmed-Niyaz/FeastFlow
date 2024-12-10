"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DownloadApp from "@/customComponents/DownloadApp";
import Heading from "@/customComponents/Heading";
import Menu from "@/customComponents/Menu";
import useFoodStore from "@/store/useStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const {
    isLoading,
    fetchCartFromDatabase,
    fetchFoodList,
    initializeCartFromStorage,
  } = useFoodStore();
  const scrollPositionRef = useRef(0);

  const { status } = useSession();

  // Save scroll position before data fetching
  useEffect(() => {
    scrollPositionRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    fetchFoodList();

    // Initialize cart from localStorage for non-authenticated users
    if (status === "unauthenticated") {
      initializeCartFromStorage();
    }
  }, [fetchFoodList, status, initializeCartFromStorage]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCartFromDatabase();
    }
  }, [status, fetchCartFromDatabase]);

  // Restore scroll position after loading
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isLoading]);

  // Add a loading state for session
  if (status === "loading") {
    return (
      <div>
        <div className="flex flex-col space-y-3 h-[90vh] justify-center items-center px-[10%] py-[5%]">
          <Skeleton className="h-[60vh] w-[80vw] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[60vw]" />
            <Skeleton className="h-4 w-[50vw]" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col space-y-3 min-h-screen">
          <Heading />
          <div className="flex flex-col space-y-3 flex-grow justify-center items-center px-[10%] py-[5%]">
            <Skeleton className="h-[60vh] w-[80vw] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Heading />
      <Menu />
      <DownloadApp />
    </>
  );
}
