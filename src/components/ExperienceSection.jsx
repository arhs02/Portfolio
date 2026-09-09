import { useEffect, useRef, useState, useCallback } from "react";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import experience from "../data/experience.js";

/* Renders **bold** and `code` from the plain strings in experience.js, so the
   data file never has to carry raw HTML. */
function formatBullet(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function Card({ role, onOpen, index }) {
  return (
    <article className="exp-card veil veil-lift">
      <div className="flex items-baseline justify-between gap-3">
        <span className="mark">{String(index + 1).padStart(2, "0")}</span>
        {role.current && <span className="exp-now">Now</span>}
      </div>

      <h3 className="display mt-5 text-3xl leading-none text-[var(--ink)]">
        {role.company}
      </h3>
      <p className="mt-2 text-sm text-[var(--ink-dim)]">{role.role}</p>
      <p className="mark mt-1">{role.period}</p>

      <p className="mt-5 text-sm leading-relaxed text-[var(--ink-dim)]">
        {role.blurb}
      </p>

      <dl className="mt-6 space-y-3">
        {role.headline.map((h) => (
          <div key={h.label}>
            <dt className="display text-2xl leading-none text-[var(--accent)]">
              {h.value}
            </dt>
            <dd className="mark mt-1">{h.label}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onOpen}
        className="btn-line mt-auto self-start px-4 py-2"
      >
        Read more
      </button>
    </article>
  );
}

/* Full-screen detail. Escape closes, the backdrop closes, focus moves to the
   dialog on open and returns to the card's button on close, and the page
   behind is scroll-locked while it is up. */
function Detail({ role, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!role) return;
    const restoreTo = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (restoreTo instanceof HTMLElement) restoreTo.focus();
    };
  }, [role, onClose]);

  if (!role) return null;

  return (
    <div
      className="exp-scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${role.company} — ${role.role}`}
        tabIndex={-1}
        className="exp-detail veil"
      >
        <header className="exp-detail-head">
          <div>
            <h2 className="display text-4xl leading-none text-[var(--ink)]">
              {role.company}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-dim)]">
              {role.role}
              {role.project ? ` — ${role.project}` : ""}
            </p>
            <p className="mark mt-1">
              {role.period} · {role.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="exp-close"
          >
            <FiX />
          </button>
        </header>

        <div className="exp-detail-body">
          <ul className="exp-stack">
            {role.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          {role.detail.map((sec) => (
            <section key={sec.title} className="mt-10">
              <h3 className="mark mb-4" style={{ color: "var(--accent)" }}>
                {sec.title}
              </h3>
              <ul className="list-disc space-y-3 text-sm leading-relaxed text-[var(--ink-dim)]">
                {sec.bullets.map((b, i) => (
                  <li key={i}>{formatBullet(b)}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const runwayRef = useRef(null);
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const viewRef = useRef(null);
  const barRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(0);

  // Mobile and reduced-motion get a plain vertical list. NN/g's research is
  // explicit that pinned horizontal scrolling is worst on small screens.
  const [linear, setLinear] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 1024px), (prefers-reduced-motion: reduce)",
    );
    const update = () => setLinear(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollToCard = useCallback((i) => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;
    const n = experience.length;
    const p = Math.max(0, Math.min(i / (n - 1), 1));
    const travel = runway.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: runway.offsetTop + p * travel,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (linear) return;
    const runway = runwayRef.current;
    const track = trackRef.current;
    const view = viewRef.current;
    if (!runway || !track || !view) return;

    // The distance the track has to move. Measured rather than expressed in
    // CSS percentages so gutters and card widths can change freely.
    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - view.clientWidth);
      runway.style.setProperty("--exp-end", `${-distance}px`);
      return distance;
    };
    let distance = measure();

    /* Driven from scroll rather than a CSS scroll-driven animation. The CSS
       route looked ideal — compositor-run, no listener — but `animation-range:
       contain` resolved to a zero-length range against a subject taller than
       the viewport, leaving the animation pinned at progress 1 from the first
       frame. This is deterministic and measurable instead.

       No throttle: scroll events are already coalesced to frame rate, and the
       body of this is one transform write. No requestAnimationFrame either —
       rAF stalls under load, which is what broke earlier revealed content. */
    let lastP = -1;
    const apply = () => {
      const rect = runway.getBoundingClientRect();
      const span = runway.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(Math.max(-rect.top / span, 0), 1) : 0;
      if (p === lastP) return;
      lastP = p;
      track.style.transform = `translateX(${-p * distance}px)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setActive(Math.round(p * (experience.length - 1)));
    };

    const onScroll = apply;

    const onResize = () => {
      distance = measure();
      lastP = -1;
      apply();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Heartbeat. Scroll events can be dropped or coalesced away, and a track
    // that stops halfway is worse than one that costs a rect read every
    // 200ms. apply() early-returns when progress is unchanged, so a settled
    // page does almost nothing here.
    const heartbeat = setInterval(apply, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearInterval(heartbeat);
    };
  }, [linear]);

  const cards = experience.map((role, i) => (
    <Card key={role.id} role={role} index={i} onOpen={() => setOpen(role)} />
  ));

  if (linear) {
    return (
      <>
        <div className="exp-linear">{cards}</div>
        <Detail role={open} onClose={() => setOpen(null)} />
      </>
    );
  }

  return (
    <>
      <div ref={runwayRef} className="exp-runway">
        <div ref={pinRef} className="exp-pin">
          <div className="exp-head">
            <div className="flex items-baseline gap-4">
              <span className="mark">03</span>
              <span className="hairline flex-1" />
              <span className="display text-3xl sm:text-4xl text-[var(--ink)]">
                Experience
              </span>
            </div>
          </div>

          <div
            ref={viewRef}
            className="exp-viewport"
            role="region"
            aria-label="Experience, horizontally scrolling"
          >
            <div ref={trackRef} className="exp-track">
              {cards}
            </div>
          </div>

          <div className="exp-foot">
            <div className="exp-progress" aria-hidden="true">
              <span ref={barRef} className="exp-progress-bar" />
            </div>
            <div className="exp-jumps">
              {experience.map((role, i) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  className="exp-jump"
                  data-active={i === active}
                  aria-label={`Go to ${role.company}, ${role.period}`}
                  aria-current={i === active ? "true" : undefined}
                />
              ))}
            </div>
            {/* Trackballs and some trackpads cannot scroll horizontally at
                all, so pointer controls are a requirement here, not a nicety. */}
            <div className="exp-arrows">
              <button
                type="button"
                className="btn-line exp-arrow"
                aria-label="Previous role"
                onClick={() => scrollToCard(Math.max(0, active - 1))}
              >
                <FiArrowLeft />
              </button>
              <button
                type="button"
                className="btn-line exp-arrow"
                aria-label="Next role"
                onClick={() =>
                  scrollToCard(Math.min(experience.length - 1, active + 1))
                }
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Detail role={open} onClose={() => setOpen(null)} />
    </>
  );
}
