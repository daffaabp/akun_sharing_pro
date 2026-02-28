"use client";

import { useState } from "react";
import { PoolsTable } from "./pools-table";
import { PoolsCalendar } from "./pools-calendar";
import { List, Calendar as CalendarIcon } from "lucide-react";

type Service = { id: string; name: string; category?: string };
type Seat = { id: string; member: { name: string; email: string | null } };
type EmailOption = { id: string; email: string };

type Pool = {
    id: string;
    name: string;
    targetSeats: number;
    status: string;
    notes?: string | null;
    service: Service;
    seats: Seat[];
    masterEmail?: string | null;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    planType?: string | null;
    createdAt?: string | Date | null;
};

interface PoolsViewManagerProps {
    pools: Pool[];
    emails: EmailOption[];
}

export function PoolsViewManager({ pools, emails }: PoolsViewManagerProps) {
    const [view, setView] = useState<"table" | "calendar">("table");

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => setView("table")}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
                            view === "table" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                        }`}
                    >
                        <List className="size-4" />
                        Table View
                    </button>
                    <button
                        onClick={() => setView("calendar")}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
                            view === "calendar" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                        }`}
                    >
                        <CalendarIcon className="size-4" />
                        Calendar View
                    </button>
                </div>
            </div>

            {view === "table" ? (
                <PoolsTable pools={pools} emails={emails} />
            ) : (
                <PoolsCalendar pools={pools} />
            )}
        </div>
    );
}
