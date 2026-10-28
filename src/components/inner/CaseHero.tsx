import { asset } from "@/lib/asset";
import type { CaseStudy } from "@/content/site";

// Cut-out boxes from the reference hero (1440-wide frame, centred and cropped on small screens).
const CUTOUTS = [
  { left: -32, top: 87, width: 337, height: 505 },
  { left: 276, top: 230, width: 251, height: 377 },
  { left: 654, top: 276, width: 162, height: 244 },
  { left: 973, top: 230, width: 212, height: 377 },
  { left: 1208, top: 176, width: 265, height: 601 },
];

export function CaseHero({ name, page }: { name: string; page: CaseStudy }) {
  return (
    <section className="case-hero">
      <div className="case-hero-frame" aria-hidden="true">
        {CUTOUTS.map((box, i) => {
          const src = page.cutouts?.[i];
          return src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={asset(src)} alt="" className="cutout" style={box} />
          ) : (
            <div key={i} className="cutout cutout-placeholder" style={box} />
          );
        })}
      </div>
      <div className="case-hero-down">
        <div className="case-mark">
          {page.mark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset(page.mark)} alt={name} />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <p className="case-tagline">
          {page.tagline[0]}
          <br />
          {page.tagline[1]}
        </p>
      </div>
    </section>
  );
}
