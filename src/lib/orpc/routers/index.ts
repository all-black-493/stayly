import { implement } from "@orpc/server";
import { contract } from "../contracts";
import { guestRouter } from "./guest";
import { tenantRouter } from "./tenant";
import { adminRouter } from "./admin";

const os = implement(contract);

export const router = os.router({
    guest: guestRouter,
    tenant: tenantRouter,
    admin: adminRouter,
});

// Export the type signature for the client side
export type AppRouter = typeof router;