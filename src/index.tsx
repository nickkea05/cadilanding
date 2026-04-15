import { useState } from "react";

const colors = {
  navy: "#1B2A4A",
  bg: "#F3F6FB",
  surface: "#FFFFFF",
  muted: "#A3B1C6",
  secondary: "#7A8BA0",
  body: "#1A1A1A",
  gold: "#C9A96E",
};

const font = {
  logo: "'Cormorant Garamond', Georgia, serif",
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'Cormorant Garamond', Georgia, serif",
};

const container: React.CSSProperties = {
  maxWidth: 1200,
  width: "100%",
  margin: "0 auto",
  padding: "0 2rem",
  boxSizing: "border-box",
};

/* ─── Social icons ─── */

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={colors.navy} stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={colors.navy}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.29 0 .58.04.84.11v-3.5a6.37 6.37 0 0 0-.84-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z" />
    </svg>
  );
}

/* ─── Main page ─── */

export function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setStatus("success");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Unable to connect — try again");
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        background: colors.bg,
        fontFamily: font.body,
        color: colors.body,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ─── Top bar ─── */}
      <header
        style={{
          ...container,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "2.25rem",
          paddingBottom: "1rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: font.logo,
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "3.25rem",
            color: colors.navy,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          cadi
        </span>

        <nav style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <a href="https://www.instagram.com/cadigolfapp/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={iconLinkStyle}>
            <InstagramIcon />
          </a>
          <a href="https://www.tiktok.com/@joincadi" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={iconLinkStyle}>
            <TikTokIcon />
          </a>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <main
        style={{
          ...container,
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "5rem",
        }}
      >
        {/* Left — copy + waitlist */}
        <div
          style={{
            flex: "1 1 0",
            textAlign: "center",
            paddingRight: "1rem",
          }}
        >
          <h1
            style={{
              fontFamily: font.heading,
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 3.8vw, 3.25rem)",
              lineHeight: 1.2,
              color: colors.navy,
              margin: "0 0 1.75rem",
              whiteSpace: "nowrap",
            }}
          >
            Rate and share your favorite
            <br />
            golf courses with
            <br />
            your friends
          </h1>

          <p
            style={{
              fontFamily: font.body,
              fontWeight: 500,
              fontSize: "clamp(0.7rem, 0.95vw, 0.88rem)",
              lineHeight: 1.6,
              color: colors.secondary,
              margin: "0 0 1.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Join the waitlist — launching May 2026
          </p>

          {status === "success" || status === "duplicate" ? (
            <p
              style={{
                fontFamily: font.heading,
                fontWeight: 700,
                fontSize: "1.1rem",
                color: colors.navy,
                letterSpacing: "0.06em",
                margin: 0,
              }}
            >
              {status === "duplicate" ? "You\u2019re already on the list!" : "You\u2019re on the list."}
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "0 auto" }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                disabled={status === "loading"}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontFamily: font.body,
                  fontWeight: 500,
                  fontSize: "1rem",
                  width: "100%",
                  padding: "0.75rem 0",
                  background: "transparent",
                  border: "none",
                  borderBottom: `1.5px solid ${colors.muted}`,
                  color: colors.body,
                  outline: "none",
                  textAlign: "center",
                  letterSpacing: "0.04em",
                  boxSizing: "border-box",
                  opacity: status === "loading" ? 0.5 : 1,
                }}
              />
              <p
                style={{
                  fontFamily: font.body,
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  color: status === "error" ? "#c0392b" : colors.muted,
                  marginTop: "0.6rem",
                  letterSpacing: "0.06em",
                }}
              >
                {status === "error" ? errorMsg : status === "loading" ? "Joining..." : "Press Enter to join"}
              </p>
            </form>
          )}
        </div>

        {/* Right — phone mockup */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/mockup.png"
            alt="Cadi app"
            style={{
              height: "min(86vh, 780px)",
              width: "auto",
              filter: "drop-shadow(0 32px 80px rgba(27,42,74,0.28))",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </main>
    </div>
  );
}

const iconLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.7,
  transition: "opacity 0.2s",
  textDecoration: "none",
};
