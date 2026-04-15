interface Env {
  WAITLIST_DB: D1Database;
  RESEND_API_KEY: string;
}

const INIT_SQL = `CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
)`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function buildWelcomeEmail(): string {
  const cg = "'Cormorant Garamond',Georgia,serif";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>you're on the list</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,700&display=swap');
</style>
</head>
<body style="margin:0;padding:0;background-color:#F3F6FB;font-family:${cg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F6FB;padding:48px 0;">
<tr><td align="center">
<table role="presentation" width="540" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:8px;overflow:hidden;max-width:540px;width:100%;">

  <!-- Body -->
  <tr>
    <td style="padding:48px 44px 52px;">

      <!-- Headline -->
      <p style="font-family:${cg};font-weight:700;font-size:32px;line-height:1.2;color:#1B2A4A;margin:0 0 32px;">
        you're one of the first to know.
      </p>

      <!-- Launch date -->
      <p style="font-family:${cg};font-weight:500;font-size:18px;line-height:1.65;color:#1A1A1A;margin:0 0 8px;">
        cadi is coming may 2026
      </p>

      <!-- Description -->
      <p style="font-family:${cg};font-weight:300;font-size:16px;line-height:1.65;color:#7A8BA0;margin:0 0 32px;">
        the app where golfers rate and rank every course they've ever played.
      </p>

      <!-- Founding member callout -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
        <tr>
          <td style="background-color:#1B2A4A;padding:24px 28px;border-radius:6px;text-align:center;">
            <p style="font-family:${cg};font-weight:700;font-size:18px;line-height:1.5;color:#FFFFFF;margin:0;letter-spacing:0.02em;">
              founding member access is limited to the first 500 signups.
            </p>
          </td>
        </tr>
      </table>

      <!-- Confirmation stamp -->
      <p style="font-family:${cg};font-weight:700;font-size:22px;line-height:1.3;color:#1B2A4A;margin:0 0 32px;letter-spacing:0.01em;">
        you're in line.
      </p>

      <!-- Whisper -->
      <p style="font-family:${cg};font-weight:300;font-size:14px;line-height:1.6;color:#A3B1C6;margin:0 0 44px;letter-spacing:0.02em;">
        we'll be in touch when the doors open.
      </p>

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:0 0 24px;" />

      <!-- Signature -->
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:16px;vertical-align:middle;">
            <span style="font-family:${cg};font-weight:700;font-style:italic;font-size:28px;color:#1B2A4A;letter-spacing:0.02em;line-height:1;">cadi</span>
          </td>
          <td style="border-left:1.5px solid #E2E8F0;padding-left:16px;vertical-align:middle;">
            <p style="font-family:${cg};font-weight:500;font-size:13px;line-height:1.5;color:#7A8BA0;margin:0 0 2px;">
              the cadi team
            </p>
            <a href="https://cadigolf.app" style="font-family:${cg};font-weight:500;font-size:13px;color:#1B2A4A;letter-spacing:0.03em;text-decoration:none;">
              cadigolf.app
            </a>
            <p style="margin:8px 0 0;line-height:1;">
              <a href="https://www.instagram.com/cadigolfapp/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;margin-right:10px;">
                <!--[if mso]><img src="" width="18" height="18" /><![endif]-->
                <!--[if !mso]><!--><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B2A4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="#1B2A4A" stroke="none"/></svg><!--<![endif]-->
              </a>
              <a href="https://www.tiktok.com/@joincadi" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                <!--[if !mso]><!--><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1B2A4A"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.29 0 .58.04.84.11v-3.5a6.37 6.37 0 0 0-.84-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg><!--<![endif]-->
              </a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

async function sendWelcomeEmail(email: string, apiKey: string): Promise<void> {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Cadi <team@cadigolf.app>",
      to: [email],
      subject: "you're on the list",
      html: buildWelcomeEmail(),
    }),
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !EMAIL_RE.test(email)) {
      return json({ ok: false, error: "Invalid email address" }, 400);
    }

    const normalised = email.toLowerCase().trim();

    await env.WAITLIST_DB.prepare(INIT_SQL).run();

    await env.WAITLIST_DB.prepare(
      "INSERT INTO signups (email) VALUES (?)"
    ).bind(normalised).run();

    // Fire-and-forget — don't block the response on email delivery
    if (env.RESEND_API_KEY) {
      try {
        await sendWelcomeEmail(normalised, env.RESEND_API_KEY);
      } catch { /* email failure shouldn't break signup */ }
    }

    return json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("UNIQUE constraint")) {
      return json({ ok: false, error: "You're already on the list!" }, 409);
    }
    return json({ ok: false, error: "Something went wrong" }, 500);
  }
};
