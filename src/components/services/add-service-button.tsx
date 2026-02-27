"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createService } from "@/app/actions/services";

export function AddServiceButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const data = new FormData(e.currentTarget);
        try {
            await createService({
                name: data.get("name") as string,
                category: data.get("category") as string,
                description: (data.get("description") as string) || undefined,
                url: (data.get("url") as string) || undefined,
                status: (data.get("status") as string) || "active",
            });
            setOpen(false);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); setError(null); }}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5">
                    <Plus className="size-3.5" />
                    Add Service
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add API/AI Service</DialogTitle>
                        <DialogDescription>
                            Add a new service that users can pool subscriptions for (e.g., ChatGPT, Cursor).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="add-name">Service Name</Label>
                            <Input
                                id="add-name"
                                name="name"
                                placeholder="e.g. ChatGPT Plus"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-category">Category</Label>
                            <Input
                                id="add-category"
                                name="category"
                                placeholder="e.g. AI Assistant, IDE"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-url">Service URL</Label>
                            <Input
                                id="add-url"
                                name="url"
                                type="url"
                                placeholder="https://chat.openai.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-description">Description</Label>
                            <Input
                                id="add-description"
                                name="description"
                                placeholder="Brief description of the service"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="add-status">Status</Label>
                            <select
                                id="add-status"
                                name="status"
                                defaultValue="active"
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
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving…" : "Save Service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
