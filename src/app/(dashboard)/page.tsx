import { getDashboardStats } from "@/app/actions/dashboard";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Users, LayoutGrid, Layers, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardHomePage() {
    const stats = await getDashboardStats();

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <p className="text-muted-foreground mt-1">
                    Ringkasan performa dan pertumbuhan layanan Anda.
                </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white border hover:border-blue-200 transition-colors rounded-xl p-6 shadow-sm flex flex-col justify-between h-[120px]">
                    <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-slate-600">Total Pelanggan Aktif</h3>
                        <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalUsers}</div>
                </div>

                <div className="bg-white border hover:border-emerald-200 transition-colors rounded-xl p-6 shadow-sm flex flex-col justify-between h-[120px]">
                    <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-slate-600">Pool Berjalan</h3>
                        <Layers className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900">{stats.activePools}</div>
                        <p className="text-xs text-slate-500 mt-1">Grup aktif saat ini</p>
                    </div>
                </div>

                <div className="bg-white border hover:border-indigo-200 transition-colors rounded-xl p-6 shadow-sm flex flex-col justify-between h-[120px]">
                    <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-slate-600">Total Layanan</h3>
                        <LayoutGrid className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalServices}</div>
                </div>

                <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col justify-between h-[120px] bg-linear-to-br from-orange-50 to-amber-50/50">
                    <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-bold text-orange-800">Growth Trend</h3>
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-sm font-medium text-orange-800/80 leading-tight">
                        Pantau lonjakan di grafik.
                    </p>
                </div>
            </div>

            {/* Growth Chart */}
            <div className="grid grid-cols-1">
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="px-7 pt-7 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Pertumbuhan Per Layanan</h3>
                            <p className="text-sm text-slate-500">Distribusi anggota berlangganan dalam 6 bulan terakhir.</p>
                        </div>
                    </div>
                    <div className="p-7">
                        <OverviewChart data={stats.chartData} serviceNames={stats.serviceNames} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
