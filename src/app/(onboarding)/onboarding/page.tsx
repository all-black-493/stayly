"use client";

import { useSession } from "@clerk/nextjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileCheck, AlertCircle, User, Hotel } from "lucide-react";
import { orpc } from "@/lib/orpc.tanstack";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const onboardingSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    idNumber: z.string().min(5, "Valid ID number is required"),
    frontId: z.any().refine((file) => file instanceof File, "Front of ID is required"),
    backId: z.any().refine((file) => file instanceof File, "Back of ID is required"),
    role: z.enum(["GUEST", "OWNER"], { error: "Please select your account type" })
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
    const router = useRouter();
    const { session } = useSession();

    const { control, register, handleSubmit, formState: { errors } } = useForm<OnboardingValues>({
        defaultValues: {
            role: "GUEST"
        },
        resolver: zodResolver(onboardingSchema),
    });

    const { mutate: verifyGuest, isPending } = useMutation(orpc.guest.verify.mutationOptions({
        onSuccess: async (data) => {
            toast.success("Profile verified!");

            await session?.reload();
            console.log("[ROLE: ]", data.role)

            if (data?.role === "OWNER") {
                router.push("/org-selection");
            } else {
                router.push("/");
            }

            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));

    const onSubmit = (data: OnboardingValues) => {
        verifyGuest(data);
    };

    return (
        <Card className="w-full max-w-xl border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">I am a...</label>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => field.onChange("GUEST")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all",
                                            field.value === "GUEST"
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <User className="size-6" />
                                        <span className="text-sm font-semibold">Guest</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => field.onChange("OWNER")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 transition-all",
                                            field.value === "OWNER"
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <Hotel className="size-6" />
                                        <span className="text-sm font-semibold">Host</span>
                                    </button>
                                </div>
                            )}
                        />
                        {errors.role && <p className="text-[11px] text-destructive">{errors.role.message}</p>}
                    </div>

                    {/* Basic Info */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                            <input {...register("name")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="John Doe" disabled={isPending} />
                            {errors.name && <p className="text-[11px] text-destructive">{errors.name.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ID Number</label>
                            <input {...register("idNumber")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="12345678" disabled={isPending} />
                            {errors.idNumber && <p className="text-[11px] text-destructive">{errors.idNumber.message as string}</p>}
                        </div>
                    </div>

                    {/* ID Uploads */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Controller
                            control={control}
                            name="frontId"
                            render={({ field }) => (
                                <FileUpload label="Front of National ID" file={field.value} onFileChange={field.onChange} error={errors.frontId?.message as string} disabled={isPending} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="backId"
                            render={({ field }) => (
                                <FileUpload label="Back of National ID" file={field.value} onFileChange={field.onChange} error={errors.backId?.message as string} disabled={isPending} />
                            )}
                        />
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full h-11">
                        {isPending ? "Verifying..." : "Submit Verification"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

function FileUpload({ label, file, onFileChange, error, disabled }: any) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        disabled,
        onDrop: (files) => onFileChange(files[0])
    });

    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
            <div {...getRootProps()} className={`relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"}`}>
                <input {...getInputProps()} />
                {file ? (
                    <div className="flex flex-col items-center gap-2 text-primary">
                        <FileCheck className="size-8" />
                        <span className="text-[10px] font-medium truncate max-w-35">{file.name}</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                        <UploadCloud className="size-8" />
                        <span className="text-[10px]">Click or drag to upload</span>
                    </div>
                )}
            </div>
            {error && <div className="flex items-center gap-1 text-[11px] text-destructive"><AlertCircle className="size-3" /> {error}</div>}
        </div>
    );
}