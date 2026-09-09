import { useEffect, useCallback } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

export default function CaseStudy({ project, onClose }) {
  const isOpen = !!project;

  const escHandler = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", escHandler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", escHandler);
      document.body.style.overflow = prev;
    };
  }, [isOpen, escHandler]);

  if (!isOpen) return null;

  const {
    title,
    status,
    image,
    tech = [],
    demoLink,
    repoLink,
    caseStudy = {},
  } = project;

  const { problem, constraints, approach, results, highlights, links, images } =
    caseStudy;

  return (
    <AnimatePresence>
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[rgba(38,48,60,0.05)] -sm flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        <Motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative w-full max-w-5xl max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-xl"
        >
          {image && (
            <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
              {status && (
                <span className="absolute left-4 top-4 rounded-full bg-[rgba(38,48,60,0.05)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] ">
                  {status}
                </span>
              )}
            </div>
          )}

          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 hover:bg-[rgba(38,48,60,0.05)] text-[var(--ink)]"
          >
            <FiX />
          </button>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                {tech?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-[var(--paper)] px-2 py-1 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {demoLink && (
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md btn-solid px-3 py-2 text-sm font-semibold"
                  >
                    <FiExternalLink /> Live
                  </a>
                )}
                {repoLink && (
                  <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] hover:border-[var(--accent)] px-3 py-2 text-sm font-semibold"
                  >
                    <FaGithub /> Code
                  </a>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {problem && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Problem</h4>
                  <p className="text-[var(--ink-dim)]">{problem}</p>
                </section>
              )}
              {constraints && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Constraints</h4>
                  <ul className="list-disc pl-5 text-[var(--ink-dim)]">
                    {constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
              )}
              {approach && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Approach</h4>
                  <p className="text-[var(--ink-dim)] whitespace-pre-line">
                    {approach}
                  </p>
                </section>
              )}
              {results && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Results</h4>
                  <ul className="list-disc pl-5 text-[var(--ink-dim)]">
                    {results.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}
              {highlights && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Highlights</h4>
                  <ul className="list-disc pl-5 text-[var(--ink-dim)]">
                    {highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </section>
              )}
              {images?.length > 0 && (
                <section className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold">Screens</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`s-${i}`}
                        className="rounded-lg border border-[var(--line)]"
                      />
                    ))}
                  </div>
                </section>
              )}
              {links && (
                <section className="mb-2">
                  <h4 className="mb-2 text-lg font-semibold">
                    Further Reading
                  </h4>
                  <ul className="list-disc pl-5 text-[var(--ink-dim)]">
                    {links.map(({ label, href }, i) => (
                      <li key={i}>
                        <a
                          className="text-accent hover:underline"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
}
