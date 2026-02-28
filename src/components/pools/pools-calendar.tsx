"use client";

import { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from "date-fns";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Service = { id: string; name: string; category?: string };
type Seat = { id: string; member: { name: string; email: string | null } };

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

const STATUS_BADGE: Record<string, React.ReactNode> = {
    OPEN: <Badge className="bg-blue-500 hover:bg-blue-600">Open</Badge>,
    READY: <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Ready</Badge>,
    ACTIVE: <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>,
    BANNED: <Badge variant="destructive" className="bg-rose-600">Banned</Badge>,
};

export function PoolsCalendar({ pools }: { pools: Pool[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "MMMM yyyy";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">{format(currentDate, dateFormat)}</h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 border rounded-md hover:bg-slate-50 text-slate-600 transition-colors">
                        <ChevronLeft className="size-5" />
                    </button>
                    <button onClick={nextMonth} className="p-2 border rounded-md hover:bg-slate-50 text-slate-600 transition-colors">
                        <ChevronRight className="size-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-lg overflow-hidden border border-slate-200">
                {weekDays.map(day => (
                    <div key={day} className="bg-slate-50 p-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}

                {days.map((day) => {
                    // Find pools for this day
                    const dayPools = pools.filter(pool => {
                        const targetDate = pool.endDate ? new Date(pool.endDate) : (pool.createdAt ? new Date(pool.createdAt) : null);
                        if (!targetDate) return false;
                        return isSameDay(targetDate, day);
                    });

                    const isCurrentMonth = isSameMonth(day, monthStart);

                    return (
                        <div
                            key={day.toString()}
                            className={`min-h-[110px] bg-white p-1.5 transition-colors ${!isCurrentMonth ? "bg-slate-50/50" : ""} hover:bg-slate-50`}
                        >
                            <div className="flex justify-between items-center px-1 mb-1">
                                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday(day) ? "bg-primary text-primary-foreground shadow-sm" : !isCurrentMonth ? "text-slate-400" : "text-slate-700"}`}>
                                    {format(day, "d")}
                                </span>
                                {dayPools.length > 0 && (
                                    <span className="text-[10px] font-semibold text-slate-400">
                                        {dayPools.length}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-1 mt-1 max-h-[90px] overflow-y-auto pr-1 custom-scrollbar">
                                {dayPools.map(pool => (
                                    <div
                                        key={pool.id}
                                        onClick={() => setSelectedPool(pool)}
                                        className={`text-xs px-2 py-1.5 rounded cursor-pointer border shadow-sm transition-all hover:-translate-y-0.5
                                          ${pool.status === 'ACTIVE' ? 'bg-green-50/80 text-green-800 border-green-200 hover:bg-green-100 hover:border-green-300' :
                                            pool.status === 'READY' ? 'bg-yellow-50/80 text-yellow-800 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300' :
                                            pool.status === 'BANNED' ? 'bg-rose-50/80 text-rose-800 border-rose-200 hover:bg-rose-100 hover:border-rose-300' :
                                            'bg-blue-50/80 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
                                          }
                                        `}
                                        title={`${pool.name} - ${pool.service.name}`}
                                    >
                                        <div className="truncate font-semibold tracking-tight">{pool.name}</div>
                                        <div className="flex items-center justify-between mt-0.5 opacity-80">
                                            <span className="truncate text-[10px]">{pool.service.name}</span>
                                            <span className="flex items-center gap-1 text-[10px]">
                                                <Users className="size-2.5" />
                                                {pool.seats.length}/{pool.targetSeats}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Dialog open={!!selectedPool} onOpenChange={(isOpen) => !isOpen && setSelectedPool(null)}>
                <DialogContent className="sm:max-w-md">
                    {selectedPool && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl flex items-center gap-2">
                                    {selectedPool.name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 pt-2">
                                <div className="flex gap-2">
                                    {STATUS_BADGE[selectedPool.status] ?? (
                                        <Badge variant="outline">{selectedPool.status}</Badge>
                                    )}
                                    <Badge variant="secondary" className="bg-slate-100">{selectedPool.service.name}</Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Start Date</p>
                                        <p className="font-semibold text-sm mt-1 text-slate-800">{selectedPool.startDate ? format(new Date(selectedPool.startDate), 'dd MMM yyyy') : '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">End/Expiry Date</p>
                                        <p className={`font-semibold text-sm mt-1 ${selectedPool.status === 'ACTIVE' ? 'text-rose-600' : 'text-slate-800'}`}>
                                            {selectedPool.endDate ? format(new Date(selectedPool.endDate), 'dd MMM yyyy') : '-'}
                                        </p>
                                    </div>
                                </div>

                                {selectedPool.masterEmail && (
                                    <div>
                                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Master Email associated</p>
                                        <p className="font-medium text-sm bg-blue-50/50 text-blue-700 px-3 py-2 border border-blue-100 rounded-lg">{selectedPool.masterEmail}</p>
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-end mb-3 border-b border-slate-100 pb-2">
                                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1.5">
                                            <Users className="size-3.5" />
                                            Members in Pool
                                        </p>
                                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {selectedPool.seats.length} / {selectedPool.targetSeats}
                                        </span>
                                    </div>
                                    <ul className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedPool.seats.length === 0 && (
                                            <p className="text-sm text-slate-400 italic text-center py-4">No members have joined yet.</p>
                                        )}
                                        {selectedPool.seats.map((seat) => (
                                            <li key={seat.id} className="text-sm flex justify-between items-center bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                                                <span className="font-semibold text-slate-800">{seat.member.name}</span>
                                                {seat.member.email && <span className="text-slate-500 text-xs bg-slate-50 px-2 py-0.5 rounded-md">{seat.member.email}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}} />
        </div>
    );
}
