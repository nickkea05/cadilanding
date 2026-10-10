import { APP_STORE_URL } from "./config";

export function AppStoreBadge({ height = 72, onClick }: { height?: number; onClick?: () => void }) {
  return (
    <a
      href={APP_STORE_URL}
      aria-label="Download Cadi on the App Store"
      style={{ display: "inline-block", lineHeight: 0, transition: "opacity 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
    >
      <img src="/app-store-badge.svg" alt="Download on the App Store" style={{ height, width: "auto" }} />
    </a>
  );
}
