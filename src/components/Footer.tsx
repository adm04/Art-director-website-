import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";

export function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-head">
        <span className="muted">Keep in touch.</span>
        <span className="strong">Get updates when I post</span>
      </h2>
      <form className="subscribe" action="#">
        <label htmlFor="email">Email</label>
        <div className="subscribe-row">
          <input id="email" name="email" type="email" placeholder="jane@framer.com" required />
          <button type="submit" aria-label="Subscribe">
            <ArrowRight />
            <ArrowRight />
          </button>
        </div>
      </form>
      <div className="footer-bottom">
        <p className="footer-address" style={{ margin: 0 }}>
          {site.footer.address}
        </p>
        <div className="footer-links">
          <div className="row">
            <span className="key geist">Site:</span>
            <span className="vals">
              <Link className="val" href="/">
                Home
              </Link>
              <Link className="val" href="/#work-section">
                Work
              </Link>
              <Link className="val" href="/#about-section">
                About me
              </Link>
            </span>
          </div>
          <div className="row">
            <span className="key">Social:</span>
            <span className="vals">
              <a className="val" href={site.socials.x} target="_blank" rel="noreferrer">
                X (twitter)
              </a>
              <a className="val" href={site.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </span>
          </div>
          <div className="row">
            <span className="key">Contact:</span>
            <a className="val" href={`mailto:${site.footer.email}`}>
              {site.footer.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
