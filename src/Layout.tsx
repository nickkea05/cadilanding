import { Link } from "react-router-dom";

const colors = {
  muted: "#A3B1C6",
  bg: "#F3F6FB",
};

const font = "'Cormorant Garamond', Georgia, serif";

export function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        padding: "1rem 2rem",
        textAlign: "center",
        flexShrink: 0,
        background: colors.bg,
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link to="/support" style={linkStyle}>
          Support
        </Link>
        <Link to="/privacy" style={linkStyle}>
          Privacy
        </Link>
        <Link to="/terms" style={linkStyle}>
          Terms
        </Link>
      </nav>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: font,
  fontWeight: 300,
  fontSize: "0.75rem",
  color: colors.muted,
  textDecoration: "none",
  letterSpacing: "0.06em",
};
