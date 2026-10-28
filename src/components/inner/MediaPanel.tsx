import { asset } from "@/lib/asset";
import type { Media } from "@/content/site";

type Props = { media?: Media; label: string; className?: string };

/** Full-bleed image/video tile; renders a labelled placeholder until media is added. */
export function MediaPanel({ media, label, className = "" }: Props) {
  return (
    <div className={`media-panel ${className}`}>
      {media?.video ? (
        <video src={asset(media.video)} autoPlay loop muted playsInline />
      ) : media?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(media.image)} alt={media.alt ?? ""} />
      ) : (
        <div className="media-placeholder">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
