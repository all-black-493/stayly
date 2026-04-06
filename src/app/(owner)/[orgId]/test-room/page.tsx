'use client'

import { orpc } from "@/lib/orpc.tanstack"
import { useMutation } from '@tanstack/react-query'
import { useState } from "react"

export default function TestRoomPage() {
    const [status, setStatus] = useState<string>("Idle")

    const createRoom = useMutation(
        orpc.tenant.createRoom.mutationOptions({
            onSuccess: (data) => {
                setStatus(`Success! Created room: ${data.name} with ID: ${data._id}`)
            },
            onError: (error) => {
                setStatus(`Error: ${error.message}`)
                console.error(error)
            }
        })
    )

    const handleTest = () => {
        setStatus("Creating...")
        createRoom.mutate({
            name: "Test Deluxe Suite",
            description: "A beautiful test room created via oRPC",
            price: 150,
            capacity: 2,
            type: "Deluxe",
        })
    }

    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">API Circuit Test: Create Room</h1>

            <p className="text-gray-600">
                Current Status:
                <span className="font-mono text-blue-600">{status}</span>
            </p>

            <button
                onClick={handleTest}
                disabled={createRoom.isPending}
                className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-400"
            >
                {createRoom.isPending ? "Processing..." : "Create Dummy Room"}
            </button>

            {createRoom.isSuccess && (
                <div className="mt-4 p-4 rounded">
                    <p>Check your Sanity Studio—you should see a new room document!</p>
                </div>
            )}
        </div>
    )
}