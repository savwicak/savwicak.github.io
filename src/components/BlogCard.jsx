import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const BlogCard = ({ blog, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      rotate: -1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      rotate: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap
      .timeline({
        onComplete: onClick,
      })
      .to(cardRef.current, {
        scale: 0.96,
        duration: 0.1,
      })
      .to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
  };

  const tags = Array.isArray(blog.tags)
    ? blog.tags
    : typeof blog.tags === "string"
      ? blog.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-[26px] border-2 border-black bg-white p-6 shadow-[6px_6px_0_#171717] transition-shadow duration-300 hover:shadow-[9px_9px_0_#5f94ff]"
    >
      <div className="flex items-start justify-between gap-5">

        <div className="min-w-0">

          <div className="mb-4 flex flex-wrap gap-2">
            {blog.category && (
              <span className="rounded-full border-2 border-black bg-[#ffef00] px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em]">
                {blog.category}
              </span>
            )}

            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/20 px-3 py-1 text-[9px] font-black uppercase text-black/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-black leading-none tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
            {blog.title}
            <span className="text-[#5f94ff]">.</span>
          </h2>

          {blog.description && (
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-[1.4] text-black/50">
              {blog.description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#5f94ff] transition-all duration-300 group-hover:rotate-12 group-hover:bg-[#ffef00]">
          <ArrowUpRight
            size={19}
            strokeWidth={3}
          />
        </div>
      </div>

      {blog.date && (
        <div className="mt-6 flex items-center justify-between border-t-2 border-black/10 pt-4">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/30">
            {new Date(blog.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/30 transition-colors group-hover:text-black">
            Read article →
          </span>
        </div>
      )}
    </article>
  );
};

export default BlogCard;