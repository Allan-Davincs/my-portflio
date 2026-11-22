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
  metrics?: ProjectMetrics;
  status: "Production" | "Beta" | "Active" | "Archived" | "Research";
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
  apiSchema?: string;
  codeSnippets: CodeSnippet[];
}

export const navSections = [
  {
    label: "GET",
    items: [{ slug: "introduction", label: "introduction", method: "GET" as const }],
  },
  {
    label: "E_COMMERCE",
    items: [{ slug: "jenga-online", label: "jenga-online", method: "GET" as const }],
  },
  {
    label: "STUDENT_RESOURCES",
    items: [{ slug: "epapers", label: "epapers", method: "GET" as const }],
  },
  {
    label: "IOT",
    items: [{ slug: "kiwanda-os", label: "kiwanda-os", method: "GET" as const }],
  },
  {
    label: "RESEARCH",
    items: [
      { slug: "veloroute-proxy", label: "veloroute-proxy", method: "GET" as const },
      { slug: "nexa-ai", label: "nexa-ai", method: "GET" as const },
    ],
  },
  {
    label: "AI_AGENTS",
    items: [{ slug: "flex-ai", label: "flex-ai", method: "GET" as const }],
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
    slug: "kiwanda-os",
    navLabel: "kiwanda-os",
    method: "GET",
    category: "IOT",
    title: "KiwandaOS",
    subtitle: "Industrial intelligence for safer factories",
    description:
      "Distributed industrial monitoring, emergency response, machine-awareness, and computer-vision security platform for African manufacturing SMEs.",
    tech: [
      "Next.js",
      "Node.js",
      "Python",
      "MQTT",
      "WebSocket",
      "USSD",
      "SMS",
      "ESP32",
      "Computer Vision",
    ],
    metrics: {
      throughput: "1k+ events/sec",
      language: "Node.js + Python",
      latency: "<200ms",
    },
    status: "Production",
    logo: "https://kiwanda-os.vercel.app/KiwandaOS-Logo.png",
    links: {
      github: "https://github.com/Allan-Davincs/KiwandaOS",
    },
    overview:
      "KiwandaOS gives factory teams one clear view of security, machines, alerts, and emergency response. Built for African manufacturing SMEs, it helps operators detect risk earlier, monitor live site activity, and act with confidence from a single operational dashboard.",
    problem: [
      "Factories and SMEs often lack a unified view of machine health, security events, and emergency response",
      "High-risk incidents escalate quickly when operators rely on disconnected systems, manual checks, and slow reporting",
      "Industrial teams need a practical platform that is affordable, measurable, and easy to operate in fast-moving environments",
    ],
    outcomes: [
      "One operator view across machines, cameras, and site events",
      "Earlier detection and faster emergency response across live operations",
      "A modular industrial safety platform built for African factories and SMEs to scale with confidence",
    ],
    architecture:
      "Edge sensors, cameras, and industrial gateways stream telemetry into a real-time operations layer. KiwandaOS correlates events, triggers workflow rules, and pushes actionable alerts to operators through dashboard, SMS, and USSD channels for faster response and safer control rooms.",
    architectureDiagram: `┌──────────────┐  Sensor + Camera  ┌──────────────┐
│ Factory Edge │──────────────────▶│ KiwandaOS     │────▶│ Response Layer │
│ Devices      │                    │ Event Engine  │     │ SMS / USSD     │
└──────────────┘                    └──────┬───────┘     └──────┬────────┘
                                           │                     │
                                      ┌────▼──────────────┐  ┌────▼────────────┐
                                      │ Live Dashboard    │  │ Alert Automation │
                                      │ Machine & Safety  │  │ Rule Engine      │
                                      └───────────────────┘  └──────────────────┘`,
    apiSchema: `{
  "endpoint": "POST /api/events/ingest",
  "request": {
    "siteId": "site_dar_tz_04",
    "sensorId": "door_ashburn_12",
    "type": "intrusion",
    "value": true,
    "timestamp": "2026-10-08T10:45:00Z"
  },
  "response": {
    "status": "accepted",
    "eventId": "evt_5721",
    "alertLevel": "high",
    "channels": ["sms", "dashboard", "ussd"]
  }
}`,
    codeSnippets: [
      {
        title: "Telemetry Ingest",
        language: "typescript",
        code: `// app/api/events/ingest/route.ts
export async function POST(req: Request) {
  const payload = await req.json();
  const event = await persistEvent(payload);
  await triggerRules(event);

  return Response.json({
    status: "accepted",
    eventId: event.id,
    alertLevel: event.alertLevel,
  });
}`,
      },
      {
        title: "Alert Dispatch",
        language: "javascript",
        code: `// lib/alerts/dispatch.js
export async function triggerRules(event) {
  if (event.type === "intrusion" && event.value === true) {
    await sendSms(event.siteId, "Intrusion detected at site.");
    await sendUssdAlert(event.siteId, "LOCKDOWN");
  }
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
    category: "GO_ROUTING_RESEARCH",
    title: "VeloRoute Proxy",
    subtitle: "Researching Go performance in HTTP routing",
    description:
      "Research project exploring Go concurrency, load-balancing strategies, and connection handling in an observable HTTP reverse proxy.",
    tech: ["Go", "Prometheus", "Docker", "HTTP/2", "WebSocket"],
    metrics: {
      throughput: "Under evaluation",
      language: "Go",
      latency: "Profiling focus",
    },
    status: "Research",
    logo:
      "https://res.cloudinary.com/ddlegxejs/image/upload/v1782450980/VeloRoute-logo_ywb2qe.png",
    links: {
      github: "https://github.com/Allan-Davincs/VeloRoute-Proxy",
      demo: "https://veloroute-dashboard-f2dbafb3df20.herokuapp.com",
      liveDemos: [
        {
          label: "Dashboard",
          url: "https://veloroute-dashboard-f2dbafb3df20.herokuapp.com",
        },
        {
          label: "Backend API",
          url: "https://veloroute-api-bce1aa2e79bb.herokuapp.com//api/metrics",
        },
        {
          label: "Proxy",
          url: "https://veloroute-api-bce1aa2e79bb.herokuapp.com//get",
        },
      ],
    },
    overview:
      "VeloRoute is a research project investigating how Go can route HTTP traffic efficiently across backend services. It provides a test bed for comparing round-robin, least-connections, and weighted balancing while examining concurrency, connection reuse, routing throughput, and request latency. Health checks, rate limiting, and Prometheus metrics support operational observation during testing.",
    problem: [
      "Single-server deployments can't handle traffic spikes",
      "No visibility into backend health and request latency",
      "Need for rate limiting without adding application-layer complexity",
    ],
    outcomes: [
      "Compare routing strategies under concurrent request workloads",
      "Measure throughput and request latency to guide concurrency and connection-handling decisions",
      "Use health checks and Prometheus metrics to observe backend and proxy behavior",
    ],
    architecture:
      "Go-based reverse proxy and load balancer used to study concurrent request handling and routing behavior. Configurable health checks monitor backends, rate limiting controls per-client traffic, and a Prometheus exporter provides telemetry for performance analysis.",
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
    slug: "epapers",
    navLabel: "epapers",
    method: "GET",
    category: "STUDENT_RESOURCES",
    title: "E-Papers",
    subtitle: "A shared archive for university exam preparation",
    description:
      "A student-focused archive for discovering past examination papers by department, program, and module.",
    tech: ["Student resources", "Past papers", "Department browsing", "Marking schemes"],
    status: "Production",
    logo: "/epapers-logo.png",
    links: {
      github: "https://github.com/allan-davincs/epapers",
      demo: "https://epapers.co.tz/",
    },
    overview:
      "E-Papers (Tusome Pamoja) helps students prepare with confidence by bringing examination papers into a shared academic archive. Students can browse papers by department, program, and module, then find papers by course code, year, and exam type. The archive also surfaces download counts and marking schemes where available.",
    problem: [
      "Students lacked one centralized place to find past examination papers",
      "Course materials were difficult to discover when scattered across departments and student groups",
    ],
    outcomes: [
      "Browse examination papers by department, program, and module",
      "Find papers by course code, year, and exam type",
      "Access marking schemes when available",
    ],
    architecture:
      "A public web platform organizes examination-paper listings around academic departments, programs, and modules. Each listing presents course and exam details, with download activity and marking-scheme availability where provided.",
    architectureDiagram: `┌───────────────┐
│    Student    │
└───────┬───────┘
        │ Browse
        ▼
┌───────────────────────┐
│ Department / Program  │
│        / Module       │
└───────────┬───────────┘
            │ Find papers
            ▼
┌───────────────────────┐
│ Exam Papers & Schemes │
│ Course · Year · Type  │
└───────────────────────┘`,
    codeSnippets: [],
  },
  {
    slug: "nexa-ai",
    navLabel: "nexa-ai",
    method: "GET",
    category: "RAG_RESEARCH",
    title: "NEXA AI",
    subtitle: "Independent research into enterprise retrieval-augmented generation",
    description:
      "A personal research project exploring how retrieval-augmented generation can help users query enterprise documents with relevant context and source references.",
    tech: ["Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "Docker"],
    metrics: {
      throughput: "Research project",
      language: "Python",
      latency: "Under study",
    },
    status: "Research",
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
      "NEXA AI is an independent project I am building to understand retrieval-augmented generation (RAG) and how it can be applied to enterprise knowledge. I am exploring document ingestion, chunking and embeddings, vector retrieval, and grounded answer generation, with attention to citations and reducing unsupported responses. It is a learning and research project, not a claim of an enterprise production deployment.",
    problem: [
      "General-purpose language models may not have the context needed to answer questions about a specific organization’s documents",
      "Enterprise knowledge needs retrieval methods that can surface relevant source material",
      "Generated answers should be traceable to retrieved content and treated with appropriate confidence",
    ],
    outcomes: [
      "Study document ingestion and preparation for retrieval",
      "Explore vector search over documents such as PDFs, Markdown, and code",
      "Experiment with source-aware answers and guardrails against unsupported responses",
    ],
    architecture:
      "The research prototype explores a document ingestion pipeline that chunks content and stores embeddings in PostgreSQL with pgvector. A FastAPI service coordinates retrieval and response generation, returning source metadata for inspection.",
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
];

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return projects.find((project) => {
    const projectSlug = project.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return projectSlug === normalized || project.navLabel === normalized;
  });
}
