import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { site, type CaseStudy, type Showcase } from "@/content/site";
import { CaseHero } from "@/components/inner/CaseHero";
import { MediaPanel } from "@/components/inner/MediaPanel";
import { MoreToDiscover } from "@/components/inner/MoreToDiscover";
import { Footer } from "@/components/Footer";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return site.projects.map((p) => ({ slug: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = site.projects.find((p) => p.id === slug);
  return { title: project ? `${project.name} — ${site.name.first} ${site.name.last}` : "Not found" };
}

function CaseBody({ page }: { page: CaseStudy }) {
  let n = 1;
  return (
    <>
      <section className="inner-section case-brief">
        <MediaPanel media={page.heroMedia} label={`Media ${String(n++).padStart(2, "0")}`} className="white" />
        <div className="case-info">
          <div className="case-info-top">
            <p className="case-kicker">Challenge</p>
            <p className="case-statement">{page.challenge}</p>
          </div>
          <div className="case-tags">
            {page.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="inner-section case-gallery">
        {page.gallery.map((item, i) => (
          <Fragment key={i}>
            {"pair" in item ? (
              <div className="media-pair">
                <MediaPanel media={item.pair[0]} label={`Media ${String(n++).padStart(2, "0")}`} className="pair-a" />
                <MediaPanel media={item.pair[1]} label={`Media ${String(n++).padStart(2, "0")}`} className="pair-b" />
              </div>
            ) : (
              <MediaPanel media={item} label={`Media ${String(n++).padStart(2, "0")}`} className={i === 0 ? "white" : ""} />
            )}
          </Fragment>
        ))}
      </section>
    </>
  );
}

function ShowcaseBody({ page }: { page: Showcase }) {
  return (
    <>
      <section className="showcase-hero">
        <div className="showcase-title">
          <span className="serif">{page.title}</span>
          <p>{page.subtitle}</p>
        </div>
      </section>
      <section className="inner-section case-gallery">
        {page.panels.map((m, i) => (
          <MediaPanel key={i} media={m} label={`Media ${String(i + 1).padStart(2, "0")}`} className={i === 0 ? "white" : ""} />
        ))}
      </section>
    </>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = site.projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <main className="inner-main">
      {project.page.template === "case" ? (
        <>
          <CaseHero name={project.name} page={project.page} />
          <CaseBody page={project.page} />
        </>
      ) : (
        <ShowcaseBody page={project.page} />
      )}
      <MoreToDiscover />
      <Footer />
    </main>
  );
}
