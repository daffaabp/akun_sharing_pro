"use server";

import { db } from "@/lib/db";

// Membentangkan 6 bulan ke belakang
function getLast6Months() {
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push({
            year: d.getFullYear(),
            month: d.getMonth(), // 0-based
            name: d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" })
        });
    }
    return months;
}

export async function getDashboardStats() {
    // 1. Total Pelanggan Aktif / Pernah Aktif (tidak Canceled)
    const totalUsers = await db.poolSeat.count({
        where: {
            status: { not: "CANCELED" }
        }
    });

    // 2. Layanan yg Paling Diminati (Hitung jumlah kolam/seat unik?)
    // Cukup count seat di tiap service (Hanya query database jika memang diperlukan di return, saat ini belum dipakai tetapi logic disiapkan)
    // const serviceLabels = await db.service.findMany({ select: { name: true, _count: { select: { pools: true } } } });

    // 3. Data Bulanan untuk Chart Recharts
    const sixMonths = getLast6Months();

    // Ambil data poolSeat gabungan untuk di looping
    const allSeats = await db.poolSeat.findMany({
        where: {
            status: { not: "CANCELED" }
        },
        include: {
            pool: {
                include: {
                    service: true
                }
            }
        }
    });

    // Susun template awal untuk chart berdasar Service yang ada
    const services = await db.service.findMany();
    const serviceNames = services.map(s => s.name);

    const chartData = sixMonths.map(m => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataPoint: Record<string, any> = { name: m.name };
        // Default nol untuk tiap service
        serviceNames.forEach(sn => dataPoint[sn] = 0);
        return { ...m, dataPoint, serviceNames };
    });

    // Leburkan data dari database ke Chart Template
    allSeats.forEach(seat => {
        const seatDate = new Date(seat.joinedAt);
        const y = seatDate.getFullYear();
        const m = seatDate.getMonth();

        // Cari apakah bulan & tahunnya ada di template 6 bulan terakhir
        const targetMonth = chartData.find(cd => cd.year === y && cd.month === m);

        if (targetMonth) {
            const svcName = seat.pool.service.name;
            if (targetMonth.dataPoint[svcName] !== undefined) {
                targetMonth.dataPoint[svcName] += 1;
            }
        }
    });

    const finalChart = chartData.map(cd => cd.dataPoint);

    // Hitung total Pools yang aktif (Sudah jalan atau minimal Ready)
    const activePools = await db.pool.count({
        where: {
            status: { in: ["ACTIVE", "READY"] }
        }
    });

    // Hitung total keseluruhan servis
    const totalServices = await db.service.count();

    return {
        totalUsers,
        activePools,
        totalServices,
        chartData: finalChart,
        serviceNames
    };
}
