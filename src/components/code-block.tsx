import { codeToHtml } from "shiki";
import { CodeBlockClient } from "./code-block-client";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export async function CodeBlock({ code, language, title }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return <CodeBlockClient html={html} rawCode={code} title={title} />;
}
