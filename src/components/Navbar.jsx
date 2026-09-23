import { useEffect, useRef, useState } from "react";
import { Home, Star, List, Camera, User } from "lucide-react";

const items = [
  { name: "Home", Icon: Home },
  { name: "Favorite", Icon: Star },
  { name: "List", Icon: List },
  { name: "Camera", Icon: Camera },
  { name: "Profile", Icon: User },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};

const Navbar = ({ active, onSelect }) => {
  const isMobile = useIsMobile();

  const itemRefs = useRef([]);
  const navRef = useRef(null);
  const activeRef = useRef(active);
  const hideTimeoutRef = useRef(null);
  const isMouseOverNav = useRef(false);
  const isMobileRef = useRef(isMobile);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const showNavbar = () => {
    const nav = navRef.current;

    if (!nav || isMobileRef.current) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    gsap.killTweensOf(nav);

    gsap
      .timeline()
      .to(nav, {
        y: 8,
        scaleX: 1.04,
        scaleY: 1.04,
        duration: 0.2,
        ease: "back.out(3)",
      })
      .to(nav, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
  };

  const hideNavbar = () => {
    const nav = navRef.current;

    if (!nav || isMobileRef.current || isMouseOverNav.current) {
      return;
    }

    gsap.killTweensOf(nav);

    gsap
      .timeline()
      .to(nav, {
        scaleX: 0.96,
        scaleY: 0.96,
        duration: 0.08,
        ease: "power2.in",
      })
      .to(nav, {
        y: "-150%",
        scaleX: 0.75,
        scaleY: 0.75,
        duration: 0.35,
        ease: "back.in(2.5)",
      });
  };

  const startHideTimer = () => {
    if (isMobileRef.current) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      hideTimeoutRef.current = null;

      if (!isMouseOverNav.current) {
        hideNavbar();
      }
    }, 700);
  };

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    gsap.killTweensOf(nav);

    if (isMobile) {
      gsap.set(nav, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
      });

      return;
    }

    gsap.set(nav, {
      y: "-145%",
      scaleX: 0.75,
      scaleY: 0.75,
    });

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      showNavbar();

      if (!isMouseOverNav.current) {
        startHideTimer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      gsap.killTweensOf(nav);
    };
  }, [isMobile]);

  const handleNavMouseEnter = () => {
    isMouseOverNav.current = true;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleNavMouseLeave = () => {
    isMouseOverNav.current = false;
    startHideTimer();
  };

  const getEl = (index) => itemRefs.current[index];

  const handleMouseEnter = (index) => {
    if (isMobileRef.current || index === activeRef.current) return;

    const el = getEl(index);

    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      y: -12,
      rotation: 5,
      duration: 0.35,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = (index) => {
    if (isMobileRef.current || index === activeRef.current) return;

    const el = getEl(index);

    if (!el) return;

    gsap.killTweensOf(el);

    gsap.to(el, {
      y: 0,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const bounce = (el) => {
    gsap.killTweensOf(el);

    gsap
      .timeline()
      .to(el, {
        scale: 1.18,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(el, {
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      });
  };

  const handleClick = (index) => {
    const el = getEl(index);

    if (!el) return;

    if (index === activeRef.current) {
      bounce(el);
      return;
    }

    const prevEl = getEl(activeRef.current);

    if (prevEl) {
      gsap.killTweensOf(prevEl);

      gsap.to(prevEl, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    onSelect?.(index);
    bounce(el);
  };

  useEffect(() => {
    return () => {
      itemRefs.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
        }
      });
    };
  }, []);

  return (
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-1 pb-[max(8px,env(safe-area-inset-bottom))] sm:px-2 sm:pb-[max(12px,env(safe-area-inset-bottom))] md:bottom-auto md:top-6 md:pb-0"
        style={{
          "--mobile-nav-space": "92px",
        }}
      >      
      <nav
        ref={navRef}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
        className="pointer-events-auto flex h-[clamp(58px,16vw,64px)] w-[calc(100vw-12px)] max-w-107.5 items-center justify-between gap-[clamp(2px,1.5vw,6px)] rounded-full border-[3px] border-[#171717] bg-[#f7f7f5] px-[clamp(5px,2vw,10px)] shadow-[4px_4px_0_#171717] md:h-21.5 md:w-[min(92vw,575px)] md:max-w-none md:justify-center md:gap-5 md:px-5 md:shadow-[5px_6px_0_#171717]"
      >
        {items.map((item, index) => {
          const isActive = active === index;
          const { Icon } = item;

          return (
            <button
              key={item.name}
              ref={(el) => (itemRefs.current[index] = el)}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
              className={`nav-item relative flex h-[clamp(42px,12vw,46px)] w-[clamp(42px,12vw,46px)] shrink-0 items-center justify-center rounded-full border-2 border-[#171717] p-0 outline-none transition-colors duration-200 md:h-17.5 md:w-17.5 md:border-[3px] ${
                isActive
                  ? "bg-[#fff21c] shadow-[3px_4px_0_#171717]"
                  : "bg-white md:hover:bg-[#5f94ff]"
              }`}
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-[0.72] bg-[#ff4545] opacity-20"
                    : "scale-0 bg-transparent opacity-0"
                }`}
              />

              <Icon
                className="pointer-events-none relative z-10 h-[clamp(19px,5.5vw,21px)] w-[clamp(19px,5.5vw,21px)] select-none text-[#171717] md:h-8.5 md:w-8.5"
                strokeWidth={2.5}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;