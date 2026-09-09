/*
  Experience content, separated from layout.

  Each role carries a `headline` (what the card shows — two or three numbers)
  and `stints` (what the overlay shows). A role can have more than one stint:
  Goodz is one employer across two non-contiguous periods, so it reads as a
  single card with both ranges and a combined tenure rather than two cards
  competing for the same company name.

  `start` / `end` are YYYY-MM; a null `end` means present and lets the tenure
  keep counting on its own. Bullet strings support **bold** and `code`; see
  formatBullet in ExperienceSection.jsx. Plain strings rather than HTML so
  nothing has to be dangerously injected.
*/
const experience = [
  {
    id: "goodz",
    company: "Goodz Pvt. Ltd",
    role: "Software Engineer",
    location: "San Francisco, CA · Remote",
    stack: [
      "Python",
      "PyTorch",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Angular",
      "AWS",
    ],
    headline: [
      { value: "−45%", label: "order-status tickets" },
      { value: "+18%", label: "recall@10 over baseline" },
      { value: "−97%", label: "p99 latency in an outage" },
    ],
    blurb:
      "Responsible for the order lifecycle end to end — placement, dispatch, delivery and vendor payouts — plus the prediction layer sitting on top of it: ETAs and recommendations.",
    stints: [
      {
        role: "Software Engineer",
        period: "Jan 2026 – Present",
        start: "2026-01",
        end: null,
        current: true,
        sections: [
          {
            title: "Live delivery tracking",
            bullets: [
              "Designed and owned an end-to-end live delivery tracking product with GPS ingestion, real-time WebSocket updates, and an ETA model trained on historical delivery times, cutting order-status support tickets **45%**.",
            ],
          },
          {
            title: "Order recommendations",
            bullets: [
              "Built the customer order recommendation system, training a **two-tower PyTorch model** on order history that beat the baseline by **18% on recall@10**.",
              "Served recommendations from Redis to lift repeat-order conversion **20%**.",
            ],
          },
        ],
      },
      {
        role: "Software Engineer",
        period: "Jul 2024 – Aug 2025",
        start: "2024-07",
        end: "2025-08",
        sections: [
          {
            title: "Core order service",
            bullets: [
              "Engineered the core order service handling placement, confirmation, dispatch and delivery for **4,000+ orders a day** on Node.js and PostgreSQL, hardened with idempotent transitions to cut stuck-order rates **40%**.",
              "Owned vendor payouts and reconciliation, replacing a manual spreadsheet workflow with an automated nightly job that cut reconciliation from **2 days to 20 minutes**.",
              "Traced a production outage during a **20x holiday traffic spike** to a saturated database connection pool and fixed it with a Redis caching layer, cutting p99 latency **97%** with zero downtime.",
              "Designed and built a custom high-performance data grid for **50,000+ order records**, cutting rendering lag **73%**.",
            ],
          },
          {
            title: "Web platform migration",
            bullets: [
              "Led the migration of a legacy HTML/PHP site to Angular, cutting page load from 8 seconds to under 2.",
              "**What actually made it fast:** lazy-loaded images, route-level lazy loading so checkout and vendor dashboard modules only load on navigation, and offloading static assets to S3 + CloudFront.",
              "Built the data grid on Angular CDK `VirtualScrollViewport` and RxJS, with multi-level grouping, RxJS-driven filtering, drag-and-drop reordering, and WCAG ARIA roles plus keyboard navigation.",
              "Refactored and stabilized Paytm payment flows, fixing checksum mismatches, webhook issues and timestamp sync errors.",
            ],
          },
          {
            title: "Infrastructure & mobile",
            bullets: [
              "Cut server delivery costs **20%** by moving static asset hosting to S3 and CloudFront, replacing manual FTP deploys with a one-command pipeline anyone on the team could run.",
              "Rebuilt the React Native navigation stack, fixing Android back-button exits and iOS swipe gesture glitches.",
              "Integrated Firebase Cloud Messaging for driver alerts, and fixed a ProGuard bug where obfuscated class names broke the FCM SDK at runtime.",
              "Reduced the production APK from 45MB to ~34MB, and added delivery tracking maps on OpenStreetMap and Leaflet inside a WebView at roughly zero cost.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "suny",
    company: "SUNY Research Foundation",
    role: "Research Aide",
    project: "Two-Tier RAG Log-Anomaly Detector",
    location: "Buffalo, NY",
    stack: ["Python", "PyTorch", "Neo4j", "FAISS", "Llama-3.3", "Kafka"],
    headline: [
      { value: "4.7M+", label: "log lines processed" },
      { value: "−78%", label: "inference latency" },
    ],
    blurb:
      "Built the anomaly-detection pipeline over a supercomputer's log telemetry — cheap models triage everything, and only what looks wrong escalates to a heavyweight reasoning tier.",
    stints: [
      {
        role: "Research Aide",
        period: "Apr 2026 – May 2026",
        start: "2026-04",
        end: "2026-05",
        sections: [
          {
            title: "At a glance",
            bullets: [
              "Built a two-tier anomaly detector using small language models across **4.7M+ log lines**, cutting inference latency **78%**.",
              "Parsed four distinct log formats with strict chronological splits, then validated the model live on a **Kafka stream**.",
            ],
          },
          {
            title: "Tier 1 — Multi-LoRA ensemble & early latent fusion",
            bullets: [
              "Designed a Universal Multi-LoRA Engine dynamically hot-swapping Llama-3.2 (1B), Phi-3.5-Mini (3.8B) and GPT-2 (124M) adapters into a single frozen VRAM footprint.",
              "Implemented **early latent fusion** by concatenating un-pooled terminal hidden states into a unified 5,888-D super-vector, using logistic regression to achieve a 98.54% compute reduction on safe logs while keeping near-perfect recall.",
              "Solved sequence chronological destruction by pivoting from mean pooling to **causal last-token pooling**, and injecting structural metadata (node drift ratios, temporal ∆t) prior to inference.",
            ],
          },
          {
            title: "Tier 2 — Graph-augmented agentic RAG",
            bullets: [
              "Built an asynchronous **cognitive judge** on a quantized Llama-3.3-70B-Instruct to analyse anomalies escalated by Tier 1.",
              "Engineered a universal security ontology mapping 1D log streams into a 3D Neo4j graph. Bypassed global `O(|V|+|E|)` query bottlenecks with `O(1)` ego-graph extraction — a strict 3-hop radius around the target node — to serialize local topological context for the LLM.",
              "Resolved hallucination and cognitive overload by extracting 8,192-D hidden state vectors from the 70B model and using it purely as a feature extractor feeding a **focal loss MLP**, mining hard negatives to catch stealthy zero-day attacks.",
            ],
          },
          {
            title: "Autonomous swarm & temporal tracking",
            bullets: [
              "Deployed a 3-stage **hierarchical multi-agent swarm** (commander, coder, critic) on Qwen-2.5-Coder to deduce unseen log topologies and generate deterministic Python extraction rules.",
              "Hardened the control plane with an isolated subprocess on a strict 2.0-second execution timeout that evaluates LLM-generated code, catching infinite loops and passing stderr traces back to the coder for reflection.",
              "Implemented an in-memory **EWMA latent state tracker** for highly asynchronous state machines, decoupling healthy micro-states from doomed macroscopic block failures without shattering the latent manifold.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "youro",
    company: "Youro",
    role: "Software Engineer Intern",
    location: "Buffalo, NY",
    stack: ["React Native", "TypeScript", "Spring Boot", "PostgreSQL", "RAG"],
    headline: [
      { value: "85%", label: "diagnosis match rate" },
      { value: "15→4", label: "min pre-consult review" },
      { value: "−30%", label: "redundant API calls" },
    ],
    blurb:
      "Owned full-stack development of a patient-facing urology telehealth platform, shipped to production in four months.",
    stints: [
      {
        role: "Software Engineer Intern",
        period: "Aug 2025 – Dec 2025",
        start: "2025-08",
        end: "2025-12",
        sections: [
          {
            title: "At a glance",
            bullets: [
              "Owned full-stack development of a patient-facing urology telehealth platform — authentication, appointment booking, doctor-patient chat and medication tracking — shipped to production in **4 months**.",
              "Partnered with the founding urologist on an **adaptive intake questionnaire** that compiles patient answers into a pre-consult report, cutting review time from ~15 minutes to under 4.",
              "Rebuilt the API client layer with request deduplication, response caching and **refresh-token rotation**, cutting redundant backend calls 30% and closing a token-replay security gap.",
              "Built an **AI diagnosis-assist tool** that uses an LLM to pull symptoms from intake reports and a RAG layer over clinical guidelines to rank likely diagnoses, matching the urologist's diagnosis on **85% of consults**.",
            ],
          },
          {
            title: "Real-time WebSocket chat",
            bullets: [
              "Built a real-time chat system, redesigning subscription paths to guarantee instant messaging between doctors and patients.",
              "**Root cause:** the backend sent to user-specific paths (`/user/42/private`) while the mobile client subscribed to a generic `/user/private` — messages arrived on the wrong channel and were silently dropped.",
              "**Fix:** computed the user-specific subscription segment post-authentication in `ChatSocket.ts` and updated all paths.",
              "**Architecture:** hybrid socket-first with REST fallback — WebSockets for live messages, REST for loading history on open.",
            ],
          },
          {
            title: "Backend crash resolution & rate limiting",
            bullets: [
              "Implemented a sliding-window rate limiter in Spring Boot to prevent database overloads, resolving server crashes during peak traffic.",
              "**Missing subscriptions:** a raw `Optional.get()` in `PatientService.java` threw `NoSuchElementException` for new patients and crashed the request handler under load. Fixed with just-in-time auto-provisioning.",
              "**Column overflow:** the `diagnoses_list` column hit its size limit as patients accumulated diagnoses. Added a sliding window trimming to the 25 most recent entries before saving.",
              "**Timezone-aware scheduling:** corrected a 1-day offset in doctor availability by extracting dates from UTC instants rather than server local time.",
            ],
          },
          {
            title: "Dashboard performance",
            bullets: [
              "Built the React Native patient dashboard, using memoization to cut render times **40%**.",
              "**Problem:** a `nowTick` timer updating every 30 seconds re-rendered every card on screen, including ones with no dependency on the current time.",
              "**Fix:** wrapped independent cards in `React.memo` and used `useCallback` on handler props so memo comparisons didn't see new functions each render.",
              "**Stale closure:** a `PanResponder` gesture handler captured state at mount; fixed with a ref so gestures always read current state.",
            ],
          },
          {
            title: "Network optimization",
            bullets: [
              "**Request deduplication:** `ApiClient.ts` tracks in-flight requests by URL and returns the existing promise rather than starting a second one.",
              "**TTL caching:** added time-to-live GET caching in AsyncStorage for slow-changing data — state lists, diagnoses catalog, provider lists.",
              "**Parallel bootstrapping:** replaced sequential startup fetches with `Promise.allSettled`, so profile, subscription and settings hydrate concurrently and one failure no longer blocks startup.",
              "**Security:** masked sensitive fields in API logging — anything named `password`, `token` or `authorization` is redacted before it is written.",
            ],
          },
          {
            title: "Engineering rigor",
            bullets: [
              "Established a unit testing environment with Jest and react-test-renderer, reaching a 100% pass rate with no outstanding TypeScript or lint errors.",
              "Solved the Node-environment limitation for native UI measurement by injecting mock coordinates through a `testMeasure` prop.",
              "Enforced `testID` props across the codebase to replace fragile text- and index-based assertions.",
              "Migrated the Android build from legacy to the New Architecture (TurboModules/Fabric), resolving library incompatibilities.",
            ],
          },
        ],
      },
    ],
  },
];

/* Whole months between two YYYY-MM points; a null end means "now". This is a
   plain month difference, which is what makes Goodz read as 1 yr 9 mos across
   its two stints and Youro as the 4 months its own resume bullet claims. */
export function monthsIn(start, end) {
  const [sy, sm] = start.split("-").map(Number);
  let ey, em;
  if (end) {
    [ey, em] = end.split("-").map(Number);
  } else {
    const now = new Date();
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  }
  return Math.max(0, (ey - sy) * 12 + (em - sm));
}

export function formatMonths(total) {
  const years = Math.floor(total / 12);
  const months = total % 12;
  const y = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return [y, m].filter(Boolean).join(" ") || "under a month";
}

export function tenure(role) {
  return formatMonths(
    role.stints.reduce((sum, s) => sum + monthsIn(s.start, s.end), 0),
  );
}

export default experience;
