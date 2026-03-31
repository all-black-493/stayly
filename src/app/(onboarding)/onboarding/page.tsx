"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileCheck, AlertCircle } from "lucide-react";
import { verifyGuestAction } from "@/server/actions/verifyGuestAction";

const onboardingSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    idNumber: z.string().min(5, "Valid ID number is required"),
    frontId: z.any().refine((file) => file instanceof File, "Front of ID is required"),
    backId: z.any().refine((file) => file instanceof File, "Back of ID is required"),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = async (data: OnboardingValues) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("idNumber", data.idNumber);
        formData.append("frontId", data.frontId);
        formData.append("backId", data.backId);
        
        await verifyGuestAction(formData);
    };

    return (
        <Card className="w-full max-w-xl border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                            <input {...register("name")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="John Doe" />
                            {errors.name && <p className="text-[11px] text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ID Number</label>
                            <input {...register("idNumber")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="12345678" />
                            {errors.idNumber && <p className="text-[11px] text-destructive">{errors.idNumber.message}</p>}
                        </div>
                    </div>

                    {/* ID Uploads via Controller */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Controller
                            control={control}
                            name="frontId"
                            render={({ field }) => (
                                <FileUpload label="Front of National ID" file={field.value} onFileChange={field.onChange} error={errors.frontId?.message as string} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="backId"
                            render={({ field }) => (
                                <FileUpload label="Back of National ID" file={field.value} onFileChange={field.onChange} error={errors.backId?.message as string} />
                            )}
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-11" render={<button>{isSubmitting ? "Verifying..." : "Submit Verification"}</button>} />
                </form>
            </CardContent>
        </Card>
    );
}

function FileUpload({ label, file, onFileChange, error }: any) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 1,
        onDrop: (files) => onFileChange(files[0])
    });

    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
            <div {...getRootProps()} className={`relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"}`}>
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