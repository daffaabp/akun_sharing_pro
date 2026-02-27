"use client";

import { MessageCircle, X, ListPlus, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { processFollowUpCancel, processFollowUpRenew } from "@/app/actions/members";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
        id: string; // added member id
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FollowUpTable({ followUps, pools }: { followUps: FollowUp[], pools: any[] }) {
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
                            // Hitung secara paten berdasar jam Asia/Jakarta biar sinkron dengan backend vercel maupun browser Client.
                            const nowStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
                            const today = new Date(nowStr);
                            today.setHours(0, 0, 0, 0);

                            const endDate = new Date(seat.pool.endDate!);
                            const endStr = endDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
                            const targetDate = new Date(endStr);
                            targetDate.setHours(0, 0, 0, 0);

                            const diffTime = targetDate.getTime() - today.getTime();
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

                                            <FollowUpActionButtons seat={seat} pools={pools} />
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

function FollowUpActionButtons({ seat, pools }: { seat: FollowUp, pools: any[] }) {
    const [isPending, startTransition] = useTransition();
    const [openRenew, setOpenRenew] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);

    // Form states for Renew
    const [poolId, setPoolId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("PENDING");
    const [notes, setNotes] = useState("");

    const handleCancel = () => {
        startTransition(async () => {
            try {
                await processFollowUpCancel(seat.id);
                toast.success("Catatan dihapus (berhenti).");
                setOpenCancel(false);
            } catch (error) {
                toast.error("Gagal menghapus antrean");
            }
        });
    };

    const handleRenew = () => {
        if (!poolId) {
            toast.error("Pilih pool (kloter) tujuan!");
            return;
        }
        startTransition(async () => {
            try {
                await processFollowUpRenew(seat.id, seat.member.id, poolId, paymentStatus, notes);
                toast.success("Berhasil didata & dipindah antrean!");
                setOpenRenew(false);
            } catch (error) {
                toast.error("Gagal memproses perpanjangan");
            }
        });
    };

    return (
        <div className="flex items-center gap-1.5 ml-2 border-l pl-3 border-slate-200">
            {/* RENEW BUTTON */}
            <Dialog open={openRenew} onOpenChange={setOpenRenew}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-[34px] bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm" title="Perpanjang & Pindah Ke Kloter">
                        <ListPlus className="w-4 h-4 mr-1.5" />
                        Perpanjang
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Perpanjang Akun ({seat.member.name})</DialogTitle>
                        <DialogDescription>
                            Pindahkan langganan ini ke kloter (Pool) berikutnya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Kloter Tujuan (Berstatus OPEN)</Label>
                            <Select value={poolId} onValueChange={setPoolId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih pool antrean..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {pools.length === 0 && <SelectItem value="none" disabled>Tidak ada pool tersedia.</SelectItem>}
                                    {pools.map(p => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name} ({p.service.name})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Status Pembayaran</Label>
                            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PAID">Sudah Lunas (PAID)</SelectItem>
                                    <SelectItem value="PENDING">Belum Bayar (PENDING)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tambahkan Catatan Pendek</Label>
                            <Textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Contoh: Janji transfer awal bulan depan..." 
                                className="resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpenRenew(false)}>Batal</Button>
                        <Button onClick={handleRenew} disabled={isPending || !poolId}>
                            {isPending ? "Memproses..." : "Simpan & Pindahkan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* CANCEL BUTTON */}
            <Dialog open={openCancel} onOpenChange={setOpenCancel}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-[34px] w-[34px] bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200 shadow-sm" title="Berhenti (Coret dari daftar)">
                        <XCircle className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Coret Pelanggan</DialogTitle>
                        <DialogDescription>
                            Anda yakin pelanggan <b>{seat.member.name}</b> memilih berhenti / tidak perpanjang? 
                            Aksi ini akan menghapus {seat.member.name} dari layar "Antrean Tagihan".
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="ghost" onClick={() => setOpenCancel(false)}>Kembali</Button>
                        <Button variant="destructive" onClick={handleCancel} disabled={isPending}>
                            {isPending ? "Memproses..." : "Ya, Berhenti"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}


