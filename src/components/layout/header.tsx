"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";

const routeTitles: Record<string, string> = {
    "/emails": "Emails",
    "/services": "Services",
    "/users": "Users",
    "/subscriptions": "Subscriptions",
    "/rotation": "Rotation Logic",
};

export default function Header() {
    const pathname = usePathname();
    const title = routeTitles[pathname] ?? "Account Sharing Pro";

    return (
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden text-slate-400 hover:text-slate-600">
                        <Menu className="size-5" />
                    </button>
                    <div className="flex items-center gap-3 mr-2">
                        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                        <input
                            className="pl-10 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary w-64 text-slate-900 placeholder:text-slate-400"
                            placeholder="Search accounts..." type="text" />
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 transition-all">
                        <Bell className="size-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
