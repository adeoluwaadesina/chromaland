import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  message: z.string().min(10),
  source: z.string().optional().default("website"),
  reason: z.string().optional().default(""),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = contactSchema.parse(payload);

    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] enquiry received", data);
    }

    // TODO: integrate transactional email delivery.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] submission failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request payload.",
      },
      { status: 400 },
    );
  }
}
