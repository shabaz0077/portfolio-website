import sgMail from "@sendgrid/mail";
import type { ContactRequest } from "@/types";

export async function sendContactEmail({ name, email, message }: ContactRequest) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const to = process.env.SENDGRID_TO_EMAIL ?? "shahbazahmed2001@outlook.com";

  if (!apiKey || apiKey.includes("xxxxxxxxxxxxx") || !from) {
    return {
      success: true,
      delivered: false,
      message: "Message received locally. Add a SendGrid API key to deliver email.",
    };
  }

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    to,
    from,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  });

  return {
    success: true,
    delivered: true,
    message: "Thanks for reaching out. Shahbaz will get back to you soon.",
  };
}
