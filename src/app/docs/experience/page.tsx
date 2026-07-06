import { profile } from "@/data/profile";

export default function ExperiencePage() {
  return (
    <div className="doc-prose max-w-3xl">
      <h1>Work History</h1>
      <p>
        Professional experience across freelancing, systems administration,
        and software engineering internships.
      </p>

      <div className="not-prose space-y-8">
        {profile.experience.map((exp) => (
          <div key={exp.company} className="border-l-2 border-border pl-6">
            <div className="font-mono text-sm font-medium text-foreground">
              {exp.role}
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              @ {exp.company} · {exp.period}
              {"employmentType" in exp && exp.employmentType && (
                <span className="ml-2 rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  {exp.employmentType}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {exp.description}
            </p>
            <ul className="mt-3 space-y-1">
              {exp.achievements.map((a) => (
                <li
                  key={a}
                  className="text-sm text-muted-foreground before:mr-2 before:text-foreground/40 before:content-['→']"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
