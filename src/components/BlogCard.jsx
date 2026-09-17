import { useRef } from "react";
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
  const tags = normalizeTags(blog.tags);
  return (
    <article
      ref={cardRef}
      data-blog-card
      className="group cursor-pointer rounded-2xl border-2 border-[#171717] px-6 py-7 transition-colors hover:bg-white"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <span className="mb-1 hidden text-xs font-bold uppercase text-neutral-400 sm:block">
            {blog.date}
          </span>

          <h2 className="mb-3 max-w-4xl text-2xl font-black leading-tight tracking-tight transition group-hover:underline sm:text-3xl">
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

        <div className="flex shrink-0 items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#171717] transition-all duration-200 group-hover:-rotate-12 group-hover:bg-[#5f94ff]">
            <ArrowUpRight size={19} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
