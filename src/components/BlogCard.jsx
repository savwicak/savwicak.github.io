import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) return tags.filter(Boolean);

  if (typeof tags === "string") {
    return tags
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return [];
};

const BlogCard = ({ blog, onClick }) => {
  const cardRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const rotateTo = useRef(null);
  const scaleTo = useRef(null);
  const isPressed = useRef(false);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    xTo.current = gsap.quickTo(card, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    yTo.current = gsap.quickTo(card, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    rotateTo.current = gsap.quickTo(card, "rotation", {
      duration: 0.35,
      ease: "power3.out",
    });

    scaleTo.current = gsap.quickTo(card, "scale", {
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.set(card, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      transformOrigin: "center center",
      transformPerspective: 1000,
    });

    return () => {
      gsap.killTweensOf(card);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isPressed.current) return;

    xTo.current?.(5);
    scaleTo.current?.(1.012);
  };

  const handleMouseMove = (e) => {
    if (isPressed.current) return;

    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotationX =
      ((mouseY - centerY) / centerY) * -1.2;

    const rotationY =
      ((mouseX - centerX) / centerX) * 1.2;

    gsap.to(card, {
      rotationX,
      rotationY,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (isPressed.current) return;

    const card = cardRef.current;

    if (!card) return;

    xTo.current?.(0);
    scaleTo.current?.(1);

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  };

  const handlePointerDown = () => {
    const card = cardRef.current;

    if (!card) return;

    isPressed.current = true;

    gsap.killTweensOf(card);

    gsap.to(card, {
      scale: 0.965,
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handlePointerUp = () => {
    const card = cardRef.current;

    if (!card) return;

    gsap.killTweensOf(card);

    gsap.timeline({
      onComplete: () => {
        isPressed.current = false;
        onClick?.();
      },
    })
      .to(card, {
        scale: 1,
        duration: 0.16,
        ease: "back.out(2.5)",
      })
      .to(card, {
        scale: 1.012,
        duration: 0.22,
        ease: "power3.out",
      });
  };

  const handlePointerCancel = () => {
    const card = cardRef.current;

    if (!card) return;

    isPressed.current = false;

    gsap.killTweensOf(card);

    gsap.to(card, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
    });
  };

  const tags = normalizeTags(blog.tags);

return (
  <article ref={cardRef} data-blog-card onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel} className="group cursor-pointer rounded-2xl border border-neutral-300 py-7 px-6 transition-colors hover:bg-white" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
    <div className="flex items-center justify-between gap-6">
      <div className="min-w-0 flex-1">
        <span className="hidden text-xs mb-3 font-bold uppercase text-neutral-400 sm:block">
          {blog.date}
        </span>

        <h2 className="max-w-4xl text-2xl mb-2 font-black leading-tight tracking-tight transition group-hover:underline sm:text-3xl">
          {blog.title}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {blog.category && (
            <span className="rounded-full border border-[#171717] bg-[#ffef00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
              {blog.category}
            </span>
          )}

          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#171717] transition group-hover:-rotate-12 group-hover:bg-[#5f94ff]">
          <ArrowUpRight size={19} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  </article>
);
};

export default BlogCard;
