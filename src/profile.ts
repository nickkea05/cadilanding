import { APP_STORE_URL, SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

export type ProfileCard = {
  username: string;
  display_name: string;
  avatar_url: string | null;
  is_ambassador: boolean;
  is_public: boolean;
  handicap: number | null;
  followers: number | null;
  following: number | null;
  played_count: number | null;
  top_region: { region: string; is_state: boolean } | null;
  top_courses: { name: string; city: string | null; state: string | null; score: number }[] | null;
};

declare global {
  interface Window {
    __CADI_PROFILE__?: ProfileCard | null;
  }
}

export const HANDLE_RE = /^[a-z0-9_]{3,20}$/;

export async function fetchProfileCard(handle: string): Promise<ProfileCard | null> {
  if (!HANDLE_RE.test(handle)) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/public_profile_card`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_username: handle }),
  });
  if (!res.ok) return null;
  return (await res.json()) as ProfileCard | null;
}

/** The profile card the edge function inlined into the page, or a fresh fetch (local dev). */
export async function loadProfileCard(handle: string): Promise<ProfileCard | null> {
  if (window.__CADI_PROFILE__ !== undefined) return window.__CADI_PROFILE__;
  return fetchProfileCard(handle).catch(() => null);
}

function legacyCopy(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(el);
  }
}

/**
 * "Get Cadi" from a profile page: put the invite link on the clipboard (as a URL, so the
 * app can detect it without a paste prompt), then go to the App Store. The app's
 * "Who invited you?" step reads it back.
 */
export async function copyInviteAndOpenStore(handle: string) {
  const link = `https://cadigolf.app/@${handle}`;
  try {
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([link], { type: "text/plain" }),
          "text/uri-list": new Blob([link], { type: "text/uri-list" }),
        }),
      ]);
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
    } else {
      legacyCopy(link);
    }
  } catch {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      legacyCopy(link);
    }
  }
  window.location.href = APP_STORE_URL;
}
