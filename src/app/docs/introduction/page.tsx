import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, GraduationCap, FileDown, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { CredentialList, AcademicCertificateList } from "@/components/credential-list";
import { CodeBlock } from "@/components/code-block";

export default function IntroductionPage() {
  const contactJson = `{
  "name": "${profile.name}",
  "role": "${profile.role}",
  "tagline": "${profile.tagline}",
  "location": "${profile.location}",
  "availability": "Open to opportunities"
}`;

  return (
    <div className="doc-prose max-w-3xl">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1>{profile.name}</h1>
          <p className="!text-base !text-foreground/90">{profile.role}</p>
          <p className="!mt-1 text-sm text-muted-foreground">{profile.school}</p>
          <p className="!mt-2 font-medium !text-foreground">
            &ldquo;{profile.tagline}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {profile.location} · Open to remote worldwide
          </div>
        </div>
      </div>

      <h2>About</h2>
      <p>{profile.bio}</p>
      <p>{profile.bioExtended}</p>

      <h2>CV</h2>
      <div className="not-prose flex flex-wrap gap-3">
        <a
          href="/cv/Alan_G_Enock_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
        >
          <ExternalLink className="h-4 w-4" />
          Check CV
        </a>
        <a
          href="/cv/Alan_G_Enock_CV.pdf"
          download
          className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <FileDown className="h-4 w-4" />
          Download CV
        </a>
      </div>

      <h2>Education</h2>
      {profile.education.map((edu) => (
        <div key={edu.degree} className="mb-4 flex gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="!mb-0 !text-foreground font-medium">{edu.degree}</p>
            <p className="!mb-0 text-sm">
              {edu.school} · {edu.period}
            </p>
          </div>
        </div>
      ))}

      <h2>Certifications</h2>
      <CredentialList items={profile.certifications} />

      <h2>Academic Certificates</h2>
      <p className="!text-sm">
        Formal academic completion certificates from secondary and advanced level studies.
      </p>
      <AcademicCertificateList items={profile.academicCertificates} />

      <h2>Systems Overview</h2>
      <p>
        Explore my production systems below. Each project includes performance
        metrics, architecture diagrams, and API reference documentation.
      </p>

      <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/docs/${project.slug}`}
            className="group rounded-lg border border-border p-4 transition-colors hover:border-foreground/20 hover:bg-muted/50"
          >
            <div className="mb-3 flex items-center gap-3">
              {project.logo && (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-[#0c0c0e] p-1">
                  <Image
                    src={project.logo}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </div>
                <div className="font-medium text-foreground group-hover:underline">
                  {project.title}
                </div>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="mt-3 flex items-center gap-1 font-mono text-xs text-muted-foreground">
              Read docs
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <h2>Profile Schema</h2>
      <CodeBlock code={contactJson} language="json" title="profile.json" />
    </div>
  );
}
