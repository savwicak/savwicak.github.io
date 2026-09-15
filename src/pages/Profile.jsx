import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const EXPERIENCE = [
  {
    number: "01",
    role: "Game Developer",
    company: "Unity / Godot",
    description: "Building playful 2D experiences, gameplay systems and interactive mechanics.",
    year: "2024 — NOW",
  },
  {
    number: "02",
    role: "Mobile Developer",
    company: "Flutter",
    description: "Creating clean mobile applications with Firebase and thoughtful UI.",
    year: "2024 — NOW",
  },
  {
    number: "03",
    role: "Frontend Developer",
    company: "React / Tailwind",
    description: "Turning ideas into expressive interfaces with animation and personality.",
    year: "2023 — NOW",
  },
  {
    number: "04",
    role: "Creative Developer",
    company: "Freelance",
    description: "Experimenting with interactive prototypes, visuals and weird little ideas.",
    year: "2023 — NOW",
  },
];

const TECH = ["FLUTTER", "REACT", "UNITY", "GODOT", "FIREBASE", "TAILWIND"];

function Profile() {
  return (
    <section className="min-h-screen overflow-hidden bg-[#f7f7f5] px-5 py-20 text-[#171717] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1180px]">

        {/* TOP LABEL */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#ff4545]" />
            <span className="text-xs font-black uppercase tracking-[0.25em]">
              About / Profile
            </span>
          </div>

          <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-black/40 sm:block">
            Available for work
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.05fr]">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col gap-5">

            {/* INTRO CARD */}
            <div className="relative min-h-[310px] overflow-hidden rounded-[28px] border-2 border-black bg-white p-7 shadow-[7px_7px_0_#171717] sm:p-9">

              {/* decorative circles */}
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[24px] border-[#ffef00]" />
              <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-[#5f94ff]" />

              <div className="relative z-10 flex h-full flex-col justify-between">

                <div>
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#ffef00] px-4 py-2 text-xs font-black uppercase">
                    <Sparkles size={14} strokeWidth={3} />
                    Creative Developer
                  </div>

                  <h1 className="max-w-[620px] text-[clamp(42px,6vw,72px)] font-black leading-[0.86] tracking-[-0.065em]">
                    FLUTTER
                    <br />
                    <span className="text-[#5f94ff]">& GAME</span>
                    <br />
                    DEV.
                  </h1>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-[390px] text-[16px] font-medium leading-[1.25] text-black/70">
                    I’m passionate about creating interactive games,
                    applications and expressive digital experiences while
                    constantly improving through every project.
                  </p>

                  <div className="hidden h-14 w-14 shrink-0 rotate-6 items-center justify-center rounded-full bg-[#ff4545] sm:flex">
                    <Star size={26} fill="black" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE VISUAL */}
            <div className="relative h-[250px] overflow-hidden rounded-[28px] border-2 border-black bg-[#5f94ff] shadow-[7px_7px_0_#171717]">

              {/* giant typography */}
              <div className="absolute -bottom-8 -left-2 select-none text-[120px] font-black leading-none tracking-[-0.1em] text-white/30">
                DEV
              </div>

              {/* image / visual replacement */}
              <div className="absolute right-5 top-5 h-[185px] w-[185px] rotate-3 overflow-hidden rounded-[24px] border-2 border-black bg-[#ffef00] shadow-[6px_6px_0_#171717]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ff4545_0_18%,transparent_19%),radial-gradient(circle_at_70%_65%,#171717_0_22%,transparent_23%)]" />

                <div className="absolute bottom-4 left-4 right-4 rounded-xl border-2 border-black bg-white px-3 py-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    SAVWICAK
                  </p>
                </div>
              </div>

              <div className="absolute left-6 top-6 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black">
                HELLO 👋
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black">
                <MapPin size={14} />
                INDONESIA
              </div>
            </div>

            {/* LATEST PROJECT */}
            <div className="group relative min-h-[245px] overflow-hidden rounded-[28px] border-2 border-black bg-[#171717] p-6 text-white shadow-[7px_7px_0_#5f94ff] transition-transform duration-300 hover:-translate-y-1">

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/40">
                      Featured project
                    </p>

                    <h2 className="text-4xl font-black tracking-[-0.06em]">
                      Latest
                      <br />
                      Project.
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffef00] text-black transition-transform duration-300 group-hover:rotate-12">
                    <ArrowUpRight size={23} strokeWidth={3} />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-black">
                      FLUTTER
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-black">
                      FIREBASE
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-black">
                      MOBILE
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <p className="max-w-[300px] text-sm font-medium text-white/60">
                      An interactive application built around clean UI,
                      useful features and playful interactions.
                    </p>

                    <span className="text-5xl font-black text-[#ff4545]">
                      01
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-24 -right-16 h-60 w-60 rounded-full border-[45px] border-[#5f94ff]/20 transition-transform duration-500 group-hover:scale-125" />
            </div>

            {/* CTA */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              <a
                href="#contact"
                className="group flex h-[62px] items-center justify-between rounded-full border-2 border-black bg-[#5f94ff] px-6 text-lg font-black shadow-[5px_5px_0_#171717] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                <span>CONTACT ME</span>
                <Mail
                  size={21}
                  strokeWidth={3}
                  className="transition-transform duration-200 group-hover:rotate-12"
                />
              </a>

              <a
                href="/cv.pdf"
                download
                className="group flex h-[62px] items-center justify-between rounded-full border-2 border-black bg-[#ffef00] px-6 text-lg font-black shadow-[5px_5px_0_#171717] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
              >
                <span>DOWNLOAD CV</span>
                <Download
                  size={21}
                  strokeWidth={3}
                  className="transition-transform duration-200 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex flex-col gap-5">

            {/* EXPERIENCE HEADER */}
            <div className="flex items-end justify-between px-1">
              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
                  What I do
                </p>

                <h2 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                  EXPERIENCE
                </h2>
              </div>

              <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-full border-2 border-black bg-[#ff4545] shadow-[3px_3px_0_#171717]">
                <BriefcaseBusiness size={22} strokeWidth={2.5} />
              </div>
            </div>

            {/* EXPERIENCE CARDS */}
            <div className="flex flex-col gap-3">
              {EXPERIENCE.map((item, index) => (
                <article
                  key={item.number}
                  className={`group relative overflow-hidden rounded-[22px] border-2 border-black p-5 shadow-[5px_5px_0_#171717] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#e7e7e5]"
                  }`}
                >
                  <div className="relative z-10 grid grid-cols-[52px_1fr_auto] gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-sm font-black text-white transition-transform duration-300 group-hover:rotate-12">
                      {item.number}
                    </div>

                    <div>
                      <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-black/40">
                        {item.company}
                      </p>

                      <h3 className="text-[22px] font-black leading-none tracking-[-0.04em]">
                        {item.role}
                      </h3>

                      <p className="mt-2 max-w-[390px] text-[12px] font-medium leading-[1.3] text-black/60">
                        {item.description}
                      </p>
                    </div>

                    <span className="hidden text-[9px] font-black uppercase text-black/30 sm:block">
                      {item.year}
                    </span>
                  </div>

                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#ffef00] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
              ))}
            </div>

            {/* SKILLS */}
            <div className="rounded-[28px] border-2 border-black bg-[#ffef00] p-6 shadow-[7px_7px_0_#171717]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]">
                    My toolbox
                  </p>

                  <h3 className="mt-1 text-3xl font-black tracking-[-0.06em]">
                    TECH STACK
                  </h3>
                </div>

                <Trophy size={30} strokeWidth={2.5} />
              </div>

              <div className="flex flex-wrap gap-2">
                {TECH.map((tech, index) => (
                  <span
                    key={tech}
                    className={`rounded-full border-2 border-black px-4 py-2 text-[11px] font-black transition-transform duration-200 hover:-translate-y-1 ${
                      index % 3 === 0
                        ? "bg-[#5f94ff]"
                        : index % 3 === 1
                          ? "bg-white"
                          : "bg-[#ff4545]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* SOCIAL */}
            <div className="rounded-[28px] border-2 border-black bg-white p-5 shadow-[7px_7px_0_#171717]">
              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40">
                    Find me online
                  </p>
                  <p className="mt-1 text-xl font-black tracking-[-0.04em]">
                    LET'S CONNECT.
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* <a
                    href="#github"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#171717] text-white transition-transform hover:-rotate-6 hover:scale-110"
                  >
                    <Github size={21} />
                  </a> */}

                  <a
                    href="#contact"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#5f94ff] transition-transform hover:rotate-6 hover:scale-110"
                  >
                    <Mail size={21} />
                  </a>

                  <a
                    href="#work"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#ff4545] transition-transform hover:-rotate-6 hover:scale-110"
                  >
                    <ArrowUpRight size={21} strokeWidth={3} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Profile;