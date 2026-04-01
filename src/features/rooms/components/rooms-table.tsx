'use client'

import { orpc } from "@/lib/orpc.tanstack"
import { useSuspenseQuery } from "@tanstack/react-query"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RoomsTable() {
    const { data: rooms } = useSuspenseQuery(orpc.tenant.listRooms.queryOptions())

    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Room Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Capacity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rooms.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No rooms found. Create your first room to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        rooms.map((room: any) => (
                            <TableRow key={room._id}>
                                <TableCell className="font-medium">{room.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{room.type}</Badge>
                                </TableCell>
                                <TableCell>${room.price}/night</TableCell>
                                <TableCell>{room.capacity} Guests</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}