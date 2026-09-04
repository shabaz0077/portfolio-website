import { sendContactEmail } from "@/lib/sendgrid";
import { isValidEmail, sanitizeText } from "@/lib/utils";
import type { ContactRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;
    const name = sanitizeText(body.name ?? "", 80);
    const email = sanitizeText(body.email ?? "", 120);
    const message = sanitizeText(body.message ?? "", 2000);

    if (!name || !email || !message) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    const result = await sendContactEmail({ name, email, message });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Could not send your message." }, { status: 500 });
  }
}
