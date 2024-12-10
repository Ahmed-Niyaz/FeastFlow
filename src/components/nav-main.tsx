"use client"

import { CirclePlus, List, Package, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarMenu>

        <SidebarMenuItem>
          <Link href="/admin/orders">
          <SidebarMenuButton>
            <Package/>
            <span>Orders</span>
          </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem>
          <Link href="/admin/food">
          <SidebarMenuButton>
            <List/>
            <span>Foods</span>
          </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        <SidebarMenuItem>
        <Link href="/admin/add-food">
          <SidebarMenuButton>
            <CirclePlus/>
            <span>Add Food</span>
          </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarGroup>
  )
}
