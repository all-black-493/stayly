"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { BedDouble, CalendarDays, CreditCard, Home, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { StaylyLogo } from "./logo";
import { OrganizationSwitcher } from "@clerk/nextjs";

interface MenuItem {
    title: string;
    url?: string;
    icon: LucideIcon;
    onClick?: () => void
}

interface NavSectionProps {
    label?: string
    items: MenuItem[]
    pathname: string
}

function NavSection({ label, items, pathname }: NavSectionProps) {
    return (
        <SidebarGroup>
            {label && (
                <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
                    {label}
                </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = item.url
                            ? item.url === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.url)
                            : false;

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    onClick={item.onClick}
                                    tooltip={item.title}
                                    className="h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_2px_gray]"
                                    render={
                                        item.url ? (
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        ) : (
                                            <>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </>
                                        )
                                    }
                                />
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const params = useParams();
    const orgId = params.orgId as string;
    // const clerk = useClerk()
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    if (!orgId) {
        return (
            <Sidebar collapsible="icon" variant="floating">
                <SidebarHeader className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center px-3">
                        <Skeleton className="h-8 w-32" />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Skeleton className="mx-3 mt-6 h-80 rounded-xl" />
                </SidebarContent>
            </Sidebar>
        );
    }

    const mainMenuItems: MenuItem[] = [
        {
            title: "Dashboard",
            url: `/${orgId}/dashboard`,
            icon: Home
        },
        {
            title: "Bookings",
            url: `/${orgId}/bookings`,
            icon: CalendarDays
        },
        {
            title: "Rooms",
            url: `/${orgId}/rooms`,
            icon: BedDouble,
        },
        {
            title: "Guests",
            url: `/${orgId}/guests`,
            icon: Users
        },
        {
            title: "Finances",
            url: `/${orgId}/finances`,
            icon: CreditCard
        }
    ]

    // const othersMenuItems: MenuItem[] = [
    //     {
    //         title: "Settings",
    //         icon: SettingsIcon,
    //         onClick: () => clerk.openOrganizationProfile()
    //     },
    //     {
    //         title: "Help and Support",
    //         icon: Headphones,
    //         url: "mailto:nyangijeremy@gmail.com"
    //     }
    // ]

    return (
        <Sidebar collapsible="icon" variant="floating" >
            <SidebarHeader className="flex flex-col gap-4 pt-4">
                <div className="flex items-center px-3 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                    <Link
                        href="/"
                        className="flex items-center transition-opacity hover:opacity-80"
                    >
                        <StaylyLogo isCollapsed={isCollapsed} />
                    </Link>

                    {!isCollapsed && (
                        <SidebarTrigger className="ml-auto lg:hidden" />
                    )}
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <OrganizationSwitcher
                            hidePersonal
                            afterSelectOrganizationUrl={(org: any) => `/${org.id}/dashboard`}
                            fallback={
                                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-card" />
                            }
                            appearance={{
                                elements: {
                                    rootBox: "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                                    organizationSwitcherTrigger: "w-full! justify-between! border! border-border! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1!",
                                    organizationPreview: "gap-2!",
                                    organizationPreviewAvatarBox: "size-6! rounded-sm!",
                                    organizationPreviewTextContainer: "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                                    organizationPreviewMainIdentifier: "text-[13px]!",
                                    organizationSwitcherTriggerIcon: "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!"
                                }
                            }}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <div className="border-b border-dashed border-border" />
            <SidebarContent>
                <NavSection items={mainMenuItems} pathname={pathname} />
            </SidebarContent>
            <div className="border-b border-dashed border-border" />
            <SidebarFooter className="gap-3 py-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton
                            showName
                            fallback={
                                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-card" />
                            }
                            appearance={{
                                elements: {
                                    rootBox: "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                                    userButtonTrigger: "w-full! justify-between! border! border-border! rounded-md! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                                    userButtonBox: "flex-row-reverse! gap-2!",
                                    userButtonOuterIdentifier: "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                                    userButtonAvatarBox: "size-6!"
                                }
                            }}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}