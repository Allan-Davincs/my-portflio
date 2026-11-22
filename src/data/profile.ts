export interface Credential {
  title: string;
  issuer: string;
  period?: string;
  description?: string;
  viewUrl?: string;
  documentUrl?: string;
}

export const profile = {
  name: "Alan G Enock",
  role: "Full-Stack Developer | Systems Operations",
  school: "3rd Year Computer Engineering · Dar es Salaam Institute of Technology (DIT)",
  tagline: "I Build Practical Software for Real Operational Needs",
  location: "Dar es Salaam, TZ",
  email: "allandavinc89@gmail.com",
  phone: "+255759637644",
  github: "https://github.com/Allan-Davincs",
  linkedin: "https://www.linkedin.com/in/alan-g-enock-02016031a/",
  portfolio: "https://alan-enock-v2.vercel.app",
  avatar: "/alan-enock-profile.jpg",
  bio: `Full-stack developer and third-year Computer Engineering student at Dar es Salaam Institute of Technology (DIT). I build practical web applications and APIs with React, TypeScript, and Node.js, and turn operational needs into reliable, maintainable systems.`,
  bioExtended: `My experience also includes monitoring operations and investigating cloud infrastructure and networking issues on the CloudOne platform. Through freelance consulting, I build client websites and develop student-focused platforms that make everyday workflows easier.`,
  education: [
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      school: "Dar es Salaam Institute of Technology",
      period: "2024 - 2028",
    },
    {
      degree: "Web Development Certifications",
      school: "freeCodeCamp",
      period: "2025 - Present",
    },
    {
      degree: "Advanced Level — Physics, Chemistry, Mathematics",
      school: "Pugu High School",
      period: "2022 - 2024",
    },
  ],
  certifications: [
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      viewUrl:
        "https://freecodecamp.org/certification/alan-gurumel-enock/responsive-web-design-v9",
    },
    {
      title: "Relational Database Design",
      issuer: "freeCodeCamp",
      viewUrl:
        "https://freecodecamp.org/certification/alan-gurumel-enock/relational-databases-v9",
    },
    {
      title: "Intern — Full Stack Developer",
      issuer: "CodeAlpha",
      period: "December 2025 - February 2026",
      documentUrl: "/certs/codealpha-fullstack-intern.pdf",
    },
    {
      title: "IBM Generative AI Engineering",
      issuer: "IBM",
    },
    {
      title: "Certified Cybersecurity Foundations (CORE)",
      issuer: "Hackviser",
      period: "July 18, 2026",
      description: "Certificate ID: HV-CORE-EUXXXJSZ",
      viewUrl: "https://hackviser.com/verify?id=HV-CORE-EUXXXJSZ",
      documentUrl: "/certs/hackviser-core-certificate.pdf",
    },
    {
      title: "Certified Red Team Analyst",
      issuer: "CyberWarfare",
      period: "In progress",
    },
    {
      title: "AI Red Team Analyst",
      issuer: "CyberWarfare",
      period: "In progress",
    },
  ] satisfies Credential[],
  academicCertificates: [
    {
      title: "Form Six Certificate — Advanced Level (PCM)",
      issuer: "Pugu High School",
      period: "2022 - 2024",
      description:
        "Certificate of completion for Form Six Advanced Level studies — Physics, Chemistry, and Mathematics (PCM).",
    },
  ] satisfies Credential[],
  experience: [
    {
      company: "Flashnet Technology",
      role: "Operational Administration (System Administration) Intern",
      period: "8 August 2026 - October 2026",
      location: "Ohio Street, Dar es Salaam, Tanzania",
      description:
        "Monitored operations as an intern and helped investigate cloud infrastructure and networking challenges involving the CloudOne platform.",
      achievements: [
        "Monitored operational activity and supported day-to-day system administration",
        "Investigated and helped resolve CloudOne platform infrastructure and networking issues",
      ],
    },
    {
      company: "HAKAVOD COMPANY LIMITED",
      role: "Systems Administrator",
      period: "May 2026 - July 2026",
      employmentType: "Part-time",
      description:
        "Building and scaling technology solutions for the company, including infrastructure setup, system maintenance, and ongoing technical operations.",
      achievements: [
        "Scaled and maintained core company technology infrastructure",
        "Ensured reliable system uptime and performance across business operations",
      ],
    },
    {
      company: "CodeAlpha",
      role: "Remote Intern — Full Stack Developer",
      period: "December 2025 - February 2026",
      description:
        "Remote internship focused on building and maintaining full-stack web applications in a fast-paced, production-oriented environment.",
      achievements: [
        "Developed 2+ full-stack applications from concept to production",
        "Collaborated with the design team to deliver seamless user experiences",
      ],
    },
    {
      company: "Dar es Salaam Institute of Technology (DIT)",
      role: "Software Engineering Intern",
      period: "August 2025 - November 2025",
      description:
        "Software internship where we learned industry practices and shipped a real-world product for community healthcare providers.",
      achievements: [
        "Co-developed and launched a Dispensary Management System for small dispensaries",
        "Applied full-stack development skills to solve real operational challenges in healthcare",
      ],
    },
    {
      company: "DavincsTech",
      role: "Digital Consultant — Freelancer",
      period: "August 2024 - Present",
      description:
        "As a freelancer under the DavincsTech brand, I engage and educate society while helping businesses and small companies transition into the digital economy through modern technology solutions.",
      achievements: [
        "Helped 15+ businesses establish a digital presence, including Google Maps listings",
        "Improved SEO visibility and online presence for local companies",
        "Built client websites: tapsamuhas.org, hakavodcompany.com, hopeforscdfoundation.org, and tulashashe.co.tz",
        "Maintain and develop DarasaX.com for day-to-day university student activities and epapers.co.tz as a centralized past-exam-paper repository",
        "Built custom digital solutions including Snippe payment systems and RAFIKI SMS notifications",
      ],
    },
  ],
};