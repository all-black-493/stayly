import Link from "next/link";
import { StaylyLogo } from "@/features/dashboard/components/logo"; 

export function DashboardFooter() {
    return (
        <footer className="w-full border-t border-border/40 bg-transparent px-6 py-12 lg:px-12">
            <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:justify-between gap-12">
            
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-16 xl:gap-24 items-start">
                    
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                            <StaylyLogo isCollapsed={false} />
                        </Link>
                    </div>

                    {/* Product Section */}
                    <div className="flex flex-col">
                        <p className="text-[13px] font-semibold text-foreground">Product</p>
                        <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
                            <li><Link href="/" className="hover:text-primary transition">Support</Link></li>
                            <li><Link href="/" className="hover:text-primary transition">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="flex flex-col">
                        <p className="text-[13px] font-semibold text-foreground">Resources</p>
                        <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition">Company</Link></li>
                            <li><Link href="/" className="hover:text-primary transition">Blogs</Link></li>
                            <li>
                                <Link href="/" className="hover:text-primary transition flex items-center gap-2">
                                    Careers
                                    <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                                        HIRING
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="flex flex-col">
                        <p className="text-[13px] font-semibold text-foreground">Legal</p>
                        <ul className="mt-4 space-y-2 text-[13px] text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition">Privacy</Link></li>
                            <li><Link href="/" className="hover:text-primary transition">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Slogan & Socials (Remains the same but ensures alignment) */}
                <div className="flex flex-col items-start lg:items-end lg:text-right gap-4">
                    <p className="max-w-[240px] text-[13px] leading-relaxed text-muted-foreground">
                        Making every guest feel valued—no matter the size of your guesthouse.
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                        {/* Social SVGs... */}
                    </div>
                    <p className="text-[12px] text-muted-foreground/60">
                        © {new Date().getFullYear()} Stayly
                    </p>
                </div>
            </div>
        </footer>
    );
}