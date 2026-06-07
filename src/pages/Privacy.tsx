import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../Layout";

const colors = {
  navy: "#1B2A4A",
  bg: "#F3F6FB",
  body: "#1A1A1A",
};

const font = "'Cormorant Garamond', Georgia, serif";

export function Privacy() {
  useEffect(() => {
    if (document.getElementById("termly-jssdk")) return;
    const s = document.createElement("script");
    s.id = "termly-jssdk";
    s.src = "https://app.termly.io/embed-policy.min.js";
    document.body.appendChild(s);
  }, []);

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

      <main style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "2rem", boxSizing: "border-box" }}>
        <div dangerouslySetInnerHTML={{ __html: '<div name="termly-embed" data-id="426a970b-64af-4205-8f7a-c513aff4b906"></div>' }} />
      </main>

      <Footer />
    </div>
  );
}
