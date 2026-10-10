import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../src/config";

type Card = { username: string; display_name: string; avatar_url: string | null } | null;

const HANDLE_PATH = /^\/@([A-Za-z0-9_]{3,20})\/?$/;

async function rpc<T>(fn: string, body: unknown): Promise<T | null> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return null;
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : null;
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * cadigolf.app/@handle profile pages: drop Safari's App Store smart banner (it would
 * skip the "Get Cadi" button that copies the invite), add link-preview tags, inline the
 * profile so the page doesn't fetch it again, and count the visit.
 */
export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const match = url.pathname.match(HANDLE_PATH);
  if (!match || context.request.method !== "GET") return context.next();

  const handle = match[1].toLowerCase();
  const [response, card] = await Promise.all([
    context.next(),
    rpc<Card>("public_profile_card", { p_username: handle }).catch(() => null),
  ]);

  if (card) {
    context.waitUntil(rpc("log_link_visit", { p_username: handle }).catch(() => null));
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const title = card ? `${card.display_name} (@${card.username}) on Cadi` : "Cadi – Rate & Share Golf Courses";
  const description = card
    ? `See the courses ${card.display_name} has played and how they rate them. Join Cadi, free on iPhone.`
    : "Rate and share your favorite golf courses with your friends.";
  const inline = JSON.stringify(card ?? null).replace(/</g, "\\u003c");

  const meta = [
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="https://cadigolf.app/@${handle}" />`,
    `<meta property="og:type" content="profile" />`,
    card?.avatar_url ? `<meta property="og:image" content="${escapeAttr(card.avatar_url)}" />` : "",
    `<meta name="twitter:card" content="summary" />`,
    `<script>window.__CADI_PROFILE__=${inline};</script>`,
  ].join("");

  return new HTMLRewriter()
    .on('meta[name="apple-itunes-app"]', { element: (el) => { el.remove(); } })
    .on("title", { element: (el) => { el.setInnerContent(title); } })
    .on("head", { element: (el) => { el.append(meta, { html: true }); } })
    .transform(response);
};
