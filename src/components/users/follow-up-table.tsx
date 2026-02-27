"use client";

import { MessageCircle } from "lucide-react";

type FollowUp = {
    id: string;
    pool: {
        endDate: Date | string | null;
        masterEmail: string | null;
        service: {
            name: string;
        };
    };
    member: {
        name: string;
        phone: string | null;
    };
};

function formatPhone(phone: string | null) {
    if (!phone) return null;
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.substring(1);
    }
    return cleaned;
}

export function FollowUpTable({ followUps }: { followUps: FollowUp[] }) {
    if (followUps.length === 0) {
        return (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-4 text-green-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Inbox Bersih!</h3>
                <p className="text-sm text-slate-500">Tidak ada antrean tagihan pelanggan hari ini.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subjek Pelanggan</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tagihan Layanan & Akun</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Urgensi Waktu / Jatuh Tempo</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {followUps.map((seat) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const endDate = new Date(seat.pool.endDate!);
                            const endDateMidnight = new Date(endDate);
                            endDateMidnight.setHours(0, 0, 0, 0);
                            
                            const diffTime = endDateMidnight.getTime() - today.getTime();
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            
                            let urgencyText = "";
                            let urgencyColor = "";
                            
                            if (diffDays === 0) {
                                // Tepat pada endDate sistem (yang diset H-1 dari aslinya)
                                urgencyText = "FOLLOW UP";
                                urgencyColor = "text-orange-700 bg-orange-100 border border-orange-200";
                            } else if (diffDays === -1) {
                                // Sistem mundur 1 hari = Hari aktual
                                urgencyText = "HARI INI";
                                urgencyColor = "text-rose-700 bg-rose-100 border border-rose-200";
                            } else if (diffDays < -1) {
                                // Sistem mundur lebih dari 1 hari 
                                const realLewat = Math.abs(diffDays) - 1;
                                urgencyText = realLewat === 0 ? "HARI INI" : "LEWAT " + realLewat + " HARI";
                                urgencyColor = "text-red-700 bg-red-100 border border-red-200";
                            } else {
                                // Failsafe (seharusnya tak ditarik query)
                                urgencyText = "H - " + diffDays;
                                urgencyColor = "text-amber-700 bg-amber-100 border border-amber-200";
                            }

                            const phone = formatPhone(seat.member.phone);
                            // Auto gen message WA
                            const serviceName = seat.pool.service.name;
                            const email = seat.pool.masterEmail;
                            const name = seat.member.name;
                            const formatTgl = endDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
                            
                            let statusMasa = "";
                            if (diffDays === 0) statusMasa = `hari ini tgl ${formatTgl}`;
                            else if (diffDays === -1 || (diffDays < -1 && Math.abs(diffDays) - 1 === 0)) statusMasa = `hari ini tgl ${formatTgl}`;
                            else statusMasa = `pada tgl ${formatTgl} yang lalu`;

                            const textWa = `Selamat pagi Bapak/Ibu..\nMohon maaf sebelumnya, Ijin konfirmasi terkait masa perpanjangan akun ${serviceName}\nMasa berlaku akan berakhir ${statusMasa}.\nUntuk biaya berlangganan Rp.100.000 / bulan\nBerkenan untuk memperpanjang atau berhenti berlangganan Bapak? 😊🙏`;

                            const waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(textWa)}` : null;

                            return (
                                <tr key={seat.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-slate-900">{name}</p>
                                            <p className="text-xs text-slate-500 font-mono mt-0.5">{seat.member.phone || "Tidak ada HP"}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className="text-sm font-bold text-slate-900">{serviceName}</span>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-tight bg-slate-100 text-slate-600 border border-slate-200">
                                                {email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5 items-start">
                                            <span className={`inline-flex flex-col justify-center px-2 py-0.5 rounded text-[11px] font-extrabold tracking-tight shadow-sm ${urgencyColor}`}>
                                                {urgencyText}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium ml-0.5">
                                                {endDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end items-center gap-3">
                                            <a
                                                href={waUrl || "#"}
                                                target={waUrl ? "_blank" : "_self"}
                                                rel="noreferrer"
                                                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-md transition-all shadow-sm
                                                    ${!waUrl ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-[#25D366] hover:bg-[#1faa53] text-white active:scale-95"}`}
                                                title={!waUrl ? "Tidak ada nomor WhatsApp" : "Kirim template penagihan via WA"}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Tagih (WA)
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
