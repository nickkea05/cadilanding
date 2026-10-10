import type { ReactNode } from "react";
import { Footer } from "./Layout";
import { AppStoreBadge } from "./AppStoreBadge";

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

type AppProps = {
  /** Replaces the phone mockup image (profile pages show the person's profile). */
  phone?: ReactNode;
  /** Replaces the App Store link's default navigation. */
  onGetApp?: () => void;
};

export function App({ phone, onGetApp }: AppProps = {}) {
  return (
    <div
      className="page-root"
      style={{
        margin: 0,
        height: "100vh",
        background: colors.bg,
        fontFamily: font.body,
        color: colors.body,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ─── Top bar ─── */}
      <header
        className="top-bar"
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
          className="logo"
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
        className="hero"
        style={{
          ...container,
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          gap: "5rem",
        }}
      >
        {/* Left — copy + download */}
        <div
          className="hero-copy"
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
            className="subtitle"
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
            The digital clubhouse — free on iPhone
          </p>

          <AppStoreBadge onClick={onGetApp} />
        </div>

        {/* Right — phone mockup */}
        <div
          className="hero-mockup"
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {phone ?? (
            <img
              className="mockup-img"
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
          )}
        </div>
      </main>

      <Footer />
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
