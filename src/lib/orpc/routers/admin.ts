import { implement } from "@orpc/server";
import { adminContract } from "../contracts/admin.contract";
import { adminMiddleware } from "../middleware";

const os = implement(adminContract);

export const adminRouter = os.router({
    getPlatformMetrics: os.getPlatformMetrics
        .use(adminMiddleware)
        .handler(async ({ context }) => {
            return { totalRevenue: 50000, totalGuests: 1200, totalGuesthouses: 45 };
        }),
});