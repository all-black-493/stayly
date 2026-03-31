// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
    "/",
    "/rooms(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)"
]);

const isRpcRoute = createRouteMatcher(['/rpc(.*)'])
const isOrgSelectionRoute = createRouteMatcher(["/org-selection(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isOwnerWorkspace = (path: string) => path.match(/^\/org_[a-zA-Z0-9]+\//)


export default clerkMiddleware(async (auth, req) => {
    const { userId, orgId, sessionClaims } = await auth();
    const { pathname } = req.nextUrl;

    if (isRpcRoute(req)) {
        return NextResponse.next()
    }

    if (isAdminRoute(req)) {
        const isPlatformAdmin = userId === "user_3Bce8VObcjJxbp8oHBwKx6DIxSq";

        if (!isPlatformAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    // A. Intercept authenticated users hitting auth pages
    if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
        // If they have an org, send to dashboard. Otherwise, send to landing page.
        const redirectPath = orgId ? `/${orgId}/dashboard` : "/";
        return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    // B. Allow unauthenticated users ONLY on truly public marketing pages
    if (!userId && isPublicRoute(req)) {
        return NextResponse.next();
    }

    // C. Protect everything else
    if (!userId) {
        await auth.protect();
    }

    // D. Owner Route Protection (your existing code)
    if (isOwnerWorkspace(pathname)) {
        const urlOrgId = pathname.split('/')[1];
        if (!orgId || orgId !== urlOrgId) {
            return NextResponse.redirect(new URL("/org-selection", req.url));
        }
        return NextResponse.next(); // Let the owner through
    }

    const hasUploadedId = sessionClaims?.metadata?.idUploaded === true;

    // E. Force org selection for users who have no org yet (except on public/org-selection pages)
    if (userId && !hasUploadedId && !isPublicRoute(req) && !isOrgSelectionRoute(req) && !isOnboardingRoute(req)) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // D. Allow them on the onboarding or org-selection pages
    if (isOrgSelectionRoute(req) || isOnboardingRoute(req)) {
        return NextResponse.next();
    }

    // F. Default allow for guest routes (/my-stays, /profile, etc.)
    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|rpc)(.*)',
    ],
};