"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowUpRight, LaurelLeft, LaurelRight } from "@/components/icons";
import { REVEALS } from "@/lib/scroll";

export function About() {
  const { intro, ongoing, clients, awards, gallery } = site;
  return (
    <section className="about" id="about-section">
      <div className="ticks" aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="desktop-only">
            |
          </span>
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <span key={`m${i}`} className="mobile-only">
            |
          </span>
        ))}
      </div>

      <Reveal cfg={REVEALS.strip} className="strip-outer" innerClassName="strip">
        {gallery.map((src, i) => (
          <div key={i} className="strip-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {src && <img src={src} alt="" />}
          </div>
        ))}
      </Reveal>

      <div className="about-body">
        <Reveal cfg={REVEALS.intro}>
          <p className="intro">
            {intro.before}
            <strong>{intro.name}</strong>
            {intro.after}
          </p>
        </Reveal>

        <div className="about-row ongoing">
          <div className="ongoing-left">
            <p className="label">
              {ongoing.label[0]}
              <br />
              {ongoing.label[1]}
            </p>
            <a className="ongoing-link" href={ongoing.href} target="_blank" rel="noreferrer">
              <span className="muted">{ongoing.linkMuted}</span>
              <span className="strong">
                {ongoing.linkStrong}
                <ArrowUpRight />
              </span>
            </a>
          </div>
          <ProjectCard
            name={ongoing.project.name}
            href={ongoing.href}
            index={0}
            image={ongoing.project.image}
            cfg={REVEALS.aboutCard}
            className="ongoing-card"
          />
        </div>

        <div className="about-row clients">
          <p className="label">
            Work &amp;
            <br />
            Experience
          </p>
          <Reveal cfg={REVEALS.logos} innerClassName="clients-grid">
            {clients.map((c) => (
              <span key={c} className="client">
                {c}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="about-row awards">
          <p className="label">
            Awards &amp;
            <br />
            Recognition
          </p>
          <Reveal cfg={REVEALS.awards} innerClassName="awards-list">
            {awards.map((a) => (
              <div key={a.title} className="award">
                <LaurelLeft />
                <div className="award-body">
                  <span className="award-mark">{a.mark}</span>
                  <span className="award-text">
                    {a.title}
                    <sup>{a.year}</sup>
                    <br />
                    {a.subtitle}
                  </span>
                </div>
                <LaurelRight />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
