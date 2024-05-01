"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RANGE_OPTIONS } from "@/lib/range-options";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

type ChartCardProps = {
  title: string;
  queryKey: string;
  children: React.ReactNode;
  selectedRangeLabel: string;
};

export function ChartCard({
  title,
  queryKey,
  children,
  selectedRangeLabel,
}: ChartCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  const setRange = (range: keyof typeof RANGE_OPTIONS | DateRange) => {
    const params = new URLSearchParams(searchParams);
    if (typeof range == "string") {
      params.set(queryKey, range);
      params.delete(`${queryKey}Form`);
      params.delete(`${queryKey}To`);
    } else {
      if (range.from == null || range.to == null) return;
      params.delete(queryKey);
      params.set(`${queryKey}From`, range.from.toISOString());
      params.set(`${queryKey}To`, range.to.toISOString());
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <section className="flex gap-5 items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>{selectedRangeLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(RANGE_OPTIONS).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setRange(key as keyof typeof RANGE_OPTIONS)}
                >
                  {value.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <section>
                    <Calendar
                      mode="range"
                      disabled={new Date()}
                      selected={dateRange}
                      defaultMonth={dateRange?.from}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                    <DropdownMenuItem>
                      <Button
                        onClick={() => {
                          if (dateRange == null) return;
                          setRange(dateRange);
                        }}
                        disabled={dateRange == null}
                        variant="black"
                        className="w-full"
                      >
                        Submit
                      </Button>
                    </DropdownMenuItem>
                  </section>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
