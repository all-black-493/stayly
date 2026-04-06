import { Skeleton } from '@/components/ui/skeleton'
import { getQueryClient, HydrateClient } from '@/lib/hydration'
import { orpc } from '@/lib/orpc.tanstack'
import { Suspense } from 'react'
import { CreateRoomHeader } from '../components/create-room-header'
import { RoomsTable } from '../components/rooms-table'

export async function RoomsView({ orgId }: { orgId: string }) {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery(
        orpc.tenant.listRooms.queryOptions()
    )

    return (
        <div className="space-y-6 p-4 lg:p-10 max-w-7xl mx-auto">
            <CreateRoomHeader orgId={orgId} />

            <HydrateClient client={queryClient}>
                <Suspense fallback={<Skeleton className="h-100 w-full" />}>
                    <RoomsTable />
                </Suspense>
            </HydrateClient>
        </div>
    )
}