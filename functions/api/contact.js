// Cloudflare Pages Function — handles POST /api/contact
// Sends the contact form submission as an email via Resend (https://resend.com).
//
// Setup:
// 1. Create a free Resend account and verify a sending domain (or use their
//    onboarding@resend.dev sender for testing, already set as the default below).
// 2. In the Cloudflare Pages dashboard: Settings -> Environment variables,
//    add a secret named RESEND_API_KEY with your Resend API key.
//    Do this for both Production and Preview environments.
// 3. Once you have a verified domain in Resend, update FROM_ADDRESS below to
//    something like "Alexander Hu Website <contact@alexanderhu.com>".

const TO_ADDRESS = "alexhucomposer@gmail.com";
const FROM_ADDRESS = "Alexander Hu Website <onboarding@resend.dev>";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are all required." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return jsonResponse({ error: "Email sending is not configured yet." }, 500);
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: email,
      subject: `New message from ${name} via alexanderhu website`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errText = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errText);
    return jsonResponse({ error: "Failed to send message. Please try again later." }, 502);
  }

  return jsonResponse({ success: true });
}

// Reject non-POST methods with a clear error instead of Cloudflare's default 404.
export async function onRequestGet() {
  return jsonResponse({ error: "Method not allowed. Use POST." }, 405);
}
