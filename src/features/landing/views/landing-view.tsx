import { LandingNavbar } from "../components/landing-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingView() {
    return (
        <div className="relative">
            <LandingNavbar />
            <section className="py-24 px-6 lg:py-32 flex flex-col items-center text-center gap-8">
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-serif italic text-foreground">
                        Stayly.
                    </h1>
                    <h2 className="text-3xl lg:text-5xl font-medium tracking-tight">
                        Premium guest house management <br className="hidden lg:block" />
                        <span className="text-primary">simplified for businesses.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Manage bookings, track finances, and welcome guests with a system
                        designed for modern hospitality.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" render={<Link href="/sign-up" />} nativeButton={false}>
                        Start your 14-day free trial
                    </Button>
                    <Button variant="outline" size="lg" render={<Link href="#features" />} nativeButton={false}>
                        See how it works
                    </Button>
                </div>

                <div className="mt-16 w-full max-w-5xl rounded-xl border border-border bg-card aspect-video shadow-2xl overflow-hidden">
                    {/* Placeholder for a dashboard screenshot or video demo */}
                    <div className="w-full h-full bg-linear-to-br from-muted to-card flex items-center justify-center text-muted-foreground">
                        Dashboard Preview
                    </div>
                </div>
            </section>
        </div>
    );
}