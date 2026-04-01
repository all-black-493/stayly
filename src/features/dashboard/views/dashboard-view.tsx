import { PageHeader } from '@/components/page-header'
import { HeroPattern } from '../components/hero-pattern'
import { DashboardHero } from '../components/dashboard-hero'
import { auth } from '@clerk/nextjs/server'
import { getQueryClient, HydrateClient } from '@/lib/hydration';
import { orpc } from '@/lib/orpc.tanstack';
import { DashboardStats } from '../components/dashboard-stats';
import { Suspense } from 'react';

export async function DashboardView({ orgId }: { orgId: string }) {
    const { orgSlug } = await auth();
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery(
        orpc.tenant.getDashboardStats.queryOptions()
    )

    return (
        <div className='relative min-h-full'>
            <PageHeader title='Dashboard' className='lg:hidden' />
            <HeroPattern />

            <div className="relative space-y-8 p-4 lg:p-10 max-w-7xl mx-auto">
                <DashboardHero orgId={orgId} orgName={orgSlug || 'Workspace'} />

                <HydrateClient client={queryClient}>
                    <Suspense fallback={<p>Loading ...</p>}>
                        <DashboardStats />
                    </Suspense>
                </HydrateClient>
            </div>
        </div>
    )
}

