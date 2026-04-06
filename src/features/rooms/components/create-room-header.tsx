'use client'

import { Button } from "@/components/ui/button"
import { orpc } from "@/lib/orpc.tanstack"
import { toast } from "sonner"
import { PlusIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function CreateRoomHeader({ orgId }: { orgId: string }) {
    const queryClient = useQueryClient()
    const { mutate: createRoom, isPending } = useMutation(orpc.tenant.createRoom.mutationOptions({
        onSuccess: () => {
            toast.success("Room created successfully")

            queryClient.invalidateQueries({
                queryKey: orpc.tenant.listRooms.queryKey()
            })
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create room")
        }
    }))

    const handleCreateDummy = () => {
        createRoom({
            name: "Room 101",
            type: "Single",
            price: 80,
            capacity: 1,
            description: "Standard single room with garden view."
        })
    }

    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Rooms</h1>
                <p className="text-muted-foreground">Manage your guesthouse inventory and pricing.</p>
            </div>
            <Button onClick={handleCreateDummy} disabled={isPending}>
                <PlusIcon className="mr-2 h-4 w-4" />
                {isPending ? "Creating..." : "Add Room"}
            </Button>
        </div>
    )
}