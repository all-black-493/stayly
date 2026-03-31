// src/app/(onboarding)/layout.tsx
import { StaylyLogo } from "@/features/dashboard/components/logo";
import Link from "next/link";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-muted/10">
            <header className="flex h-16 shrink-0 items-center border-b border-border/40 bg-background/50 px-6 backdrop-blur-md">
                <Link href="/" className="opacity-80 transition-opacity hover:opacity-100">
                    <StaylyLogo isCollapsed={false} />
                </Link>
            </header>

            <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
                {children}
            </main>
        </div>
    );
}