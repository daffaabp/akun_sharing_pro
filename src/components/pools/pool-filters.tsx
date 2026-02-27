"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter } from "lucide-react";

export function PoolFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const overdue = searchParams.get("overdue");
    const notes = searchParams.get("notes") === "true";
    const sort = searchParams.get("sort") || "newest";

    let activeFilterCount = 0;
    if (overdue) activeFilterCount++;
    if (notes) activeFilterCount++;
    if (searchParams.get("sort")) activeFilterCount++;

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
                        <h4 className="font-semibold text-sm">Filters</h4>
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8">
                            Clear
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Urgency</h5>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="overdue-soon"
                                checked={overdue === "soon"}
                                onCheckedChange={(c) => handleOverdueChange(c === true ? "soon" : null)}
                            />
                            <Label htmlFor="overdue-soon" className="text-sm cursor-pointer leading-none">Overdue soon (&lt; 7 days)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="overdue-expired"
                                checked={overdue === "expired"}
                                onCheckedChange={(c) => handleOverdueChange(c === true ? "expired" : null)}
                            />
                            <Label htmlFor="overdue-expired" className="text-sm cursor-pointer leading-none">Already Expired</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Content</h5>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="has-notes"
                                checked={notes}
                                onCheckedChange={handleNotesChange}
                            />
                            <Label htmlFor="has-notes" className="text-sm cursor-pointer leading-none">Has Admin Notes</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="font-medium text-xs text-muted-foreground uppercase">Sorting</h5>
                        <RadioGroup value={sort} onValueChange={handleSortChange}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="newest" id="sort-newest" />
                                <Label htmlFor="sort-newest" className="text-sm cursor-pointer leading-none">Newest First</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="oldest" id="sort-oldest" />
                                <Label htmlFor="sort-oldest" className="text-sm cursor-pointer leading-none">Oldest First</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="closest" id="sort-closest" />
                                <Label htmlFor="sort-closest" className="text-sm cursor-pointer leading-none">End Date (Closest)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
