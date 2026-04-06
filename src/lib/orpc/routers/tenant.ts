import { implement } from "@orpc/server";
import { tenantContract } from "../contracts/tenant.contract";
import { tenantMiddleware } from "../middleware";

const os = implement(tenantContract);

export const tenantRouter = os.router({
    getDashboardStats: os.getDashboardStats
        .use(tenantMiddleware)
        .handler(async ({ context }) => {
            const { sanityClient } = context;

            const [totalRooms, activeBookings, revenue, checkInsToday] = await Promise.all([
                sanityClient.fetch(`count(*[_type == "room"])`),
                sanityClient.fetch(
                    `count(*[_type == "booking" && status == "confirmed" && checkIn <= now() && checkOut >= now()])`
                ),
                sanityClient.fetch(
                    `math::sum(*[_type == "booking" && status == "confirmed"].totalPrice)`
                ),
                sanityClient.fetch(
                    `count(*[_type == "booking" && checkIn >= "${new Date().toISOString().split('T')[0]}T00:00:00Z"])`
                )
            ]);

            const occupancyRate = totalRooms > 0
                ? Math.round((activeBookings / totalRooms) * 100)
                : 0;

            return { occupancyRate, revenue, checkInsToday };
        }),

    createBooking: os.createBooking
        .use(tenantMiddleware)
        .handler(async ({ input, context }) => {
            const { sanityClient } = context;

            const result = await sanityClient.create({
                _type: 'booking',
                room: {
                    _type: 'reference',
                    _ref: input.roomId
                },
                guest: {
                    _type: 'reference',
                    _ref: input.guestId
                },
                checkIn: input.checkIn,
                checkOut: input.checkOut,
                status: input.status,
            });

            return { id: result._id, success: true };
        }),

    listBookings: os.listBookings
        .use(tenantMiddleware)
        .handler(async ({ input, context }) => {
            return [];
        }),

    listRooms: os.listRooms
        .use(tenantMiddleware)
        .handler(async ({ context }) => {
            return await context.sanityClient.fetch(`*[_type == "room"] | order(_createdAt desc)`);
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
                price: input.price,
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