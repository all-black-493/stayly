import { oc } from '@orpc/contract'
import z from "zod";

export const baseContract = oc.errors({
    UNAUTHORIZED: {
        status: 401,
        message: "Authentication required",
    },
    FORBIDDEN: {
        status: 403,
        message: "You do not have permission to perform this action",
    },
    TOO_MANY_REQUESTS: {
        status: 429,
        message: 'Rate limit exceeded'
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Something went wrong",
    },
    NOT_FOUND: {
        status: 404,
        message: "Resource not found",
        data: z.object({
            resourceType: z.string(),
            resourceId: z.string(),
        }),
    },
    DOMAIN_RULE_VIOLATION: {
        status: 422,
        message: "Business rule violation",
        data: z.object({
            rule: z.string(),
        }),
    },
})