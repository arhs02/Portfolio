import { useState } from "react";
import ResponsiveImage from "./ResponsiveImage.jsx";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

function ProjectCard({ project, index, onOpenCaseStudy }) {
  const {
    title,
    description,
    tech = [],
    image,
    demoLink,
    repoLink,
    status,
    year,
  } = project;

  // Remote images rot. A dead URL should fall back to the hatch pattern, not
  // dump alt text across the card header.
  const [imageBroken, setImageBroken] = useState(false);
  const showImage = image && !imageBroken;

  const idx = String(index + 1).padStart(2, "0");

  return (
    <article className="veil veil-lift flex flex-col text-left overflow-hidden">
      {/* Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--line)] bg-[rgba(38,48,60,0.05)]">
        {showImage ? (
          <ResponsiveImage
            src={image}
            alt=""
            className="h-full w-full object-cover"
            widths={[320, 480, 640, 768]}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
            onError={() => setImageBroken(true)}
          />
        ) : (
          /* No image: a technical hatch pattern instead of a stock photo. */
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
 "repeating-linear-gradient(45deg, var(--line-soft) 0 1px, transparent 1px 10px)",
            }}
          />
        )}

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div
          className="mb-3 flex items-baseline justify-between gap-3 mark"
          style={{ letterSpacing: "0.18em" }}
        >
          <span>{idx}</span>
          <span className="truncate">
            {status}
            {year ? ` \u00b7 ${year}` : ""}
          </span>
        </div>
        <h3 className="display mb-2 text-2xl leading-tight text-[var(--ink)]">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[var(--ink-dim)]">
          {description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-wide px-1.5 py-0.5 border border-[var(--line)] text-[var(--ink-faint)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2">
          {onOpenCaseStudy && (
            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="btn-line px-3 py-1.5 text-[11px]"
            >
              Case study
            </button>
          )}
          {demoLink && demoLink !== "#" && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px]"
            >
              <FiExternalLink size={12} /> Demo
            </a>
          )}
          {repoLink && repoLink !== "#" && (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px]"
              aria-label={`${title} source on GitHub`}
            >
              <FaGithub size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
