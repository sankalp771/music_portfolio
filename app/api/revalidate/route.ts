import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = { _type?: string };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("SANITY_REVALIDATE_SECRET is not configured.");
    return NextResponse.json({ message: "Webhook is not configured." }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(request, secret, true);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    if (!body?._type || !["artist", "release"].includes(body._type)) {
      return NextResponse.json({ message: "Unsupported Sanity document type." }, { status: 400 });
    }

    // Release and artist content appears across the homepage, discography,
    // release pages, and nested track pages, so invalidate the app together.
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, documentType: body._type });
  } catch (error) {
    console.error("Sanity webhook verification failed.", error);
    return NextResponse.json({ message: "Webhook request could not be processed." }, { status: 400 });
  }
}
