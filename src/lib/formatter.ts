import { DiscountCodeType } from "@prisma/client";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(num: number) {
  return NUMBER_FORMATTER.format(num);
}

const FORMAT_PERCENTAGE = new Intl.NumberFormat("en-US", { style: "percent" });

export function formatDiscountCode({
  discountAmount,
  discountType,
}: {
  discountAmount: number;
  discountType: DiscountCodeType;
}) {
  switch (discountType) {
    case "PERCENTAGE":
      return FORMAT_PERCENTAGE.format(discountAmount / 100);
    case "FIXED":
      return formatCurrency(discountAmount);
    default:
      throw new Error(`Invalid discount code ${discountType satisfies never}`);
  }
}

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
});

export function formatDateTime(date: Date) {
    return DATE_TIME_FORMAT.format(date)
}
