"use client";

import { Coffee, MapPin, ReceiptText, Settings } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const items = [
  { key: "menu", href: "/", icon: Coffee },
  { key: "map", href: "/map", icon: MapPin },
  { key: "myOrders", href: "/orders/12345", icon: ReceiptText },
  { key: "settings", href: "#", icon: Settings },
];

export function AppSidebar() {
  const tApp = useTranslations('app');           // ✅ for app title & subtitle
  const tNav = useTranslations('navigation');    // ✅ for navigation items

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Coffee className="h-5 w-5" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="text-base font-bold">{tApp('title')}</div>
            <div className="text-xs text-muted-foreground">{tApp('subtitle')}</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{tNav('navigation')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{tNav(item.key)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}