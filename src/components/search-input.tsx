"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          name: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Products"
        className="focus-visible:outline-none focus-visible:ring-0 rounded-md text-slate-500 pl-10 "
        disabled={pathname !== "/products"}
      />
      <Search
        className={cn(
          "absolute left-3 top-3 bottom-0 w-4 h-4 text-slate-500 hover:opacity-90 transition",
          pathname !== "/products" && "opacity-40"
        )}
      />
    </div>
  );
};

export default SearchInput;
