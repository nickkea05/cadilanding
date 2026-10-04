import { Link } from "react-router-dom";
import { Footer } from "../Layout";
import { AppStoreBadge } from "../AppStoreBadge";

const colors = {
  navy: "#1B2A4A",
  bg: "#F3F6FB",
  secondary: "#7A8BA0",
  muted: "#A3B1C6",
  surface: "#FFFFFF",
  body: "#1A1A1A",
};

const font = "'Cormorant Garamond', Georgia, serif";

const COPY = {
  course: {
    title: "A course worth playing",
    body: "Someone shared a course with you on Cadi. Open it in the app to see ratings, photos, and notes from golfers.",
  },
  profile: {
    title: "A golfer on Cadi",
    body: "Someone shared their Cadi profile with you. Open it in the app to see the courses they've played and how they rate them.",
  },
  invite: {
    title: "You're invited to Cadi",
    body: "A friend invited you to Cadi — the digital clubhouse for rating, sharing, and discovering golf courses.",
  },
} as const;

export function OpenInApp({ kind }: { kind: keyof typeof COPY }) {
  const { title, body } = COPY[kind];

  return (
    <div
      className="page-root"
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: font,
        color: colors.body,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ padding: "2rem 2rem 1rem", maxWidth: 900, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        <Link to="/" style={{ fontFamily: font, fontWeight: 700, fontStyle: "italic", fontSize: "2.5rem", color: colors.navy, textDecoration: "none", letterSpacing: "0.02em" }}>
          cadi
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: font, fontWeight: 700, fontSize: "2.75rem", color: colors.navy, margin: "0 0 1rem", lineHeight: 1.2 }}>
          {title}
        </h1>

        <p style={{ fontFamily: font, fontWeight: 500, fontSize: "1.1rem", lineHeight: 1.6, color: colors.secondary, margin: "0 0 2.5rem", maxWidth: 420 }}>
          {body}
        </p>

        <AppStoreBadge />

        <p style={{ fontFamily: font, fontWeight: 300, fontSize: "0.8rem", color: colors.muted, marginTop: "1.25rem", letterSpacing: "0.04em", maxWidth: 360 }}>
          Already have Cadi? Opening this link on your iPhone takes you straight there.
        </p>
      </main>

      <Footer />
    </div>
  );
}
