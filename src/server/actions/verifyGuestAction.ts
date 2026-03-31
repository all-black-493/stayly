"use server"

import { auth, clerkClient } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function verifyGuestAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const idNumber = formData.get("idNumber") as string;
    const frontFile = formData.get("frontId") as File;
    const backFile = formData.get("backId") as File;

    try {
        const [frontAsset, backAsset] = await Promise.all([
            client.assets.upload("image", frontFile),
            client.assets.upload("image", backFile)
        ]);

        
        await client.create({
            _type: 'guest',
            name,
            idNumber,
            clerkUserId: userId,
            frontIdImage: {
                _type: 'image',
                asset: { _ref: frontAsset._id }
            },
            backIdImage: {
                _type: 'image',
                asset: { _ref: backAsset._id }
            },
            verificationStatus: 'pending'
        });

        const clerk = await clerkClient();
        await clerk.users.updateUserMetadata(userId, {
            publicMetadata: {
                idUploaded: true
            }
        });

        revalidatePath("/", "layout");
    } catch (error) {
        console.error("Verification failed:", error);
        throw error;
    }

    redirect("/");
}