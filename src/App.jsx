import { useState, useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import UyuniScene from "./components/UyuniScene.jsx";
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

  const mountedSectionsRef = useRef(new Set(["home"]));
  const isNarrowAtMountRef = useRef(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const [, forceRerender] = useState(0);

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
    element.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen">
      <UyuniScene reduced={prefersReduced} />

      <div className="relative z-20">
        {sections.map((section) => (
          <Section key={section.id} id={section.id} bare={section.id === "home"}>
            {(section.id === "projects" ||
              isMobile ||
              isNarrowAtMountRef.current ||
              mountedSectionsRef.current.has(section.id) ||
              section.id === "home") && (
              <>
                {section.id === "home" && (
                  <Home onScrollDown={() => scrollToSection("about")} />
                )}

                {section.id === "about" && (
                  <Panel num={section.num} label={section.label}>
                    <About />
                  </Panel>
                )}

                {section.id === "experience" && (
                  <Panel num={section.num} label={section.label} wide>
                    <Suspense fallback={<Loading />}>
                      <ExperienceSectionLazy />
                    </Suspense>
                  </Panel>
                )}

                {section.id === "resume" && (
                  <Panel num={section.num} label={section.label} wide>
                    <Suspense fallback={<Loading />}>
                      <ResumeSectionLazy pdfUrl={resumePdf} showTitle={false} />
                    </Suspense>
                  </Panel>
                )}

                {section.id === "projects" && (
                  <Panel num={section.num} label={section.label} wide>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  </Panel>
                )}

                {section.id === "contact" && (
                  <Panel num={section.num} label={section.label}>
                    <Contact />
                  </Panel>
                )}
              </>
            )}
          </Section>
        ))}
      </div>

      {/* Desktop nav */}
      {/* Kept off the landing so the first screen is scene and nothing else. */}
      <nav
        className="nav-rail hidden sm:flex fixed right-9 top-1/2 -translate-y-1/2 flex-col gap-6 z-30"
        data-hidden={activeSection === "home"}
        aria-hidden={activeSection === "home"}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            data-active={activeSection === section.id}
            className="nav-dot"
            title={section.label}
          >
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile nav */}
      <button
        onClick={() => setMobileNavOpen((v) => !v)}
        className="sm:hidden fixed bottom-5 right-5 z-40 veil px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase text-[var(--ink)]"
      >
        {mobileNavOpen ? "Close" : "Menu"}
      </button>
      {mobileNavOpen && (
        <div
          className="sm:hidden fixed bottom-20 right-5 z-40 w-[min(88vw,300px)] veil p-5"
          role="dialog"
          aria-label="Sections"
        >
          <div className="flex flex-col gap-4">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setMobileNavOpen(false);
                  scrollToSection(s.id);
                }}
                className="flex items-baseline gap-3 text-left"
              >
                <span className="mark" style={{ letterSpacing: "0.2em" }}>
                  {s.num}
                </span>
                <span
                  className="display text-2xl"
                  style={{
                    color:
                      activeSection === s.id ? "var(--accent)" : "var(--ink)",
                  }}
                >
                  {s.label}
                </span>
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
  return <div className="mark py-16 text-center">Loading</div>;
}

/* Every section except the hero sits on a paper veil so text stays
   readable over whatever the sky happens to be doing behind it. */
function Panel({ num, label, wide, children }) {
  return (
    <div className={`mx-auto w-full ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
      <div className="veil px-6 py-10 sm:px-12 sm:py-14">
        <div className="stagger">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="mark">{num}</span>
            <span className="hairline flex-1" />
            <span className="display text-3xl sm:text-4xl text-[var(--ink)]">
              {label}
            </span>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Hero
   ============================================================ */

function Home({ onScrollDown }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center text-center animate-fade-in">
      {/* The shader puts the waterline at 48% from the top. Everything here
          has to finish above it, or it lands in the glare. */}
      <div className="w-full px-6 pt-[13vh] sm:px-28">
        <p
          className="on-sky-dim mb-7 text-[10px] sm:text-[11px]"
          style={{ letterSpacing: "0.44em", textTransform: "uppercase" }}
        >
          Software Engineer
        </p>

        <h1 className="display on-sky text-[clamp(2.6rem,7.5vw,6.5rem)]">
          Abdul Rahman
          <br />
          <span className="display-em">Hussain Siddique</span>
        </h1>

        <p className="on-sky-dim mx-auto mt-7 max-w-md text-[13px] sm:text-sm leading-relaxed">
          I build systems that carry real traffic — order pipelines, delivery
          tracking, recommenders, and retrieval stacks that stay up when they
          matter.
        </p>
      </div>

      <button
        onClick={onScrollDown}
        className="drift absolute bottom-12 flex flex-col items-center gap-3"
        aria-label="Scroll to about"
      >
        <span
          className="on-sky-dim text-[9px]"
          style={{ letterSpacing: "0.4em", textTransform: "uppercase" }}
        >
          Scroll
        </span>
        <span className="block h-10 w-px bg-white/50" />
      </button>
    </div>
  );
}

/* ============================================================
   Sections
   ============================================================ */

function About() {
  return (
    <div className="space-y-12">
      <p className="display text-xl sm:text-2xl leading-snug text-[var(--ink)]">
        Software Engineer at Goodz, building production AI and backend systems —
        live delivery tracking on GPS ingestion and WebSockets, a two-tower
        PyTorch recommender, and order services handling thousands of orders a
        day on Node.js and PostgreSQL. Previously shipped a urology telehealth
        platform at Youro, including an LLM + RAG diagnosis-assist tool.
      </p>

      <div>
        <h3 className="mark mb-5">Toolkit</h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ink-dim)]">
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
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mark mb-5">Education</h3>
        <ul className="space-y-4 text-sm text-[var(--ink-dim)]">
          <li className="flex flex-wrap items-baseline justify-between gap-2">
            <span>
              <span className="text-[var(--ink)]">
                University at Buffalo, SUNY
              </span>{" "}
              — MS, Computer Science and Engineering
            </span>
            <span className="mark">May 2026</span>
          </li>
          <li className="flex flex-wrap items-baseline justify-between gap-2">
            <span>
              <span className="text-[var(--ink)]">Osmania University</span> —
              BE, Information Technology
            </span>
            <span className="mark">Jun 2024</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={resumePdf} className="btn-solid px-5 py-2.5">
          Resume
        </a>
        <a href="mailto:arhsiddq@gmail.com" className="btn-line px-5 py-2.5">
          Email
        </a>
        <a
          href="https://github.com/arhs02"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-line px-5 py-2.5"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

function Contact() {
  const links = [
    {
      href: "mailto:arhsiddq@gmail.com",
      Icon: FaEnvelope,
      label: "Email",
      sub: "arhsiddq@gmail.com",
    },
    {
      href: "https://linkedin.com/in/rahman-hussain",
      Icon: FaLinkedin,
      label: "LinkedIn",
      sub: "/in/rahman-hussain",
    },
    {
      href: "https://github.com/arhs02",
      Icon: FaGithub,
      label: "GitHub",
      sub: "/arhs02",
    },
  ];

  return (
    <div>
      <p className="display text-2xl sm:text-3xl mb-10 text-[var(--ink)]">
        Always glad to talk about <span className="display-em">systems</span>,
        or anything you are building.
      </p>
      <div className="divide-y" style={{ borderColor: "var(--line)" }}>
        {links.map(({ href, Icon, label, sub }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center gap-5 py-5"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <Icon
              size={16}
              className="shrink-0 text-[var(--ink-faint)] transition-colors group-hover:text-[var(--accent)]"
            />
            <span className="display text-2xl text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
              {label}
            </span>
            <span className="ml-auto text-xs text-[var(--ink-faint)]">
              {sub}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Section wrapper
   ============================================================ */

function Section({ id, children, bare }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Whatever happens with the observer, this section becomes visible.
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
      { rootMargin: "0px 0px -10% 0px" },
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
      className={
        bare
          ? "reveal min-h-screen"
          : "reveal min-h-screen flex items-center px-5 sm:pl-10 sm:pr-24 lg:pl-20 lg:pr-28 py-28"
      }
      data-inview={bare ? "true" : undefined}
    >
      {children}
    </section>
  );
}

export default App;
