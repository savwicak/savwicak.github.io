import { useEffect, useRef } from "react";
import { Home, Star, List, Camera, User } from "lucide-react";

const Navbar = ({ active, onSelect }) => {
  const itemRefs = useRef([]);
  const activeRef = useRef(active);

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

  useEffect(() => {
    return () => {
      itemRefs.current.forEach((el) => el && gsap.killTweensOf(el));
    };
  }, []);

  const getEl = (index) => itemRefs.current[index];

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

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-50 bottom-4 sm:bottom-6 w-[94vw] sm:w-[min(92vw,575px)] max-w-[575px] h-[64px] sm:h-[86px] rounded-full bg-[#505050] flex items-center justify-between sm:justify-center gap-1 sm:gap-5 px-2 sm:px-5"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
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
            className="nav-item relative flex items-center justify-center shrink-0 w-[46px] h-[46px] sm:w-[70px] sm:h-[70px] rounded-full border-[2px] sm:border-[3px] border-[#C7C7C7] bg-[#575757] cursor-pointer p-0 outline-none"
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive ? "bg-[#FF5252] opacity-[0.12] scale-[0.82]" : "bg-transparent opacity-0"}`}
            />

            <Icon
              className={`relative z-10 w-[20px] h-[20px] sm:w-[34px] sm:h-[34px] select-none pointer-events-none transition-colors duration-300 ${isActive ? "text-[#FF5252]" : "text-[#fdfafa]"}`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;