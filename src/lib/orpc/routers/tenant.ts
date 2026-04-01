import { implement } from "@orpc/server";
import { tenantContract } from "../contracts/tenant.contract";
import { tenantMiddleware } from "../middleware";

const os = implement(tenantContract);

export const tenantRouter = os.router({
    getDashboardStats: os.getDashboardStats
        .use(tenantMiddleware)
        .handler(async ({ context }) => {
            return { occupancyRate: 75, revenue: 1500, checkInsToday: 8 };
        }),

    listBookings: os.listBookings
        .use(tenantMiddleware)
        .handler(async ({ input, context }) => {
            return [];
        }),

    listRooms: os.listRooms
        .use(tenantMiddleware)
        .handler(async ({ context }) => {
            return await context.sanityClient.fetch(`*[_type == "room"]`);
        }),

    updateRoom: os.updateRoom
        .use(tenantMiddleware)
        .handler(async ({ input, context, errors }) => {
            const existingRoom = await context.sanityClient.fetch(
                `*[_type == "room" && _id == $id][0]`,
                { id: input.roomId }
            );

            if (!existingRoom) {
                throw errors.NOT_FOUND({
                    data: {
                        resourceType: 'room',
                        resourceId: input.roomId
                    },
                    message: "Room not found or unauthorized access."
                });
            }

            const result = await context.sanityClient
                .patch(input.roomId)
                .set(input.data)
                .commit();

            return result;
        }),

    listGuests: os.listGuests
        .use(tenantMiddleware)
        .handler(async ({ context }) => {
            return [];
        }),

    getFinances: os.getFinances
        .use(tenantMiddleware)
        .handler(async ({ input, context }) => {
            return { month: input.month, revenue: 5000 };
        }),

    createRoom: os.createRoom
        .use(tenantMiddleware)
        .handler(async ({ input, context }) => {
            const result = await context.sanityClient.create({
                _type: 'room',
                name: input.name,
                type: input.type,
                price: input.pricePerNight,
                capacity: input.capacity,
                description: input.description ? [
                    {
                        _type: 'block',
                        children: [{ _type: 'span', text: input.description }]
                    }
                ] : undefined,
                slug: {
                    _type: 'slug',
                    current: input.name.toLowerCase().replace(/\s+/g, '-')
                },
            });

            return {
                _id: result._id,
                name: result.name,
            };
        }),

});