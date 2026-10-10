import type { CSSProperties } from "react";
import type { ProfileCard } from "./profile";

// App palette (constants/theme.ts in the app).
const c = {
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  navy: "#1B2A4A",
  inkSoft: "#8B8779",
  silverSoft: "#E8E4D9",
  hairline: "rgba(201,194,176,0.45)",
};
const serif = "'Cormorant Garamond', Georgia, serif";

/** App points → width of the phone screen (390pt wide), so the mock scales with the image. */
const pt = (n: number) => `${(n / 390) * 100}cqw`;

const STATE_ABBR: Record<string, string> = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA", Colorado: "CO",
  Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY",
  Louisiana: "LA", Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI", Minnesota: "MN",
  Mississippi: "MS", Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH",
  "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
  Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI",
  "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT",
  Virginia: "VA", Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
};

const formatHandicap = (h: number | null) => (h == null ? "—" : h < 0 ? `+${Math.abs(h).toFixed(1)}` : h.toFixed(1));

// Scalloped seal, same geometry as the app's AmbassadorBadge.
const SEAL_PATH = (() => {
  const view = 24, points = 12, inner = 9.6, ctrl = 12.4, cc = view / 2;
  const step = (2 * Math.PI) / points;
  const p = (r: number, a: number) => `${(cc + r * Math.cos(a)).toFixed(2)} ${(cc + r * Math.sin(a)).toFixed(2)}`;
  let d = `M ${p(inner, -Math.PI / 2)}`;
  for (let i = 0; i < points; i++) {
    const a = -Math.PI / 2 + i * step;
    d += ` Q ${p(ctrl, a + step / 2)} ${p(inner, a + step)}`;
  }
  return `${d} Z`;
})();

function AmbassadorSeal() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: pt(15), height: pt(15) }} aria-label="Cadi Ambassador">
      <path d={SEAL_PATH} fill={c.navy} />
      <path d="M7.6 12.4 L10.6 15.3 L16.5 9.2" stroke={c.bg} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: pt(32), height: pt(32) }} fill={c.inkSoft}>
      <circle cx="12" cy="8" r="4.2" />
      <path d="M3.5 20.5c0-4.4 3.8-7.3 8.5-7.3s8.5 2.9 8.5 7.3z" />
    </svg>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const text = score.toFixed(1);
  return (
    <div
      style={{
        width: pt(40), height: pt(40), borderRadius: "50%", flexShrink: 0,
        border: `${pt(1.5)} solid rgba(139,135,121,0.31)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: serif, fontWeight: 700, color: c.navy,
        fontSize: pt(text.length > 3 ? 15 : 18), fontVariantNumeric: "lining-nums",
      }}
    >
      {text}
    </div>
  );
}

/** The person's Cadi profile, drawn the way the app shows it, sized to fill the phone screen. */
export function PhoneProfile({ card }: { card: ProfileCard }) {
  const region = card.top_region
    ? card.top_region.is_state ? STATE_ABBR[card.top_region.region] ?? card.top_region.region : card.top_region.region
    : "—";

  return (
    <div style={screen}>
      <div style={{ height: pt(58) }} />
      <div style={{ padding: `${pt(6)} ${pt(24)} ${pt(10)}`, fontFamily: serif, fontWeight: 700, fontSize: pt(24), color: c.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {card.display_name}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: `${pt(14)} 0` }}>
        <div style={{ width: pt(96), height: pt(96), borderRadius: "50%", background: c.surface, boxShadow: "0 4px 16px rgba(27,42,74,0.1)", border: `1px solid ${c.hairline}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: pt(12) }}>
          {card.avatar_url ? (
            <img src={card.avatar_url} alt="" style={{ width: pt(80), height: pt(80), borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: pt(80), height: pt(80), borderRadius: "50%", background: c.silverSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PersonIcon />
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: pt(4), marginBottom: pt(8) }}>
          <span style={{ fontFamily: serif, fontWeight: 500, fontSize: pt(14), color: c.inkSoft }}>@{card.username}</span>
          {card.is_ambassador && <AmbassadorSeal />}
        </div>

        {card.is_public && card.followers != null && (
          <div style={{ display: "flex", alignItems: "baseline", gap: pt(8), fontFamily: serif, marginBottom: pt(14) }}>
            <span><b style={{ fontSize: pt(16), color: c.navy }}>{card.followers}</b> <span style={{ fontWeight: 500, fontSize: pt(14), color: c.inkSoft }}>{card.followers === 1 ? "Follower" : "Followers"}</span></span>
            <span style={{ fontSize: pt(14), color: c.inkSoft }}>·</span>
            <span><b style={{ fontSize: pt(16), color: c.navy }}>{card.following}</b> <span style={{ fontWeight: 500, fontSize: pt(14), color: c.inkSoft }}>Following</span></span>
          </div>
        )}
      </div>

      {card.is_public ? (
        <>
          <div style={{ margin: `0 ${pt(24)} ${pt(18)}`, background: c.surface, borderRadius: pt(16), border: `1px solid ${c.hairline}`, boxShadow: "0 1px 4px rgba(27,42,74,0.06)", padding: `${pt(20)} ${pt(16)}`, display: "flex" }}>
            {[
              { label: "Handicap", value: formatHandicap(card.handicap) },
              { label: card.top_region && !card.top_region.is_state ? "Top Country" : "Top State", value: region },
            ].map((cell, i) => (
              <div key={cell.label} style={{ flex: 1, textAlign: "center", borderLeft: i ? `1px solid ${c.hairline}` : "none" }}>
                <div style={{ fontFamily: serif, fontWeight: 700, fontStyle: "italic", fontSize: pt(28), color: c.navy, lineHeight: 1.1 }}>{cell.value}</div>
                <div style={{ fontFamily: serif, fontWeight: 300, fontSize: pt(11), color: c.inkSoft, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: pt(4) }}>{cell.label}</div>
              </div>
            ))}
          </div>

          {!!card.top_courses?.length && (
            <div style={{ padding: `0 ${pt(24)}` }}>
              <div style={{ fontFamily: serif, fontWeight: 700, fontStyle: "italic", fontSize: pt(19), color: c.navy, marginBottom: pt(8) }}>
                Top courses
              </div>
              {card.top_courses.map((course, i) => (
                <div key={course.name + i} style={{ display: "flex", alignItems: "center", gap: pt(12), padding: `${pt(10)} 0`, borderTop: i ? `1px solid ${c.hairline}` : "none" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: pt(16), color: c.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{course.name}</div>
                    <div style={{ fontFamily: serif, fontWeight: 300, fontSize: pt(12.5), color: c.inkSoft }}>
                      {[course.city, course.state].filter(Boolean).join(", ")}
                    </div>
                  </div>
                  <ScoreCircle score={course.score} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", fontFamily: serif, fontWeight: 500, fontSize: pt(15), color: c.inkSoft, padding: `${pt(24)} ${pt(32)}` }}>
          This account is private
        </div>
      )}
    </div>
  );
}

const screen: CSSProperties = {
  width: "100%",
  height: "100%",
  background: c.bg,
  overflow: "hidden",
  textAlign: "left",
  lineHeight: 1.3,
};
