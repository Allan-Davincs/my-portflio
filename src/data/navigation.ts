import { navSections, getProjectBySlug } from "./projects";
import { blogPosts } from "./blog";

export type NavIcon =
  | { type: "image"; src: string; alt: string }
  | { type: "letter"; letter: string; bg?: string; fg?: string }
  | {
      type: "lucide";
      icon:
        | "introduction"
        | "skills"
        | "experience"
        | "contact"
        | "blog"
        | "terminal";
    };

export const navItemIcons: Record<string, NavIcon> = {
  introduction: { type: "lucide", icon: "introduction" },
  "jenga-online": {
    type: "image",
    src: "https://res.cloudinary.com/drmmje4fs/image/upload/v1781543238/JengaOnline_logo_e7mpzr_e_background_removal_f_png_h8tzkg.png",
    alt: "Jenga Online",
  },
  "veloroute-proxy": {
    type: "image",
    src: "https://res.cloudinary.com/ddlegxejs/image/upload/v1782450980/VeloRoute-logo_ywb2qe.png",
    alt: "VeloRoute",
  },
  "flex-ai": {
    type: "image",
    src: "https://files.catbox.moe/a44m93.jpg",
    alt: "Flex AI",
  },
  "nexa-ai": {
    type: "image",
    src: "https://res.cloudinary.com/ddlegxejs/image/upload/v1782450980/NEXA-AI-Logo_zbmglu.png",
    alt: "NEXA AI",
  },
  unitranslate: {
    type: "letter",
    letter: "U",
    bg: "#1d4ed8",
    fg: "#ffffff",
  },
  "terminal-portfolio": { type: "lucide", icon: "terminal" },
  blog: { type: "lucide", icon: "blog" },
  skills: { type: "lucide", icon: "skills" },
  experience: { type: "lucide", icon: "experience" },
  contact: { type: "lucide", icon: "contact" },
};

export interface SearchItem {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  method: "GET" | "POST";
}

export function buildSearchIndex(): SearchItem[] {
  const staticPages: Record<string, { title: string; description: string }> = {
    introduction: {
      title: "Introduction",
      description: "About Allan Enock, education, and systems overview",
    },
    skills: {
      title: "Technical Specifications",
      description: "Core languages, backend infrastructure, and system design",
    },
    experience: {
      title: "Work History",
      description: "Professional experience and internships",
    },
    contact: {
      title: "Contact",
      description: "Get in touch — email, GitHub, LinkedIn",
    },
    blog: {
      title: "Blog",
      description: "Notes on building systems and shipping products",
    },
  };

  const items: SearchItem[] = [];

  for (const section of navSections) {
    for (const item of section.items) {
      const project = getProjectBySlug(item.slug);
      const staticPage = staticPages[item.slug];

      items.push({
        slug: item.slug,
        href: `/docs/${item.slug}`,
        title: project?.title ?? staticPage?.title ?? item.label,
        description:
          project?.description ??
          staticPage?.description ??
          section.label,
        category: project?.category ?? section.label,
        method: item.method,
      });
    }
  }

  for (const post of blogPosts) {
    items.push({
      slug: post.slug,
      href: `/docs/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      category: "BLOG",
      method: "GET",
    });
  }

  return items;
}

export const allSearchItems = buildSearchIndex();
