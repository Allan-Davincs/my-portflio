export interface ProjectMetrics {
  throughput: string;
  language: string;
  latency: string;
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  navLabel: string;
  method: "GET" | "POST";
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: ProjectMetrics;
  status: "Production" | "Beta" | "Active" | "Archived";
  links: {
    demo?: string;
    github?: string;
    liveDemos?: { label: string; url: string }[];
  };
  logo?: string;
  overview: string;
  problem: string[];
  outcomes: string[];
  architecture: string;
  architectureDiagram: string;
  apiSchema: string;
  codeSnippets: CodeSnippet[];
}

export const navSections = [
  {
    label: "GET",
    items: [{ slug: "introduction", label: "introduction", method: "GET" as const }],
  },
  {
    label: "CORE_SYSTEMS",
    items: [{ slug: "jenga-online", label: "jenga-online", method: "GET" as const }],
  },
  {
    label: "NETWORKING",
    items: [{ slug: "veloroute-proxy", label: "veloroute-proxy", method: "GET" as const }],
  },
  {
    label: "AI_AGENTS",
    items: [
      { slug: "flex-ai", label: "flex-ai", method: "GET" as const },
      { slug: "nexa-ai", label: "nexa-ai", method: "GET" as const },
    ],
  },
  {
    label: "TOOLS",
    items: [{ slug: "unitranslate", label: "unitranslate", method: "GET" as const }],
  },
  {
    label: "TERMINAL",
    items: [{ slug: "terminal-portfolio", label: "terminal-portfolio", method: "GET" as const }],
  },
  {
    label: "BLOG",
    items: [{ slug: "blog", label: "blog", method: "GET" as const }],
  },
  {
    label: "POST",
    items: [
      { slug: "skills", label: "skills", method: "GET" as const },
      { slug: "experience", label: "experience", method: "GET" as const },
      { slug: "contact", label: "contact", method: "POST" as const },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "jenga-online",
    navLabel: "jenga-online",
    method: "GET",
    category: "CORE_SYSTEMS",
    title: "Jenga Online",
    subtitle: "Soko la vifaa vya ujenzi mtandaoni — Build Smarter",
    description:
      "E-commerce marketplace for construction materials in Tanzania — verified stores, escrow payments, and nationwide delivery.",
    logo:
      "https://res.cloudinary.com/drmmje4fs/image/upload/v1781543238/JengaOnline_logo_e7mpzr_e_background_removal_f_png_h8tzkg.png",
    tech: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Cloudinary",
      "Snippe",
      "Resend",
      "RAFIKI SMS",
      "Tailwind",
    ],
    metrics: {
      throughput: "2k+ req/sec",
      language: "TypeScript",
      latency: "<120ms",
    },
    status: "Production",
    links: {
      demo: "https://jenga-online.vercel.app",
    },
    overview:
      "Jenga Online is a production e-commerce platform for construction materials (vifaa vya ujenzi) in Tanzania. Customers browse verified hardware stores, compare prices on cement, sand, bricks, and safety gear, and pay securely via Snippe and M-Pesa — with funds held in escrow until delivery is confirmed. Sellers get dashboards, SMS order alerts via RAFIKI SMS, and email notifications through Resend. Product images and assets are served from Cloudinary; all data lives in MongoDB.",
    problem: [
      "Construction material buyers in Tanzania lacked a trusted online marketplace with real store verification",
      "Small hardware shops had no digital channel to reach customers beyond word of mouth",
      "Payment trust was low — buyers needed escrow protection before releasing funds to sellers",
      "No unified platform combining catalog search, store profiles, and local payment rails (M-Pesa, Snippe)",
    ],
    outcomes: [
      "Live marketplace connecting verified Tanzanian hardware stores with buyers nationwide",
      "Escrow-protected checkout via Snippe — funds released only after delivery confirmation",
      "Automated order notifications through Resend (email) and RAFIKI SMS (Tanzania)",
      "Cloudinary-powered asset pipeline for fast product image delivery across devices",
      "JengaAI assistant for smarter product discovery and customer support",
    ],
    architecture:
      "Next.js App Router powers the Swahili-first storefront and seller dashboards. MongoDB stores products, orders, stores, and user accounts. Cloudinary handles image uploads and CDN delivery. Snippe processes M-Pesa and card payments with escrow logic. Resend sends transactional emails; RAFIKI SMS delivers order and OTP notifications to Tanzanian phone numbers.",
    architectureDiagram: `┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│   Browser    │────▶│   Next.js     │────▶│   MongoDB   │
│  (Swahili UI)│     │   App Router  │     │  (Products) │
└──────────────┘     └───────┬───────┘     └─────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  ┌─────────────┐    ┌─────────────┐    ┌──────────────┐
  │ Cloudinary  │    │   Snippe    │    │   Resend     │
  │  (Assets)   │    │ (M-Pesa/    │    │  (Emails)    │
  └─────────────┘    │  Escrow)    │    └──────────────┘
                     └─────────────┘
                             │
                     ┌───────▼───────┐
                     │ RAFIKI SMS   │
                     │ (TZ Alerts)   │
                     └───────────────┘`,
    apiSchema: `{
  "endpoint": "POST /api/orders",
  "request": {
    "items": [
      { "productId": "prod_saruji_50kg", "quantity": 10, "price": 18500 }
    ],
    "storeId": "store_dsm_hardware_01",
    "customer": {
      "name": "Juma Mwangi",
      "email": "juma@example.com",
      "phone": "+255859637644",
      "address": "Kinondoni, Dar es Salaam, TZ"
    },
    "paymentMethod": "snippe",
    "escrow": true
  },
  "response": {
    "orderId": "ord_jenga_2026_0042",
    "status": "pending_payment",
    "paymentUrl": "https://jenga-online/api/v1/snippe.sh/...",
    "total": 185000,
    "currency": "TZS",
    "notifications": {
      "email": "queued_via_resend",
      "sms": "queued_via_rafiki_sms"
    }
  }
}`,
    codeSnippets: [
      {
        title: "Product Fetch — MongoDB",
        language: "typescript",
        code: `// app/api/products/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  const product = await Product.findById(id)
    .populate("storeId", "name tin verified")
    .lean();

  if (!product) {
    return Response.json({ error: "Bidhaa haipatikani" }, { status: 404 });
  }

  return Response.json(product);
}`,
      },
      {
        title: "Snippe Payment Init",
        language: "typescript",
        code: `// lib/payments/snippe.ts
export async function createEscrowPayment(order: Order) {
  const response = await fetch("https://jenga-online/pay/snippe.sh/v1/payments", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.SNIPPE_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: order.total,
      currency: "TZS",
      reference: order._id,
      escrow: true,
      callback_url: \`\${process.env.APP_URL}/api/webhooks/snippe\`,
    }),
  });

  return response.json();
}`,
      },
      {
        title: "Order SMS via RAFIKI",
        language: "typescript",
        code: `// lib/notifications/sms.ts
export async function sendOrderSms(phone: string, orderId: string) {
  await fetch("https://api.rafiki.co.tz/sms/send", {
    method: "POST",
    headers: { Authorization: \`Bearer \${process.env.RAFIKI_API_KEY}\` },
    body: JSON.stringify({
      to: phone,
      message: \`Jenga Online: Oda #\${orderId} imepokelewa. Fuatilia hali yako kwenye dashibodi.\`,
    }),
  });
}`,
      },
    ],
  },
  {
    slug: "flex-ai",
    navLabel: "flex-ai",
    method: "GET",
    category: "AI_AGENTS",
    title: "Flex AI",
    subtitle: "WhatsApp bot via Baileys Web Session — group control & plugin APIs",
    description:
      "WhatsApp automation bot using Baileys (not official API) with WebSocket sessions, command routing, and external API plugins for music and more. Currently archived.",
    tech: [
      "Node.js",
      "Baileys",
      "WebSocket",
      "OpenAI",
      "Redis",
      "Docker",
      "REST APIs",
    ],
    metrics: {
      throughput: "500+ msg/sec",
      language: "Node.js",
      latency: "<200ms",
    },
    status: "Archived",
    logo: "https://files.catbox.moe/a44m93.jpg",
    links: {
      github: "https://github.com/Allan-Davincs/FLEX-AI",
      demo: "https://flex-ai.site",
    },
    overview:
      "Flex AI is a WhatsApp automation platform that connects via Baileys using a Web Session over WebSockets — not the official WhatsApp Business API. Users scan a QR code to link their session, then interact through group commands, auto-replies, and plugin integrations with external APIs (e.g. music download services) directly inside WhatsApp chats. The project demonstrated group moderation, featured strikes, and extensible command plugins. It is currently archived and no longer actively maintained.",
    problem: [
      "Official WhatsApp Business API is costly and restrictive for community bots and hobby projects",
      "Groups needed smart automation without enterprise API access",
      "Users wanted in-chat access to external services like music downloads via simple commands",
    ],
    outcomes: [
      "Baileys Web Session enabled full WhatsApp interaction without official API fees",
      "WebSocket-based real-time message handling with sub-200ms command dispatch",
      "Pluggable external API architecture — music download and other third-party integrations",
      "Project archived after proving the concept; codebase preserved on GitHub",
    ],
    architecture:
      "Node.js hosts the Baileys client, maintaining a persistent WhatsApp Web Session over WebSockets. Incoming messages are routed through a command dispatcher. OpenAI handles natural language where needed. Redis stores session state and rate limits. External API plugins (music download, etc.) are invoked via command hooks and return media or links back to the chat. No Meta Cloud API or webhook infrastructure required.",
    architectureDiagram: `┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  WhatsApp    │◀───▶│  Baileys Client │────▶│   OpenAI     │
│  Web Session │ WS  │  (Web Session)  │     │   GPT API    │
└──────────────┘     └────────┬────────┘     └──────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       ┌────────────┐  ┌────────────┐  ┌──────────────┐
       │   Redis    │  │  Command   │  │ External APIs│
       │ (Sessions) │  │  Router    │  │ (Music, etc.)│
       └────────────┘  └────────────┘  └──────────────┘`,
    apiSchema: `{
  "endpoint": "POST /api/v1/plugins/music/download",
  "description": "External API plugin — download music via WhatsApp command",
  "request": {
    "command": "/music download",
    "args": { "query": "Diamond Platnumz Jeje" },
    "groupId": "120363000000000000@g.us",
    "sender": "+255700000000",
    "session": "baileys_web_session_id"
  },
  "response": {
    "status": "ok",
    "type": "audio",
    "mediaUrl": "https://cdn.example.com/track.mp3",
    "title": "Jeje — Diamond Platnumz",
    "deliveredVia": "baileys_websocket",
    "latencyMs": 1840
  }
}`,
    codeSnippets: [
      {
        title: "Baileys Web Session Init",
        language: "javascript",
        code: `// src/whatsapp/baileysClient.js
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";

export async function startWhatsAppSession() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;
    await dispatchCommand(sock, msg);
  });

  return sock;
}`,
      },
      {
        title: "External API Plugin — Music",
        language: "javascript",
        code: `// src/plugins/musicPlugin.js
export async function handleMusicDownload({ query, sock, jid }) {
  const result = await fetch(
    \`\${process.env.MUSIC_API_URL}/search?q=\${encodeURIComponent(query)}\`
  );
  const { streamUrl, title } = await result.json();

  await sock.sendMessage(jid, {
    audio: { url: streamUrl },
    mimetype: "audio/mpeg",
    fileName: \`\${title}.mp3\`,
  });

  return { title, delivered: true };
}`,
      },
    ],
  },
  {
    slug: "veloroute-proxy",
    navLabel: "veloroute-proxy",
    method: "GET",
    category: "NETWORKING",
    title: "VeloRoute Proxy",
    subtitle: "High-performance reverse proxy & load balancer",
    description:
      "Production reverse proxy with pluggable load balancing, health checks, rate limiting, Prometheus metrics, and live monitoring dashboard.",
    tech: ["Go", "Prometheus", "Docker", "HTTP/2", "WebSocket"],
    metrics: {
      throughput: "10k+ req/sec",
      language: "Go",
      latency: "<50ms",
    },
    status: "Production",
    logo:
      "https://res.cloudinary.com/ddlegxejs/image/upload/v1782450980/VeloRoute-logo_ywb2qe.png",
    links: {
      github: "https://github.com/Allan-Davincs/VeloRoute-Proxy",
      demo: "https://veloroute-proxy-frontend-a5705033a4ef.herokuapp.com",
      liveDemos: [
        {
          label: "Dashboard",
          url: "https://veloroute-proxy-frontend-a5705033a4ef.herokuapp.com",
        },
        {
          label: "Backend API",
          url: "https://veloroute-backend-bd3434ba5cd4.herokuapp.com/api/metrics",
        },
        {
          label: "Proxy",
          url: "https://veloroute-backend-bd3434ba5cd4.herokuapp.com/get",
        },
      ],
    },
    overview:
      "VeloRoute sits between clients and backend servers, distributing HTTP traffic using pluggable algorithms (round-robin, least-connections, weighted). It monitors backend health, enforces per-IP rate limiting, and exposes Prometheus metrics plus a live dashboard.",
    problem: [
      "Single-server deployments can't handle traffic spikes",
      "No visibility into backend health and request latency",
      "Need for rate limiting without adding application-layer complexity",
    ],
    outcomes: [
      "10,000+ requests/sec throughput on modest hardware",
      "Sub-50ms proxy overhead with connection pooling",
      "Real-time dashboard for ops teams with Prometheus integration",
    ],
    architecture:
      "Go-based reverse proxy with worker pool for concurrent connections. Health checker polls backends on configurable intervals. Rate limiter uses token bucket per client IP. Metrics exporter integrates with Grafana/Prometheus stack.",
    architectureDiagram: `┌─────────┐     ┌──────────────┐     ┌─────────────┐
│ Clients │────▶│  VeloRoute   │────▶│  Backend 1  │
└─────────┘     │  Load Balancer│────▶│  Backend 2  │
                │  + Rate Limit │────▶│  Backend N  │
                └──────┬───────┘     └─────────────┘
                       │
                ┌──────▼───────┐
                │  Prometheus  │
                │  Dashboard   │
                └──────────────┘`,
    apiSchema: `{
  "endpoint": "GET /api/v1/backends",
  "response": {
    "backends": [
      {
        "id": "backend-1",
        "url": "http://10.0.0.1:8080",
        "status": "healthy",
        "weight": 3,
        "activeConnections": 42,
        "avgLatencyMs": 23
      }
    ],
    "algorithm": "weighted_round_robin",
    "totalRequests": 1048576
  }
}`,
    codeSnippets: [
      {
        title: "Load Balancer Core",
        language: "go",
        code: `// internal/balancer/roundrobin.go
type RoundRobin struct {
    backends []*Backend
    current  uint64
}

func (rr *RoundRobin) Next() *Backend {
    n := atomic.AddUint64(&rr.current, 1)
    healthy := rr.healthyBackends()
    if len(healthy) == 0 {
        return nil
    }
    return healthy[int(n)%len(healthy)]
}`,
      },
      {
        title: "Deploy",
        language: "bash",
        code: `# Build and run VeloRoute
go build -o veloroute ./cmd/veloroute
./veloroute --config config.yaml

# Or with Docker
docker compose up -d`,
      },
    ],
  },
  {
    slug: "nexa-ai",
    navLabel: "nexa-ai",
    method: "GET",
    category: "AI_AGENTS",
    title: "NEXA AI",
    subtitle: "Private AI brain for enterprise documents",
    description:
      "Production RAG system for querying your own files — PDFs, Markdown, code — with strict anti-hallucination rules and grounded answers.",
    tech: ["Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "Docker"],
    metrics: {
      throughput: "200+ queries/min",
      language: "Python",
      latency: "<2s",
    },
    status: "Production",
    logo:
      "https://res.cloudinary.com/ddlegxejs/image/upload/v1782450980/NEXA-AI-Logo_zbmglu.png",
    links: {
      github: "https://github.com/Allan-Davincs/NEXA-AI",
      demo: "https://nexa-dashboard-d647ffea7dce.herokuapp.com/",
      liveDemos: [
        {
          label: "Admin Dashboard",
          url: "https://nexa-dashboard-d647ffea7dce.herokuapp.com/",
        },
        {
          label: "API",
          url: "https://nexa-api-v1-fe9d6a089b30.herokuapp.com/",
        },
        {
          label: "API Docs (Swagger)",
          url: "https://nexa-api-v1-fe9d6a089b30.herokuapp.com/docs",
        },
        {
          label: "Health Check",
          url: "https://nexa-api-v1-fe9d6a089b30.herokuapp.com/health",
        },
      ],
    },
    overview:
      "NEXA AI lets enterprises ask questions about their own documents and get answers grounded in their data — not the public internet. It uses retrieval-augmented generation with citation tracking and confidence scoring to minimize hallucinations.",
    problem: [
      "Generic LLMs hallucinate on proprietary company documents",
      "Sensitive data can't be sent to public AI services without controls",
      "Teams need searchable knowledge bases with source citations",
    ],
    outcomes: [
      "Grounded answers with source document citations on every response",
      "Vector search across PDFs, Markdown, and code repositories",
      "Anti-hallucination guardrails with confidence thresholds",
    ],
    architecture:
      "Document ingestion pipeline chunks and embeds files into pgvector. FastAPI serves query endpoints. RAG pipeline retrieves top-k chunks, constructs context window, and generates answers with citation metadata.",
    architectureDiagram: `┌────────────┐     ┌─────────────┐     ┌────────────┐
│  Documents │────▶│  Ingestion  │────▶│  pgvector  │
│  PDF/MD/Code│     │  Pipeline   │     │  Embeddings│
└────────────┘     └─────────────┘     └─────┬──────┘
                                              │
┌────────────┐     ┌─────────────┐     ┌──────▼─────┐
│   Client   │────▶│   FastAPI   │◀────│  RAG Engine│
│   Query    │     │   Gateway   │     │  + OpenAI  │
└────────────┘     └─────────────┘     └────────────┘`,
    apiSchema: `{
  "endpoint": "POST /api/v1/query",
  "request": {
    "question": "What is our refund policy for enterprise clients?",
    "collection": "legal-docs",
    "options": {
      "topK": 5,
      "minConfidence": 0.75,
      "includeSources": true
    }
  },
  "response": {
    "answer": "Enterprise clients receive full refunds within 30 days...",
    "confidence": 0.92,
    "sources": [
      { "file": "enterprise-tos.pdf", "page": 12, "chunk": "refund-policy-3" }
    ],
    "latencyMs": 1840
  }
}`,
    codeSnippets: [
      {
        title: "Embedding Configuration",
        language: "python",
        code: `# config/embeddings.py
EMBEDDING_CONFIG = {
    "model": "text-embedding-3-small",
    "dimensions": 1536,
    "chunk_size": 512,
    "chunk_overlap": 64,
    "batch_size": 100,
}

async def embed_chunks(chunks: list[str]) -> list[list[float]]:
    response = await openai.embeddings.create(
        model=EMBEDDING_CONFIG["model"],
        input=chunks,
    )
    return [item.embedding for item in response.data]`,
      },
    ],
  },
  {
    slug: "unitranslate",
    navLabel: "unitranslate",
    method: "GET",
    category: "TOOLS",
    title: "UniTranslate",
    subtitle: "Web + mobile language translation platform",
    description:
      "Cross-platform translation application supporting multiple languages with DeepL integration and PWA capabilities.",
    tech: ["Vue.js", "Python", "Flask", "DeepL API", "PWA"],
    metrics: {
      throughput: "1k+ translations/min",
      language: "Python",
      latency: "<300ms",
    },
    status: "Active",
    links: {
      github: "https://github.com/Allan-Davincs/UNITRANSLATE_V2",
      demo: "https://unitranslate-v2-e7685a48df3a.herokuapp.com/",
    },
    overview:
      "UniTranslate is a web and mobile-ready translation platform that bridges language barriers for users across East Africa and beyond. It combines Vue.js frontend with Flask backend and DeepL API for high-quality translations.",
    problem: [
      "Existing translation tools lack offline/PWA support for low-connectivity regions",
      "Need for batch translation of documents and real-time chat translation",
      "Mobile-first UX required for primary user base",
    ],
    outcomes: [
      "PWA installable on mobile devices for offline-first access",
      "Sub-300ms translation latency for short text segments",
      "Multi-language support with translation history",
    ],
    architecture:
      "Vue.js SPA with service worker for PWA caching. Flask REST API proxies requests to DeepL with rate limiting and caching. Redis optional layer for frequent phrase deduplication.",
    architectureDiagram: `┌─────────────┐     ┌─────────────┐     ┌──────────┐
│  Vue.js PWA │────▶│ Flask API   │────▶│  DeepL   │
│  (Frontend) │     │  (Backend)  │     │  API     │
└─────────────┘     └─────────────┘     └──────────┘`,
    apiSchema: `{
  "endpoint": "POST /api/translate",
  "request": {
    "text": "Habari, unahitaji msaada gani?",
    "sourceLang": "sw",
    "targetLang": "en"
  },
  "response": {
    "translated": "Hello, what help do you need?",
    "detectedLang": "sw",
    "confidence": 0.98,
    "latencyMs": 245
  }
}`,
    codeSnippets: [
      {
        title: "Translation Endpoint",
        language: "python",
        code: `# app/routes/translate.py
@bp.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json()
    result = deepl_client.translate_text(
        data["text"],
        source_lang=data.get("sourceLang", "auto"),
        target_lang=data["targetLang"],
    )
    return jsonify({
        "translated": result.text,
        "detectedLang": result.detected_source_lang,
    })`,
      },
    ],
  },
  {
    slug: "terminal-portfolio",
    navLabel: "terminal-portfolio",
    method: "GET",
    category: "TERMINAL",
    title: "Terminal Portfolio",
    subtitle: "Cyberpunk-themed interactive developer portfolio",
    description:
      "Original terminal-style portfolio with boot sequence, command navigation, bento grid projects, and cyberpunk aesthetics.",
    tech: ["React", "Vite", "TypeScript", "Tailwind", "Motion"],
    metrics: {
      throughput: "Instant",
      language: "TypeScript",
      latency: "<16ms",
    },
    status: "Production",
    links: {
      github: "https://github.com/Allan-Davincs",
      demo: "https://alan-enock.vercel.app",
    },
    overview:
      "The legacy terminal portfolio at alan-enock.vercel.app — a cyberpunk-themed, command-driven SPA built with Vite and React. Visitors navigate via terminal commands to explore about, skills, experience, and projects. The documentation portfolio (v2) lives at alan-enock-v2.vercel.app.",
    problem: [],
    outcomes: [],
    architecture:
      "Vite + React SPA with section-based routing via state. Motion library handles page transitions. shadcn/ui components for UI primitives. Dark-mode-only cyberpunk theme with custom CSS variables.",
    architectureDiagram: `┌─────────────────────────────────────────┐
│              Terminal Boot              │
│         (Typing Animation)              │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│ About  │  │  Skills  │  │ Projects │
│  /CV   │  │ (separate│  │  Grid    │
│        │  │Experience│  │          │
└────────┘  └──────────┘  └──────────┘`,
    apiSchema: `{
  "navigation": {
    "commands": [
      { "cmd": "./about", "section": "about", "desc": "View CV and personal info" },
      { "cmd": "./skills", "section": "skills", "desc": "Display technical skills" },
      { "cmd": "./projects", "section": "projects", "desc": "Browse my projects" },
      { "cmd": "./experience", "section": "experience", "desc": "View work history" }
    ]
  }
}`,
    codeSnippets: [
      {
        title: "Command Navigation",
        language: "typescript",
        code: `// App.tsx — section routing
const renderSection = () => {
  switch (currentSection) {
    case "about": return <AboutCV />;
    case "skills": return <SkillsTerminal />;
    case "experience": return <ExperienceTerminal />;
    case "projects": return <ProjectsTerminal />;
    default: return <TerminalBoot onNavigate={handleNavigate} />;
  }
};`,
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
