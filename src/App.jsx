import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Blog from "./pages/Blog";
import Photos from "./pages/Photos";
import Profile from "./pages/Profile";

import "./App.css";

const PAGES = [Homepage, Project, Blog, Photos, Profile];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const pageRef = useRef(null);
  const dragStartX = useRef(0);
  const dragX = useRef(0);
  const isDragging = useRef(false);
  const isAnimating = useRef(false);

  const xTo = useRef(null);
  const rotationTo = useRef(null);
  const scaleTo = useRef(null);

  const ActivePage = PAGES[activeTab];
  const isBlogPost = ActivePage.name === "BlogPost";

  useEffect(() => {
    if (!pageRef.current) return;

    xTo.current = gsap.quickTo(pageRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    rotationTo.current = gsap.quickTo(pageRef.current, "rotation", {
      duration: 0.12,
      ease: "power3.out",
    });

    scaleTo.current = gsap.quickTo(pageRef.current, "scale", {
      duration: 0.12,
      ease: "power3.out",
    });

    gsap.set(pageRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
    });
  }, [activeTab]);

  const animatePageChange = (nextIndex, dir) => {
    if (isAnimating.current || nextIndex === activeTab) return;

    const page = pageRef.current;

    if (!page) {
      setDirection(dir);
      setActiveTab(nextIndex);
      return;
    }

    isAnimating.current = true;
    setDirection(dir);

    gsap.killTweensOf(page);

    gsap.to(page, {
      x: dir * -100,
      opacity: 0,
      scale: 0.96,
      rotation: dir * -1,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(nextIndex);

        requestAnimationFrame(() => {
          const newPage = pageRef.current;

          if (!newPage) return;

          gsap.fromTo(
            newPage,
            {
              x: dir * 100,
              opacity: 0,
              scale: 0.96,
              rotation: dir * 1,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.45,
              ease: "back.out(1.4)",
              onComplete: () => {
                setTimeout(() => {
                  gsap.set(newPage, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                  });

                  isAnimating.current = false;
                }, 150);
              },
            }
          );
        });
      },
    });
  };

  const handlePageChange = (nextIndex) => {
    if (nextIndex === activeTab || isAnimating.current) return;

    const dir = nextIndex > activeTab ? 1 : -1;

    animatePageChange(nextIndex, dir);
  };

  const goPrev = () => {
    if (isAnimating.current) return;

    const nextIndex =
      activeTab === 0 ? PAGES.length - 1 : activeTab - 1;

    animatePageChange(nextIndex, -1);
  };

  const goNext = () => {
    if (isAnimating.current) return;

    const nextIndex =
      activeTab === PAGES.length - 1 ? 0 : activeTab + 1;

    animatePageChange(nextIndex, 1);
  };

const handlePointerDown = (e) => {
  if (e.target.closest("[data-page-scroll]")) return;

  if (isAnimating.current) return;

  isDragging.current = true;
  dragStartX.current = e.clientX;
  dragX.current = 0;

  gsap.killTweensOf(pageRef.current);

  if (pageRef.current) {
    gsap.set(pageRef.current, {
      cursor: "grabbing",
    });
  }
};

  const handlePointerMove = (e) => {
    if (!isDragging.current || isAnimating.current) return;

    dragX.current = e.clientX - dragStartX.current;

    const resistance = 0.72;
    const movement = dragX.current * resistance;

    if (xTo.current) {
      xTo.current(movement);
    }

    if (rotationTo.current) {
      rotationTo.current(movement * 0.01);
    }

    if (scaleTo.current) {
      scaleTo.current(
        1 - Math.min(Math.abs(movement) / 2500, 0.025)
      );
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current || isAnimating.current) return;

    isDragging.current = false;

    const page = pageRef.current;
    const threshold = window.innerWidth < 768 ? 70 : 100;

    if (page) {
      gsap.set(page, {
        cursor: "grab",
      });
    }

    if (Math.abs(dragX.current) >= threshold) {
      const dir = dragX.current < 0 ? 1 : -1;

      if (dir === 1) {
        goNext();
      } else {
        goPrev();
      }

      dragX.current = 0;
      return;
    }

    if (page) {
      gsap.to(page, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.55)",
      });
    }

    dragX.current = 0;
  };

  const handlePointerCancel = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    dragX.current = 0;

    if (pageRef.current) {
      gsap.to(pageRef.current, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.5)",
      });

      gsap.set(pageRef.current, {
        cursor: "grab",
      });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <main
        className="relative h-screen w-full overflow-hidden touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div
          ref={pageRef}
          className={`min-h-full w-full will-change-transform ${
            isBlogPost ? "" : "cursor-grab"
          }`}
        >
          <ActivePage direction={direction} />
        </div>
      </main>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <button
          onClick={goPrev}
          className="group fixed left-0 top-1/2 z-50 flex h-32 w-10 -translate-x-7 -translate-y-1/2 items-center justify-center rounded-r-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
        >
          <ChevronLeft
            size={24}
            strokeWidth={6}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </button>

        <button
          onClick={goNext}
          className="group fixed right-0 top-1/2 z-50 flex h-32 w-10 translate-x-7 -translate-y-1/2 items-center justify-center rounded-l-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
        >
          <ChevronRight
            size={24}
            strokeWidth={6}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* MOBILE */}
      <div className="fixed bottom-[40px] left-0 z-50 flex w-full items-center justify-between px-4 md:hidden">
        <button
          onClick={goPrev}
          aria-label="Previous page"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
        >
          <ChevronLeft size={24} strokeWidth={6} />
        </button>

        <div className="rounded-full border-4 border-black bg-white px-4 py-1 text-xs font-black shadow-[3px_3px_0px_#000]">
          {activeTab + 1} / {PAGES.length}
        </div>

        <button
          onClick={goNext}
          aria-label="Next page"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
        >
          <ChevronRight size={24} strokeWidth={6} />
        </button>
      </div>

      <Navbar active={activeTab} onSelect={handlePageChange} />
    </div>
  );
}

export default App;