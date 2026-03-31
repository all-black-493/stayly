import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, BedDouble, CalendarCheck } from "lucide-react";
import Link from "next/link";

interface DashboardHeroProps {
    orgName?: string;
    orgId: string;
}

export function DashboardHero({ orgName, orgId }: DashboardHeroProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-md shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <LayoutDashboard className="size-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Management Dashboard</span>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground capitalize">
                            {orgName || "Welcome Back"}
                        </h1>
                        <p className="text-muted-foreground max-w-sm text-[13px] leading-relaxed">
                            Monitor your bookings and room availability for your Stayly properties.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <BedDouble className="size-4 text-muted-foreground/70" />
                            <span className="text-[13px] font-medium">12 Rooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarCheck className="size-4 text-muted-foreground/70" />
                            <span className="text-[13px] font-medium">4 Check-ins today</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        size="xs"
                        variant="outline"
                        className="h-10 px-4 border-border/40 bg-background/50 hover:bg-background text-[13px] font-medium"
                        render={
                            <Link href={`/${orgId}/rooms`}>
                                View Inventory
                            </Link>
                        }
                        nativeButton={false}
                    />
                    <Button
                        size="xs"
                        className="h-10 px-4 shadow-md text-[13px] font-medium"
                        render={
                            <Link href={`/${orgId}/bookings/new`}>
                                <Plus className="mr-2 size-4" />
                                Add Booking
                            </Link>
                        }
                        nativeButton={false}

                    />
                </div>
            </div>

            {/* Subtle Gradient Accent */}
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        </div>
    );
}