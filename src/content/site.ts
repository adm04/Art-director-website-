// All personal content lives here. Everything below is a placeholder —
// replace it with your own name, copy, links and project media.
// Project `image` / `video` paths are relative to /public.

/** An image or video in /public. Leave both empty to show a placeholder panel. */
export type Media = { image?: string; video?: string; alt?: string };

/** Gallery rows on a case study: one full-width panel, or two side by side. */
export type GalleryItem = Media | { pair: [Media, Media] };

export type CaseStudy = {
  template: "case";
  /** Two-line line under the brand mark in the hero. */
  tagline: [string, string];
  /** Optional brand mark image for the hero; the project name is shown if empty. */
  mark?: string;
  /** Up to five transparent cut-out images floating in the hero. */
  cutouts?: (string | undefined)[];
  heroMedia?: Media;
  challenge: string;
  tags: string[];
  gallery: GalleryItem[];
};

export type Showcase = {
  template: "showcase";
  title: string;
  subtitle: string;
  panels: Media[];
};

export type Project = {
  /** Also the page URL: /<id> */
  id: string;
  name: string;
  /** Cover used on the home page and in the "More to discover" carousel. */
  image?: string;
  video?: string;
  page: CaseStudy | Showcase;
};

const caseStudy = (tagline: [string, string], extraPanels = 0): CaseStudy => ({
  template: "case",
  tagline,
  challenge:
    "Describe the brief in a sentence or two — the problem you were asked to solve, who it was for, and what made it hard.",
  tags: ["Art Direction", "Branding", "Visual Design", "Campaign"],
  gallery: [{}, { pair: [{}, {}] }, {}, ...Array.from({ length: extraPanels }, () => ({}))],
});

const showcase = (title: string, subtitle: string, panels: number): Showcase => ({
  template: "showcase",
  title,
  subtitle,
  panels: Array.from({ length: panels }, () => ({})),
});

export type Award = { title: string; year: string; subtitle: string; mark: string };

export const site = {
  name: { first: "Your", last: "Name" },
  initials: "YN",
  role: { left: ["Art", "Director"], right: ["Creative", "Lead"] },
  banner: { muted: "Featured in", strong: "Your Highlight", mutedAfter: "this year", href: "#" },
  tagline: [
    [{ t: "An art director " }, { t: "who", serif: true }, { t: " enjoys" }],
    [{ t: "understanding " }, { t: "people", serif: true }, { t: " as much as" }],
    [{ t: "designing " }, { t: "for", serif: true }, { t: " them." }],
  ],
  socials: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
  manifesto: [
    [{ t: "Every frame " }, { t: "tells", serif: true }],
    [{ t: "a story worth" }],
    [{ t: "I make sure" }],
    [{ t: "what", serif: true }, { t: " I direct is" }],
    [{ t: "something they’ll" }],
    [{ t: "love", serif: true }, { t: " seeing." }],
  ],
  // Same mix as the reference: five case studies and three showcase pages.
  projects: [
    { id: "project-01", name: "Project One", page: caseStudy(["A short line about", "what this project is."]) },
    { id: "project-02", name: "Project Two", page: caseStudy(["A short line about", "what this project is."]) },
    { id: "project-03", name: "Project Three", page: showcase("Archive", "A collection of work", 9) },
    { id: "project-04", name: "Project Four", page: caseStudy(["A short line about", "what this project is."], 1) },
    { id: "project-05", name: "Project Five", page: showcase("Motion", "Selected motion work", 4) },
    { id: "project-06", name: "Project Six", page: caseStudy(["A short line about", "what this project is."], 1) },
    { id: "project-07", name: "Project Seven", page: caseStudy(["A short line about", "what this project is."]) },
    { id: "project-08", name: "Project Eight", page: showcase("Campaigns", "Every campaign of mine", 7) },
  ] as Project[],
  // Five photos for the about strip (portrait, landscape, portrait, wide, portrait).
  gallery: [undefined, undefined, undefined, undefined, undefined] as (string | undefined)[],
  intro: {
    before: "Hi, I’m ",
    name: "Your Name",
    after: ", an art director who turns loose ideas into clear, useful, and memorable visual stories.",
  },
  ongoing: {
    label: ["Currently", "working on."],
    linkMuted: "View site.",
    linkStrong: "Visit project",
    href: "#",
    project: { name: "Current Project", image: undefined as string | undefined },
  },
  clients: ["Client One", "Client Two", "Client Three", "Client Four", "Client Five", "Client Six"],
  awards: [
    { mark: "AW", title: "Award Name", year: "2025", subtitle: "Shortlist" },
    { mark: "FEST", title: "Festival", year: "2025", subtitle: "Finalist" },
  ] as Award[],
  footer: {
    address: "Your City, Country",
    email: "hello@yourname.com",
  },
};
