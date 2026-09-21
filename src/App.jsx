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
  const dragStartY = useRef(0);
  const dragX = useRef(0);
  const isDragging = useRef(false);
  const isHorizontalDrag = useRef(false);
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
      scale: 0.97,
      rotation: dir * -0.8,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(nextIndex);

        requestAnimationFrame(() => {
          const newPage = pageRef.current;

          if (!newPage) {
            isAnimating.current = false;
            return;
          }

          gsap.fromTo(
            newPage,
            {
              x: dir * 100,
              opacity: 0,
              scale: 0.97,
              rotation: dir * 0.8,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(newPage, {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                });

                isAnimating.current = false;
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

  const handlePointerDown = (event) => {
    if (event.target.closest("button, a, input, textarea, select")) return;

    if (isAnimating.current) return;

    isDragging.current = true;
    isHorizontalDrag.current = false;

    dragStartX.current = event.clientX;
    dragStartY.current = event.clientY;
    dragX.current = 0;

    gsap.killTweensOf(pageRef.current);

    if (pageRef.current) {
      gsap.set(pageRef.current, {
        cursor: "grabbing",
      });
    }
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current || isAnimating.current) return;

    const deltaX = event.clientX - dragStartX.current;
    const deltaY = event.clientY - dragStartY.current;

    if (!isHorizontalDrag.current) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isDragging.current = false;

        if (pageRef.current) {
          gsap.set(pageRef.current, {
            cursor: "grab",
          });
        }

        return;
      }

      isHorizontalDrag.current = true;
    }

    dragX.current = deltaX;

    const resistance = window.innerWidth < 768 ? 0.58 : 0.72;
    const movement = dragX.current * resistance;

    if (xTo.current) {
      xTo.current(movement);
    }

    if (rotationTo.current) {
      rotationTo.current(movement * 0.008);
    }

    if (scaleTo.current) {
      scaleTo.current(
        1 - Math.min(Math.abs(movement) / 2800, 0.02)
      );
    }
  };

  const resetDrag = () => {
    isDragging.current = false;
    isHorizontalDrag.current = false;
    dragX.current = 0;

    if (pageRef.current) {
      gsap.to(pageRef.current, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.set(pageRef.current, {
        cursor: isBlogPost ? "default" : "grab",
      });
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current || isAnimating.current) return;

    const wasHorizontal = isHorizontalDrag.current;

    if (!wasHorizontal) {
      resetDrag();
      return;
    }

    isDragging.current = false;
    isHorizontalDrag.current = false;

    const page = pageRef.current;
    const threshold = window.innerWidth < 768 ? 65 : 100;

    if (page) {
      gsap.set(page, {
        cursor: isBlogPost ? "default" : "grab",
      });
    }

    if (Math.abs(dragX.current) >= threshold) {
      const dir = dragX.current < 0 ? 1 : -1;

      dragX.current = 0;

      if (dir === 1) {
        goNext();
      } else {
        goPrev();
      }

      return;
    }

    dragX.current = 0;

    if (page) {
      gsap.to(page, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    }
  };

  const handlePointerCancel = () => {
    if (!isDragging.current) return;

    resetDrag();
  };

  return (
    <div className="h-dvh w-screen overflow-hidden bg-gray-50">
      <main
        className="relative h-dvh w-full overflow-hidden touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
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
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="group fixed left-0 top-1/2 z-50 flex h-32 w-10 -translate-x-7 -translate-y-1/2 items-center justify-center rounded-r-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
        >
          <ChevronLeft
            size={24}
            strokeWidth={6}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next page"
          className="group fixed right-0 top-1/2 z-50 flex h-32 w-10 translate-x-7 -translate-y-1/2 items-center justify-center rounded-l-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
        >
          <ChevronRight
            size={24}
            strokeWidth={6}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      <Navbar active={activeTab} onSelect={handlePageChange} />
    </div>
  );
}

export default App;