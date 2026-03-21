import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// Simple in-memory rate limiter: 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  entry.count++;
  return entry.count > 5;
}

function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  const atIndex = email.indexOf("@");
  if (atIndex < 1) return false;
  const domain = email.slice(atIndex + 1);
  return domain.includes(".");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { status: "error", message: "Too many requests" },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }

  const rawEmail = body.email;
  if (!rawEmail || typeof rawEmail !== "string" || !isValidEmail(rawEmail.trim())) {
    return NextResponse.json(
      { status: "error", message: "Invalid email address" },
      { status: 400 }
    );
  }

  const email = rawEmail.trim().toLowerCase();

  try {
    await sql`INSERT INTO waitlist (email) VALUES (${email})`;
  } catch (error: unknown) {
    // Unique violation — already signed up
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "23505"
    ) {
      return NextResponse.json({ status: "already_signed_up" });
    }
    console.error("DB insert error:", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Best-effort confirmation email
  try {
    await getResend().emails.send({
      from: process.env.EMAIL_FROM ?? "Toffee <onboarding@resend.dev>",
      to: email,
      subject: "You're on the Toffee waitlist!",
      text: "Thanks for signing up for Toffee! We'll let you know when it's your turn.",
    });
  } catch (error) {
    console.error("Resend error:", error);
  }

  return NextResponse.json({ status: "success" });
}
