"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

const MONTHS = [
    { value: "all", label: "Semua Bulan" },
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" }
];

export function PoolFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const overdue = searchParams.get("overdue");
    const notes = searchParams.get("notes") === "true";
    const sort = searchParams.get("sort") || "newest";
    const month = searchParams.get("month") || "all";
    const currentYear = new Date().getFullYear().toString();
    const year = searchParams.get("year") || currentYear;

    let activeFilterCount = 0;
    if (overdue) activeFilterCount++;
    if (notes) activeFilterCount++;
    if (searchParams.get("sort")) activeFilterCount++;
    if (month !== "all") activeFilterCount++;

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null) {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleOverdueChange = (val: string | null) => {
        router.push(pathname + "?" + createQueryString("overdue", val), { scroll: false });
    };

    const handleNotesChange = (checked: boolean | string) => {
        router.push(pathname + "?" + createQueryString("notes", checked === true ? "true" : null), { scroll: false });
    };

    const handleSortChange = (val: string) => {
        router.push(pathname + "?" + createQueryString("sort", val), { scroll: false });
    };

    const handleMonthChange = (val: string) => {
        let qs = createQueryString("month", val === "all" ? null : val);
        // Ensure year is set if filtering by month
        if (val !== "all" && !searchParams.has("year")) {
            const params = new URLSearchParams(qs);
            params.set("year", currentYear);
            qs = params.toString();
        }
        router.push(pathname + "?" + qs, { scroll: false });
    };

    const handleYearChange = (val: string) => {
        router.push(pathname + "?" + createQueryString("year", val), { scroll: false });
    };

    const clearFilters = () => {
        router.push(pathname, { scroll: false });
    };

    return (
        <Popover>
            <PopoverTrigger
                className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 ${activeFilterCount > 0 ? "bg-accent text-accent-foreground" : ""}`}
            >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                        {activeFilterCount}
                    </span>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Filter</h4>
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8">
                            Hapus
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Waktu Pembuatan</h5>
                        <div className="grid grid-cols-2 gap-2">
                            <Select value={month} onValueChange={handleMonthChange}>
                                <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="Pilih Bulan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MONTHS.map((m) => (
                                        <SelectItem key={m.value} value={m.value} className="text-xs">
                                            {m.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                            <Select value={year} onValueChange={handleYearChange} disabled={month === "all"}>
                                <SelectTrigger className="h-8 text-xs">
                                    <SelectValue placeholder="Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={(parseInt(currentYear) - 1).toString()} className="text-xs">{(parseInt(currentYear) - 1).toString()}</SelectItem>
                                    <SelectItem value={currentYear} className="text-xs">{currentYear}</SelectItem>
                                    <SelectItem value={(parseInt(currentYear) + 1).toString()} className="text-xs">{(parseInt(currentYear) + 1).toString()}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Tingkat Kegentingan</h5>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="overdue-soon"
                                checked={overdue === "soon"}
                                onCheckedChange={(c) => handleOverdueChange(c === true ? "soon" : null)}
                            />
                            <Label htmlFor="overdue-soon" className="text-sm cursor-pointer leading-none">Akan Jatuh Tempo (&lt; 7 Hari)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="overdue-expired"
                                checked={overdue === "expired"}
                                onCheckedChange={(c) => handleOverdueChange(c === true ? "expired" : null)}
                            />
                            <Label htmlFor="overdue-expired" className="text-sm cursor-pointer leading-none">Sudah Jatuh Tempo (Lewati Batas)</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Keterangan Tambahan</h5>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="has-notes"
                                checked={notes}
                                onCheckedChange={handleNotesChange}
                            />
                            <Label htmlFor="has-notes" className="text-sm cursor-pointer leading-none">Memiliki Catatan Admin</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Pengurutan Data</h5>
                        <RadioGroup value={sort} onValueChange={handleSortChange}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="newest" id="sort-newest" />
                                <Label htmlFor="sort-newest" className="text-sm cursor-pointer leading-none">Terbaru</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="oldest" id="sort-oldest" />
                                <Label htmlFor="sort-oldest" className="text-sm cursor-pointer leading-none">Terlama</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="closest" id="sort-closest" />
                                <Label htmlFor="sort-closest" className="text-sm cursor-pointer leading-none">Mendekati Jatuh Tempo</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
