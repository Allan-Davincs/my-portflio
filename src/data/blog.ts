export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  logo?: string;
  logoAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "security-sql-injection-input-validation",
    title: "SQL Injection and Input Validation: Security Issues Every Developer Should Fix",
    description:
      "Why raw queries and unchecked user input break apps — and the validation patterns that actually stop attacks.",
    date: "2026-06-20",
    readTime: "5 min read",
    tags: ["Security", "SQL Injection", "Input Validation", "Web Apps"],
    coverImage: "/blog/sql-injection-anatomy.jpg",
    coverImageAlt:
      "The anatomy of an SQL injection attack and how to avoid one",
    body: [
      "Security is not a feature you ship at the end. The two issues I see most often in student projects and early production code are **SQL injection** and missing **input validation**. Both are preventable if you treat every request as untrusted.",
      "**SQL injection** happens when user input is stitched directly into a query string. An attacker can send something like `' OR '1'='1` in a login field and bypass authentication, or use `DROP TABLE` payloads to destroy data. The fix is simple in theory: never concatenate SQL. Use **parameterized queries** or an ORM (Prisma, Sequelize, SQLAlchemy) so the database treats input as data, not executable code.",
      "Even NoSQL systems are not immune. MongoDB queries built from raw user objects can allow **operator injection** (`$gt`, `$ne`) if you pass `req.body` straight into `find()`. Whitelist allowed fields and validate types before any database call.",
      "**Input validation** is your first line of defense on every endpoint. Check type, length, format, and allowed values before the data touches business logic or storage. Email fields should match an email pattern. Phone numbers should match E.164 or your local format. Order quantities should be positive integers with a sane max.",
      "Validate on the **server** always. Client-side validation improves UX but can be bypassed with curl or Postman. Use schema libraries like **Zod** or **Joi** in Node.js, or Pydantic in Python, and reject bad input with clear `400` responses instead of silent failures.",
      "Sanitize output too. If user content is rendered in HTML, escape it to prevent **XSS**. If you store filenames or paths, block `../` traversal. Rate-limit login and checkout endpoints to slow brute-force attempts.",
      "A practical checklist: parameterized queries, schema validation on every API route, no secrets in client code, HTTPS everywhere, and least-privilege database accounts (read-only users where possible). Security issues do not announce themselves — they show up when someone tries the input you never tested.",
    ],
  },
  {
    slug: "blog1",
    title: "Why I Built Jenga Online for Tanzania's Hardware Stores",
    description:
      "A short write-up on escrow payments, local SMS alerts, and why construction e-commerce needs trust-first design.",
    date: "2026-06-15",
    readTime: "4 min read",
    tags: ["Next.js", "MongoDB", "E-commerce", "Tanzania"],
    logo: "https://res.cloudinary.com/drmmje4fs/image/upload/v1781543238/JengaOnline_logo_e7mpzr_e_background_removal_f_png_h8tzkg.png",
    logoAlt: "Jenga Online",
    body: [
      "Most hardware shops in Dar es Salaam still run on phone calls and walk-in customers. When I started **Jenga Online**, the goal was not just to list cement and bricks online — it was to give buyers and sellers a channel they could actually trust.",
      "The biggest lesson was payments. M-Pesa is everywhere, but releasing money before delivery kills confidence. We integrated **Snippe** with escrow logic so funds stay held until the buyer confirms delivery. That single decision changed how store owners talked about the platform.",
      "Notifications had to feel local too. Email alone is not enough for busy shop owners. **RAFIKI SMS** handles order alerts in Tanzania, while **Resend** covers email receipts. Pair that with **Cloudinary** for fast product images and **MongoDB** for flexible catalog data, and you get a stack that matches how the market really works.",
      "If you are building for East Africa, optimize for trust rails first — payments, proof of delivery, and alerts people already use every day. Fancy UI comes second.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
