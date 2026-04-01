import { implement } from "@orpc/server";
import { guestContract } from "../contracts/guest.contract";
import { authMiddleware } from "../middleware";
import { clerkClient } from "@clerk/nextjs/server";
import { client as sanityClient } from "@/sanity/lib/client";

const os = implement(guestContract);

export const guestRouter = os.router({

    verify: os.verify
        .use(authMiddleware)
        .handler(async ({ input, context }) => {
            const { userId } = context;

            const [frontAsset, backAsset] = await Promise.all([
                sanityClient.assets.upload("image", input.frontId),
                sanityClient.assets.upload("image", input.backId)
            ]);

            await sanityClient.create({
                _type: 'guest',
                name: input.name,
                idNumber: input.idNumber,
                clerkUserId: userId,
                frontIdImage: {
                    _type: 'image',
                    asset: { _ref: frontAsset._id }
                },
                backIdImage: {
                    _type: 'image',
                    asset: { _ref: backAsset._id }
                },
                verificationStatus: 'pending'
            });

            const clerk = await clerkClient();
            await clerk.users.updateUserMetadata(userId, {
                publicMetadata: {
                    idUploaded: true,
                    role: input.role
                }
            });

            return {
                success: true,
                role: input.role
            };
        }),

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