"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx-js-style";
import { formatWhatsAppNumber } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExportExcelButton({ pools }: { pools: any[] }) {
    const handleExport = () => {
        const workbook = XLSX.utils.book_new();

        // 1. Group Pools by Month-Year (e.g. "Februari 2026")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const poolsByMonth: Record<string, any[]> = {};

        pools.forEach(pool => {
            const date = new Date(pool.createdAt);
            const monthYear = date.toLocaleDateString("id-ID", { month: 'long', year: 'numeric' });
            if (!poolsByMonth[monthYear]) {
                poolsByMonth[monthYear] = [];
            }
            poolsByMonth[monthYear].push(pool);
        });

        // Styles
        const headerStyle = {
            fill: { fgColor: { rgb: "1D4ED8" } }, // Blue-700
            font: { bold: true, color: { rgb: "FFFFFF" }, name: "Arial", sz: 11 },
            alignment: { vertical: "center", horizontal: "left" },
            border: {
                top: { style: "thin", color: { auto: 1 } },
                bottom: { style: "thin", color: { auto: 1 } },
                left: { style: "thin", color: { auto: 1 } },
                right: { style: "thin", color: { auto: 1 } }
            }
        };

        const subHeaderStyle = {
            fill: { fgColor: { rgb: "F3F4F6" } }, // Gray-100
            font: { bold: true, color: { rgb: "111827" }, name: "Arial" },
            border: {
                top: { style: "thin", color: { auto: 1 } },
                bottom: { style: "thin", color: { auto: 1 } },
                left: { style: "thin", color: { auto: 1 } },
                right: { style: "thin", color: { auto: 1 } }
            }
        };

        const cellStyle = {
            font: { name: "Arial", sz: 10 },
            border: {
                top: { style: "thin", color: { auto: 1 } },
                bottom: { style: "thin", color: { auto: 1 } },
                left: { style: "thin", color: { auto: 1 } },
                right: { style: "thin", color: { auto: 1 } }
            }
        };

        const titleStyle = {
            font: { bold: true, sz: 14, name: "Arial", color: { rgb: "111827" } },
            alignment: { vertical: "center" }
        };

        // 2. Iterate each month group to create a sheet
        Object.entries(poolsByMonth).forEach(([monthName, monthPools]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const exportData: any[] = [];
            
            // Push Title
            exportData.push([{ v: `LAPORAN PEMBELIAN AKUN & ROMBONGAN - ${monthName.toUpperCase()}`, s: titleStyle }, null, null, null, null, null]);
            exportData.push([null, null, null, null, null, null]);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            monthPools.forEach((pool: any) => {
                const tglBuat = new Date(pool.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' });
                const jatuhTempo = pool.endDate ? new Date(pool.endDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-";

                // Group Data Header
                exportData.push([
                    { v: "Detail Rombongan", s: headerStyle },
                    { v: "Informasi", s: headerStyle },
                    null, null, null, null
                ]);

                // Group Info Rows
                exportData.push([{ v: "Layanan", s: subHeaderStyle }, { v: pool.service.name, s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Nama Rombongan", s: subHeaderStyle }, { v: pool.name, s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Tgl Pembuatan", s: subHeaderStyle }, { v: tglBuat, s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Status Grup", s: subHeaderStyle }, { v: pool.status, s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Kedaluwarsa", s: subHeaderStyle }, { v: jatuhTempo, s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Email Server (Grup)", s: subHeaderStyle }, { v: pool.masterEmail || "Belum ditentukan", s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Password", s: subHeaderStyle }, { v: pool.password || "-", s: cellStyle }, null, null, null, null]);
                exportData.push([{ v: "Kapasitas Terisi", s: subHeaderStyle }, { v: `${pool.seats.length} / ${pool.targetSeats}`, s: cellStyle }, null, null, null, null]);
                
                exportData.push([null, null, null, null, null, null]); // Spacing

                // Members Table Header
                exportData.push([
                    { v: "No", s: headerStyle },
                    { v: "Nama Pelanggan", s: headerStyle },
                    { v: "Nomor WhatsApp", s: headerStyle },
                    { v: "Email Pelanggan", s: headerStyle },
                    { v: "Status Bayar", s: headerStyle },
                    { v: "Tgl Bergabung", s: headerStyle }
                ]);

                // Members Data Rows
                if (pool.seats.length === 0) {
                    exportData.push([
                        { v: "-", s: cellStyle },
                        { v: "Belum ada anggota", s: cellStyle },
                        { v: "-", s: cellStyle },
                        { v: "-", s: cellStyle },
                        { v: "-", s: cellStyle },
                        { v: "-", s: cellStyle }
                    ]);
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    pool.seats.forEach((seat: any, i: number) => {
                        exportData.push([
                            { v: (i + 1).toString(), s: cellStyle },
                            { v: seat.member.name, s: cellStyle },
                            { v: seat.member.phone ? formatWhatsAppNumber(seat.member.phone) : "-", s: cellStyle },
                            { v: seat.member.email, s: cellStyle },
                            { v: seat.status, s: cellStyle },
                            { v: new Date(seat.joinedAt).toLocaleDateString("id-ID"), s: cellStyle }
                        ]);
                    });
                }

                // Two blank lines spacing behind pool chunks
                exportData.push([null, null, null, null, null, null]);
                exportData.push([null, null, null, null, null, null]);
            });

            const worksheet = XLSX.utils.aoa_to_sheet(exportData);
            
            // Set Column Widths for readability
            worksheet["!cols"] = [
                { wch: 25 }, // Col A 
                { wch: 35 }, // Col B 
                { wch: 20 }, // Col C 
                { wch: 30 }, // Col D 
                { wch: 18 }, // Col E 
                { wch: 15 }  // Col F 
            ];

            // Attach Worksheet to Workbook
            // Sheet name max length in Excel is 31 chars, so we format it nicely
            const sheetName = monthName.substring(0, 31);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        });

        if (Object.keys(poolsByMonth).length === 0) {
            // Fallback for empty state
            const emptyWs = XLSX.utils.aoa_to_sheet([["Data Kosong"]]);
            XLSX.utils.book_append_sheet(workbook, emptyWs, "Kosong");
        }

        XLSX.writeFile(workbook, "Rekap Laporan Data Akun.xlsx");
    };

    return (
        <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
            className="h-9 gap-2 text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-900"
            disabled={pools.length === 0}
        >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download Excel</span>
        </Button>
    );
}
