"use server";

import db from "@/lib/db";
import { notFound } from "next/navigation";

export async function deleteOrder(id: string) {
  const sale = await db.order.delete({
    where: { id },
  });

  if (sale == null) return notFound();

  return sale;
}
