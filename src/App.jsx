import { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const ProjectCardLazy = lazy(() => import("./components/ProjectCard.jsx"));
const CaseStudyLazy = lazy(() => import("./components/CaseStudy.jsx"));
const ResumeSectionLazy = lazy(() => import("./components/ResumeSection.jsx"));
const ExperienceSectionLazy = lazy(
  () => import("./components/ExperienceSection.jsx"),
);
import projects from "./data/projects.js";
import resumePdf from "./data/Resume.pdf";

const SECTIONS = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "experience", label: "Experience", num: "03" },
  { id: "resume", label: "Resume", num: "04" },
  { id: "projects", label: "Projects", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

function App() {
  const sections = useMemo(() => SECTIONS, []);

  const [activeSection, setActiveSection] = useState("home");
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mount-on-demand: track which sections have been seen
  const mountedSectionsRef = useRef(new Set(["home"]));
  const isNarrowAtMountRef = useRef(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const [, forceRerender] = useState(0);

  // Detect prefers-reduced-motion and mobile breakpoint
  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const update = () => {
      setPrefersReduced(mqReduced.matches);
      setIsMobile(mqMobile.matches);
    };
    update();
    mqReduced.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqReduced.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  // Scroll tracking for the parallax'd background layers
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--scroll-y",
          `${window.scrollY}px`,
        );
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cursor-follow phosphor bloom. Desktop only — the CSS hides it under 768px.
  useEffect(() => {
    if (isMobile || prefersReduced) return;
    let ticking = false;
    const onMove = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const root = document.documentElement;
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
        ticking = false;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile, prefersReduced]);

  // IntersectionObserver for scrollspy + mount-on-demand
  useEffect(() => {
    const mountedRef = mountedSectionsRef;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (!mountedRef.current.has(entry.target.id)) {
              mountedRef.current.add(entry.target.id);
              forceRerender((n) => n + 1);
            }
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const target = rect.top + scrollTop - (window.innerHeight - rect.height) / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const activeMeta =
    sections.find((s) => s.id === activeSection) ?? sections[0];

  return (
    <div className="relative min-h-screen">
      <BootSequence disabled={prefersReduced} />

      {/* ---- Background stack: grid → bloom → grain → scanlines → vignette ---- */}
      <div className="fixed inset-0 z-0 bg-base" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-bloom"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[2] grain"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[3] crt-scanlines"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[4] crt-vignette"
        aria-hidden="true"
      />

      <div className="relative z-20">
        {sections.map((section) => (
          <Section key={section.id} id={section.id}>
            {(section.id === "projects" ||
              isMobile ||
              isNarrowAtMountRef.current ||
              mountedSectionsRef.current.has(section.id) ||
              section.id === "home") && (
              <div className="w-full">
                <SectionSlug num={section.num} label={section.label} />

                {section.id === "home" && <Home prefersReduced={prefersReduced} />}

                {section.id === "about" && <About />}

                {section.id === "experience" && (
                  <Suspense fallback={<Loading />}>
                    <ExperienceSectionLazy />
                  </Suspense>
                )}

                {section.id === "resume" && (
                  <div className="max-w-6xl mx-auto">
                    <Suspense fallback={<Loading />}>
                      <ResumeSectionLazy pdfUrl={resumePdf} showTitle={false} />
                    </Suspense>
                  </div>
                )}

                {section.id === "projects" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px max-w-6xl mx-auto border border-[var(--line)] bg-[var(--line)]">
                    <Suspense fallback={<Loading />}>
                      {projects.map((p, i) => (
                        <ProjectCardLazy
                          key={p.title}
                          project={p}
                          index={i}
                          onOpenCaseStudy={() => setOpenCaseStudy(p)}
                        />
                      ))}
                    </Suspense>
                  </div>
                )}

                {section.id === "contact" && <Contact />}
              </div>
            )}
          </Section>
        ))}
      </div>

      {/* ---- Desktop sidebar nav ---- */}
      <nav className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            data-active={activeSection === section.id}
            className="nav-item text-left"
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* ---- Status bar ---- */}
      <StatusBar active={activeMeta} />

      {/* ---- Mobile nav ---- */}
      <button
        onClick={() => setMobileNavOpen((v) => !v)}
        className="sm:hidden fixed bottom-10 left-4 z-40 btn-ghost px-3 py-2 text-xs"
      >
        {mobileNavOpen ? "CLOSE" : "MENU"}
      </button>
      {mobileNavOpen && (
        <div
          className="sm:hidden fixed bottom-24 left-4 z-40 w-[min(92vw,340px)] panel p-3"
          role="dialog"
          aria-label="Sections"
        >
          <div className="slug mb-3">Navigate</div>
          <div className="grid grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setMobileNavOpen(false);
                  scrollToSection(s.id);
                }}
                className="font-mono-ui text-[11px] tracking-widest uppercase px-2 py-3 bg-[var(--bg-raise)]"
                style={{
                  color:
                    activeSection === s.id ? "var(--amber)" : "var(--ink-dim)",
                }}
              >
                <span className="text-[var(--ink-faint)]">{s.num}</span>{" "}
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <CaseStudyLazy
          project={openCaseStudy}
          onClose={() => setOpenCaseStudy(null)}
        />
      </Suspense>
    </div>
  );
}

/* ============================================================
   Chrome
   ============================================================ */

function Loading() {
  return (
    <div className="slug py-12">
      Loading<span className="caret" />
    </div>
  );
}

function SectionSlug({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="slug">
        [ <span className="slug-num">{num}</span> ] {label}
      </span>
      <span className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}

/* A short POST readout on first load. Sits under prefers-reduced-motion and
   only fires once per tab, so it never becomes an obstacle. */
function BootSequence({ disabled }) {
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem("booted") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (done || disabled) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem("booted", "1");
      } catch {
        /* private mode — just don't remember */
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [done, disabled]);

  if (done || disabled) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-sink)] flex items-center justify-center animate-fade-in">
      <pre className="font-mono-ui text-[11px] sm:text-xs leading-relaxed text-[var(--ink-dim)]">
        {`ARHS-WORKSTATION  BIOS v98.2
────────────────────────────────
MEM TEST ............... OK
LOADING PORTFOLIO ...... OK
MOUNTING /experience ... OK
MOUNTING /projects ..... OK
`}
        <span className="text-[var(--amber)]">READY</span>
        <span className="caret" />
      </pre>
    </div>
  );
}

function StatusBar({ active }) {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--line)] bg-[var(--bg-sink)]">
      <div className="flex items-center justify-between px-4 py-1.5 font-mono-ui text-[10px] tracking-widest uppercase text-[var(--ink-faint)]">
        <span>
          <span className="text-[var(--amber)]">●</span> ARHS — SWE
        </span>
        <span className="hidden sm:inline">
          SEC {active.num} / {active.label}
        </span>
        <span>{clock}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Sections
   ============================================================ */

function Home({ prefersReduced }) {
  return (
    <div className="max-w-5xl">
      <h1 className="display text-[clamp(2.6rem,9vw,7rem)] text-[var(--ink)]">
        Abdul Rahman
        <br />
        Hussain Siddique
      </h1>

      <div className="mt-8 flex flex-col gap-2 font-mono-ui text-sm">
        <div className="text-[var(--ink-faint)]">
          <span className="text-[var(--amber)]">&gt;</span> whoami
        </div>
        <div className="text-[var(--ink)] text-lg">
          {prefersReduced ? (
            "Software Engineer"
          ) : (
            <TypeAnimation
              sequence={[
                "Software Engineer",
                1600,
                "Backend & distributed systems",
                1600,
                "Applied ML — RAG, recsys, LLMs",
                1600,
                "Full-stack, end to end",
                1600,
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={false}
              className="text-[var(--amber)]"
            />
          )}
          <span className="caret" />
        </div>
      </div>

      <p className="mt-10 max-w-xl text-[var(--ink-dim)] leading-relaxed">
        I build systems that carry real traffic — order pipelines, delivery
        tracking, recommenders, and retrieval stacks that stay up when they
        matter.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-5xl mx-auto grid gap-px bg-[var(--line)] border border-[var(--line)] sm:grid-cols-2">
      <div className="panel panel-ticks border-0 p-6">
        <h3 className="slug mb-3">Profile</h3>
        <p className="text-sm text-[var(--ink-dim)] leading-relaxed">
          Software Engineer at Goodz, building production AI and backend
          systems — live delivery tracking on GPS ingestion and WebSockets, a
          two-tower PyTorch recommender, and order services handling thousands
          of orders a day on Node.js and PostgreSQL. Previously shipped a
          urology telehealth platform at Youro, including an LLM + RAG
          diagnosis-assist tool. UB SUNY CS &amp; Engineering master&rsquo;s
          graduate.
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {[
            "Python",
            "PyTorch",
            "Node.js",
            "FastAPI",
            "Spring Boot",
            "PostgreSQL",
            "Redis",
            "Kafka",
            "Docker",
            "React / React Native",
            "TypeScript",
            "LangChain / RAG",
            "FAISS",
            "AWS",
            "Neo4j",
          ].map((s) => (
            <span
              key={s}
              className="font-mono-ui text-[10px] tracking-wide px-2 py-1 border border-[var(--line)] text-[var(--ink-faint)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="panel panel-ticks border-0 p-6">
        <h3 className="slug mb-3">Now / Next</h3>
        <ul className="text-sm text-[var(--ink-dim)] space-y-2 font-mono-ui">
          <li>
            <span className="text-[var(--amber)]">NOW</span> — Software Engineer
            at Goodz: live delivery tracking, order recommendations.
          </li>
          <li>
            <span className="text-[var(--amber)]">NEXT</span> — Venyx (MCP
            desktop agent), LifeLogger.
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <a href={resumePdf} className="btn-accent px-3 py-1.5 text-[11px]">
            RESUME
          </a>
          <a
            href="mailto:arhsiddq@gmail.com"
            className="btn-ghost px-3 py-1.5 text-[11px]"
          >
            EMAIL
          </a>
          <a
            href="https://linkedin.com/in/rahman-hussain"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-3 py-1.5 text-[11px]"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/arhs02"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-3 py-1.5 text-[11px]"
          >
            GITHUB
          </a>
        </div>
      </div>

      <div className="panel panel-ticks border-0 p-6 sm:col-span-2">
        <h3 className="slug mb-4">Education</h3>
        <ul className="text-sm text-[var(--ink-dim)] space-y-3">
          <li className="flex flex-wrap items-baseline justify-between gap-2">
            <span>
              <span className="text-[var(--ink)] font-medium">
                University at Buffalo, SUNY
              </span>{" "}
              — MS, Computer Science and Engineering
            </span>
            <span className="font-mono-ui text-xs text-[var(--ink-faint)]">
              MAY 2026
            </span>
          </li>
          <li className="flex flex-wrap items-baseline justify-between gap-2">
            <span>
              <span className="text-[var(--ink)] font-medium">
                Osmania University
              </span>{" "}
              — BE, Information Technology
            </span>
            <span className="font-mono-ui text-xs text-[var(--ink-faint)]">
              JUN 2024
            </span>
          </li>
        </ul>
      </div>

      <div className="panel panel-ticks border-0 p-6 sm:col-span-2">
        <h3 className="slug mb-4">What I care about</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-sm text-[var(--ink-dim)]">
          {[
            [
              "Systems that scale",
              "Inference optimization, memory-safe pipelines, and production AI that doesn't fall over under load.",
            ],
            [
              "Reliable & tested",
              "Clean architecture, meaningful tests, performance budgets — unit tests through CI/CD.",
            ],
            [
              "Impact",
              "Shipping features that solve real user problems — not demos, deployed systems.",
            ],
          ].map(([title, body]) => (
            <div key={title}>
              <div className="font-mono-ui text-xs tracking-widest uppercase text-[var(--amber)] mb-2">
                {title}
              </div>
              <p className="leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono-ui text-sm text-[var(--ink-dim)] mb-8">
        <span className="text-[var(--amber)]">&gt;</span> open channel
      </p>
      <div className="flex flex-wrap gap-px bg-[var(--line)] border border-[var(--line)]">
        {[
          {
            href: "mailto:arhsiddq@gmail.com",
            Icon: FaEnvelope,
            label: "EMAIL",
            sub: "arhsiddq@gmail.com",
          },
          {
            href: "https://linkedin.com/in/rahman-hussain",
            Icon: FaLinkedin,
            label: "LINKEDIN",
            sub: "/in/rahman-hussain",
          },
          {
            href: "https://github.com/arhs02",
            Icon: FaGithub,
            label: "GITHUB",
            sub: "/arhs02",
          },
        ].map(({ href, Icon, label, sub }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="panel border-0 flex-1 min-w-[160px] p-5 group"
          >
            <Icon
              size={20}
              className="text-[var(--ink-faint)] group-hover:text-[var(--amber)] transition-colors"
            />
            <div className="mt-3 font-mono-ui text-[11px] tracking-widest text-[var(--ink)]">
              {label}
            </div>
            <div className="font-mono-ui text-[10px] text-[var(--ink-faint)] mt-0.5">
              {sub}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Section wrapper
   ============================================================ */

/* Reveal is a CSS transition toggled by an attribute, not a JS-driven
   animation. Two reasons: it can't stall mid-fade the way a rAF loop can
   (which is how sections end up stuck at 3% opacity), and it keeps
   framer-motion out of the initial bundle. */
function Section({ id, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Belt and braces: whatever happens with the observer, this section is
    // guaranteed visible shortly after mount.
    const failsafe = setTimeout(() => {
      el.setAttribute("data-inview", "true");
    }, 2500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-inview", "true");
          observer.disconnect();
          clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="reveal min-h-screen flex items-center px-6 sm:pl-12 sm:pr-40 lg:pl-24 lg:pr-48 py-24"
    >
      <div className="w-full">{children}</div>
    </section>
  );
}

export default App;
