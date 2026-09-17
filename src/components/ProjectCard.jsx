import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiMongodb,
  SiVite,
} from "@icons-pack/react-simple-icons";

const TECH_ICON_MAP = {
  React: SiReact,
  Tailwind: SiTailwindcss,
  Node: SiNodedotjs,
  Next: SiNextdotjs,
  TypeScript: SiTypescript,
  Figma: SiFigma,
  MongoDB: SiMongodb,
  Vite: SiVite,
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const ProjectCard = ({ project, isOpen, onToggle }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const [hovering, setHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const expanded = isOpen || hovering;

  const techStack = Array.isArray(project.techStack)
    ? project.techStack
    : [];

  const images = Array.isArray(project.images)
    ? project.images
    : [];

  const imageCount = Math.min(
    Math.max(project.imageCount || images.length || 1, 1),
    images.length || 1
  );

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.opacity = "1";

      const handleTransitionEnd = () => {
        if (expanded) el.style.height = "auto";
      };

      el.addEventListener("transitionend", handleTransitionEnd);
      return () => el.removeEventListener("transitionend", handleTransitionEnd);
    }

    // If height was previously "auto", switch to the current pixel height
    // before collapsing so the CSS transition can animate correctly.
    el.style.height = `${el.scrollHeight}px`;
    requestAnimationFrame(() => {
      el.style.height = "0px";
      el.style.opacity = "0";
    });
  }, [expanded]);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setHovering(false);
    }
  };

  const handleClick = () => {
    onToggle?.();
    setHovering(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const openLightbox = (e, index) => {
    e.stopPropagation();

    if (!images[index]) return;

    setSelectedImage(index);
  };

  const closeLightbox = (e) => {
    e?.stopPropagation();
    setSelectedImage(null);
  };

  return (
    <>
      <div className="relative w-full">
        {/* OFFSET OUTLINE */}
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[18px] border-[3px] border-[#171717] bg-[#5f94ff]" />

        {/* CARD */}
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          className="relative w-full cursor-pointer overflow-hidden rounded-[18px] border-[3px] border-[#171717] bg-white outline-none transition-[box-shadow] duration-300 hover:shadow-[1px_1px_0_#4978d5] focus-visible:ring-4 focus-visible:ring-[#5f94ff]"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between gap-6 px-5 py-5 sm:px-7 sm:py-6">
            <div className="min-w-0">
              <h3 className="dela-gothic truncate text-2xl font-black leading-none tracking-tight sm:text-3xl lg:text-4xl">
                {project.name}
              </h3>
            </div>

            {/* ARROW */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] transition-all duration-300 sm:h-11 sm:w-11 ${
                expanded ? "rotate-45 bg-[#f55d5d]" : "bg-[#fff21c]"
              }`}
            >
              <ArrowUpRight size={19} strokeWidth={2.5} />
            </div>
          </div>

          {/* TECH STACK */}
          {techStack.length > 0 && (
            <div className="px-5 pb-5 sm:px-7 sm:pb-6">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => {
                  const Icon = TECH_ICON_MAP[tech.icon];

                  return (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex items-center gap-1.5 rounded-full border border-[#171717]/20 bg-white px-2.5 py-1.5 text-neutral-700 transition-colors duration-200 hover:border-[#171717] hover:bg-[#fff21c]"
                    >
                      {Icon && <Icon size={13} />}

                      <span className="text-[9px] font-bold uppercase tracking-wide">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXPANDED */}
          <div
            ref={contentRef}
            className="overflow-hidden"
            style={{
              height: 0,
              opacity: 0,
              transition: "height 0.35s ease, opacity 0.25s ease",
            }}
          >
            <div className="border-t border-[#171717] px-5 py-5 sm:px-7 sm:py-7">
              <div className="grid grid-cols-1 gap-7 md:grid-cols-[1fr_42%] md:gap-10">
                {/* DESCRIPTION */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-900">
                      ABOUT
                    </p>

                    <p className="max-w-xl text-sm leading-7 sm:text-base">
                      {project.description || "No description available."}
                    </p>
                  </div>

                  {/* LINKS */}
                  {(project.github || project.demo) && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-[#171717] bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#2c5096]"
                        >
                          GitHub
                          <ArrowUpRight
                            size={13}
                            strokeWidth={3}
                          />
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-[#171717] bg-[#fff21c] px-4 py-2 text-[10px] font-black uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#171717]"
                        >
                          Live Demo
                          <ArrowUpRight
                            size={13}
                            strokeWidth={3}
                          />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* IMAGE */}
                <button
                  type="button"
                  onClick={(e) => openLightbox(e, 0)}
                  className="group relative aspect-video w-full overflow-hidden rounded-xl border-2 border-[#171717] bg-white outline-none focus-visible:ring-4 focus-visible:ring-[#5f94ff]"
                >
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={`${project.name} preview`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#fff21c] text-xs font-black uppercase">
                      Preview
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 rounded-full border border-[#171717] bg-white px-3 py-1.5 text-[9px] font-black uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Open
                  </div>
                </button>
              </div>

              {/* GALLERY */}
              {imageCount > 1 && (
                <div className="mt-6 flex items-center gap-2">
                  <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    Gallery
                  </span>

                  {Array.from({ length: imageCount }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Lihat gambar ${index + 1}`}
                      onClick={(e) => openLightbox(e, index)}
                      className={`h-2.5 w-2.5 rounded-full border border-[#171717] transition-transform duration-200 hover:scale-125 ${
                        index === 0
                          ? "bg-[#171717]"
                          : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;