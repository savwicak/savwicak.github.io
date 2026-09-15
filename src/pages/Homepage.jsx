import { useEffect, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";

function Homepage({ direction }) {
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

useEffect(() => {
  const dir = direction === 1 ? 1 : -1;

  const elements = [
    titleRef.current,
    lineRef.current,
    textRef.current,
    buttonsRef.current,
    imageRef.current,
  ];

  gsap.killTweensOf(elements);

  // Mulai dari ujung layar
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
    );

  return () => {
    tl.kill();
  };
}, [direction]);

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-10">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
        <div className="flex flex-col justify-center text-center md:text-left">
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

          <div
            ref={buttonsRef}
            className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <a
              href="/cv.pdf"
              download
              className="group flex items-center gap-2 rounded-full bg-[#fff21c] px-5 py-2.5 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_5px_0_#171717] active:translate-y-0 active:shadow-none sm:text-base"
            >
              DOWNLOAD CV
              <Download
                size={16}
                strokeWidth={3}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-[#5d8df5] px-5 py-2.5 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_5px_0_#171717] active:translate-y-0 active:shadow-none sm:text-base"
            >
              CONTACT ME
              <ArrowUpRight
                size={17}
                strokeWidth={3}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="mt-5 rounded-full bg-[#f55d5d] p-4 text-white sm:p-5">
            <p className="text-xs font-bold sm:text-sm">
              PRESS TAB!!
            </p>
          </div>
        </div>

        <div
          ref={imageRef}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]">
            <div className="overflow-hidden bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <img
                src="/images/profile.jpg"
                alt="Savanna Wicaksono"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;