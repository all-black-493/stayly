import DashboardView from '@/features/dashboard/views/dashboard-view'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Home" }

export default async function Page({
  params,
}: {
  params: Promise<{ orgId: string }>
}) {
  const { orgId } = await params

  return <DashboardView orgId={orgId} />
}


