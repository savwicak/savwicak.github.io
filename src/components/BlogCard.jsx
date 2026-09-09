import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const BlogCard = ({ blog, onClick }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -5, duration: 0.25, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };

  const handleClick = () => {
    gsap.timeline({ onComplete: onClick })
      .to(cardRef.current, { scale: 0.97, duration: 0.1 })
      .to(cardRef.current, { scale: 1, duration: 0.2, ease: "back.out(2)" });
  };

  return (
    <article ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} className="group cursor-pointer rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          {blog.category && (
            <span className="inline-block mb-3 text-sm font-semibold text-[#FF5252]">
              {blog.category}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 group-hover:text-[#FF5252] transition-colors duration-300">
            {blog.title}
          </h2>

          {blog.description && (
            <p className="mt-3 text-gray-500 leading-relaxed line-clamp-2">
              {blog.description}
            </p>
          )}
        </div>

        <div className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#FF5252] group-hover:border-[#FF5252] group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>

      {blog.date && (
        <p className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-400">
          {new Date(blog.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </article>
  );
};

export default BlogCard;