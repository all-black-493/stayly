import { oc } from "@orpc/contract";
import { baseContract } from "./base";
import { z } from 'zod'

export const guestContract = baseContract
    .router({
        verify:oc.route({})
        .input(z.object({
            name: z.string().min(2, "Full name is required"),
            idNumber: z.string().min(5, "Valid ID number is required"),
            role: z.enum(["GUEST", "OWNER"]),
            frontId: z.instanceof(File, { message: "Front of ID is required" }),
            backId: z.instanceof(File, { message: "Back of ID is required" }),
        }))
        .output(z.object({
            success: z.boolean(),
            role: z.enum(["GUEST", "OWNER"])
        }))
        ,
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