import { useLayoutEffect, useRef } from "react";
import { experiences, skills, certificates, links } from "../data/ProfileData";

const EMAIL = "savwicak@gmail.com";
//animation in order
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
  yellow: "bg-[#fff20f]",
  red: "bg-[#ff4545]",
};

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black";
const CARD =
  "rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0px_#000]";
const CARD_HOVER =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[9px_9px_0px_#000]";
const TILE =
  "rounded-xl border-2 border-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]";

const pad = (n) => String(n).padStart(2, "0");

const SectionHeader = ({ title, meta, className = "" }) => (
  <div className={`flex items-center justify-between px-1 ${className}`}>
    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-600">
      {title}
    </h2>
    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
      {meta}
    </span>
  </div>
);

const Profile = ({ direction }) => {
  const sectionRefs = useRef([]);
  const setRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  useLayoutEffect(() => {
    const elements = sectionRefs.current.filter(Boolean);
    if (!elements.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const dir = direction === 1 ? 1 : -1;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { x: `${dir * 100}vw`, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );
    });

    return () => ctx.revert();
  }, [direction]);

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#f7f7f5]">
      <div className="flex h-full w-full overflow-y-auto overflow-x-hidden p-5 scrollbar-hide sm:p-6">
        <div className="m-auto w-full max-w-[1350px] py-6 lg:py-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.92fr] lg:gap-5">
            {/* LEFT */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* ABOUT */}
              <div ref={setRef(ORDER.about)} className="px-1 pb-1">
                <p className="max-w-[650px] text-[18px] font-medium leading-[1.2] tracking-[-0.025em] text-[#292929] sm:text-[20px]">
                  I’m passionate about creating interactive games and
                  applications and constantly improving my skills through
                  projects.
                </p>
              </div>

              {/* EXPERIENCE */}
              <section
                ref={setRef(ORDER.experience)}
                aria-label="Experience"
                className={`flex flex-col p-4 lg:flex-1 ${CARD}`}
              >
                <SectionHeader
                  title="Experience"
                  meta={`${pad(experiences.length)} entries`}
                  className="mb-3"
                />
                <div className="relative min-h-[280px] flex-1">
                  <div className="absolute inset-0 flex flex-col gap-3 overflow-y-auto p-1 pb-2 pr-2 scrollbar-hide">
                  {experiences.map((experience) => (
                    <article
                      key={experience.id}
                      className={`group relative shrink-0 overflow-hidden bg-white px-5 py-4 sm:px-6 ${TILE}`}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute right-4 top-4 text-[10px] font-black tracking-[0.15em] text-neutral-400"
                      >
                        {experience.id}
                      </span>

                      <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                        {experience.year}
                      </span>

                      <h3 className="text-[22px] font-black lowercase leading-none tracking-[-0.06em] sm:text-[25px]">
                        {experience.title}
                      </h3>

                      <p className="mt-2 max-w-[550px] text-[13px] font-medium leading-[1.3] tracking-[-0.015em] text-[#292929] sm:text-[14px]">
                        {experience.description}
                      </p>

                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                    </article>
                  ))}
                  </div>
                </div>
              </section>

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
                    className={`group relative flex aspect-[1.25] overflow-hidden rounded-2xl border-2 border-black p-4 shadow-[6px_6px_0px_#000] focus-visible:-translate-y-1 focus-visible:shadow-[9px_9px_0px_#000] sm:p-5 ${CARD_HOVER} ${FOCUS_RING} ${
                      ACCENTS[link.accent] ?? ACCENTS.red
                    }`}
                  >
                    <span className="self-end text-[20px] font-black lowercase leading-none tracking-[-0.065em] sm:text-[29px]">
                      {link.title}
                    </span>

                  </a>
                ))}
              </nav>
            </div>

            {/* RIGHT */}
            <div className="flex min-w-0 flex-col gap-4">
              {/* CONTACT */}
              <section
                ref={setRef(ORDER.contact)}
                aria-label="Contact"
                className={`group relative overflow-hidden rounded-2xl border-2 border-black bg-[#ff4545] px-6 py-7 shadow-[6px_6px_0px_#000] sm:px-7 ${CARD_HOVER}`}
              >
                <h2 className="text-[46px] font-black lowercase leading-[0.85] tracking-[-0.075em] sm:text-[58px]">
                  Contact me
                </h2>

                <a
                  href={`mailto:${EMAIL}`}
                  className={`mt-6 inline-block break-all text-[16px] font-bold tracking-[-0.03em] underline decoration-2 underline-offset-4 transition-opacity hover:opacity-60 sm:text-[18px] ${FOCUS_RING}`}
                >
                  {EMAIL}
                </a>
              </section>

              {/* TECH STACK */}
              <section
                ref={setRef(ORDER.skills)}
                aria-label="Tech stack"
                className={`p-4 ${CARD}`}
              >
                <SectionHeader
                  title="Tech stack"
                  meta={`${pad(skills.length)} tools`}
                  className="mb-3"
                />

                <div className="flex gap-3 overflow-x-auto p-1 pb-3 scrollbar-hide">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`group flex h-[100px] w-[100px] shrink-0 flex-col items-center justify-center bg-white hover:bg-black ${TILE}`}
                    >
                      <img
                        src={skill.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                      />

                      <span className="mt-2 max-w-[85px] truncate text-center text-[10px] font-black uppercase tracking-[-0.02em] group-hover:text-white">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATES */}
              <section
                ref={setRef(ORDER.certificates)}
                aria-label="Certificates"
                className={`flex flex-col p-4 lg:flex-1 ${CARD}`}
              >
                <SectionHeader
                  title="Certificates"
                  meta={`${pad(certificates.length)} items`}
                  className="mb-3"
                />

                <div className="flex flex-1 items-center gap-3 overflow-x-auto p-1 pb-2 scrollbar-hide">
                  {certificates.map((certificate, index) => (
                    <figure
                      key={certificate.id}
                      className={`group relative h-[210px] w-[285px] shrink-0 overflow-hidden bg-neutral-300 sm:h-[225px] sm:w-[310px] ${TILE}`}
                    >
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent transition-colors duration-300 group-hover:from-black/60" />

                      <span
                        aria-hidden="true"
                        className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-black bg-white text-[10px] font-black"
                      >
                        {pad(index + 1)}
                      </span>

                      <figcaption className="absolute inset-x-3 bottom-3">
                        <span className="block text-[12px] font-black uppercase leading-tight tracking-[-0.03em] text-white sm:text-[14px]">
                          {certificate.title}
                        </span>

                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.15em] text-white/85">
                          {certificate.year}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;