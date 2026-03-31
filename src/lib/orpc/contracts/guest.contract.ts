import { oc } from "@orpc/contract";
import { baseContract } from "./base";
import { z } from 'zod'

export const guestContract = baseContract
    .router({
        getRooms: oc.route({
            method: 'GET',
            path: '/rooms'
        })
            .input(z.object({ limit: z.number().optional(), cursor: z.string().optional() }))
            .output(z.array(z.any())),

        getRoomById: oc.route({
            method: 'GET',
            path: '/rooms/{roomId}'
        })
            .input(z.object({ roomId: z.string() }))
            .output(z.any()),

        bookRoom: oc.route({
            method: 'POST',
            path: '/rooms/{roomId}/book'
        })
            .input(z.object({ roomId: z.string(), checkIn: z.date(), checkOut: z.date() }))
            .output(z.object({ bookingId: z.string() })),
    })