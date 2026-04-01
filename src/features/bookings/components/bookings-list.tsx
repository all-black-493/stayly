'use client'

import { orpc } from "@/lib/orpc.tanstack"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSuspenseQuery } from "@tanstack/react-query"

export function BookingsList() {
    const { data: bookings } = useSuspenseQuery(orpc.tenant.listBookings.queryOptions({ input: { status: "" } }))

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No active bookings found.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {bookings.map((booking: any) => (
                <Card key={booking._id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-semibold">{booking.guestName}</p>
                            <p className="text-sm text-muted-foreground">{booking.roomName}</p>
                        </div>
                        <div className="text-right">
                            <Badge>{booking.status}</Badge>
                            <p className="text-xs mt-1">{booking.dates}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}