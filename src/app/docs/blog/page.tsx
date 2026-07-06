import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <div className="doc-prose max-w-3xl">
      <h1>Blog</h1>
      <p>
        Notes on building systems, shipping products, and lessons from real
        projects.
      </p>

      <div className="not-prose space-y-4">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/docs/blog/${post.slug}`}
            className="group block rounded-lg border border-border p-5 transition-colors hover:border-foreground/20 hover:bg-muted/50"
          >
            <div className="flex gap-4">
              {post.logo ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-[#0c0c0e] p-1.5">
                  <Image
                    src={post.logo}
                    alt={post.logoAlt ?? post.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : post.coverImage ? (
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt ?? post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            <h2 className="!mt-0 !mb-2 text-lg font-semibold text-foreground group-hover:underline">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground">{post.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1 font-mono text-xs text-muted-foreground">
              Read post
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
