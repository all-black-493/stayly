import { implement } from "@orpc/server";
import { contract } from "./contracts";
import { auth } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { client } from "@/sanity/lib/client";

const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const os = implement(contract);

export const authMiddleware = os.middleware(async ({ next, errors }) => {
    const { userId, orgId } = await auth();

    if (!userId) {
        throw errors.UNAUTHORIZED();
    }

    const { success } = await ratelimit.limit(userId);
    if (!success) {
        throw errors.TOO_MANY_REQUESTS();
    }

    return next({
        context: {
            userId,
            orgId: orgId || undefined,
            isAdmin: userId === 'user_3Bce8VObcjJxbp8oHBwKx6DIxSq',
        }
    });
});


export const tenantMiddleware = authMiddleware.concat(async ({ next, context, errors }) => {
    if (!context.orgId) {
        throw errors.FORBIDDEN({
            message: "You must have or select a guesthouse workspace to perform this action.",
        });
    }

    const tenantId = context.orgId;

    const scopedSanityClient = {
        // 1. Scoped Fetch (Your clever regex logic)
        fetch: async (query: string, params: Record<string, any> = {}) => {
            const fullParams = { ...params, tenantOrgId: tenantId };
            const filteredQuery = query.includes("clerkOrgId")
                ? query
                : query.replace(
                    /(_type\s*==\s*["']([^"']+)["'])/,
                    "$1 && clerkOrgId == $tenantOrgId"
                );
            return client.fetch(filteredQuery, fullParams);
        },

        create: (data: any) => client.create({ ...data, clerkOrgId: tenantId }),
        createIfNotExists: (data: any) => client.createIfNotExists({ ...data, clerkOrgId: tenantId }),
        createOrReplace: (data: any) => client.createOrReplace({ ...data, clerkOrgId: tenantId }),

        patch: (id: string) => client.patch(id),
        delete: (id: string) => client.delete(id),
    };

    return next({
        context: {
            ...context,
            sanityClient: scopedSanityClient,
        }
    });
});


export const adminMiddleware = authMiddleware.concat(async ({ next, context, errors }) => {
    if (!context.isAdmin) {
        throw errors.FORBIDDEN({
            message: "Platform administrator access required.",
        });
    }

    return next({ context });
});