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
  role: "Software Engineer",
  school: "2nd Year Computer Engineering · Dar es Salaam Institute of Technology (DIT)",
  tagline: "I Build Systems That Make Your Customers Always Happy",
  location: "Dar es Salaam, TZ",
  email: "allandavinc89@gmail.com",
  phone: "+255759637644",
  github: "https://github.com/Allan-Davincs",
  linkedin: "https://www.linkedin.com/in/alan-enock-02016031a",
  portfolio: "https://alan-enock-v2.vercel.app",
  avatar:
    "https://image2url.com/r2/default/images/1770259348076-03eabb5e-a431-4a39-8fde-f8851543dd6b.png",
  bio: `Software engineer and 2nd-year Computer Engineering student at Dar es Salaam Institute of Technology (DIT). I build modern, scalable web applications and turn complex problems into production-ready systems.`,
  bioExtended: `With a strong foundation in both frontend and backend technologies — React, Node.js, TypeScript, Go, Python, MongoDB, PostgreSQL, and networking — I'm constantly learning and adapting to new technologies to stay at the forefront of software engineering.`,
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
      company: "HAKAVOD COMPANY LIMITED",
      role: "Systems Administrator",
      period: "May 2026 - Present",
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
        "Transformed 15+ businesses to digital life by mapping their details on Google Maps",
        "Improved SEO visibility and online presence for local companies",
        "Built custom modern digital solutions including payment systems using Snippe and SMS notification systems",
      ],
    },
  ],
};