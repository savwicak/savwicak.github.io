import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X, ArrowUpRight } from "lucide-react";

import BlogPost from "../components/BlogPost";

const blogFiles = import.meta.glob("../data/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const parseFrontmatter = (content) => {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);

  if (!match) {
    return {
      metadata: {},
      content,
    };
  }

  const frontmatter = match[1];
  const markdown = content.replace(match[0], "").trim();
  const metadata = {};
  const lines = frontmatter.split("\n");
  let currentKey = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) return;

    if (trimmed.startsWith("- ") && currentKey) {
      if (!Array.isArray(metadata[currentKey])) {
        metadata[currentKey] = [];
      }

      metadata[currentKey].push(
        trimmed.slice(2).trim().replace(/^["']|["']$/g, "")
      );

      return;
    }

    const index = line.indexOf(":");

    if (index === -1) return;

    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();

    currentKey = key;

    if (!value) {
      metadata[key] = [];
      return;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }

    metadata[key] = value;
  });

  return {
    metadata,
    content: markdown,
  };
};

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.filter(Boolean);
  }

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

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getExcerpt = (content, maxLength = 150) => {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`~-]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
};

const blogs = Object.entries(blogFiles).map(([path, content]) => {
  const { metadata, content: markdown } = parseFrontmatter(content);

  const fileName = path
    .split("/")
    .pop()
    .replace(".md", "");

  return {
    id: fileName,
    title: metadata.title || fileName,
    description: metadata.description || getExcerpt(markdown),
    date: metadata.date || "",
    category: metadata.category || "Uncategorized",
    tags: normalizeTags(metadata.tags),
    content: markdown,
  };
});

const Blog = ({ direction }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const sidebarRef = useRef(null);
  const postsHeaderRef = useRef(null);
  const postRefs = useRef([]);
  const footerRef = useRef(null);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        blogs.map((blog) => blog.category).filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, []);

  const categoryCounts = useMemo(() => {
    return blogs.reduce((acc, blog) => {
      const category = blog.category || "Uncategorized";

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return blogs
      .filter((blog) => {
        const matchesCategory =
          activeCategory === "All" ||
          blog.category === activeCategory;

        const searchableText = [
          blog.title,
          blog.description,
          blog.category,
          ...blog.tags,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query || searchableText.includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime() || 0;
        const dateB = new Date(b.date).getTime() || 0;

        return dateB - dateA;
      });
  }, [search, activeCategory]);

  useEffect(() => {
    const dir = direction === 1 ? 1 : -1;

    const sidebar = sidebarRef.current;
    const postsHeader = postsHeaderRef.current;
    const cards = postRefs.current.filter(Boolean);
    const footer = footerRef.current;

    const elements = [
      sidebar,
      postsHeader,
      ...cards,
      footer,
    ].filter(Boolean);

    if (!elements.length) return;

    gsap.killTweensOf(elements);

    gsap.set(elements, {
      x: `${dir * 100}vw`,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.to(elements, {
      x: "0vw",
      duration: 1,
      stagger: 0.12,
    });

    return () => {
      tl.kill();
    };
  }, [direction, filteredBlogs]);

  if (selectedBlog) {
    return (
      <BlogPost
        blog={selectedBlog}
        onBack={() => setSelectedBlog(null)}
      />
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-[#f7f7f5] text-[#171717]">
      <div className="mx-auto flex h-full w-full max-w-8xl flex-col px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid min-h-0 flex-1 gap-10 overflow-hidden lg:grid-cols-[250px_1fr]">

          {/* SIDEBAR */}
          <aside
            ref={sidebarRef}
            className="lg:sticky lg:top-8 lg:self-start"
          >
            <div className="mb-8">

              <div className="relative">
                <Search
                  size={17}
                  strokeWidth={2.5}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts..."
                  className="h-12 w-full rounded-xl border-2 border-[#171717] bg-white pl-10 pr-10 text-sm font-semibold outline-none transition placeholder:text-neutral-400 focus:shadow-[4px_4px_0_#171717]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X size={17} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>

            {/* CATEGORY */}
            <div className="mb-8">
              {categoryOpen && (
                <div className="space-y-1">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;

                    const count =
                      category === "All"
                        ? blogs.length
                        : categoryCounts[category] || 0;

                    return (
                      <button
                        type="button"
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-bold transition ${
                          isActive
                            ? "bg-[#171717] text-white"
                            : "hover:bg-white"
                        }`}
                      >
                        <span>{category}</span>

                        <span
                          className={`text-xs ${
                            isActive
                              ? "text-white/60"
                              : "text-neutral-400"
                          }`}
                        >
                          {count.toString().padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="hidden border-t-2 border-[#171717] pt-5 lg:block">
              <p className="text-xs font-semibold leading-5 text-neutral-500">
                I write about things I build, technologies I explore,
                and lessons I probably learned the hard way.
              </p>
            </div>
          </aside>

          {/* POSTS */}
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {/* SCROLL AREA */}
            <div className="min-h-0 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300">
              {filteredBlogs.length > 0 ? (
                <div className="pb-20">
                  {filteredBlogs.map((blog, index) => (
                    <article
                      key={blog.id}
                      ref={(el) => {
                        postRefs.current[index] = el;
                      }}
                      onClick={() => setSelectedBlog(blog)}
                      className="group cursor-pointer border-b border-neutral-300 py-7 transition hover:bg-white hover:px-5"
                    >
                      <div className="grid gap-4 md:grid-cols-[90px_1fr_auto] md:items-start">

                        {/* INDEX */}
                        <div className="text-xs font-black text-neutral-400">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* MAIN */}
                        <div>
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-[#171717] bg-[#ffef00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                              {blog.category}
                            </span>

                            {blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-bold uppercase tracking-wider text-neutral-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <h2 className="mb-2 max-w-3xl text-2xl font-black leading-tight tracking-tight transition group-hover:underline sm:text-3xl">
                            {blog.title}
                          </h2>

                          <p className="max-w-2xl text-sm leading-6 text-neutral-500">
                            {blog.description}
                          </p>
                        </div>

                        {/* DATE / ARROW */}
                        <div className="flex items-center justify-between gap-5 md:flex-col md:items-end">
                          <span className="text-xs font-bold uppercase text-neutral-400">
                            {formatDate(blog.date)}
                          </span>

                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#171717] transition group-hover:-rotate-12 group-hover:bg-[#5f94ff]">
                            <ArrowUpRight
                              size={19}
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[350px] items-center justify-center border-2 border-dashed border-neutral-300">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-black">
                      :(
                    </div>

                    <p className="text-sm font-bold">
                      No posts found.
                    </p>

                    {(search || activeCategory !== "All") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setActiveCategory("All");
                        }}
                        className="mt-4 text-xs font-black uppercase underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer
          ref={footerRef}
          className="mt-8 flex shrink-0 flex-col justify-between gap-3 border-t-[3px] border-[#171717] pt-5 text-[10px] font-black uppercase tracking-[0.18em] sm:flex-row"
        >
          <span>/ END OF BLOG</span>
          <span>MORE THINGS COMING SOON.</span>
        </footer>
      </div>
    </main>
  );
};

export default Blog;