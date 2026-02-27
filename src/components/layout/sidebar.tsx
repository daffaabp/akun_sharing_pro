"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Share2,
    Mail,
    LayoutGrid,
    Users,
    ChevronsUpDown,
    Layers,
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const mainMenu = [
        { name: "Emails", href: "/emails", icon: Mail },
        { name: "Services", href: "/services", icon: LayoutGrid },
        { name: "Pools", href: "/pools", icon: Layers },
        { name: "Users", href: "/users", icon: Users }
    ];



    return (
        <aside className="hidden md:flex flex-col w-[260px] bg-sidebar-bg border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto shrink-0">
            <div className="px-6 py-6 flex items-center gap-2.5">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                    <Share2 className="size-[18px]" />
                </div>
                <span className="text-[15px] font-bold tracking-tight text-slate-900">
                    Account Sharing Pro
                </span>
            </div>

            <div className="flex-1 px-3 space-y-6">
                <div>
                    <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.05em] mb-2">
                        Main Menu
                    </h3>
                    <nav className="space-y-0.5">
                        {mainMenu.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 text-[14px] font-medium rounded-lg transition-all duration-200 group ${isActive
                                        ? "bg-white shadow-sm border border-slate-200 text-primary"
                                        : "text-slate-600 hover:bg-sidebar-hover hover:text-slate-900"
                                        }`}
                                >
                                    <Icon
                                        className={`size-[20px] transition-colors ${isActive
                                            ? "text-primary"
                                            : "text-slate-400 group-hover:text-slate-600"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>


            </div>

            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-hover transition-colors cursor-pointer group">
                    <div
                        className="size-9 rounded-full bg-cover bg-center border border-slate-200 overflow-hidden"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeDw2pqkkw3b0yxWZBMEQofUtZ4s-fhT-HVrtCPfOUUHBuY4Vmo4GYhTMK70Ywv6YWbxEVYdH-TGLEKN_q6qodKPNnZ1higMW71Zw2QPog1HvA43Y22WO3htKnl-9Jblew7deupyPdd82RDrutjBiIN601Nyvds4sx4aVzF53ywY-8N34tmsdFAVxQB0o14LCGSxI7TWQVmhISsU9JXeYHoEE0VpGeC0Ck3TPnWbB_wdsfEzea425Y-LmW-jf91EJQQGYsL4Cth5w9')",
                        }}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                            Alex Henderson
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                            Admin Account
                        </p>
                    </div>
                    <ChevronsUpDown className="size-[18px] text-slate-400 group-hover:text-slate-600" />
                </div>
            </div>
        </aside>
    );
}
