import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiMongodb,
  SiGithub,
  SiVite,
} from "@icons-pack/react-simple-icons";

// =========================================================
// Map nama tech -> logo asli
// =========================================================

const TECH_ICON_MAP = {
  React: SiReact,
  Tailwind: SiTailwindcss,
  Node: SiNodedotjs,
  Next: SiNextdotjs,
  TypeScript: SiTypescript,
  Figma: SiFigma,
  MongoDB: SiMongodb,
  GitHub: SiGithub,
  Vite: SiVite,
};

const ProjectCard = ({ project, isOpen, onToggle }) => {
  const cardRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // =========================================================
  // SCALE
  // CLOSED = 0.9
  // HOVER  = 1.015
  // OPEN   = 1
  // =========================================================

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.killTweensOf(cardRef.current);

    gsap.to(cardRef.current, {
      scale: isOpen ? 1 : 0.95,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      if (cardRef.current) {
        gsap.killTweensOf(cardRef.current);
      }
    };
  }, [isOpen]);

  // =========================================================
  // HOVER MASUK
  // =========================================================

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.killTweensOf(cardRef.current);

    gsap.to(cardRef.current, {
      scale: isOpen ? 1 : 1.02,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  // =========================================================
  // HOVER KELUAR
  // OPEN  -> tetap 1
  // CLOSED -> kembali 0.9
  // =========================================================

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.killTweensOf(cardRef.current);

    gsap.to(cardRef.current, {
      scale: isOpen ? 1 : 0.95,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // =========================================================
  // CLICK
  // =========================================================

  const handleClick = () => {
    if (!cardRef.current) return;

    gsap.killTweensOf(cardRef.current);

    gsap
      .timeline({
        onComplete: onToggle,
      })
      .to(cardRef.current, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.in",
      })
      .to(cardRef.current, {
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      });
  };

  // =========================================================
  // KEYBOARD
  // =========================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // =========================================================
  // IMAGE
  // =========================================================

  const handleImageClick = (e, index) => {
    e.stopPropagation();
    setSelectedImage(index);
  };

  const closeLightbox = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  return (
    <>
      {/* =====================================================
          CARD
      ===================================================== */}

      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="
          rounded-3xl
          cursor-pointer
          select-none
          outline-none
          shadow-lg
          shadow-black/10
          focus-visible:ring-4
          focus-visible:ring-offset-2
          focus-visible:ring-black/30
        "
        style={{
          backgroundColor: project.color,
        }}
      >
        {/* =================================================
            HEADER
            Selalu kelihatan
        ================================================= */}

        <div className="px-7 sm:px-10 py-6 sm:py-8">
          <h3
            className="
            dela-gothic
              text-white
              font-extrabold
              tracking-tight
              text-2xl
              sm:text-4xl
              leading-none
            "
          >
            {project.name}
          </h3>
        </div>

        {/* =================================================
            DETAIL
            CLOSED = tidak kelihatan
            OPEN   = layout 2 kolom
        ================================================= */}

        <div
          className="
            grid
            transition-[grid-template-rows]
            duration-300
            ease-out
          "
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <div className="px-7 sm:px-10 pb-7 sm:pb-6">

              {/* =========================================
                  LAYOUT OPEN

                  KIRI  = description + tech
                  KANAN = gambar
              ========================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-6
                  lg:gap-10
                  items-end
                "
              >
                {/* =====================================
                    KIRI
                ===================================== */}

                <div className="flex flex-col gap-6">

                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-white/90
                      text-base
                      sm:text-xl
                      max-w-2xl
                    "
                  >
                    {project.description}
                  </p>

                  {/* TECH STACK */}

                  {project.techStack?.length > 0 && (
                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        sm:gap-4
                      "
                    >
                      {project.techStack.map((tech) => {
                        const Icon = TECH_ICON_MAP[tech.icon];

                        return (
                          <div
                            key={tech.name}
                            title={tech.name}
                            className="
                              flex
                              items-center
                              gap-2
                              bg-white/90
                              rounded-full
                              pl-2
                              pr-3.5
                              py-1.5
                              sm:pl-2.5
                              sm:pr-4
                              sm:py-2
                              shadow-md
                              shadow-black/15
                            "
                          >
                            {Icon && (
                              <Icon
                                size={20}
                                className="
                                  shrink-0
                                  sm:!w-[22px]
                                  sm:!h-[22px]
                                "
                              />
                            )}

                            <span
                              className="
                                text-gray-700
                                text-xs
                                sm:text-sm
                                font-medium
                              "
                            >
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* =====================================
                    KANAN — GAMBAR
                ===================================== */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:gap-6
                  "
                >
                  {Array.from({
                    length: Math.min(2, project.imageCount),
                  }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => handleImageClick(e, i)}
                      className="
                        group
                        relative
                        w-full
                        aspect-video
                        bg-white
                        rounded-2xl
                        overflow-hidden
                        outline-none
                        shadow-md
                        shadow-black/15
                        focus-visible:ring-4
                        focus-visible:ring-white/50
                      "
                    >
                      {/* Placeholder gambar */}

                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          text-gray-300
                          text-sm
                          sm:text-base
                          font-medium
                        "
                      >
                        Gambar {i + 1}
                      </div>

                      {/* Hover overlay */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/0
                          group-hover:bg-black/10
                          transition-colors
                        "
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {selectedImage !== null && (
        <div
          onClick={closeLightbox}
          className="
            fixed
            inset-0
            z-[60]
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
            sm:p-10
          "
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Tutup"
            className="
              absolute
              top-5
              right-5
              sm:top-8
              sm:right-8
              w-11
              h-11
              sm:w-12
              sm:h-12
              rounded-full
              bg-white/10
              hover:bg-white/20
              flex
              items-center
              justify-center
              text-white
              transition-colors
            "
          >
            <X className="w-6 h-6" />
          </button>

          {/* IMAGE */}

          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-4xl
              aspect-video
              bg-white
              rounded-2xl
              flex
              items-center
              justify-center
              shadow-2xl
            "
          >
            <span
              className="
                text-gray-400
                text-lg
                sm:text-2xl
                font-medium
              "
            >
              Gambar {selectedImage + 1} — {project.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;