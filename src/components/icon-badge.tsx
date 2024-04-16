import { LucideIcon } from "lucide-react";
import { cva, type VariantProps }  from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-orange/80",
        success: "text-emerald-700",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4",
        md: 'h-5 w-5'
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends IconVariantsProps {
  icon: LucideIcon;
};

export const IconBadge = ({
  icon: Icon,
  variant,
  size,
}: IconBadgeProps) => {
  return (
    <div>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  )
};