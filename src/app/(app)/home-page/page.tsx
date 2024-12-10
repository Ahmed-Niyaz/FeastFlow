"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DownloadApp from "@/customComponents/DownloadApp";
import Heading from "@/customComponents/Heading";
import Menu from "@/customComponents/Menu";
import useFoodStore from "@/store/useStore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export const dynamic = "force-dynamic";

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
  // useEffect(() => {
  //   scrollPositionRef.current = window.scrollY;
  // }, []);

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
  // useEffect(() => {
  //   if (!isLoading) {
  //     window.scrollTo(0, scrollPositionRef.current);
  //   }
  // }, [isLoading]);

  // Add a loading state for session

  return (
    <>
      {/* <Heading /> */}
      <Menu />
      <DownloadApp />
    </>
  );
}
