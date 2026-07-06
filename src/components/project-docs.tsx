"use client";

import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { MetricsBadge } from "@/components/metrics-badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDocsProps {
  project: Project;
  codeBlocks: React.ReactNode[];
}

export function ProjectDocs({ project, codeBlocks }: ProjectDocsProps) {
  return (
    <div className="doc-prose max-w-3xl">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-badge px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 font-mono text-[11px]",
            project.status === "Production"
              ? "border-emerald-800 text-emerald-500"
              : project.status === "Beta"
                ? "border-amber-800 text-amber-500"
                : project.status === "Archived"
                  ? "border-zinc-600 text-zinc-400"
                  : "border-blue-800 text-blue-500"
          )}
        >
          {project.status}
        </span>
      </div>

      {project.logo && (
        <div className="mb-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-[#0c0c0e] p-2">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              fill
              className="object-contain p-1"
            />
          </div>
        </div>
      )}

      <h1>{project.title}</h1>
      <p className="!text-foreground/80 !text-base">{project.subtitle}</p>

      <MetricsBadge metrics={project.metrics} className="my-4" />

      {project.status === "Archived" && (
        <div className="mb-4 rounded-md border border-zinc-700 bg-zinc-900/50 px-4 py-3 font-mono text-xs text-zinc-400">
          ⚠ This project is archived and no longer actively maintained. The codebase
          remains available on GitHub for reference.
        </div>
      )}

      {(project.links.demo || project.links.github || project.links.liveDemos) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.links.liveDemos?.map((live) => (
            <a
              key={live.url}
              href={live.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {live.label}
            </a>
          ))}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      )}

      <Tabs.Root defaultValue="overview" className="mt-6">
        <Tabs.List className="flex gap-1 border-b border-border">
          {["overview", "architecture", "api"].map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              className="border-b-2 border-transparent px-4 py-2 font-mono text-xs capitalize text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
            >
              {tab === "api" ? "API Reference" : tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="overview" className="pt-6">
          <p>{project.overview}</p>

          {project.problem.length > 0 && (
            <>
              <h2>Problem</h2>
              <ul>
                {project.problem.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </>
          )}

          {project.outcomes.length > 0 && (
            <>
              <h2>Outcomes</h2>
              <ul>
                {project.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </>
          )}

          {codeBlocks[0]}
        </Tabs.Content>

        <Tabs.Content value="architecture" className="pt-6">
          <p>{project.architecture}</p>

          <h2>System Diagram</h2>
          <pre className="overflow-x-auto rounded-lg border border-border bg-[#0c0c0e] p-4 font-mono text-xs leading-relaxed text-zinc-400">
            {project.architectureDiagram}
          </pre>

          {codeBlocks.slice(1).map((block, i) => (
            <div key={i}>{block}</div>
          ))}
        </Tabs.Content>

        <Tabs.Content value="api" className="pt-6">
          <h2>Schema</h2>
          <p>
            Example request/response payload for the core API endpoint of{" "}
            {project.title}.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-border bg-[#0c0c0e] p-4 font-mono text-xs leading-relaxed text-emerald-400/90">
            {project.apiSchema}
          </pre>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
