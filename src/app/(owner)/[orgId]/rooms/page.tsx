import { RoomsView } from '@/features/rooms/views/rooms-view'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: "Your Rooms" }

export default async function Page({
  params,
}: {
  params: Promise<{ orgId: string }>
}) {
  const { orgId } = await params

  return <RoomsView orgId={orgId} />
}