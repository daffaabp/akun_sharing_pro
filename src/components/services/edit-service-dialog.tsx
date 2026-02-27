"use client";

import { useState } from "react";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateService } from "@/app/actions/services";

type ServiceData = {
    id: string;
    name: string;
    category: string;
    status: string;
    description: string | null;
    url: string | null;
    createdAt?: Date;
};

interface EditServiceDialogProps {
    service: ServiceData;
    open: boolean;
    onClose: () => void;
}

export function EditServiceDialog({ service, open, onClose }: EditServiceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);

        try {
            await updateService(service.id, {
                name: data.get("name") as string,
                category: data.get("category") as string,
                description: (data.get("description") as string) || undefined,
                url: (data.get("url") as string) || undefined,
                status: data.get("status") as string,
            });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                        <DialogDescription>
                            Update the details for this service.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Service Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                defaultValue={service.name}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Input
                                id="edit-category"
                                name="category"
                                defaultValue={service.category}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-url">Service URL</Label>
                            <Input
                                id="edit-url"
                                name="url"
                                type="url"
                                defaultValue={service.url ?? ""}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Input
                                id="edit-description"
                                name="description"
                                defaultValue={service.description ?? ""}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <select
                                id="edit-status"
                                name="status"
                                defaultValue={service.status}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="active">Active</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive mb-3">{error}</p>}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving…" : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
