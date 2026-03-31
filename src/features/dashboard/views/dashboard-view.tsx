import { PageHeader } from '@/components/page-header'
import { HeroPattern } from '../components/hero-pattern'
import { DashboardHero } from '../components/dashboard-hero'
import { auth } from '@clerk/nextjs/server'

async function DashboardView({ orgId }: { orgId: string }) {
    const { orgSlug } = await auth();

    return (
        <div className='relative min-h-full'>
            <PageHeader title='Dashboard' className='lg:hidden' />
            <HeroPattern />

            <div className="relative space-y-8 p-4 lg:p-10 max-w-7xl mx-auto">
                <DashboardHero orgId={orgId} orgName={orgSlug} />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="h-32 rounded-xl border border-dashed border-border/60 bg-muted/20 animate-pulse flex items-center justify-center text-xs text-muted-foreground">
                        Booking Stats Loading...
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardView