import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRightSmall, LinkedInIcon, XIcon } from "@/components/icons";

export function Menu() {
  const { banner } = site;
  return (
    <nav className="menu" aria-label="Main">
      <div className="menu-up">
        <a className="menu-banner" href={banner.href} target="_blank" rel="noreferrer">
          <span className="muted">{banner.muted}</span>
          <span className="strong">{banner.strong}</span>
          <span className="muted">{banner.mutedAfter}</span>
          <ArrowUpRightSmall />
        </a>
      </div>
      <div className="menu-low">
        <div className="menu-links">
          <Link className="menu-link" href="/#work-section">
            Work
          </Link>
          <Link className="menu-link menu-about" href="/#about-section">
            About
          </Link>
        </div>
        <Link className="menu-logo serif" href="/" aria-label="Home">
          {site.initials}
        </Link>
        <a className="menu-social li" href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a className="menu-social x" href={site.socials.x} target="_blank" rel="noreferrer" aria-label="X">
          <XIcon />
        </a>
        <Link className="menu-link menu-about-mobile" href="/#about-section">
          About
        </Link>
      </div>
    </nav>
  );
}
