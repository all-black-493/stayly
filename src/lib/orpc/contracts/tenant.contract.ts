import { oc } from '@orpc/contract'
import { z } from 'zod'
import { baseContract } from './base'

export const tenantContract = baseContract
  .router({
    getDashboardStats: oc.route({
      method: 'GET',
      path: '/tenant/stats'
    })
      .output(z.object({ occupancyRate: z.number(), revenue: z.number(), checkInsToday: z.number() })),

    listBookings: oc.route({
      method: 'GET',
      path: '/tenant/bookings'
    })
      .input(z.object({ status: z.string().optional() }))
      .output(z.array(z.any())),

    listRooms: oc.route({
      method: 'GET',
      path: '/tenant/rooms'
    })
      .output(z.array(z.any())),

    updateRoom: oc.route({
      method: 'PATCH',
      path: '/tenant/rooms/{roomId}'
    })
      .input(z.object({
        roomId: z.string(),
        data: z.object({
          name: z.string().optional(),
          price: z.number().optional(),
          capacity: z.number().optional(),
          type: z.enum(['Single', 'Double', 'Suite', 'Deluxe']).optional(),
        })
      }))
      .output(z.any()),

    createRoom: oc.route({
      method: 'POST',
      path: '/tenant/rooms'
    })
      .input(z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        pricePerNight: z.number().positive(),
        capacity: z.number().int().positive(),
        type: z.enum(['Single', 'Double', 'Suite', 'Deluxe']),
      }))
      .output(z.object({
        _id: z.string(),
        name: z.string(),
      })),

    listGuests: oc.route({
      method: 'GET',
      path: '/tenant/guests'
    })
      .output(z.array(z.any())),

    getFinances: oc.route({
      method: 'GET',
      path: '/tenant/finances'
    })
      .input(z.object({ month: z.string() }))
      .output(z.any()),
  })