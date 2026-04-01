"use client";

import Link from "next/link";
import { StaylyLogo } from "@/features/dashboard/components/logo";
import { Button } from "@/components/ui/button";
import { Show, UserButton, useUser } from "@clerk/nextjs";

export function LandingNavbar() {
    const { user } = useUser()
    const isGuest = user?.publicMetadata?.role === "GUEST";

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2">
                <StaylyLogo isCollapsed={false} />
            </Link>

            <div className="flex items-center gap-4">

                {!isGuest && (
                    <Button
                        nativeButton={false}
                        variant="outline"
                        className="h-11 px-8 text-[14px] font-semibold"
                        render={
                            <Link href="/org-selection">
                                List your guesthouse
                            </Link>
                        }
                    />
                )}

                <Show when="signed-out">
                    <Button
                        variant="ghost"
                        render={<Link href="/sign-in" />}
                        nativeButton={false}
                    >
                        Sign In
                    </Button>

                    <Button
                        render={<Link href="/sign-up" />}
                        nativeButton={false}
                    >
                        Get Started
                    </Button>
                </Show>

                <Show when="signed-in">
                    <UserButton afterSignOutUrl="/" />
                </Show>
            </div>
        </nav>
    );
}