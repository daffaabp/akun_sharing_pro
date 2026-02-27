"use client";

import { useState } from "react";
import { ActivatePoolDialog } from "./activate-pool-dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

type EmailOption = { id: string; email: string };

interface ActivateButtonProps {
    pool: { id: string; name: string };
    emails: EmailOption[];
}

export function ActivateButton({ pool, emails }: ActivateButtonProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button size="sm" variant="secondary" className="gap-2" onClick={() => setOpen(true)}>
                <Zap className="h-4 w-4" />
                Activate Pool
            </Button>
            <ActivatePoolDialog
                pool={pool}
                open={open}
                onClose={() => setOpen(false)}
                emails={emails}
            />
        </>
    );
}
