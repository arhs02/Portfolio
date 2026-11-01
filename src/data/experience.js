/*
  Experience content, separated from layout.

  Each role carries a `headline` (what the card shows — two or three numbers)
  and `stints` (what the overlay shows). A role may have more than one stint;
  the card lists every range and the tenure is summed across them.

  `start` / `end` are YYYY-MM; a null `end` means present and lets the tenure
  keep counting on its own. Bullet strings support **bold** and `code`; see
  formatBullet in ExperienceSection.jsx. Plain strings rather than HTML so
  nothing has to be dangerously injected.
*/
const experience = [
  {
    id: "suny",
    company: "SUNY Research Foundation",
    role: "Research Aide",
    project: "Two-Tier RAG Log-Anomaly Detector",
    location: "Buffalo, NY",
    stack: ["Python", "PyTorch", "Neo4j", "FAISS", "Llama-3.3", "Kafka"],
    headline: [
      { value: "97%", label: "F1, primary log system" },
      { value: "90%", label: "F1, second log system" },
    ],
    blurb:
      "Built the anomaly-detection pipeline over a supercomputer's log telemetry — cheap models triage everything, and only what looks wrong escalates to a heavyweight reasoning tier.",
    stints: [
      {
        role: "Research Aide",
        period: "Apr 2026 – May 2026",
        start: "2026-04",
        end: "2026-05",
        // Apr and May were both worked in full. A month difference reads that
        // range as one month elapsed, so the true figure is stated here.
        months: 2,
        sections: [
          {
            title: "At a glance",
            bullets: [
              "Designed a **two-tier architecture** for a log anomaly detector: a fast small language model screens most traffic, and uncertain cases escalate to a second-stage model for deeper review.",
              "Fine-tuned a small language model to flag anomalies in **two production log systems**, hitting F1 scores above **97%** and **90%**.",
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
    stack: [
      "React",
      "React Native",
      "TypeScript",
      "Java Spring Boot",
      "STOMP WebSockets",
      "MySQL",
      "AWS",
      "OpenAI",
      "FAISS",
    ],
    headline: [
      { value: "85%", label: "consults with the final dx in top 3" },
      { value: "15→3.6", label: "min pre-consult review" },
      { value: "−30%", label: "redundant API calls" },
    ],
    blurb:
      "Owned the patient-facing platform at an early-stage urology telehealth startup, from Figma wireframes to production in four months.",
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
              "Owned end-to-end development of the patient-facing React and React Native applications — authentication, appointment booking, doctor-patient chat and medication tracking — shipped to production in **4 months**.",
              "Partnered with the founding urologist on an **adaptive clinical intake system** that compiles patient answers into a structured pre-consult report, cutting his review time from ~15 minutes to **3.6 minutes**.",
              "Rebuilt the API client layer with request deduplication and silent token rotation, cutting redundant backend calls **30%** and closing a token-replay security gap.",
              "Built an **AI diagnosis-assist tool** that uses an LLM to pull symptoms from intake reports and a RAG layer over clinical guidelines to rank the **top 3 likely diagnoses**, which included the urologist's final diagnosis on **85% of consults**.",
            ],
          },
          {
            title: "Building the telehealth core, 0 to 1",
            bullets: [
              "Bought back weeks of the 4-month deadline by **not** hand-rolling commodity features: a HIPAA-compliant managed identity provider carried the regulatory weight of password hashing, MFA and audit logging, so engineering time went to the proprietary clinical workflows instead.",
              "Chose React and React Native to share API clients, validation schemas and state across web and mobile — native Swift and Kotlin would have guaranteed missing the production date.",
              "Enforced a strict **UTC-only contract** with the Spring Boot backend for appointment booking, localising only at display time, which removed an entire class of off-by-one-hour and daylight-saving booking failures between patients and doctors in different states.",
              "Picked Zustand over Redux for global state — the boilerplate saving was worth real days during the crunch.",
              "**Debt taken deliberately:** skipped end-to-end UI tests. The interface was changing daily on the urologist's feedback, and brittle E2E suites would have paralysed it. Unit tests were mandatory on the timezone logic and the auth client, where correctness actually mattered.",
            ],
          },
          {
            title: "Real-time doctor-patient chat",
            bullets: [
              "Built the chat engine in-house on **STOMP over WebSocket** rather than buying a chat SDK — routing PHI through another vendor meant another BAA and another external boundary to defend.",
              "Architected it **socket-first with a REST fallback**: WebSockets carry live messages, REST loads history when a thread opens, so a dropped socket degrades to a readable conversation instead of an empty screen.",
              "**The bug that ate the most time:** messages sent fine, no errors anywhere, and nothing arrived until you force-refreshed. The backend published to user-scoped destinations like `/user/42/private` while the client subscribed to a generic `/user/private` — and STOMP accepts a subscription to a destination nobody publishes to, so there was no error to catch.",
              "Fixed in `ChatSocket.ts` by computing the user-scoped destination **after** authentication resolves rather than at module load, when the user id was still undefined, then updating every subscription path to match.",
              "Wrote a `legacyTimestamp` formatter to satisfy the backend's legacy date-string contract, which had been returning HTTP 400 on otherwise valid sends.",
            ],
          },
          {
            title: "Adaptive clinical intake",
            bullets: [
              "Replaced static PDF intake forms with an adaptive questionnaire driven by a **JSON decision graph**, mapped out of hours of domain interviews with the urologist — answering yes to flank pain branches to fever and haematuria, answering no skips the branch entirely.",
              "Kept the data in-house rather than using an off-the-shelf form builder: patient symptom data is PHI, and the output had to be normalised JSON matching the backend schema, not generic CSV exports.",
              "**The hard state problem:** if a patient goes back five screens and flips a yes to a no, every answer below it is clinically invalid. Implemented recursive **state pruning** that deletes the orphaned subtree before letting the patient continue down the new path.",
              "Isolated each question in a memoised component so typing in one text box did not re-render the whole form, holding 60fps on older phones.",
              "Early abandonment ran at **12%** — patients felt trapped in an endless form. Trimming non-essential branches and adding a progress bar computed from the longest remaining path brought it back to near zero.",
              "Measured, not estimated: backend telemetry on the gap between a doctor opening a chart and starting the video call showed **14.8 minutes before, 3.6 minutes after**, over a 30-day window.",
            ],
          },
          {
            title: "Hardening the API client",
            bullets: [
              "Replaced scattered `fetch` calls with a centralised **axios** layer, chosen specifically for interceptors — silent token refresh and global deduplication would have meant a brittle hand-rolled wrapper otherwise.",
              "**Request deduplication:** an in-memory map keyed on method, URL and payload. A component firing a request already in flight gets the existing promise instead of a second network call. Verified as a **30%** drop in requests per session on CloudWatch, with a matching fall in backend CPU.",
              "**Closed the token-replay gap:** purged long-lived JWTs out of `localStorage`, which is readable by any XSS, and moved to a short-lived in-memory access token plus a refresh token in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie.",
              "**The race nobody catches first time:** three requests hitting `401` in the same millisecond each try to refresh, invalidating the token chain. Solved with an `isRefreshing` flag and a queue — the first failure refreshes, the rest park their promises and are resolved with the new token.",
              "HttpOnly cookies trade XSS risk for CSRF risk, so paired `SameSite=Strict` with a double-submit CSRF token on every mutating request.",
              "Deduplication initially swallowed deliberate double-taps on refresh, making the app feel dead. Added an explicit bypass flag for user-initiated refreshes.",
            ],
          },
          {
            title: "AI diagnosis assist — what failed first",
            bullets: [
              "**v0, zero-shot over the raw intake note:** 58.3% top-3 recall and **14.2% hallucinated guideline citations**. In healthcare one invented citation ends physician trust permanently.",
              "**v1, naive chunking:** indexed 38 clinical guideline PDFs (~1,400 pages) at a fixed 1,000 characters. Recall reached 68% and exposed the real bug.",
              "**The pertinent-negative trap:** intake notes say things like *denies gross haematuria, denies flank pain, reports nocturia*. Embedding models do not negate — the vector still lights up on haematuria and flank pain, so retrieval kept returning guidelines for exactly the conditions the patient had ruled out.",
              "Fixed-size slicing also cut diagnostic tables in half, leaving criteria in one chunk and the disease name in another, so a retrieved chunk had no idea which condition it described.",
            ],
          },
          {
            title: "AI diagnosis assist — the production pipeline",
            bullets: [
              "**Stage 1, extraction:** a zero-temperature structured LLM pass splits the intake report into `positive_symptoms` and `pertinent_negatives`, normalising lay phrasing (*burning when I pee*) into clinical terms (*dysuria*). Retrieval queries are built **only** from the positives; the negatives are held back for ranking. Recall 68% → **77.5%**.",
              "**Stage 2, hybrid retrieval:** 4,280 section-aware chunks with their guideline and condition breadcrumbs prepended, searched in parallel by dense vectors (FAISS `IndexFlatIP`) and sparse **BM25**, fused with **Reciprocal Rank Fusion**. RRF rather than a weighted sum because cosine is bounded in [-1, 1] while BM25 is unbounded, so averaging them is meaningless without per-query calibration. Recall → **83.3%**.",
              "**Diversity cap:** a severe case would fill all retrieval slots with chunks from one guideline, leaving the second and third differentials with no context at all. Capping each source document at two chunks guarantees the window spans at least three conditions.",
              "**Stage 3, constrained ranking:** the LLM receives positives, negatives and the retrieved chunks, and is schema-forced to return at most three diagnoses drawn from the canonical diagnosis enum — so output always maps to a real record rather than free-text drift.",
              "**Deterministic guardrail:** every citation is verified in code, not trusted from the prompt. The cited chunk must be one actually passed in, and the verbatim quote must share **≥85% token overlap** with that chunk's source text. Below a retrieval-similarity floor the service abstains with *insufficient guideline match* rather than guessing. Hallucinated citations: **0%**.",
              "**Final:** 85.4% top-3 recall and 64.2% top-1 across **240+ live consults**, at roughly **$0.002 per consult**, running asynchronously on intake submission so the doctor waits **0ms**.",
              "**Where the other 15% went:** ~8% were findings the patient never mentioned until the video call, ~4% atypical multi-morbid presentations, and ~3% deliberate abstentions by the confidence guardrail.",
            ],
          },
          {
            title: "Keeping PHI out of the model",
            bullets: [
              "Stripped all 18 HIPAA Safe-Harbor identifiers inside the VPC **before** any payload left for the model — only age, biological sex, the 0–100 symptom score and de-identified clinical text ever crossed the boundary.",
              "Used the vendor API under a Business Associate Agreement with zero retention and no training on payloads, and kept PHI out of frontend crash reporting.",
              "Rejected self-hosting a 70B model on GPU instances at $1,500–$3,500/month as absurd for an early-stage startup, and rejected a managed vector database at $70–200/month when the whole index was **26.3 MB** and fit in memory on an existing instance.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "goodz",
    company: "Goodz Pvt. Ltd",
    role: "Software Development Engineer",
    location: "Hyderabad, India",
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Angular",
      "React Native",
      "Docker",
      "AWS",
    ],
    headline: [
      { value: "340", label: "vendor marketplace" },
      { value: "−40%", label: "stuck-order incidents" },
      { value: "8h→20m", label: "payout reconciliation" },
    ],
    blurb:
      "Owned the order and payments system for a bulk-food marketplace — schema design through production support — alongside the PHP to Angular migration and the driver app.",
    stints: [
      {
        role: "Software Development Engineer",
        period: "Jul 2023 – Dec 2024",
        start: "2023-07",
        end: "2024-12",
        sections: [
          {
            title: "The role",
            bullets: [
              "Joined a bootstrapped bulk-food delivery and event-catering marketplace in Hyderabad — **8 to 10 people, 3 engineers**. Started as an SDE intern because university policy barred full-time status mid-degree; owned production modules end to end within weeks, and converted to full-time SDE on graduating.",
              "The platform served **~340 partner vendors**, ~600–800 customer accounts, **~100 delivery drivers** and an internal operations team running a **~10,000-row** master catalog of dishes and tiered bulk pricing.",
            ],
          },
          {
            title: "Core order service & idempotent state machine",
            bullets: [
              "Owned the order and payments system end to end on **Node.js and PostgreSQL**, from schema design through production support.",
              "Modelled the order as an explicit **7-state lifecycle** with actor ownership per transition, enforced in two places — a TypeScript transition map and a PostgreSQL `BEFORE UPDATE` trigger — so an illegal state change is impossible even if it bypasses the service layer.",
              "**Idempotency keys** scoped per customer stopped duplicate orders from double-taps and client retries. The subtle case is two retries arriving simultaneously: solved by inserting the key first and letting the `UNIQUE` constraint block the loser, rather than checking-then-inserting and losing the race.",
              "Used lock-free **optimistic concurrency** — a compare-and-set on status plus a version column — with an append-only event log, so concurrent writers fail loudly instead of silently overwriting each other.",
              "Defined *stuck* precisely rather than by feel: per-state SLAs measured against a trigger-stamped transition timestamp, swept automatically — but only for non-physical states, since no background job should assume a driver is holding food.",
              "Together these cut **stuck and unconfirmed order incidents by 40%**, with each failure mode proven independently in a chaos simulator rather than argued for.",
            ],
          },
          {
            title: "Web migration & the admin catalog grid",
            bullets: [
              "Led the migration off a legacy PHP site to **Angular**, scoped page by page so the business never paused trading during the cutover. Page loads fell from **~8 seconds to under 2**.",
              "Built a custom virtual-scroll data grid on **Angular CDK** for the ~10,000 catalog, tiered-pricing and order line-item rows the operations team worked in daily, cutting **rendering lag 73%**.",
              "Supported multi-level grouping by flattening the tree into a single list rather than nesting components, so virtual scrolling stays O(visible rows) regardless of how deep the grouping goes, with full keyboard navigation and ARIA roles.",
            ],
          },
          {
            title: "Vendor payouts & reconciliation",
            bullets: [
              "Watched finance associates reconcile vendor payouts by hand in spreadsheets that crashed on volume, then built an automated nightly pipeline matching platform orders against **Paytm and Razorpay** settlement files.",
              "Cut the manual finance effort from **~6–8 hours to ~20 minutes per cycle**.",
            ],
          },
          {
            title: "Reliability under load",
            bullets: [
              "Diagnosed and resolved a **Paytm payment-confirmation outage in ~30 minutes**, ruling out the initial hypothesis with log and socket evidence rather than guessing, and ruling out textbook fixes like a database reboot on time cost alone.",
              "Added **Redis** read-through caching that cut festival-rush menu load times from **~6–7 seconds to under 200ms**.",
              "Carried the platform through the **December 2024 corporate holiday ordering surge** before handing over.",
            ],
          },
          {
            title: "Infrastructure & developer workflow",
            bullets: [
              "Walked into a repo where pushing to `main` triggered nothing — releases meant copying build artifacts off a laptop during 2am maintenance windows. Built **CI/CD on GitHub Actions and Docker**, deploying containers behind an AWS load balancer with health-checked rolling swaps, so the team could ship several times a day with zero downtime.",
              "Introduced code review as a practice, and **co-led the MySQL to PostgreSQL migration**.",
              "Stood up observability by forwarding container logs into **Grafana Loki**, cutting log storage cost ~40% through label-based indexing.",
            ],
          },
          {
            title: "React Native driver app",
            bullets: [
              "Took over the React Native app used by **~100 drivers**, fixed the crashes, and cut app size **~25%** via ProGuard and asset optimisation — including a bug where obfuscated class names broke the push SDK at runtime.",
              "Added **offline caching** after watching drivers lose signal in basements and stairwells mid-delivery, so the app stays usable without a connection.",
              "Built delivery maps on **OpenStreetMap and Leaflet** with Supercluster pin clustering, at effectively zero cost against a commercial maps bill the margins could not absorb.",
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
export function monthsIn(start, end, override) {
  // A stint may state its own length where the range shorthand understates
  // the work — an Apr–May engagement is two months, not one.
  if (typeof override === "number") return override;
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
    role.stints.reduce((sum, s) => sum + monthsIn(s.start, s.end, s.months), 0),
  );
}

export default experience;
