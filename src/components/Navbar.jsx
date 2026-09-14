import { useEffect, useRef } from "react";
import { Home, Star, List, Camera, User } from "lucide-react";

const Navbar = ({ active, onSelect }) => {
  const itemRefs = useRef([]);
  const navRef = useRef(null);
  const activeRef = useRef(active);
  const hideTimeoutRef = useRef(null);
  const isMouseOverNav = useRef(false);

  const items = [
    { name: "Home", Icon: Home },
    { name: "Favorite", Icon: Star },
    { name: "List", Icon: List },
    { name: "Camera", Icon: Camera },
    { name: "Profile", Icon: User },
  ];

  useEffect(() => {
      activeRef.current = active;
    }, [active]);

    const showNavbar = () => {
    const nav = navRef.current;

    if (!nav) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    gsap.killTweensOf(nav);

    gsap.timeline()
      .to(nav, {
        y: 8,
        scaleX: 1.12,
        scaleY: 1.12,
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

  const startHideTimer = () => {
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

  const hideNavbar = () => {
    const nav = navRef.current;

    if (!nav || isMouseOverNav.current) return;

    gsap.killTweensOf(nav);

    gsap.timeline()
      .to(nav, {
        scaleX: 0.96,
        scaleY: 0.96,
        duration: 0.08,
        ease: "power2.in",
      })
      .to(nav, {
        y: "-125%",
        scaleX: 0.75,
        scaleY: 0.75,
        duration: 0.35,
        ease: "back.in(2.5)",
      });
  };

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    gsap.set(nav, {
      y: "-125%",
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
      }

      gsap.killTweensOf(nav);
    };
  }, []);

  const handleNavMouseEnter = () => {
    isMouseOverNav.current = true;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // JANGAN showNavbar() DI SINI
  };

  const handleNavMouseLeave = () => {
  isMouseOverNav.current = false;

    startHideTimer();
  };

  const getEl = (index) => {
    return itemRefs.current[index];
  };

  const handleMouseEnter = (index) => {
    if (index === activeRef.current) return;

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
    if (index === activeRef.current) return;

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

  const handleClick = (index) => {
    const el = getEl(index);

    if (!el) return;

    if (index === activeRef.current) {
      gsap.killTweensOf(el);

      gsap.timeline()
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

    gsap.killTweensOf(el);

    gsap.timeline()
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
    <nav
      ref={navRef}
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      className="fixed left-1/2 top-4 z-50 flex h-[64px] w-[94vw] max-w-[575px] -translate-x-1/2 items-center justify-between gap-1 rounded-full bg-[#505050] px-2 sm:top-6 sm:h-[86px] sm:w-[min(92vw,575px)] sm:justify-center sm:gap-5 sm:px-5"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
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
            className="nav-item relative flex h-[46px] w-[46px] shrink-0 cursor-pointer items-center justify-center rounded-full border-[2px] border-[#C7C7C7] bg-[#575757] p-0 outline-none sm:h-[70px] sm:w-[70px] sm:border-[3px]"
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "scale-[0.82] bg-[#FF5252] opacity-[0.12]"
                  : "scale-100 bg-transparent opacity-0"
              }`}
            />

            <Icon
              className={`pointer-events-none relative z-10 h-[20px] w-[20px] select-none transition-colors duration-300 sm:h-[34px] sm:w-[34px] ${
                isActive ? "text-[#FF5252]" : "text-[#fdfafa]"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;