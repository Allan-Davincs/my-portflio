import { skillCategories } from "@/data/skills";

export default function SkillsPage() {
  return (
    <div className="doc-prose max-w-3xl">
      <h1>Technical Specifications</h1>
      <p>
        Currently learning and mastering the following stacks.
      </p>

      {skillCategories.map((category) => (
        <div key={category.title} className="not-prose mb-10">
          <h2 className="!mt-8 font-mono text-base uppercase tracking-wider text-foreground">
            {category.title}
          </h2>
          <ul className="space-y-3">
            {category.items.map((skill) => (
              <li key={skill.name} className="border-l-2 border-border pl-4">
                <span className="font-mono text-sm text-foreground">
                  {skill.name}
                </span>
                {skill.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {skill.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
