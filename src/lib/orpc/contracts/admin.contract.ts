import { oc } from '@orpc/contract'
import { z } from 'zod'
import { baseContract } from './base'

export const adminContract = baseContract
    .router({
        getPlatformMetrics: oc.route({
            method: 'GET',
            path: '/admin/metrics'
        })
            .output(z.object({ totalRevenue: z.number(), totalGuests: z.number(), totalGuesthouses: z.number() })),
    })