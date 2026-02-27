"use client";

import { useState } from "react";
import { MembersTable } from "./members-table";
import { cn } from "@/lib/utils";
import { FollowUpTable } from "./follow-up-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UsersClientView({ members, pools, followUps }: { members: any, pools: any, followUps: any }) {
    const [tab, setTab] = useState<"followup" | "all">("followup");

    return (
        <div className="space-y-6">
            <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-lg w-fit shadow-inner">
                <button
                    onClick={() => setTab("followup")}
                    className={cn(
                        "px-4 py-2 text-sm font-semibold rounded-md transition-all",
                        tab === "followup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                    )}
                >
                    Antrean Tagihan
                    {followUps.length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {followUps.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setTab("all")}
                    className={cn(
                        "px-4 py-2 text-sm font-semibold rounded-md transition-all",
                        tab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                    )}
                >
                    Semua Pengguna
                </button>
            </div>

            <div className="mt-4">
                {tab === "followup" && <FollowUpTable followUps={followUps} />}
                {tab === "all" && <MembersTable members={members} pools={pools} />}
            </div>
        </div>
    );
}
