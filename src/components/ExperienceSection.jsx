export default function ExperienceSection() {
  return (
    <div className="w-full text-left">

      {/* RESEARCH AIDE — SUNY */}
      <div className="pt-12 mt-12 border-t border-[var(--line)] first:mt-0 first:pt-0 first:border-t-0">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="display text-2xl text-[var(--ink)]">SUNY Research Foundation</h3>
            <span className="text-sm text-[var(--ink-faint)]">Buffalo, NY, US</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[var(--ink-dim)]">Research Aide — Two-Tier RAG Log-Anomaly Detector</p>
            <p className="text-sm text-[var(--ink-faint)]">Apr 2026 – May 2026</p>
          </div>
        </header>

        <p className="text-[var(--ink-dim)] mb-4 text-sm">
          <strong>Tech Stack:</strong> Python, PyTorch, Neo4j, FAISS, Llama-3.3 (70B), Qwen-32B, LoRA, Hugging Face PEFT, Kafka, Multi-Agent Systems
        </p>

        <p className="text-[var(--ink-dim)] mb-4 text-sm">
          Engineered the L-GRIP (Log Graph-Reasoning Inference Pipeline), a zero-trust, dual-tier autonomous Site Reliability Engineering (SRE) engine. The architecture fuses high-speed SLM geometric routing (Tier 1) with an asynchronous Agentic RAG Control Plane (Tier 2) to diagnose zero-day hardware failures and distributed state-machine anomalies across millions of supercomputer telemetry events.
        </p>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">At a Glance</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Built a two-tier anomaly detector using small language models across <strong>4.7M+ log lines</strong>, cutting inference latency <strong>78%</strong>.
            </li>
            <li>
              Parsed four distinct log formats with strict chronological splits, then validated the model live on a <strong>Kafka stream</strong>.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">Tier 1: Multi-LoRA Ensemble &amp; Early Latent Fusion</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Designed a Universal Multi-LoRA Engine dynamically hot-swapping Llama-3.2 (1B), Phi-3.5-Mini (3.8B), and GPT-2 (124M) adapters into a single frozen VRAM footprint.
            </li>
            <li>
              Implemented <strong>Early Latent Fusion</strong> by extracting and concatenating un-pooled terminal hidden states into a unified 5,888-D Super-Vector, leveraging Logistic Regression to achieve a 98.54% compute reduction on safe logs while maintaining near-perfect recall.
            </li>
            <li>
              Solved sequence chronological destruction by pivoting from Mean Pooling to <strong>Causal Last-Token Pooling</strong> and explicitly injecting Structural Metadata (Node Drift ratios, Temporal physics ∆t) prior to inference.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">Tier 2: Graph-Augmented Agentic RAG &amp; Control Plane</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Built an asynchronous Tier 2 <strong>Cognitive Judge</strong> using a quantized Llama-3.3-70B-Instruct model to analyze anomalies escalated by Tier 1.
            </li>
            <li>
              Engineered a <strong>Universal Security Ontology</strong> mapping 1D log streams into a 3D Neo4j Graph Database. Bypassed global O(|V|+|E|) query bottlenecks by implementing O(1) Ego-Graph extraction (a strict 3-hop radius around the target node) to serialize local topological context for the LLM.
            </li>
            <li>
              Resolved LLM hallucination and cognitive overload by extracting 8,192-D hidden state vectors from the 70B model, utilizing it purely as a mathematical feature extractor feeding into a <strong>Focal Loss MLP</strong> to mine hard negatives and catch stealthy zero-day attacks.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">Autonomous Swarm &amp; Temporal Physics Tracking</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Deployed a 3-stage <strong>Hierarchical Multi-Agent Swarm</strong> (Commander, Coder, Critic) powered by Qwen-2.5-Coder to autonomously deduce unseen "Alien" log topologies and generate deterministic Python extraction rules.
            </li>
            <li>
              Hardened the Control Plane with an <strong>SRE Hardware Guillotine</strong>—an isolated subprocess with a strict 2.0-second execution timeout that evaluates LLM-generated code, catching infinite loops and passing stderr traces back to the Coder for reflection.
            </li>
            <li>
              Implemented an in-memory <strong>EWMA Latent State Tracker</strong> to maintain running session vectors for highly asynchronous state machines, successfully decoupling individual healthy micro-states from doomed macroscopic block failures without shattering the latent manifold.
            </li>
          </ul>
        </section>
      </div>

      {/* GOODZ — CURRENT */}
      <div className="pt-12 mt-12 border-t border-[var(--line)] first:mt-0 first:pt-0 first:border-t-0">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="display text-2xl text-[var(--ink)]">Goodz Pvt. Ltd</h3>
            <span className="text-sm text-[var(--ink-faint)]">San Francisco, CA</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[var(--ink-dim)]">Software Engineer</p>
            <p className="text-sm text-[var(--ink-faint)]">Jan 2026 – Present</p>
          </div>
        </header>

        <p className="text-[var(--ink-dim)] mb-4 text-sm">
          <strong>Tech Stack:</strong> Python, PyTorch, Node.js, PostgreSQL, Redis, WebSockets, Recommender Systems
        </p>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Live Delivery Tracking — End-to-End Product Ownership
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Designed and owned an end-to-end live delivery tracking product with GPS ingestion, real-time WebSocket updates, and an ETA model trained on historical delivery times, cutting order-status support tickets <strong>45%</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Customer Order Recommendation System
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Built the customer order recommendation system, training a <strong>two-tower PyTorch model</strong> on order history that beat the baseline by <strong>18% on recall@10</strong>.
            </li>
            <li>
              Served recommendations from Redis to lift repeat-order conversion <strong>20%</strong>.
            </li>
          </ul>
        </section>
      </div>

      {/* YOURO INTERNSHIP */}
      <div className="pt-12 mt-12 border-t border-[var(--line)] first:mt-0 first:pt-0 first:border-t-0">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="display text-2xl text-[var(--ink)]">Youro</h3>
            <span className="text-sm text-[var(--ink-faint)]">Buffalo, NY, US</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[var(--ink-dim)]">Software Engineer Intern</p>
            <p className="text-sm text-[var(--ink-faint)]">August 2025 – December 2025</p>
          </div>
        </header>

        <p className="text-[var(--ink-dim)] mb-4 text-sm">
          <strong>Tech Stack:</strong> React Native, TypeScript, Java (Spring Boot), STOMP WebSockets, Jest, Git, PostgreSQL, LLMs, RAG
        </p>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">At a Glance</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Owned full-stack development of a patient-facing urology telehealth platform — authentication, appointment booking, doctor-patient chat, and medication tracking — and shipped it to production in <strong>4 months</strong>.
            </li>
            <li>
              Partnered with the founding urologist to design an <strong>adaptive intake questionnaire</strong> that compiles patient answers into a pre-consult report, cutting review time from ~15 minutes to under 4.
            </li>
            <li>
              Rebuilt the API client layer with request deduplication, response caching, and <strong>refresh-token rotation</strong>, cutting redundant backend calls 30% and closing a token-replay security gap.
            </li>
            <li>
              Built an <strong>AI diagnosis-assist tool</strong> that uses an LLM to pull symptoms from intake reports and a RAG layer over clinical guidelines to rank likely diagnoses, matching the urologist&rsquo;s diagnosis on <strong>85% of consults</strong>.
            </li>
          </ul>
        </section>

        {/* REAL-TIME COMMUNICATION */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Real-Time WebSocket Chat System
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Built a real-time WebSocket chat system, redesigning data subscription paths to guarantee instant messaging between doctors and patients.
            </li>
            <li>
              <strong>Root Cause:</strong> Backend sent to user-specific paths (e.g., <code className="text-[var(--accent)]">/user/42/private</code>); mobile client subscribed to generic <code className="text-[var(--accent)]">/user/private</code> — messages arrived on the wrong channel and were silently dropped.
            </li>
            <li>
              <strong>Fix:</strong> In <code className="text-[var(--accent)]">ChatSocket.ts</code>, computed user-specific subscription segment post-authentication and updated all paths. Messages now appear instantly without requiring a manual refresh.
            </li>
            <li>
              <strong>Architecture:</strong> Hybrid "Socket-First with REST Fallback" — WebSockets for live incoming messages, REST API for loading chat history on open.
            </li>
            <li>
              <strong>Debugging:</strong> Created custom <code className="text-[var(--accent)]">legacyTimestamp</code> formatter to resolve HTTP 400 errors from backend legacy date string requirements.
            </li>
          </ul>
        </section>

        {/* BACKEND — RATE LIMITER / CRASH FIX */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Backend Crash Resolution &amp; Rate Limiting (Spring Boot)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Implemented a sliding-window rate limiter in Java Spring Boot to prevent database overloads, completely resolving server crashes during peak traffic.
            </li>
            <li>
              <strong>Root Cause 1 — Missing subscriptions:</strong> New patients lacked a subscription record; a raw <code className="text-[var(--accent)]">Optional.get()</code> call in <code className="text-[var(--accent)]">PatientService.java</code> threw <code className="text-[var(--accent)]">NoSuchElementException</code> and crashed the request handler under load. Fixed with just-in-time auto-provisioning.
            </li>
            <li>
              <strong>Root Cause 2 — Column overflow:</strong> <code className="text-[var(--accent)]">diagnoses_list</code> string column hit its size limit as patients accumulated diagnoses. Implemented a sliding window that trims the list to the 25 most recent entries before saving — column never overflows.
            </li>
            <li>
              <strong>Timezone-Aware Scheduling:</strong> Corrected 1-day offset bug in doctor availability by refactoring date extraction to use UTC instants instead of server local time.
            </li>
          </ul>
        </section>

        {/* DASHBOARD & MEMOIZATION */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            React Native Dashboard — Component Memoization (40% Render Improvement)
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Developed the React Native patient dashboard — appointments, symptom scores, care plan progress, state selector — using component memoization to reduce render times by 40% for a fluid UI.
            </li>
            <li>
              <strong>Problem:</strong> A <code className="text-[var(--accent)]">nowTick</code> timer updating every 30 seconds triggered a full re-render of every card on the screen, even ones with no dependency on the current time.
            </li>
            <li>
              <strong>Fix:</strong> Wrapped independent cards in <code className="text-[var(--accent)]">React.memo</code>; used <code className="text-[var(--accent)]">useCallback</code> on handler props so memo comparisons didn't see "new" functions on every render.
            </li>
            <li>
              <strong>Stale Closure Fix:</strong> <code className="text-[var(--accent)]">PanResponder</code> gesture handler captured stale state at mount. Fixed by using <code className="text-[var(--accent)]">useRef</code> (<code className="text-[var(--accent)]">symptomModeRef</code>) so gestures always read current state.
            </li>
            <li>
              <strong>Accessibility:</strong> Redesigned StateChooser from a confusing grid to a single-column, elderly-friendly interface with full state name captions and larger touch targets.
            </li>
          </ul>
        </section>

        {/* DATA LAYER OPTIMIZATION */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Network Optimization — 30% Payload Reduction
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Cut network payload by 30% and improved app load times by caching data and stripping duplicate API calls.
            </li>
            <li>
              <strong>Request Deduplication:</strong> Modified <code className="text-[var(--accent)]">ApiClient.ts</code> to track in-flight requests by URL — if a request for the same URL is already running, return the existing Promise instead of starting a new one.
            </li>
            <li>
              <strong>TTL Caching:</strong> Added Time-To-Live GET response caching using AsyncStorage for infrequently-changing data (state lists, diagnoses catalog, provider lists) — reduces redundant fetches.
            </li>
            <li>
              <strong>Parallel Bootstrapping:</strong> Replaced sequential startup fetches with <code className="text-[var(--accent)]">Promise.allSettled</code> — profile, subscription, and settings hydrate concurrently; a single failure no longer blocks the whole startup.
            </li>
            <li>
              <strong>Security:</strong> Added sensitive field masking in API logging — any field named <code className="text-[var(--accent)]">password</code>, <code className="text-[var(--accent)]">token</code>, or <code className="text-[var(--accent)]">authorization</code> is replaced with <code className="text-[var(--accent)]">[REDACTED]</code> before logging.
            </li>
          </ul>
        </section>

        {/* TESTING & QA */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Engineering Rigor &amp; Quality Control
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              <strong>Testing Infrastructure:</strong> Established robust unit testing environment using Jest and react-test-renderer.
            </li>
            <li>
              <strong>Native API Mocking:</strong> Solved "Node environment" limitation for native UI functions by implementing <code className="text-[var(--accent)]">testMeasure</code> prop to inject mock coordinates for components requiring <code className="text-[var(--accent)]">measureInWindow</code>.
            </li>
            <li>
              <strong>Reliable Queries:</strong> Enforced <code className="text-[var(--accent)]">testID</code> props across codebase to move away from fragile text-based or index-based assertions.
            </li>
            <li>
              <strong>Conflict Resolution:</strong> Managed massive 21-file merge conflict during Chat/GMeet feature branch integration using strategic <code className="text-[var(--accent)]">git checkout --theirs</code> to preserve feature integrity.
            </li>
            <li>
              <strong>Architecture Migration:</strong> Transitioned Android build from Legacy to New Architecture (TurboModules/Fabric) by modifying <code className="text-[var(--accent)]">gradle.properties</code> and resolving library incompatibilities.
            </li>
          </ul>
        </section>

        {/* KEY IMPACT */}
        <section>
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">Key Impact Summary</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              <strong>Zero-Defect Codebase:</strong> Achieved 100% test pass rate and resolved all TypeScript/lint errors across mobile repository.
            </li>
            <li>
              <strong>UX Consistency:</strong> Standardized back-button navigation across iOS and Android by integrating native HeaderBackButton elements, replacing inconsistent hardcoded symbols.
            </li>
            <li>
              <strong>Onboarding Efficiency:</strong> Developed "Getting Started" checklist that dynamically tracks intake form status and appointment booking, reducing initial user friction.
            </li>
          </ul>
        </section>
      </div>

      {/* GOODZ EXPERIENCE */}
      <div className="pt-12 mt-12 border-t border-[var(--line)] first:mt-0 first:pt-0 first:border-t-0">
        <header className="mb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="display text-2xl text-[var(--ink)]">Goodz Pvt. Ltd</h3>
            <span className="text-sm text-[var(--ink-faint)]">Remote</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[var(--ink-dim)]">Software Engineer</p>
            <p className="text-sm text-[var(--ink-faint)]">Jul 2024 – Aug 2025</p>
          </div>
        </header>

        <p className="text-[var(--ink-dim)] mb-4 text-sm">
          <strong>Tech Stack:</strong> Node.js, PostgreSQL, Redis, Angular, React Native, PHP, MySQL, Firebase (FCM), AWS S3, CloudFront, RxJS, Angular CDK, Paytm, Bitbucket
        </p>

        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">At a Glance</h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Engineered the core order service that handles placement, confirmation, dispatch, and delivery for <strong>4,000+ orders a day</strong> on Node.js and PostgreSQL, and hardened it with idempotent transitions to cut stuck-order rates <strong>40%</strong>.
            </li>
            <li>
              Owned product development for vendor payouts and reconciliation, replacing a manual spreadsheet workflow with an automated nightly job that cut reconciliation from <strong>2 days to 20 minutes</strong>.
            </li>
            <li>
              Traced a production outage during a <strong>20x holiday traffic spike</strong> to a saturated database connection pool and fixed it with a Redis caching layer, cutting p99 latency <strong>97%</strong> with zero downtime.
            </li>
            <li>
              Designed and built a custom high-performance data grid for <strong>50,000+ order records</strong>, cutting rendering lag <strong>73%</strong>.
            </li>
          </ul>
        </section>

        {/* WEB DEVELOPMENT */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            Web Platform Migration &amp; Performance
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Led the migration of a legacy HTML/PHP website to Angular, cutting page load times from 8 seconds to under 2 seconds to boost user retention.
            </li>
            <li>
              <strong>What actually made it fast:</strong> Lazy-loaded images (<code className="text-[var(--accent)]">ng-lazyload</code>), Angular route-level lazy loading (checkout/vendor dashboard modules only load on navigation), and offloading all static assets to AWS S3 + CloudFront.
            </li>
            <li>
              Built the custom high-performance data grid using Angular CDK VirtualScrollViewport and RxJS, enabling smooth rendering of 50,000+ order records and cutting rendering lag 73% with zero crashes.
            </li>
            <li>
              <strong>Grid features:</strong> Multi-level grouping (recursive Angular components), multi-filtering via RxJS BehaviorSubject, drag-and-drop reordering (Angular CDK DragDrop), and WCAG ARIA roles + keyboard navigation.
            </li>
            <li>
              Implemented real-time order tracking through PHP WebSockets with a polling fallback, cutting customer "where is my order?" calls by 25%.
            </li>
            <li>
              Refactored and stabilized Paytm payment flows by fixing checksum mismatches, webhook issues, and timestamp sync errors.
            </li>
          </ul>
        </section>

        {/* AWS / INFRA */}
        <section className="mb-6">
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            AWS Infrastructure &amp; Deployment Automation
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Reduced server delivery costs by 20% by moving all static asset hosting to AWS S3 and CloudFront with automated deployment scripts.
            </li>
            <li>
              <strong>Scripts (bash + AWS CLI):</strong> <code className="text-[var(--accent)]">ng build --prod</code> → <code className="text-[var(--accent)]">aws s3 sync dist/ s3://bucket --delete</code> → <code className="text-[var(--accent)]">aws cloudfront create-invalidation</code>. Replaced manual FTP deploys with a one-command repeatable pipeline anyone on the team could run.
            </li>
            <li>
              Improved deployment reliability and collaboration workflows by standardizing version control practices on Bitbucket.
            </li>
          </ul>
        </section>

        {/* MOBILE DEVELOPMENT */}
        <section>
          <h4 className="mb-3  text-[11px] tracking-[0.18em] uppercase text-[var(--accent)]">
            React Native Mobile Application
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-[var(--ink-dim)]">
            <li>
              Rebuilt the React Native mobile app's navigation stack using React Navigation, fixing Android back-button exits and iOS swipe gesture glitches. Used the Dimensions API for responsive layouts across a wide range of cheap Android devices.
            </li>
            <li>
              Integrated Firebase Cloud Messaging (FCM) for real-time driver alerts. Set up custom notification channels — "Order Ready" with distinct sound and high priority, "Delay Update" as lower priority. Fixed a ProGuard/FCM bug where obfuscated class names broke the FCM SDK at runtime by adding explicit keep rules in <code className="text-[var(--accent)]">proguard-rules.pro</code>.
            </li>
            <li>
              Reduced the production APK from 45MB to ~34MB (24% smaller) via ProGuard (<code className="text-[var(--accent)]">minifyEnabled true</code>) and asset optimization.
            </li>
            <li>
              Added delivery tracking maps using OpenStreetMap + Leaflet.js inside a React Native WebView (cost: ~$0 vs. Google Maps Platform). Integrated Supercluster for 50+ delivery pin clustering; markers refresh on tap rather than continuously to keep API call rates low.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
