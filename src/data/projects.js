const projects = [
  {
    title: "Image Indexing & Semantic Search",
    year: 2026,
    status: "Completed",
    description:
      "UB Research project (Feb–Mar 2026): indexed a client's photo archive with InsightFace for face tags and RAM for object tags while keeping CPU load low, then built a hybrid search pipeline that pre-filters candidates in SQLite before running CLIP and FAISS vector search.",
    tech: ["Python", "FastAPI", "FAISS", "CLIP", "InsightFace", "RAM", "SQLite"],
    repoLink: "#",
    caseStudy: {
      problem:
        "A client had a large, unlabeled photo archive with no way to find anything in it — no face tags, no object tags, and no semantic search. Running a vision model over the whole archive for every query was far too slow, and the deployment target had no GPU budget.",
      constraints: [
        "CPU-only inference — no GPU available for indexing or query time",
        "Archive scale meant a full vector scan per query was not viable",
        "Face identity and object content both needed to be searchable",
        "Natural-language queries, not just tag matching",
      ],
      approach:
        "Indexing pass: ran InsightFace to extract and cluster face embeddings into identity tags, and RAM (Recognize Anything Model) to produce open-vocabulary object tags, batching work to keep CPU load low. Search pass: rather than embedding a query and scanning every vector, the pipeline first pre-filters candidates in SQLite using the structured face and object tags, then runs CLIP embedding + FAISS vector search over only that reduced candidate set. FastAPI serves both the indexing jobs and the query endpoint.",
      results: [
        "Face-tagged and object-tagged the full client archive on CPU only",
        "SQLite pre-filter cuts the FAISS search space before vector comparison",
        "Natural-language semantic search over the archive via CLIP",
      ],
      highlights: [
        "InsightFace face embedding + identity clustering",
        "RAM open-vocabulary object tagging",
        "Two-stage retrieval: SQLite structured pre-filter → CLIP + FAISS",
        "CPU-friendly batched indexing",
      ],
      links: [],
      images: [],
    },
  },
  // New 8 Projects (2025)
  {
    title: "Venyx: Agentic Desktop Productivity OS",
    year: 2025,
    status: "Ongoing",
    description:
      "A Python desktop app built with Flet and a FastAPI backend with MCP (Model Context Protocol) integration that orchestrates Gemini 2.5 Flash to act as a true desktop agent — reading Notion pages, managing files, querying knowledge bases, and executing tasks through a structured tool-call loop.",
    tech: ["Python", "Flet", "FastAPI", "MCP", "Gemini 2.5 Flash"],
    repoLink: "#",
    caseStudy: {
      problem:
        "Desktop productivity tools are siloed — notes in Notion, files on disk, context in your head. There's no unified agent that can read your workspace, understand intent, and act across tools without manual switching.",
      constraints: [
        "Real-time tool-call loop without blocking the UI",
        "MCP server interoperability across multiple tool providers",
        "Structured output parsing from Gemini 2.5 Flash",
        "Secure local file and Notion API access",
      ],
      approach:
        "Built a Flet desktop UI (pure Python, cross-platform) backed by a FastAPI server that exposes MCP-compatible tool definitions (Notion reader, file manager, knowledge search). Gemini 2.5 Flash drives a tool-call loop: it reads the user's intent, selects tools, receives structured results, and iterates until the task is complete. The agent can ingest a Notion page, summarize it, cross-reference files on disk, and return a synthesized response — all in one invocation.",
      results: [
        "End-to-end agentic workflows across Notion + local filesystem",
        "Structured tool-call loop with Gemini 2.5 Flash reasoning",
        "MCP protocol enables plug-and-play tool extension",
      ],
      highlights: [
        "Flet desktop UI — pure Python, cross-platform native app",
        "MCP (Model Context Protocol) tool orchestration",
        "Gemini 2.5 Flash as reasoning engine",
        "FastAPI async backend with structured tool routing",
        "Notion API integration for knowledge ingestion",
        "Extensible tool registry — add new MCP servers without core changes",
      ],
      links: [
        { label: "MCP Spec", href: "https://modelcontextprotocol.io/" },
        { label: "Gemini API", href: "https://ai.google.dev/" },
      ],
      images: [],
    },
  },
  {
    title: "Winter Path Estimator",
    year: 2025,
    status: "Completed",
    description:
      "Semantic segmentation model using U-Net to detect navigable paths in snow-covered environments, achieving 85.20% IoU — enabling safer autonomous navigation in winter conditions.",
    tech: ["Python", "PyTorch", "U-Net", "OpenCV", "Semantic Segmentation"],
    image:
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Snow-covered terrain makes path detection extremely difficult for autonomous systems — standard edge detection fails when roads, sidewalks, and surroundings merge into a uniform white surface.",
      constraints: [
        "High visual ambiguity in snow-covered scenes",
        "Limited labeled winter-condition datasets",
        "Real-time inference requirement for navigation use",
        "Robust to varying snow density and lighting",
      ],
      approach:
        "Fine-tuned a U-Net architecture on a curated winter navigation dataset with custom augmentation (snow overlay, contrast jitter, random occlusion) to simulate real-world degradation. Used an encoder-decoder with skip connections to preserve spatial detail for precise boundary segmentation. Evaluated with mean IoU across navigable/non-navigable/obstacle classes.",
      results: [
        "85.20% mean IoU on winter path segmentation",
        "Robust performance across variable snow density and lighting",
        "Outperformed baseline edge-detection methods by >30% IoU",
      ],
      highlights: [
        "U-Net semantic segmentation for snow-covered navigation",
        "Custom winter augmentation pipeline",
        "85.20% mean IoU on held-out test set",
        "Skip-connection architecture preserves spatial path boundaries",
      ],
      links: [
        { label: "U-Net Paper", href: "https://arxiv.org/abs/1505.04597" },
        { label: "PyTorch", href: "https://pytorch.org/" },
      ],
      images: [],
    },
  },
  {
    title: "Spectral Vision",
    year: 2025,
    status: "Ongoing",
    description:
      "Mixed reality application for Meta Quest 3S that overlays WiFi signal strength heatmaps and thermal imaging data onto physical spaces — turning invisible infrastructure into visible, spatially-anchored intelligence.",
    tech: ["Meta Quest 3S", "Unity", "C#", "Mixed Reality Toolkit", "WiFi APIs", "Thermal Imaging"],
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Network engineers and facilities teams have no spatial context for signal dead zones or heat sources — they rely on flat floor plans and handheld meters that can't convey the 3D distribution of invisible signals.",
      constraints: [
        "Real-time spatial anchor persistence on Meta Quest 3S",
        "Low-latency WiFi RSSI polling without disrupting normal traffic",
        "Thermal data alignment with physical space geometry",
        "Comfort and occlusion for mixed reality overlay rendering",
      ],
      approach:
        "Built a Unity MR application using Meta's Mixed Reality Toolkit for Quest 3S passthrough mode. WiFi RSSI data is polled and mapped to a spatial heatmap rendered as volumetric overlays anchored to room geometry. Thermal data from a connected sensor is projected onto surfaces using spatial calibration. Users walk through the space and see signal strength and heat distribution in real time.",
      results: [
        "Spatially-anchored WiFi heatmaps on Meta Quest 3S passthrough",
        "Real-time thermal overlay aligned to room geometry",
        "Intuitive MR interface for invisible infrastructure diagnostics",
      ],
      highlights: [
        "Meta Quest 3S mixed reality with room-scale spatial anchors",
        "WiFi RSSI heatmap rendered as volumetric MR overlay",
        "Thermal imaging projection onto physical surfaces",
        "Mixed Reality Toolkit + Unity for MR development",
      ],
      links: [
        { label: "Meta MR Toolkit", href: "https://developers.meta.com/horizon/develop/" },
        { label: "Unity", href: "https://unity.com/" },
      ],
      images: [],
    },
  },
  {
    title: "Pulse",
    year: 2025,
    status: "Ongoing",
    description:
      "An agentic professional presence engine that keeps your LinkedIn, portfolio, and personal brand in sync with your actual work — using a Draft-Critique-Refine loop to generate polished updates from raw activity logs.",
    tech: ["Python", "FastAPI", "LangGraph", "Gemini API", "LinkedIn API"],
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Professionals let their public presence go stale because writing polished LinkedIn posts or portfolio updates from raw work notes is friction-heavy and time-consuming. The gap between what you've done and what the world sees grows over time.",
      constraints: [
        "Output must sound like the user, not generic AI",
        "Draft-Critique-Refine loop must converge quickly (≤3 iterations)",
        "LinkedIn API rate limits and content policy compliance",
        "Multi-platform sync without duplication",
      ],
      approach:
        "Built a LangGraph-powered agentic pipeline: users log raw activity (meeting notes, commits, milestones); a Drafter agent generates platform-specific content; a Critic agent evaluates tone, specificity, and brand alignment; a Refiner agent iterates until the critique score passes threshold. FastAPI backend handles scheduling and LinkedIn API publishing. Users approve before any post goes live.",
      results: [
        "Draft-Critique-Refine loop converges in ≤2 iterations on average",
        "Platform-specific tone adaptation (LinkedIn vs. portfolio)",
        "One-click review-and-publish workflow",
      ],
      highlights: [
        "LangGraph agentic Draft-Critique-Refine pipeline",
        "Tone and brand-alignment critique scoring",
        "LinkedIn API integration with human-in-the-loop approval",
        "Multi-platform output (LinkedIn, portfolio, bios)",
        "Activity log ingestion from notes, commits, milestones",
      ],
      links: [
        { label: "LangGraph", href: "https://www.langchain.com/langgraph" },
        { label: "LinkedIn API", href: "https://developer.linkedin.com/" },
      ],
      images: [],
    },
  },
  {
    title: "LifeLogger",
    year: 2025,
    status: "Ongoing",
    description:
      "A passive agentic semantic pipeline that automatically indexes your digital life — screenshots, notes, browsing, conversations — into a queryable knowledge base you can ask questions about in natural language.",
    tech: ["Python", "FastAPI", "FAISS", "Whisper", "LangChain", "SQLite"],
    image:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Knowledge workers lose context constantly — a screenshot you took last month, a conversation you had, a tab you visited. There's no system that passively captures and semantically indexes your digital activity so you can retrieve it with a natural language query.",
      constraints: [
        "Passive capture with minimal CPU/battery impact",
        "Privacy-first: all processing local, no cloud upload",
        "Multimodal ingestion: text, images, audio",
        "Query latency must feel instant (<500ms)",
      ],
      approach:
        "Background daemon captures periodic screenshots (OCR via Tesseract), audio clips (Whisper transcription), and browser activity. All content is chunked, embedded, and stored in a FAISS index with SQLite metadata. LangChain orchestrates RAG-based query answering: user asks 'what was that article about quantum computing I read?' and the pipeline retrieves the closest indexed chunks and synthesizes an answer.",
      results: [
        "Fully local multimodal indexing pipeline (screenshots, audio, text)",
        "Sub-500ms RAG query response on local FAISS index",
        "Privacy-preserving: zero data leaves the device",
      ],
      highlights: [
        "Passive background capture with minimal resource footprint",
        "Whisper audio transcription + Tesseract OCR for multimodal ingestion",
        "FAISS semantic index with LangChain RAG query layer",
        "SQLite metadata store for temporal and source filtering",
        "Fully offline, privacy-first architecture",
      ],
      links: [
        { label: "FAISS", href: "https://faiss.ai/" },
        { label: "Whisper", href: "https://openai.com/research/whisper" },
        { label: "LangChain", href: "https://www.langchain.com/" },
      ],
      images: [],
    },
  },
  {
    title: "Capital Command",
    year: 2025,
    status: "Completed",
    description:
      "Enterprise financial analytics dashboard with real-time portfolio tracking, P&L visualization, and AWS-hosted infrastructure — built to handle large transaction datasets with sub-second query response.",
    tech: ["React", "TypeScript", "AWS", "Node.js", "PostgreSQL", "Chart.js"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Financial teams working with large portfolios need a unified dashboard that aggregates transactions, computes P&L in real time, and renders complex time-series charts without UI lag — existing tools either lack customization or are too expensive for mid-size teams.",
      constraints: [
        "Sub-second response on 100k+ transaction queries",
        "Real-time P&L recalculation on data update",
        "Role-based access control for multi-user teams",
        "AWS deployment with cost-efficient scaling",
      ],
      approach:
        "React + TypeScript frontend with Chart.js for time-series P&L, holdings breakdown, and allocation visualizations. Node.js backend with PostgreSQL handles aggregation queries with indexed materialized views for fast recalculation. Deployed on AWS (EC2 + RDS + CloudFront for static assets) with environment-based config for cost control. RBAC middleware gates data access by user role.",
      results: [
        "Sub-second P&L query response on 100k+ transaction datasets",
        "Real-time chart updates on portfolio changes",
        "AWS deployment with CloudFront static asset delivery",
        "Role-based access control for team environments",
      ],
      highlights: [
        "React + TypeScript enterprise dashboard",
        "Chart.js time-series P&L and portfolio visualization",
        "PostgreSQL materialized views for fast aggregation",
        "AWS EC2 + RDS + CloudFront deployment",
        "RBAC middleware for multi-user access control",
      ],
      links: [
        { label: "Chart.js", href: "https://www.chartjs.org/" },
        { label: "AWS", href: "https://aws.amazon.com/" },
      ],
      images: [],
    },
  },
  {
    title: "The Fire Squad: Multi-Agent Reinforcement Learning",
    year: 2025,
    status: "Completed",
    description:
      "An advanced MARL system optimizing emergency response coordination in wildfire scenarios, addressing credit assignment and multi-agent communication challenges.",
    tech: ["Python", "Stable Baselines3", "Gymnasium", "PyTorch"],
    repoLink: "#",
    caseStudy: {
      problem:
        "Wildfire containment requires coordinated multi-agent decision-making with limited resources. Single-agent approaches fail to capture collaborative suppression and movement policies.",
      constraints: [
        "Multi-agent credit assignment problem",
        "Agent communication and coordination",
        "Limited resource constraints",
        "Real-time decision making",
      ],
      approach:
        "Extended the FirecastRL environment with Multi-Agent Reinforcement Learning (MARL) using Stable Baselines3. Implemented coordinated movement and suppression policies, allowing multiple autonomous agents to collaborate in containing fires while managing limited resources. Addressed credit assignment through policy gradient methods and communication channels.",
      results: [
        "Improved containment efficiency vs. single-agent baselines",
        "Effective multi-agent coordination policies",
        "Scalable to large fire scenarios",
      ],
      highlights: [
        "Multi-Agent Reinforcement Learning framework",
        "Coordinated suppression and movement policies",
        "Credit assignment problem solutions",
        "Agent communication protocols",
        "FirecastRL environment extension",
      ],
      links: [
        {
          label: "Stable Baselines3",
          href: "https://stable-baselines3.readthedocs.io/",
        },
        { label: "Gymnasium", href: "https://gymnasium.farama.org/" },
        { label: "PyTorch", href: "https://pytorch.org/" },
      ],
      images: [],
    },
  },
  {
    title: "Promptly: Real-Time Prompt Engineering Utility",
    year: 2025,
    status: "Completed",
    description:
      "A lightweight, floating macOS widget that instantly optimizes rough drafts into engineered LLM prompts using Gemini API with ultra-low latency.",
    tech: ["Swift", "SwiftUI", "Gemini API"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Users struggle to bridge the gap between rough ideas and well-structured LLM prompts. Manual prompt engineering is time-consuming and blocks workflow.",
      constraints: [
        "Low-latency UI/UX",
        "Floating widget always-on-top",
        "Seamless clipboard integration",
        "Real-time API calls",
      ],
      approach:
        "Built a lightweight macOS widget using SwiftUI that stays on top of the workspace. Users paste a draft prompt; Gemini API restructures it based on engineering principles (Context, Task, Constraints, Output Format). Optimized for minimal latency with async API calls and caching.",
      results: [
        "Sub-second prompt optimization",
        "Seamless clipboard workflow integration",
        "Improved prompt quality and LLM response relevance",
      ],
      highlights: [
        "Lightweight floating widget design",
        "Real-time Gemini API integration",
        "Prompt engineering principle templates",
        "Clipboard automation",
        "Low-latency UI/UX",
      ],
      links: [
        { label: "Gemini API", href: "https://ai.google.dev/" },
        { label: "SwiftUI", href: "https://developer.apple.com/swiftui/" },
      ],
      images: [],
    },
  },

  // Ongoing
  {
    title: "Lock-IN",
    year: 2025,
    status: "Completed",
    description:
      "AI-assisted focus coach that syncs tasks with Google Calendar, predicts procrastination risk, and nudges you into the right work block before momentum slips. Features adaptive priority scoring, smart scheduling with Pomodoro timers, and Gemini AI coaching for personalized productivity insights.",
    tech: [
      "Flask",
      "SQLite",
      "Google Calendar API",
      "Gemini AI",
      "Vanilla JS",
      "OAuth 2.0",
    ],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop",
    demoLink: "https://lockin.nyc",
    repoLink: "https://github.com/venaxin/Lock-IN",
    metrics: { perf: 94, a11y: 98, bundle: "—" },
    caseStudy: {
      problem:
        "Students struggle with procrastination and momentum loss between tasks. Generic to-do apps lack smart scheduling, risk prediction, and AI-powered coaching to catch issues before they snowball.",
      constraints: [
        "Bidirectional Google Calendar sync without conflicts",
        "Real-time procrastination risk scoring",
        "Smart browser notifications without spam",
        "Lightweight AI coaching within Gemini API limits",
      ],
      approach:
        "Built a Flask backend with SQLite for task/schedule persistence. Integrated Google OAuth for Calendar bidirectional sync, filtering conflicts and inserting Lock-IN focus blocks. Gemini AI classifies tasks (deep_work, planning, etc.) and estimates buffer days + Pomodoro blocks. Priority scoring algorithm fuses deadline slack, streak state, and completion history into 0-200 risk scores. Frontend implements adaptive Pomodoro timers, drag-and-drop scheduling, and background notification sweeps with localStorage deduplication. AI insights coach posts ~45min snapshots for personalized recovery tips.",
      results: [
        "Seamless Google Calendar conflict resolution",
        "Smart notifications for upcoming blocks, deadlines, and missed sessions",
        "AI-powered task classification and coaching",
        "Procrastination analytics with streak tracking and category risk heat maps",
      ],
      highlights: [
        "Gemini AI task classification & coaching",
        "Adaptive priority & procrastination risk scoring (0-200)",
        "Google Calendar bidirectional sync with conflict resolution",
        "Smart Pomodoro scheduling with drag-and-drop",
        "Browser notification sweeps with deduplication",
        "Streak protection & recovery suggestions",
        "OAuth 2.0 security with session management",
      ],
      links: [
        { label: "Live App", href: "https://lockin.nyc" },
        { label: "GitHub", href: "https://github.com/venaxin/Lock-IN" },
        { label: "Gemini API", href: "https://ai.google.dev/" },
      ],
      images: [],
    },
  },
  {
    title: "OS Core Architecture Implementation",
    year: 2025,
    status: "Completed",
    description:
      "Research and development of fundamental OS components including Process Schedulers, Memory Management (Paging/Segmentation), and File Systems with focus on resource efficiency.",
    tech: ["C", "C++", "Systems Programming", "Unix/Linux"],
    image:
      "https://images.unsplash.com/photo-1550439062-2cba8dba8a97?q=80&w=1200&auto=format&fit=crop",
    repoLink: "#",
    caseStudy: {
      problem:
        "Building scalable and efficient operating systems requires deep understanding of low-level resource management, concurrency, and deadlock prevention.",
      constraints: [
        "Process scheduling efficiency",
        "Memory management optimization",
        "Deadlock prevention and detection",
        "File system reliability",
      ],
      approach:
        "Designed and implemented low-level systems including Process Schedulers with priority queues and preemption logic, Memory Management Units supporting both Paging and Segmentation, and reliable File Systems. Focused on managing concurrency, preventing deadlocks, and optimizing CPU utilization through careful resource allocation and synchronization primitives.",
      results: [
        "Stable multi-process environment",
        "Efficient resource management",
        "Minimal deadlock incidents",
      ],
      highlights: [
        "Process scheduler implementation",
        "Memory management (Paging/Segmentation)",
        "File system design",
        "Concurrency and synchronization",
        "Deadlock prevention mechanisms",
        "CPU utilization optimization",
      ],
      links: [
        { label: "OSDEV.org", href: "https://wiki.osdev.org/" },
        { label: "Linux Kernel", href: "https://kernel.org/" },
      ],
      images: [],
    },
  },

  // Previous
  {
    title: "CommitLife",
    year: 2025,
    status: "Ongoing",
    description:
      "A gamified habit tracker with a GitHub-style contribution grid, streaks, and achievements.",
    tech: ["React", "Tailwind", "Framer Motion", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    demoLink: "#",
    repoLink: "#",
    metrics: { perf: 98, a11y: 100, bundle: "165KB" },
    caseStudy: {
      problem:
        "Users drop off after week 2 in generic habit apps; streak motivation and quick wins aren’t visible enough.",
      constraints: [
        "TTI < 2.5s on mid-tier Android",
        "Offline-first with queued sync",
        "Accessible (WCAG) with keyboard + SR labels",
      ],
      approach:
        "Built a contribution-grid UI with weekly goals, streak boosters, and micro-interactions using Framer Motion. Implemented optimistic updates and background sync via Firebase. Honored prefers-reduced-motion and added semantic roles for tiles and controls.",
      results: [
        "+22% weekly retention (pilot)",
        "+18% average streak length",
        "Lighthouse: Perf 98 / A11y 100",
      ],
      highlights: [
        "Virtualized 12-month grid",
        "Tokenized themes with Tailwind + CSS vars",
        "Motion-reduced fallbacks",
      ],
      links: [{ label: "Design notes", href: "#" }],
      images: [],
    },
  },
  {
    title: "SplitVoice",
    year: 2025,
    status: "Ongoing",
    description:
      "Conversational expense splitter with AI clarifications and OCR-driven receipt parsing.",
    tech: ["React", "Node", "OCR", "OpenAI"],
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
    // demoLink: "#",
    repoLink: "https://github.com/venaxin/SplitVoice",
    metrics: { perf: 96, a11y: 100, bundle: "182KB" },
  },
  {
    title: "PantryChef",
    year: 2024,
    status: "Ongoing",
    description:
      "Interactive cooking assistant that adapts recipes to your pantry and utensils with guided modes.",
    tech: ["React", "LangChain", "Vision OCR", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    // demoLink: "#",
    // repoLink: "#",
    metrics: { perf: 94, a11y: 100, bundle: "210KB" },
  },

  // New
  {
    title: "Cognito",
    year: 2025,
    status: "Ongoing",
    description:
      "An intelligent learning coach to help you master any subject. Powered by a state-of-the-art LLM, it builds a personalized study plan, turns your inputs into learning cards, and uses a science-backed spaced repetition system to quiz you at the right moments. Track progress and build lasting knowledge efficiently.",
    tech: ["React", "Tailwind", "LLM", "Spaced Repetition"],
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1200&auto=format&fit=crop", // books/learning
    // demoLink: "#",
    repoLink: "https://github.com/venaxin/Cognito",
  },
  {
    title: "Clarity Planner",
    year: 2024,
    status: "Completed",
    description:
      "Real‑time, cross‑device scheduling app with month/week/day views, drag & drop, resize, conflict resolution, and anonymous → Google auth upgrade.",
    tech: [
      "Vanilla JS",
      "Firebase",
      "Firestore",
      "Auth",
      "Interact.js",
      "Tailwind",
      "HTML",
      "CSS",
      "Notifications API",
    ],
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop", // planning / calendar themed
    demoLink: "https://venaxin.github.io/Clarity_Planner/",
    repoLink: "https://github.com/venaxin/Clarity_Planner",
    metrics: { perf: 95, a11y: 100, bundle: "—" },
    caseStudy: {
      problem:
        "Busy users need frictionless, always‑in‑sync scheduling without heavyweight calendar UX or reload delays.",
      constraints: [
        "Sub‑second cross‑device propagation",
        "Mobile‑first auth & interactions",
        "Framework‑less (vanilla JS) implementation",
      ],
      approach:
        "Firestore onSnapshot listeners stream task documents; local state diffs patch UI incrementally. Anonymous sessions encourage zero‑friction trial; users can elevate to Google OAuth (signInWithRedirect) retaining data. Interact.js powers drag/resize; a custom overlap layout algorithm buckets colliding events by time span and assigns dynamic column widths. Notification + Storage APIs persist theme + send reminders. Pure ES modules + careful DOM diffing avoid a framework while keeping code maintainable.",
      results: [
        "<200ms typical multi‑device update latency (Wi‑Fi)",
        "Seamless anonymous → Google account upgrade with data preserved",
        "Lighthouse: Perf 95 / A11y 100 (desktop)",
        "Conflict resolution keeps 100% of overlapping events visible",
      ],
      highlights: [
        "Real‑time Firestore sync (onSnapshot)",
        "Anonymous + Google OAuth auth flow",
        "Drag, resize, and snap interactions (Interact.js)",
        "Custom event overlap layout algorithm",
        "Recurring events & checklist progress",
        "Desktop reminder notifications",
        "Light/dark theme persistence (localStorage)",
      ],
      links: [
        {
          label: "Firestore",
          href: "https://firebase.google.com/docs/firestore",
        },
        {
          label: "Interact.js",
          href: "https://interactjs.io/",
        },
      ],
      images: [],
    },
  },

  {
    title: "CampusClub House",
    year: 2023,
    status: "Ongoing",
    description:
      "A social platform helping students discover and organize in‑person and virtual activities, gatherings, and events across shared interests, hobbies, and professions. Note: this build includes the frontend; sign‑up/auth flows were not completed.",
    tech: ["React", "Tailwind", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop", // campus/events placeholder
    demoLink: "https://campusclubhouse.web.app/",
    repoLink: "https://github.com/venaxin/CampusClubHouse",
  },

  {
    title: "Codelab",
    year: 2024,
    status: "Ongoing",
    description:
      "Codelab is an online code editor to write, edit, and execute code directly in the browser. It offers multi‑language support (e.g., JavaScript, Python), real‑time execution, syntax highlighting, responsive design, and shareable links for quick collaboration.",
    tech: ["React", "Tailwind", "Syntax Highlighting"],
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop", // code editor themed
    // demoLink: none
    repoLink: "https://github.com/venaxin/codelab",
  },

  // Research
  {
    title: "GRASP",
    year: 2025,
    status: "Completed",
    description:
      "Cross‑modal self‑supervised molecular representation learning that aligns graph structures and SMILES using contrastive pre‑training; transfers well to MoleculeNet tasks with less labeled data.",
    tech: [
      "PyTorch",
      "PyTorch Geometric",
      "Transformers",
      "RDKit",
      "GNN",
      "ChemBERTa",
      "Self‑Supervised",
    ],
    image:
      "https://t4.ftcdn.net/jpg/07/28/41/19/360_F_728411989_LBR8P377a0nU8V6rZpVmVqzvrU128OhU.jpg", // local reliable thumbnail
    repoLink: "https://github.com/RitwijParmar/grasp-deep-learning-project",
    caseStudy: {
      problem:
        "Computational chemistry suffers from scarce labeled molecular data; labeling is expensive and slow. Goal: learn unified molecular embeddings by aligning graph and SMILES modalities for efficient transfer to downstream tasks.",
      constraints: [
        "Extremely limited labeled data",
        "Scale to >100M unlabeled molecules (PubChem)",
        "Train efficiently on commodity GPUs (Kaggle P100)",
      ],
      approach:
        "Data: Pulled ~352 compressed SDF archives from PubChem (≈113 GB), extracted ~176M canonical SMILES using RDKit in a streaming, memory‑safe pass.\n\nPipeline: Initially on‑the‑fly featurization in PyTorch DataLoader (RDKit graphs + SMILES tokenization) caused CPU bottlenecks; mitigated via parallel workers and batching. Explored TFRecord precompute for >7 it/s on M1 GPU, but stayed with optimized PyTorch path for simplicity.\n\nModel: Dual‑encoder with a GIN graph encoder (PyTorch Geometric) and a ChemBERTa SMILES encoder (Hugging Face). Projection heads map to a shared embedding space. InfoNCE contrastive loss aligns modalities (same molecule close; different far).\n\nTraining: Pre‑trained on 500k PubChem samples for 5 epochs on a Kaggle P100, ~7.2–7.3 it/s; robust checkpointing for best/final models.",
      results: [
        "InfoNCE convergence: avg loss ↓ from 0.0786 → 0.0039 (E1→E5)",
        "Strong cross‑modal alignment (cosine diag high; off‑diag low/neg)",
        "BBBP ROC‑AUC 0.94",
        "Tox21 ROC‑AUC 0.8186",
        "ESOL RMSE 0.8986",
      ],
      highlights: [
        "Cross‑modal contrastive learning (graphs + SMILES)",
        "Dual encoders: GIN (graphs) + ChemBERTa (SMILES)",
        "Optimized PyTorch data pipeline with RDKit streaming",
        "Transfers with less labeled data than supervised baselines",
      ],
      links: [
        {
          label: "PubChem (Compounds)",
          href: "https://pubchem.ncbi.nlm.nih.gov/docs/compounds",
        },
        { label: "MoleculeNet benchmark", href: "https://moleculenet.org/" },
        {
          label: "SimCLR (contrastive)",
          href: "https://arxiv.org/abs/2002.05709",
        },
        {
          label: "CLIP (cross‑modal)",
          href: "https://arxiv.org/abs/2103.00020",
        },
        { label: "ChemBERTa", href: "https://arxiv.org/abs/2010.09885" },
      ],
    },
  },

  // Completed
  {
    title: "HealthAI Connect",
    year: 2025,
    status: "Completed",
    description:
      "Multi-modal diagnostic platform with a RAG chatbot over ~9,000 records hitting 98.5% accuracy, backed by a VGG-16 CNN for medical imaging and a LangChain + FAISS retrieval pipeline for medication recommendations. Published in Taylor & Francis AI Frontiers.",
    tech: ["Python", "Flask", "LangChain", "FAISS", "RAG", "VGG-16", "TensorFlow", "scikit-learn"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    repoLink: "https://github.com/venaxin/HealthAI-Connect",
    metrics: { perf: 92, a11y: 96, bundle: "—" },
    caseStudy: {
      problem:
        "Clinical diagnostic tools are either expensive specialist systems or generic symptom checkers that miss nuance. The goal was to build an accessible, high-accuracy system that handles both medical image diagnostics (tumors, pneumonia) and intelligent medication recommendations from clinical literature.",
      constraints: [
        "High accuracy requirement on limited labeled medical imaging data",
        "Real-time inference for web deployment (Flask)",
        "Medication retrieval must stay grounded — no hallucination",
        "Interpretable outputs for medical context",
      ],
      approach:
        "Diagnostic module: Fine-tuned a VGG-16 CNN (TensorFlow/Keras) on chest X-ray and brain MRI datasets for pneumonia and tumor classification. Transfer learning from ImageNet weights allowed high accuracy with limited data. Medication module: Built a RAG pipeline indexing a clinical drug/symptom corpus with FAISS for fast similarity search; a Random Forest classifier handles structured symptom input, with retrieved passages grounding the recommendation. Flask backend exposes both pipelines through a unified REST API.",
      results: [
        "98.5% accuracy from the RAG chatbot over ~9,000 records",
        "RAG-grounded medication suggestions eliminate hallucination risk",
        "Published: Taylor & Francis AI Frontiers, October 2025",
        "Sub-second inference latency on CPU (Flask deployment)",
      ],
      highlights: [
        "VGG-16 fine-tuned for tumor & pneumonia classification",
        "LangChain + FAISS RAG pipeline over ~9,000 clinical records",
        "Random Forest for structured symptom classification",
        "Published research: Taylor & Francis AI Frontiers (Oct 2025)",
        "Unified REST API serving both diagnostic and recommendation modules",
      ],
      links: [
        { label: "GitHub", href: "https://github.com/venaxin/HealthAI-Connect" },
        { label: "Taylor & Francis AI Frontiers", href: "https://www.tandfonline.com/" },
      ],
      images: [],
    },
  },
  {
    title: "Intellibot",
    year: 2023,
    status: "Completed",
    description:
      "Chat and image generation system integrating GPT and DALL·E with voice I/O.",
    tech: ["Node.js", "Express", "React"],
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    demoLink: "https://intellibot-one.vercel.app/",
    repoLink: "https://github.com/venaxin/intellibot",
    metrics: { perf: 93, a11y: 98, bundle: "240KB" },
  },
  {
    title: "WeatherWiz",
    year: 2023,
    status: "Completed",
    description:
      "WeatherWiz is a React app for checking current weather and weekly forecasts for any city using the OpenWeatherMap API. Built while learning React.",
    tech: ["React", "OpenWeatherMap"],
    image:
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg", // local reliable thumbnail
    // demoLink: none
    repoLink: "https://github.com/venaxin/weatherwiz",
  },
  {
    title: "SonicWave",
    year: 2023,
    status: "Completed",
    description:
      "SonicWave is a custom music player I built to practice JavaScript and UI design—simple controls, clean UI, and basic playlist handling.",
    tech: ["JavaScript", "HTML", "CSS"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop", // music-themed placeholder
    demoLink: "https://venaxin.github.io/SonicWave/",
    repoLink: "https://github.com/venaxin/SonicWave",
  },
  {
    title: "Dynamic Calendar Wallpaper (iOS)",
    year: 2022,
    status: "Completed",
    description:
      "An advanced iOS Shortcut that renders a daily lock-screen calendar via HTML/CSS and Base64 images.",
    tech: ["iOS Shortcuts", "HTML", "CSS"],
    image:
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200&auto=format&fit=crop",
    repoLink: "https://github.com/venaxin/IOS-Dyna-Schedule-Wallpaper",
    metrics: { perf: 99, a11y: 100, bundle: "0KB" },
  },
];

export default projects;
