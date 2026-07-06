import Link from "next/link";
import { ExternalLink, FileText, GraduationCap } from "lucide-react";
import type { Credential } from "@/data/profile";

interface CredentialListProps {
  items: Credential[];
  emptyLabel?: string;
}

export function CredentialList({ items, emptyLabel }: CredentialListProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">{emptyLabel ?? "None listed."}</p>
    );
  }

  return (
    <div className="not-prose space-y-3">
      {items.map((item) => (
        <div
          key={`${item.title}-${item.issuer}`}
          className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">
              {item.issuer}
              {item.period ? ` · ${item.period}` : ""}
            </p>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {item.viewUrl && (
              <a
                href={item.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Certificate
              </a>
            )}
            {item.documentUrl && (
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
              >
                <FileText className="h-3.5 w-3.5" />
                View PDF
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface AcademicCertificateListProps {
  items: Credential[];
}

export function AcademicCertificateList({ items }: AcademicCertificateListProps) {
  return (
    <div className="not-prose space-y-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-border p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.issuer}
                  {item.period ? ` · ${item.period}` : ""}
                </p>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {item.viewUrl && (
                <a
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Certificate
                </a>
              )}
              {item.documentUrl && (
                <a
                  href={item.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
                >
                  <FileText className="h-3.5 w-3.5" />
                  View PDF
                </a>
              )}
              {!item.viewUrl && !item.documentUrl && (
                <Link
                  href="/docs/contact"
                  className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 font-mono text-xs text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
                >
                  Request certificate
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
