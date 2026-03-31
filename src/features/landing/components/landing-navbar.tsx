import Link from "next/link";
import { StaylyLogo } from "@/features/dashboard/components/logo";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2">
                <StaylyLogo isCollapsed={false} />
            </Link>
            <div className="flex items-center gap-4">
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
                <Button variant="ghost" render={<Link href="/sign-in" />} nativeButton={false}>
                    Sign In
                </Button>
                <Button render={<Link href="/sign-up" />} nativeButton={false}>
                    Get Started
                </Button>
            </div>
        </nav>
    );
}