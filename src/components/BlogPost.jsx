import { useEffect, useMemo, useState } from "react";
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

const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[*_`~[\]]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/*
|--------------------------------------------------------------------------
| GET HEADINGS
|--------------------------------------------------------------------------
| Support:
|
| # Heading
| ## Heading
| ### Heading
|
| Bahkan kalau ada spasi di depannya.
*/
const getHeadings = (markdown) => {
  if (!markdown || typeof markdown !== "string") {
    return [];
  }

  const lines = markdown.split(/\r?\n/);
  const headings = [];
  const usedIds = {};

  lines.forEach((line) => {
    const match = line.match(
      /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/
    );

    if (!match) return;

    const level = match[1].length;

    // Hanya tampilkan H2 dan H3 di TOC
    if (level < 2 || level > 3) return;

    let title = match[2].trim();

    // Bersihkan markdown formatting
    title = title
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim();

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

  /*
  |--------------------------------------------------------------------------
  | SCROLL DETECTION
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!headings.length) return;

    const updateActiveHeading = () => {
      let currentHeading = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(
          heading.id
        );

        if (!element) continue;

        const top =
          element.getBoundingClientRect().top;

        if (top <= 150) {
          currentHeading = heading.id;
        }
      }

      setActiveHeading(currentHeading);
    };

    updateActiveHeading();

    window.addEventListener(
      "scroll",
      updateActiveHeading,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveHeading
      );
    };
  }, [headings]);

  /*
  |--------------------------------------------------------------------------
  | CLICK TO HEADING
  |--------------------------------------------------------------------------
  */
  const goToHeading = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      console.log(
        `Heading dengan id "${id}" tidak ditemukan`
      );
      return;
    }

    const offset = 110;

    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveHeading(id);
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

        {/* BACK */}
        <button
          onClick={onBack}
          className="group mb-10 flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#171717] transition group-hover:-translate-x-1 group-hover:bg-[#ffef00]">
            <ArrowLeft
              size={16}
              strokeWidth={2.5}
            />
          </span>

          Back to blog
        </button>

        {/* HERO */}
        <header className="relative overflow-hidden rounded-[24px] border-[3px] border-[#171717] bg-white p-6 shadow-[8px_8px_0_#171717] sm:p-10 lg:p-14">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[3px] border-[#171717] bg-[#5f94ff]" />

          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border-[3px] border-[#171717] bg-[#ff4545]" />

          <div className="relative z-10">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border-2 border-[#171717] bg-[#ffef00] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
                {blog.category}
              </span>

              <span className="text-xs font-bold text-neutral-400">
                {formatDate(blog.date)}
              </span>
            </div>

            <h1 className="max-w-5xl text-[clamp(2.8rem,8vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
              {blog.title}
            </h1>

            {blog.description && (
              <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-neutral-600 sm:text-lg">
                {blog.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#171717] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* ARTICLE + TOC */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_240px]">

          {/* ARTICLE */}
          <article className="min-w-0 rounded-[22px] border-[3px] border-[#171717] bg-white p-6 shadow-[7px_7px_0_#5f94ff] sm:p-10 lg:p-12">
            <div className="prose prose-neutral max-w-none">

              <ReactMarkdown
                components={{
                  h1: ({ children }) => {
                    const title = String(children)
                      .replace(/[*_`~]/g, "")
                      .trim();

                    return (
                      <h1 className="mb-6 mt-10 scroll-mt-28 text-4xl font-black leading-tight">
                        {children}
                      </h1>
                    );
                  },

                  h2: ({ children }) => {
                    const title = String(children)
                      .replace(/[*_`~]/g, "")
                      .trim();

                    const id = slugify(title);

                    return (
                      <h2
                        id={id}
                        className="mb-5 mt-12 scroll-mt-28 border-b-2 border-[#171717] pb-2 text-3xl font-black leading-tight"
                      >
                        {children}
                      </h2>
                    );
                  },

                  h3: ({ children }) => {
                    const title = String(children)
                      .replace(/[*_`~]/g, "")
                      .trim();

                    const id = slugify(title);

                    return (
                      <h3
                        id={id}
                        className="mb-4 mt-8 scroll-mt-28 text-2xl font-black"
                      >
                        {children}
                      </h3>
                    );
                  },

                  p: ({ children }) => (
                    <p className="mb-6 text-[15px] leading-8 text-neutral-700">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-7 ml-6 list-disc space-y-2 text-[15px] leading-7">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-7 ml-6 list-decimal space-y-2 text-[15px] leading-7">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="pl-1">
                      {children}
                    </li>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-8 border-l-[5px] border-[#171717] bg-[#ffef00] px-5 py-4 font-bold not-italic">
                      {children}
                    </blockquote>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-black">
                      {children}
                    </strong>
                  ),

                  em: ({ children }) => (
                    <em>{children}</em>
                  ),

                  code: ({ children }) => (
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm font-bold">
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre className="my-8 overflow-x-auto rounded-xl border-2 border-[#171717] bg-[#171717] p-5 text-sm leading-7 text-white shadow-[5px_5px_0_#ffef00]">
                      {children}
                    </pre>
                  ),

                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-black underline decoration-2 underline-offset-4"
                    >
                      {children}
                    </a>
                  ),

                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="my-8 w-full rounded-xl border-2 border-[#171717]"
                    />
                  ),

                  hr: () => (
                    <hr className="my-10 border-t-2 border-[#171717]" />
                  ),
                }}
              >
                {blog.content}
              </ReactMarkdown>

            </div>
          </article>

          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">

              <div className="rounded-2xl border-[3px] border-[#171717] bg-white p-5 shadow-[5px_5px_0_#171717]">

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                    / ON THIS PAGE
                  </span>

                  <span className="text-[10px] font-black text-neutral-400">
                    {headings.length
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>

                {headings.length === 0 ? (
                  <div>
                    <p className="text-xs font-bold text-red-500">
                      No headings found.
                    </p>

                    <p className="mt-2 text-[10px] leading-4 text-neutral-400">
                      Gunakan ## Heading atau ### Heading
                      di file Markdown.
                    </p>
                  </div>
                ) : (
                  <nav className="space-y-1">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        type="button"
                        onClick={() =>
                          goToHeading(heading.id)
                        }
                        className={`block w-full text-left ${
                          heading.level === 3
                            ? "pl-4"
                            : ""
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

        {/* MOBILE TOC */}
        {headings.length > 0 && (
          <div className="mt-10 lg:hidden">
            <div className="rounded-2xl border-[3px] border-[#171717] bg-white p-5 shadow-[5px_5px_0_#171717]">

              <div className="mb-5 text-[10px] font-black uppercase tracking-[0.18em]">
                / ON THIS PAGE
              </div>

              <nav className="space-y-1">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    type="button"
                    onClick={() =>
                      goToHeading(heading.id)
                    }
                    className={`block w-full text-left ${
                      heading.level === 3
                        ? "pl-4"
                        : ""
                    }`}
                  >
                    <span
                      className={`block border-l-2 py-2 pl-3 text-xs font-bold ${
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

        {/* FOOTER */}
        <footer className="mt-14 border-t-[3px] border-[#171717] pt-5 text-[10px] font-black uppercase tracking-[0.18em]">
          / END OF ARTICLE
        </footer>
      </div>
    </main>
  );
};

export default BlogPost;