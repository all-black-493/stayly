import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardFooter } from "@/features/dashboard/components/dashboard-footer";
import { UserButton } from "@clerk/nextjs";
import { cookies } from "next/headers";
import React from 'react'

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
            <DashboardSidebar />
            <main className="w-full m-2">
                <div className="flex items-center gap-2 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4">
                    {/* <SearchBar /> */}
                    <div className="ml-auto"></div>
                    <UserButton />
                </div>

                <div className="h-4"></div>

                {/* Changed 100ch to 100dvh for proper height calculation */}
                <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100dvh-6rem)] p-4 flex flex-col">
                    {/* This flex-1 div pushes the footer to the bottom if content is short */}
                    <div className="flex-1">
                        {children}
                    </div>

                    <div className="mt-8 border-t border-border pt-4">
                        <DashboardFooter />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}