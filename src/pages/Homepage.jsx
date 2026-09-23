import { useEffect, useRef } from "react";
import { Mail, Download } from "lucide-react";

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
          duration: 1.5,
        },
        "-=0.9"
      );

    return () => {
      tl.kill();
    };
  }, [direction]);

  return (
    <div className="flex h-screen pb-35 md:pb-0 w-full items-center justify-center overflow-hidden px-5 py-10 sm:px-10 lg:py-0">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
        
        {/* CONTENT */}
        <div className="order-2 flex flex-col justify-center text-center md:order-1 md:text-left">
          <div
            ref={hintRef}
            className="mb-2 flex justify-center md:justify-start"
          >
            <div className="flex items-center gap-3 rounded-full border-2 border-[#171717] bg-[#ff4545] px-4 py-2.5 text-white shadow-[3px_4px_0_#171717]">
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
            className="dela-gothic mt-5 md:mb-5 text-4xl font-black leading-[0.85] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Welcome!
          </h1>

          <div
            ref={lineRef}
            className="mx-auto my-5 h-px w-full bg-black md:mx-0"
          />

          <p
            ref={textRef}
            className="mx-auto max-w-xl text-sm font-medium leading-7 tracking-[-0.01em] sm:text-base md:mx-0 lg:text-lg"
          >
            Hii everyone. My name is Savanna Wicaksono, feel free to explore my website!
            I am a vacational high school student majoring in software engineering, i really love
            to try new things and work in project, currently focusing on mobile applications :D 
          </p>

          <div
            ref={buttonsRef}
            className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <a
              href="mailto:savwicak@gmail.com"
              className="group flex items-center gap-2 rounded-full border-2 border-[#171717] bg-[#5f94ff] px-5 py-3 text-xs font-bold text-[#171717] shadow-[3px_4px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_#171717] active:translate-x-0.5 active:translate-y-0.75 active:shadow-none sm:text-sm"
            >
              Mail Me

              <Mail size={17} strokeWidth={3} />
            </a>

            <a
              href="/data/Savanna Wicaksono Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border-2 border-[#171717] bg-[#fff21c] px-5 py-3 text-xs font-bold text-[#171717] shadow-[3px_4px_0_#171717] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_6px_0_#171717] active:translate-x-0.5 active:translate-y-0.75 active:shadow-none sm:text-sm"
            >
              Download CV

              <Download
                size={16}
                strokeWidth={3}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <section
          ref={imageRef}
          className="order-1 flex justify-center md:order-2 md:justify-end"
        >
          <div className="group relative w-full max-w-50 sm:max-w-80 lg:max-w-105 xl:max-w-115">
            <div className="relative z-20 aspect-square overflow-hidden rounded-full border-[3px] border-[#171717] bg-[#f0f0ed] shadow-[7px_7px_0_#171717] transition-transform duration-500 ease-out group-hover:scale-105">
              <img
                src="/images/profile.gif"
                alt="Savanna Wicaksono"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition-opacity duration-500 group-hover:opacity-0"
              />

              <img
                src="/images/sav.png"
                alt="Savanna Wicaksono"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;