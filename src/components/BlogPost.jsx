import { useEffect, useMemo, useRef, useState } from "react";

import ReactMarkdown from "react-markdown";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

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

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const cleanHeading = (text) => {
  return String(text)
    .replace(/[\*\_\`\~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .trim();
};

const slugify = (text) => {
  return cleanHeading(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const getHeadings = (markdown) => {
  if (!markdown || typeof markdown !== "string") return [];

  const lines = markdown.split(/\r?\n/);
  const headings = [];
  const usedIds = {};

  lines.forEach((line) => {
    const match = line.match(/^\s{0,3}(#{2,3})\s+(.+?)\s*$/);

    if (!match) return;

    const level = match[1].length;
    const title = cleanHeading(match[2]);

    if (!title) return;

    let id = slugify(title);

    if (!id) return;

    if (usedIds[id]) {
      usedIds[id] += 1;
      id = `${id}-${usedIds[id]}`;
    } else {
      usedIds[id] = 1;
    }

    headings.push({
      id,
      title,
      level,
    });
  });

  return headings;
};

const BlogPost = ({ blog, onBack }) => {
  const tags = normalizeTags(blog.tags);

  const headings = useMemo(() => {
    return getHeadings(blog.content);
  }, [blog.content]);

  const [activeHeading, setActiveHeading] = useState(
    headings[0]?.id || ""
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!headings.length || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;

    const updateActiveHeading = () => {
      let currentHeading = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);

        if (!element) continue;

        const top =
          element.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top;

        if (top <= 150) {
          currentHeading = heading.id;
        }
      }

      setActiveHeading(currentHeading);
    };

    updateActiveHeading();

    scrollContainer.addEventListener("scroll", updateActiveHeading, {
      passive: true,
    });

    return () => {
      scrollContainer.removeEventListener("scroll", updateActiveHeading);
    };
  }, [headings]);

  const goToHeading = (id) => {
    const element = document.getElementById(id);
    const scrollContainer = scrollRef.current;

    if (!element || !scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const offset = window.innerWidth < 640 ? 80 : 110;

    const top =
      scrollContainer.scrollTop +
      (elementRect.top - containerRect.top) -
      offset;

    scrollContainer.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });

    setActiveHeading(id);
  };

  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-8 scroll-mt-24 text-[clamp(2rem,7vw,4rem)] font-black leading-[0.95] tracking-[-0.04em] sm:mt-10">
        {children}
      </h1>
    ),

    h2: ({ children }) => {
      const title = cleanHeading(children);
      const id = slugify(title);

      return (
        <h2
          id={id}
          className="mb-4 mt-10 scroll-mt-24 border-b-2 border-[#171717] pb-2 text-[clamp(1.5rem,5vw,2.25rem)] font-black leading-tight tracking-[-0.03em] sm:mb-5 sm:mt-12"
        >
          {children}
        </h2>
      );
    },

    h3: ({ children }) => {
      const title = cleanHeading(children);
      const id = slugify(title);

      return (
        <h3
          id={id}
          className="mb-3 mt-8 scroll-mt-24 text-[clamp(1.25rem,4vw,1.75rem)] font-black leading-tight sm:mb-4 sm:mt-9"
        >
          {children}
        </h3>
      );
    },

    p: ({ children }) => (
      <p className="mb-5 text-[15px] leading-7 text-neutral-700 sm:mb-6 sm:text-[16px] sm:leading-8">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-[15px] leading-7 sm:mb-7 sm:ml-6 sm:text-[16px]">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-[15px] leading-7 sm:mb-7 sm:ml-6 sm:text-[16px]">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="pl-1">
        {children}
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-7 border-l-4 border-[#171717] bg-[#ffef00] px-4 py-4 font-bold leading-7 sm:my-8 sm:border-l-[5px] sm:px-5">
        {children}
      </blockquote>
    ),

    strong: ({ children }) => (
      <strong className="font-black">
        {children}
      </strong>
    ),

    em: ({ children }) => <em>{children}</em>,

    code: ({ children }) => (
      <code className="wrap-break-word rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] font-bold sm:text-sm">
        {children}
      </code>
    ),

    pre: ({ children }) => (
      <pre className="my-7 max-w-full overflow-x-auto rounded-xl border-2 border-[#171717] bg-[#171717] p-4 text-[12px] leading-6 text-white shadow-[4px_4px_0_#ffef00] sm:my-8 sm:p-5 sm:text-sm sm:leading-7">
        {children}
      </pre>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="wrap-break-word font-black underline decoration-2 underline-offset-4"
      >
        {children}
      </a>
    ),

    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt || ""}
        className="my-7 h-auto max-w-full rounded-xl border-2 border-[#171717] sm:my-8"
      />
    ),

    hr: () => (
      <hr className="my-8 border-t-2 border-[#171717] sm:my-10" />
    ),
  };

  return (
    <main
      ref={scrollRef}
      data-blog-scroll
      className="h-dvh w-full overflow-y-auto overflow-x-hidden bg-[#f7f7f5] text-[#171717]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-28 sm:px-6 sm:py-8 sm:pb-16 lg:px-10 lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="group mb-7 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] sm:mb-10 sm:text-xs"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#171717] transition group-hover:-translate-x-1 group-hover:bg-[#ffef00] sm:h-9 sm:w-9">
            <ArrowLeft size={15} strokeWidth={2.5} />
          </span>

          Back to blog
        </button>

        <header className="relative overflow-hidden rounded-2xl border-[3px] border-[#171717] bg-white p-5 shadow-[5px_5px_0_#171717] sm:rounded-3xl sm:p-8 sm:shadow-[7px_7px_0_#171717] lg:p-14 lg:shadow-[8px_8px_0_#171717]">
          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-7 sm:gap-3">
              {blog.category && (
                <span className="rounded-full border-2 border-[#171717] bg-[#ffef00] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider sm:px-3 sm:py-1.5 sm:text-[10px]">
                  {blog.category}
                </span>
              )}

              <span className="text-[10px] font-bold text-neutral-400 sm:text-xs">
                {formatDate(blog.date)}
              </span>
            </div>

            <h1 className="max-w-5xl wrap-break-word text-[clamp(2.5rem,11vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              {blog.title}
            </h1>

            {blog.description && (
              <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-neutral-600 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg">
                {blog.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#171717] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white sm:px-3 sm:py-1.5 sm:text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {headings.length > 0 && (
          <div className="mt-7 lg:hidden sm:mt-10">
            <div className="rounded-2xl border-[3px] border-[#171717] bg-white p-4 shadow-[4px_4px_0_#171717] sm:p-5">
              <div className="mb-4 text-[9px] font-black uppercase tracking-[0.18em] sm:mb-5 sm:text-[10px]">
                ON THIS PAGE
              </div>

              <nav className="max-h-64 space-y-1 overflow-y-auto pr-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    type="button"
                    onClick={() => goToHeading(heading.id)}
                    className={`block w-full text-left ${
                      heading.level === 3 ? "pl-3 sm:pl-4" : ""
                    }`}
                  >
                    <span
                      className={`block border-l-2 py-2 pl-3 text-[11px] font-bold leading-5 transition sm:text-xs ${
                        activeHeading === heading.id
                          ? "border-[#171717] text-[#171717]"
                          : "border-neutral-200 text-neutral-400"
                      }`}
                    >
                      {heading.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <article className="min-w-0 overflow-hidden rounded-[18px] border-[3px] border-[#171717] bg-white p-5 shadow-[5px_5px_0_#5f94ff] sm:rounded-[22px] sm:p-8 sm:shadow-[7px_7px_0_#5f94ff] lg:p-12">
            <div className="prose prose-neutral max-w-none">
              <ReactMarkdown components={markdownComponents}>
                {blog.content}
              </ReactMarkdown>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <div className="rounded-2xl border-[3px] border-[#171717] bg-white p-5 shadow-[5px_5px_0_#171717]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                    ON THIS PAGE
                  </span>

                  <span className="text-[10px] font-black text-neutral-400">
                    {String(headings.length).padStart(2, "0")}
                  </span>
                </div>

                {headings.length === 0 ? (
                  <div>
                    <p className="text-xs font-bold text-red-500">
                      No headings found.
                    </p>

                    <p className="mt-2 text-[10px] leading-4 text-neutral-400">
                      Gunakan ## Heading atau ### Heading di file Markdown.
                    </p>
                  </div>
                ) : (
                  <nav className="space-y-1">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        type="button"
                        onClick={() => goToHeading(heading.id)}
                        className={`block w-full text-left ${
                          heading.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        <span
                          className={`block border-l-2 py-2 pl-3 text-xs font-bold leading-5 transition ${
                            activeHeading === heading.id
                              ? "border-[#171717] text-[#171717]"
                              : "border-neutral-200 text-neutral-400 hover:border-[#171717] hover:text-[#171717]"
                          }`}
                        >
                          {heading.title}
                        </span>
                      </button>
                    ))}
                  </nav>
                )}
              </div>

              <button
                type="button"
                onClick={onBack}
                className="group mt-5 flex w-full items-center justify-between rounded-2xl border-[3px] border-[#171717] bg-white p-4 font-black transition hover:bg-[#5f94ff]"
              >
                <span className="text-xs uppercase tracking-wider">
                  Back to blog
                </span>

                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition group-hover:rotate-12"
                />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogPost;