"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RANGE_OPTIONS } from "@/lib/range-options";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ChartCardProps = {
  title: string;
  queryKey: string;
  children: React.ReactNode;
  selectedRangeLabel: string
};

export function ChartCard({ title, queryKey, children, selectedRangeLabel }: ChartCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setRange = (range: keyof typeof RANGE_OPTIONS) => {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, range);
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
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
