"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const warnaGrafik = [
    "#2563eb", // blue-600
    "#16a34a", // green-600
    "#dc2626", // red-600
    "#ca8a04", // yellow-600
    "#9333ea", // purple-600
    "#0891b2", // cyan-600
    "#ea580c", // orange-600
    "#4f46e5"  // indigo-600
];

export function OverviewChart({ 
    data, 
    serviceNames 
}: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]; 
    serviceNames: string[] 
}) {
    if (data.length === 0 || serviceNames.length === 0) {
        return (
            <div className="flex items-center justify-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">Belum ada statistik layanan / anggota terdaftar.</p>
            </div>
        );
    }

    return (
        <div className="h-[400px] w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                        dataKey="name" 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        dy={10} 
                    />
                    <YAxis 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `${value}`} 
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                        cursor={{ fill: "rgba(241, 245, 249, 0.4)" }}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                    />
                    
                    {serviceNames.map((svcName, index) => (
                        <Bar 
                            key={svcName} 
                            dataKey={svcName} 
                            fill={warnaGrafik[index % warnaGrafik.length]} 
                            radius={[4, 4, 0, 0]} 
                            stackId="a" // ini menata menjadi satu bar bertumpuk (Stacked Bar)
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
