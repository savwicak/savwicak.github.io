import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

import {
  experiences,
  skills,
  certificates,
  links,
  socials,
} from "../data/ProfileData";

const EMAIL = "savwicak@gmail.com";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "design", label: "DESIGN" },
];

const ORDER = {
  about: 0,
  contact: 1,
  experience: 2,
  skills: 3,
  links: 4,
  certificates: 5,
};

const ACCENTS = {
  blue: "bg-[#5f94ff]",
  yellow: "bg-[#fff21c]",
  red: "bg-[#ff4545]",
};

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-black";

const Profile = ({ direction = 1 }) => {
  const sectionRefs = useRef([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const setRef = (index) => (element) => {
    sectionRefs.current[index] = element;
  };

  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") return skills;
    return skills.filter((skill) => skill.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const elements = sectionRefs.current.filter(Boolean);
    if (!elements.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const dir = direction === 1 ? 1 : -1;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(elements);

      gsap.set(elements, {
        x: `${dir * 100}vw`,
        opacity: 0,
      });

      gsap.to(elements, {
        x: 0,
        opacity: 1,
        duration: 1.05,
        stagger: 0.07,
        ease: "power4.out",
        overwrite: true,
        clearProps: "transform,opacity",
      });
    });

    return () => ctx.revert();
  }, [direction]);

  return (
    <>
      <div className="h-dvh w-full overflow-hidden bg-[#f7f7f5]">
        <div className="flex h-full w-full overflow-y-auto overflow-x-hidden p-4 scrollbar-hide sm:p-6">
          <div className="m-auto w-full max-w-337.5 py-5 lg:py-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.92fr] lg:gap-5">
              {/* LEFT */}
              <div className="flex min-w-0 flex-col gap-4">
                {/* ABOUT */}
                <div
                  ref={setRef(ORDER.about)}
                  className="px-1 pb-1"
                >
                  <p className="max-w-162.5 text-[18px] font-medium leading-[1.2] tracking-tight text-[#292929] sm:text-[20px]">
                    I’m passionate about creating interactive games and
                    applications and constantly improving my skills through
                    projects.
                  </p>
                </div>

                {/* EXPERIENCE */}
                <section 
                  ref={setRef(ORDER.experience)} 
                  aria-label="Experience" 
                  className="relative"
                >
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black bg-[#5f94ff]" />

                  <div className="relative flex h-90 flex-col rounded-2xl border-2 border-black bg-white p-4 sm:h-94.5">
                    <div className="relative min-h-0 flex-1">
                      <div className="absolute inset-0 flex flex-col gap-3 overflow-y-auto p-1 pb-2 pr-2 scrollbar-hide">
                        {experiences.map((experience) => (
                          <article key={experience.id} className="group relative shrink-0">
                            <div className="relative overflow-hidden rounded-xl border-2 border-black bg-white px-5 py-4 transition-colors duration-200 hover:bg-white sm:px-6">
                              <div className={experience.link ? "pr-20" : ""}>
                                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                                  {experience.year}
                                </span>

                                <h3 className="dela-gothic text-[21px] font-black lowercase leading-none tracking-[-0.06em] sm:text-[24px]">
                                  {experience.title}
                                </h3>

                                <p className="mt-2 max-w-137.5 text-[13px] font-medium leading-[1.35] tracking-[-0.015em] text-[#292929] sm:text-[14px]">
                                  {experience.description}
                                </p>
                              </div>

                              {experience.link ? (
                                <a
                                  href={experience.link}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className={`absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-[#ffef00] px-3 py-2 text-[8px] font-black uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000] ${FOCUS_RING}`}
                                >
                                  VIEW
                                  <ArrowUpRight size={13} strokeWidth={3} />
                                </a>
                              ) : null}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* TECH STACK */}
                <section
                  ref={setRef(ORDER.skills)}
                  aria-label="Tech stack"
                  className="relative"
                >
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black bg-[#ff4545]" />

                  <div className="relative rounded-2xl border-2 border-black bg-white p-4">
                    <div className="mb-2 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
                      {FILTERS.map((filter) => {
                        const active = activeFilter === filter.id;

                        return (
                          <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveFilter(filter.id)}
                            className={`shrink-0 rounded-full border-2 border-black px-3 py-1.5 text-[8px] font-black uppercase tracking-wide transition-all duration-200 ${
                              active
                                ? "bg-[#171717] text-white"
                                : "bg-white hover:-translate-y-0.5 hover:bg-[#5f94ff]"
                            }`}
                          >
                            {filter.label}
                          </button>
                        );
                      })}
                    </div>

                    {filteredSkills.length > 0 ? (
                      <div className="flex gap-3 overflow-x-auto p-1 pb-3 scrollbar-hide">
                        {filteredSkills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group relative shrink-0"
                          >
                            <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border-2 border-black bg-[#5f94ff]" />

                            <div className="relative flex h-25 w-25 flex-col items-center justify-center rounded-xl border-2 border-black bg-white transition-all duration-300 group-hover:-translate-y-1">
                              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg">
                                <img
                                  src={skill.image}
                                  alt={skill.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-contain"
                                  onError={(event) => {
                                    event.currentTarget.style.display =
                                      "none";
                                  }}
                                />
                              </div>

                              <span className="mt-2 max-w-20 truncate text-center text-[9px] font-black uppercase tracking-[-0.02em]">
                                {skill.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-black px-4 py-6 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em]">
                          No technology found
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* RIGHT */}
              <div className="flex min-w-0 flex-col gap-4">
                {/* CONTACT */}
                <div
                  ref={setRef(ORDER.contact)}
                  className="relative"
                >
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black bg-[#ff4545]" />

                  <section
                    aria-label="Contact"
                    className="relative overflow-hidden rounded-2xl border-2 border-black bg-[#ff4545] px-6 py-6 transition-all duration-300 hover:-translate-y-1 sm:px-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-[46px] font-black leading-[0.85] tracking-[-0.075em] sm:text-[58px]">
                          Contact me
                        </h2>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white">
                        <ArrowUpRight
                          size={18}
                          strokeWidth={3}
                        />
                      </div>
                    </div>

                    <a
                      href={`mailto:${EMAIL}`}
                      className={`group/email mt-6 inline-flex max-w-full items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2.5 text-[13px] font-black tracking-[-0.03em] shadow-[3px_3px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fff21c] hover:shadow-[5px_5px_0_#000] sm:px-5 sm:py-3 sm:text-[15px] ${FOCUS_RING}`}
                    >
                      <span className="truncate">
                        {EMAIL}
                      </span>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#5f94ff] transition-transform duration-300 group-hover/email:rotate-45">
                        <ArrowUpRight
                          size={14}
                          strokeWidth={3}
                        />
                      </span>
                    </a>
                  </section>
                </div>

                {/* LINKS */}
                <nav
                  ref={setRef(ORDER.links)}
                  aria-label="Project links"
                  className="grid grid-cols-3 gap-3 sm:gap-4"
                >
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`group relative flex aspect-[1.25] overflow-hidden rounded-2xl border-2 border-black p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] ${FOCUS_RING} ${
                        ACCENTS[link.accent] ?? ACCENTS.red
                      }`}
                    >
                      <span className="self-end text-[19px] font-black lowercase leading-none tracking-[-0.065em] sm:text-[27px]">
                        {link.title}
                      </span>

                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-black group-hover:text-white">
                        <ArrowUpRight
                          size={16}
                          strokeWidth={3}
                        />
                      </span>
                    </a>
                  ))}
                </nav>

                {/* CERTIFICATES */}
                <section
                  ref={setRef(ORDER.certificates)}
                  aria-label="Certificates"
                  className="relative flex flex-col"
                >
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border-2 border-black bg-[#5f94ff]" />

                  <div className="relative flex flex-col rounded-2xl border-2 border-black bg-white p-4">
                    <div className="flex gap-3 overflow-x-auto p-1 pb-3 scrollbar-hide">
                      {certificates.map((certificate) => (
                        <button
                          key={certificate.id}
                          type="button"
                          onClick={() =>
                            setSelectedCertificate(certificate)
                          }
                          className={`group relative h-52.5 w-71.25 shrink-0 overflow-visible text-left sm:h-56.25 sm:w-77.5 ${FOCUS_RING}`}
                        >
                          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border-2 border-black bg-[#fff21c]" />

                          <div className="relative h-full overflow-hidden rounded-xl border-2 border-black bg-white transition-transform duration-300 group-hover:-translate-y-1">
                            <img
                              src={certificate.image}
                              alt={certificate.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                            <div className="absolute inset-x-4 bottom-4">
                              <span className="block text-[12px] font-black uppercase leading-tight tracking-[-0.03em] text-white sm:text-[14px]">
                                {certificate.title}
                              </span>

                              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                                {certificate.year ||
                                  certificate.issued}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CERTIFICATE MODAL */}

      {selectedCertificate ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border-2 border-black bg-[#f7f7f5] shadow-[6px_6px_0_#5f94ff]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#fff21c] transition-transform duration-200 hover:rotate-90"
            >
              <X size={19} strokeWidth={3} />
            </button>

            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="flex min-h-65 items-center justify-center border-b-2 border-black bg-white p-4 md:border-b-0 md:border-r-2 md:p-7">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-h-[65vh] w-full rounded-xl border-2 border-black object-contain"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                  Certificate
                </span>

                <h2 className="dela-gothic mt-2 pr-10 text-3xl font-black leading-tight sm:text-4xl">
                  {selectedCertificate.title}
                </h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Issued by
                    </p>
                    <p className="mt-1 text-sm font-black">
                      {selectedCertificate.issuedBy || "-"}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Issued
                    </p>
                    <p className="mt-1 text-sm font-black">
                      {selectedCertificate.issued || selectedCertificate.year || "-"}
                    </p>
                  </div>

                  <div  className="mt-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Expired
                    </p>
                    <p className="mt-1 text-sm font-black">
                      {selectedCertificate.expired || "N/A"}
                    </p>
                  </div>

                  <div  className="mt-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Valid for
                    </p>
                    <p className="mt-1 text-sm font-black">
                      {selectedCertificate.validFor || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;