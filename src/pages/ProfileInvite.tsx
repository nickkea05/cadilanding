import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { App } from "../index";
import { PhoneProfile } from "../PhoneProfile";
import { copyInviteAndOpenStore, HANDLE_RE, loadProfileCard, type ProfileCard } from "../profile";

// Screen area inside /mockup.png (1080×1350), as fractions of the image.
const SCREEN = { left: 291 / 1080, top: 144 / 1350, width: 491 / 1080, height: 1066 / 1350 };

/**
 * cadigolf.app/@handle: the regular landing page, with the person's profile on the
 * phone. "Get Cadi" copies the invite link so the app can credit them.
 */
export function ProfileInvite() {
  const { slug = "" } = useParams();
  const handle = slug.startsWith("@") ? slug.slice(1).toLowerCase() : "";
  const valid = HANDLE_RE.test(handle);
  const [card, setCard] = useState<ProfileCard | null>(null);

  useEffect(() => {
    if (!valid) return;
    loadProfileCard(handle).then(setCard);
  }, [handle, valid]);

  if (!valid) return <App />;

  const phone = card ? (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
      <img
        className="mockup-img"
        src="/mockup.png"
        alt={`${card.display_name} on Cadi`}
        style={{
          height: "min(86vh, 780px)",
          width: "auto",
          filter: "drop-shadow(0 32px 80px rgba(27,42,74,0.28))",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${SCREEN.left * 100}%`,
          top: `${SCREEN.top * 100}%`,
          width: `${SCREEN.width * 100}%`,
          height: `${SCREEN.height * 100}%`,
          borderRadius: "11.5% / 5.3%",
          overflow: "hidden",
          containerType: "inline-size",
          lineHeight: "normal",
        }}
      >
        <PhoneProfile card={card} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "21.8%",
            width: "56.4%",
            height: "3.6%",
            background: "#000",
            borderBottomLeftRadius: "9% 45%",
            borderBottomRightRadius: "9% 45%",
          }}
        />
      </div>
    </div>
  ) : undefined;

  return <App phone={phone} onGetApp={() => copyInviteAndOpenStore(handle)} />;
}
