import Stripe from "stripe";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import PurchaseReceipt from "@/email/purchase-receipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const discountCodeId = charge.metadata.discountCodeId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents, discountCodeId } },
    };
    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    if (discountCodeId != null) {
      await db.discountCode.update({
        where: { id: discountCodeId },
        data: {
          uses: { increment: 1 },
        },
      });
    }

    const downloadVerificationId = downloadVerification.id;

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: PurchaseReceipt({ order, product, downloadVerificationId }),
    });
  }

  return new NextResponse();
}
