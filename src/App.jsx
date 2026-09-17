import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (!pageRef.current || typeof gsap === "undefined") return;

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

    if (!page || typeof gsap === "undefined") {
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
              rotation: dir,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.45,
              ease: "back.out(1.4)",
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
    if (isAnimating.current || nextIndex === activeTab) return;

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
    if (e.target.closest("button")) return;
    if (e.target.closest("a")) return;
    if (e.target.closest("[data-no-page-drag]")) return;
    if (isAnimating.current) return;

    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragX.current = 0;

    if (typeof gsap !== "undefined") {
      gsap.killTweensOf(pageRef.current);
      gsap.set(pageRef.current, { cursor: "grabbing" });
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || isAnimating.current) return;

    dragX.current = e.clientX - dragStartX.current;

    const movement = dragX.current * 0.72;

    if (xTo.current) xTo.current(movement);
    if (rotationTo.current) rotationTo.current(movement * 0.01);
    if (scaleTo.current) {
      scaleTo.current(
        1 - Math.min(Math.abs(movement) / 2500, 0.025)
      );
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current || isAnimating.current) return;

    isDragging.current = false;

    const threshold = window.innerWidth < 768 ? 70 : 100;

    if (pageRef.current && typeof gsap !== "undefined") {
      gsap.set(pageRef.current, { cursor: "grab" });
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

    if (pageRef.current && typeof gsap !== "undefined") {
      gsap.to(pageRef.current, {
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

    if (pageRef.current && typeof gsap !== "undefined") {
      gsap.to(pageRef.current, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.5)",
      });

      gsap.set(pageRef.current, { cursor: "grab" });
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
          className="min-h-full w-full cursor-grab will-change-transform"
        >
          <ActivePage direction={direction} />
        </div>
      </main>

      <Navbar
        active={activeTab}
        onSelect={handlePageChange}
      />
    </div>
  );
}

export default App;