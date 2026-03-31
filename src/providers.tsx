"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadcn } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { createQueryClient } from "./lib/query-client";
import { QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [queryClient] = useState(() => createQueryClient());

    useEffect(() => {
        setMounted(true);
    }, []);

    const baseTheme = mounted && resolvedTheme === "dark" ? dark : shadcn;

    return (
        <ClerkProvider
            appearance={{
                baseTheme,
            }}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ClerkProvider>
    );
}