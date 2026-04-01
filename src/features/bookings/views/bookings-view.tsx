import { getQueryClient, HydrateClient } from '@/lib/hydration'
import { orpc } from '@/lib/orpc.tanstack'
import { Suspense } from 'react'
import { BookingsList } from '../components/bookings-list'

export async function BookingsView({ orgId }: { orgId: string }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery(
        orpc.tenant.listBookings.queryOptions({ input: { status: "" } })
    )

    return (
        <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-6">

            <HydrateClient client={queryClient}>
                <Suspense fallback={<div>Loading Bookings...</div>}>
                    <BookingsList />
                </Suspense>
            </HydrateClient>
        </div>
    )
}