import { cn } from "@/lib/utils";
import type { ProjectMetrics } from "@/data/projects";

interface MetricsBadgeProps {
  metrics: ProjectMetrics;
  className?: string;
}

export function MetricsBadge({ metrics, className }: MetricsBadgeProps) {
  const items = [
    { label: "Throughput", value: metrics.throughput },
    { label: "Language", value: metrics.language },
    { label: "Latency", value: metrics.latency },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-badge px-2.5 py-1 font-mono text-xs"
        >
          <span className="text-muted-foreground">{item.label}:</span>
          <span className="font-medium text-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
