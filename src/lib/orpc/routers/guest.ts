import { implement } from "@orpc/server";
import { guestContract } from "../contracts/guest.contract";
import { authMiddleware } from "../middleware";

const os = implement(guestContract);

export const guestRouter = os.router({
    getRooms: os.getRooms
        .handler(async ({ input }) => {
            return [];
        }),

    getRoomById: os.getRoomById
        .handler(async ({ input }) => {
            return { id: input.roomId, name: "Sample Room" };
        }),

    bookRoom: os.bookRoom
        .use(authMiddleware)
        .handler(async ({ input }) => {
            return { bookingId: `bk_${Date.now()}` };
        }),
});