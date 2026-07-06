import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Allan Enock Blog`,
    description: post.description,
  };
}

function renderParagraph(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="doc-prose max-w-3xl">
      <Link
        href="/docs/blog"
        className="not-prose mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to blog
      </Link>

      <div className="not-prose mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </span>
      </div>

      {post.logo && (
        <div className="not-prose mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-[#0c0c0e] p-2">
            <Image
              src={post.logo}
              alt={post.logoAlt ?? post.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          {post.logoAlt && (
            <span className="font-mono text-sm text-muted-foreground">
              {post.logoAlt}
            </span>
          )}
        </div>
      )}

      <h1>{post.title}</h1>
      <p>{post.description}</p>

      <div className="not-prose mb-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {post.coverImage && (
        <figure className="not-prose my-8 overflow-hidden rounded-lg border border-border bg-muted/20">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            width={1200}
            height={675}
            className="h-auto w-full object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {post.coverImageAlt && (
            <figcaption className="border-t border-border px-4 py-2 text-center text-xs text-muted-foreground">
              {post.coverImageAlt}
            </figcaption>
          )}
        </figure>
      )}

      {post.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{renderParagraph(paragraph)}</p>
      ))}
    </div>
  );
}
