import db from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.productId },
      select: { filePath: true, name: true },
    });

    if (product == null) return notFound();

    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split(".").pop();

    return new NextResponse(file, {
      headers: {
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
        "Content-Length": size.toString(),
      },
    });
  } catch (error) {
    console.log("[DOWNLOAD]- " + error);
  }
}
