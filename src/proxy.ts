import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(["/", "/rooms(.*)", "/sign-in(.*)", "/sign-up(.*)"]);
const isRpcRoute = createRouteMatcher(['/rpc(.*)']);
const isOrgSelectionRoute = createRouteMatcher(["/org-selection(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isOwnerWorkspace = (path: string) => path.match(/^\/org_[a-zA-Z0-9]+\//);

export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId, sessionClaims } = await auth();
    const { pathname } = req.nextUrl;

    if (isRpcRoute(req)) return NextResponse.next();

    if (isAdminRoute(req)) {
        const isPlatformAdmin = userId === "user_3Bce8VObcjJxbp8oHBwKx6DIxSq";
        if (!isPlatformAdmin) return NextResponse.redirect(new URL("/", req.url));
        return NextResponse.next();
    }

    if (userId) {
        const metadata = sessionClaims?.metadata as { idUploaded?: boolean; role?: 'GUEST' | 'OWNER' };
        const hasUploadedId = metadata?.idUploaded === true;
        const userRole = metadata?.role;

        // 1. Intercept Post-Sign-In / Sign-Up
        if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
            if (!hasUploadedId) {
                // Force brand new users straight to onboarding
                return NextResponse.redirect(new URL("/onboarding", req.url));
            }
            if (userRole === 'OWNER') {
                const dest = orgId ? `/${orgId}/dashboard` : "/org-selection";
                return NextResponse.redirect(new URL(dest, req.url));
            }
            return NextResponse.redirect(new URL("/", req.url));
        }

        // 2. Strict Org Selection Protection
        if (isOrgSelectionRoute(req)) {
            if (!hasUploadedId) return NextResponse.redirect(new URL("/onboarding", req.url));
            if (userRole !== 'OWNER') return NextResponse.redirect(new URL("/", req.url)); // Keep Guests out
        }

        // 3. Strict Owner Workspace Protection
        if (isOwnerWorkspace(pathname)) {
            if (!hasUploadedId) return NextResponse.redirect(new URL("/onboarding", req.url));
            
            const urlOrgId = pathname.split('/')[1];
            if (userRole !== 'OWNER' || !orgId || orgId !== urlOrgId) {
                return NextResponse.redirect(new URL("/org-selection", req.url));
            }
        }

        // 4. Force Onboarding for wandering unverified users
        // If they aren't on a public route or onboarding, force them to verify.
        if (!hasUploadedId && !isPublicRoute(req) && !isOnboardingRoute(req)) {
            return NextResponse.redirect(new URL("/onboarding", req.url));
        }
    }

    // Unauthenticated Public Access
    if (!userId && !isPublicRoute(req)) {
        await auth.protect();
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|rpc)(.*)',
    ],
};