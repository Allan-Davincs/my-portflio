import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { ProjectDocs } from "@/components/project-docs";
import { getProjectBySlug, projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} | Allan Enock Docs`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const codeBlocks = await Promise.all(
    project.codeSnippets.map((snippet) =>
      CodeBlock({
        code: snippet.code,
        language: snippet.language,
        title: snippet.title,
      })
    )
  );

  return <ProjectDocs project={project} codeBlocks={codeBlocks} />;
}
