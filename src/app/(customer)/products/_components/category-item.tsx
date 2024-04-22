"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryItemProps = {
  label: string;
  value?: string;
};

const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("name");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          name: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-5 text-sm text-slate-900 border border-gray-300 rounded-full flex items-center gap-x-1 hover:border-slate-800 transition",
        isSelected && "border-slate-900 bg-slate-100 text-slate-900"
      )}
      type="button"
    >
      <span className="truncate">{label}</span>
    </button>
  );
};

export default CategoryItem;
