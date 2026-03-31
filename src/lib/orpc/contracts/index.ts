import { oc } from '@orpc/contract'
import { guestContract } from './guest.contract'
import { tenantContract } from './tenant.contract'
import { adminContract } from './admin.contract'

export const contract = oc.router({
    guest: guestContract,
    tenant: tenantContract,
    admin: adminContract,
})