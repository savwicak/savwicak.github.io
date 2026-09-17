import { useEffect, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";

function Homepage({ direction }) {
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const hintRef = useRef(null);
  const imageRef = useRef(null);

useEffect(() => {
  const dir = direction === 1 ? 1 : -1;

  const elements = [
    hintRef.current,
    titleRef.current,
    lineRef.current,
    textRef.current,
    buttonsRef.current,
    imageRef.current,
  ];

  gsap.killTweensOf(elements);

  // Mulai dari ujung layar
    gsap.set(hintRef.current, {
      x: `${dir * 100}vw`,
    });
  gsap.set(titleRef.current, {
    x: `${dir * 100}vw`,
  });

  gsap.set(lineRef.current, {
    x: `${dir * 100}vw`,
    scaleX: 1,
  });

  gsap.set(textRef.current, {
    x: `${dir * 100}vw`,
  });

  gsap.set(buttonsRef.current, {
    x: `${dir * 100}vw`,
  });

  gsap.set(imageRef.current, {
    x: `${dir * 100}vw`,
  });

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.to(titleRef.current, {
    x: "0vw",
    duration: 1.1,
  })
    .to(
      lineRef.current,
      {
        x: "0vw",
        duration: 1,
      },
      "-=0.9"
    )
    .to(
      textRef.current,
      {
        x: "0vw",
        duration: 1,
      },
      "-=0.85"
    )
    .to(
      buttonsRef.current,
      {
        x: "0vw",
        duration: 0.9,
      },
      "-=0.8"
    )
    .to(
      imageRef.current,
      {
        x: "0vw",
        duration: 1.15,
      },
      "-=1"
    )
    .to(
      hintRef.current,
      {
        x: "0vw",
        duration: 3,
      },
      "-=0.9"
    );

  return () => {
    tl.kill();
  };
}, [direction]);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-10">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
        <div className="flex flex-col justify-center text-center md:text-left">
          <div ref={hintRef} className="mt-7 flex justify-center lg:justify-start">
            <div className="flex items-center mb-2 gap-3 rounded-full border-2 border-[#171717] bg-[#ff4545] px-4 py-2.5 text-white shadow-[3px_4px_0_#171717]">
              <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-white px-1 text-[10px] font-black text-[#171717]">
                TAB
              </span>

              <span className="text-[10px] tracking-[0.12em] sm:text-xs">
                PRESS TO NAVIGATE or SLIDE LEFT OR RIGHT
              </span>
            </div>
          </div>
          <h1
            ref={titleRef}
            className="dela-gothic text-5xl font-black leading-[0.85] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            SAVANNA
            <br />
            WICAKSONO
          </h1>

          <div
            ref={lineRef}
            className="mx-auto my-5 h-px w-full bg-black/15 md:mx-0"
          />

          <p
            ref={textRef}
            className="mx-auto max-w-xl text-sm font-medium leading-7 tracking-[-0.01em] sm:text-base md:mx-0 lg:text-lg"
          >
            HELLO MATE, IM A JUNIOR <b>FLUTTER DEVELOPER</b> HIGHLY
            INTERESTED IN GAMES AND IOT. I LOVE EXPLORING NEW THINGS, ALOOOOT
            OF DIFFERENT ACTIVITIES. IM A REALLY BRAVE PERSON TO TRY NEW
            THINGS, LIKE JUMPING OFF A CLIFF (FOR SKYDIVING, NEVER TRIED IT
            YET BUT WOULD LOVE TO). REALLY LOVE GAMES.
          </p>

          <div ref={buttonsRef} className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="/cv.pdf" download className="group flex items-center gap-2 rounded-full border-[2px] border-[#171717] bg-[#fff21c] px-5 py-3 text-xs font-black text-[#171717] shadow-[3px_4px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_#171717] active:translate-x-[2px] active:translate-y-[3px] active:shadow-none sm:text-sm">
              DOWNLOAD CV
              <Download size={16} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            <a href="#contact" className="group flex items-center gap-2 rounded-full border-[2px] border-[#171717] bg-[#5f94ff] px-5 py-3 text-xs font-black text-[#171717] shadow-[3px_4px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_#171717] active:translate-x-[2px] active:translate-y-[3px] active:shadow-none sm:text-sm">
              CONTACT ME
              <ArrowUpRight size={17} strokeWidth={3} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <section ref={imageRef} className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[300px] sm:max-w-[370px] lg:max-w-[430px]">
            <div className="absolute right-3 top-3 h-full w-full border-[3px] border-[#171717] bg-[#ff4545] sm:right-5 sm:top-5" />
            <div className="relative z-20 overflow-hidden border-[3px] border-[#171717] bg-[#f0f0ed] shadow-[7px_8px_0_[#ff4545]">
              <img src="/images/profile.jpg" alt="Savanna Wicaksono" className="aspect-[4/5] w-full object-cover object-center grayscale-[15%] transition-all duration-500" />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;