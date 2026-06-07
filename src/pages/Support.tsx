import { Link } from "react-router-dom";
import { Footer } from "../Layout";

const colors = {
  navy: "#1B2A4A",
  bg: "#F3F6FB",
  secondary: "#7A8BA0",
  muted: "#A3B1C6",
  surface: "#FFFFFF",
  body: "#1A1A1A",
};

const font = {
  heading: "'Cormorant Garamond', Georgia, serif",
  body: "'Cormorant Garamond', Georgia, serif",
};

export function Support() {
  return (
    <div
      className="page-root"
      style={{
        minHeight: "100vh",
        background: colors.bg,
        fontFamily: font.body,
        color: colors.body,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header style={{ padding: "2rem 2rem 1rem", maxWidth: 900, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        <Link to="/" style={{ fontFamily: font.heading, fontWeight: 700, fontStyle: "italic", fontSize: "2.5rem", color: colors.navy, textDecoration: "none", letterSpacing: "0.02em" }}>
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
        <h1
          style={{
            fontFamily: font.heading,
            fontWeight: 700,
            fontSize: "2.75rem",
            color: colors.navy,
            margin: "0 0 1rem",
            lineHeight: 1.2,
          }}
        >
          Support
        </h1>

        <p
          style={{
            fontFamily: font.body,
            fontWeight: 500,
            fontSize: "1.1rem",
            lineHeight: 1.6,
            color: colors.secondary,
            margin: "0 0 2.5rem",
            maxWidth: 420,
          }}
        >
          Have a question, found a bug, or need help with your account? Get in touch.
        </p>

        <a
          href="mailto:team@cadigolf.app?subject=Cadi%20Support%20Request"
          style={{
            fontFamily: font.heading,
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.9rem 2.5rem",
            background: colors.navy,
            color: colors.surface,
            border: "none",
            borderRadius: 8,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Email us
        </a>

        <p
          style={{
            fontFamily: font.body,
            fontWeight: 300,
            fontSize: "0.8rem",
            color: colors.muted,
            marginTop: "1.25rem",
            letterSpacing: "0.04em",
          }}
        >
          Or email us directly at{" "}
          <a
            href="mailto:team@cadigolf.app"
            style={{ color: colors.muted, textDecoration: "underline" }}
          >
            team@cadigolf.app
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}
