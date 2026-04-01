'use client'

import { orpc } from "@/lib/orpc.tanstack"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useSuspenseQuery } from "@tanstack/react-query"

export function DashboardStats() {

    const { data, isError } = useSuspenseQuery(orpc.tenant.getDashboardStats.queryOptions())

    if (isError || !data) {
        return <div className="p-4 text-red-500">Failed to load stats.</div>
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.occupancyRate}%</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${data.revenue}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.checkInsToday}</div>
                </CardContent>
            </Card>
        </div>
    )
}