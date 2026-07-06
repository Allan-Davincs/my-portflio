import { Mail, Globe, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { CodeBlock } from "@/components/code-block";

export default function ContactPage() {
  const contactJson = `{
  "name": "${profile.name}",
  "role": "${profile.role}",
  "contact": {
    "email": "${profile.email}",
    "phone": "${profile.phone}",
    "location": "${profile.location}"
  },
  "social": {
    "github": "${profile.github}",
    "linkedin": "${profile.linkedin}",
    "portfolio": "${profile.portfolio}"
  },
  "availability": "Open to opportunities"
}`;

  const links = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      href: `tel:${profile.phone}`,
      icon: Phone,
    },
    {
      label: "GitHub",
      href: profile.github,
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      icon: LinkedInIcon,
    },
    {
      label: "Portfolio",
      href: profile.portfolio,
      icon: Globe,
    },
  ];

  return (
    <div className="doc-prose max-w-3xl">
      <div className="mb-2 font-mono text-xs text-amber-500">POST /contact</div>
      <h1>Contact</h1>
      <p>
        Ready to build systems that make your customers happy? Reach out via any
        channel below.
      </p>

      <div className="not-prose my-6 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === "Email" || link.label === "Phone" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-xs text-foreground no-underline transition-colors hover:bg-muted"
          >
            <link.icon className="h-4 w-4 text-muted-foreground" />
            {link.label}
          </a>
        ))}
      </div>

      <h2>Request Schema</h2>
      <CodeBlock code={contactJson} language="json" title="contact.json" />

      <h2>Response</h2>
      <pre className="overflow-x-auto rounded-lg border border-border bg-[#0c0c0e] p-4 font-mono text-xs text-emerald-400/90">
{`{
  "status": 200,
  "message": "Request received. I'll respond within 24 hours.",
  "timestamp": "${new Date().toISOString()}"
}`}
      </pre>
    </div>
  );
}
