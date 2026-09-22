import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

import BlogCard from "../components/BlogCard";
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
  const fileName = path.split("/").pop().replace(".md", "");

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

const Blog = ({ direction = 1 }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const pageRef = useRef(null);
  const postsRef = useRef(null);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
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
          ...normalizeTags(blog.tags),
        ]
          .filter(Boolean)
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

  const isFirstRender = useRef(true);

useLayoutEffect(() => {
  const page = pageRef.current;
  if (!page) return;

  const dir = direction >= 0 ? 1 : -1;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      page,
      {
        x: dir * 100,
        opacity: 0,
        rotation: dir,
        scale: 0.98,
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, pageRef);

  return () => ctx.revert();
}, [direction]);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }

  const container = postsRef.current;
  if (!container) return;

  const cards = container.querySelectorAll("[data-blog-card]");
  if (!cards.length) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      cards,
      { y: 100},
      {
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );
  }, container);

  return () => ctx.revert();
}, [search, activeCategory]);

  if (selectedBlog) {
    return (
      <BlogPost
        blog={selectedBlog}
        onBack={() => setSelectedBlog(null)}
      />
    );
  }

  return (
    <main
      ref={pageRef}
      className="h-dvh overflow-hidden bg-[#f7f7f5] text-[#171717]"
    >
      <div className="mx-auto flex h-full w-full max-w-8xl flex-col px-4 pt-5 pb-24 sm:px-6 sm:pt-8 sm:pb-24 lg:px-10 lg:py-14">
        {/* MOBILE HEADER */}
        <div className="mb-4 shrink-0 lg:hidden">
          {/* MOBILE SEARCH */}
          <div className="relative">
            <Search
              size={17}
              strokeWidth={2.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="h-12 w-full rounded-xl border-2 border-black bg-white pl-10 pr-11 text-sm font-semibold outline-none transition placeholder:text-neutral-400 focus:shadow-[4px_4px_0_#171717]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-black bg-[#fff21c]"
              >
                <X size={15} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* MOBILE CATEGORY */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setCategoryOpen((prev) => !prev)}
              className="mb-2 flex w-full items-center justify-between"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                Categories
              </span>

              <ChevronDown
                size={15}
                strokeWidth={3}
                className={`transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                categoryOpen
                  ? "max-h-16 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  const count = category === "All" ? blogs.length : categoryCounts[category] || 0;

                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`flex shrink-0 items-center gap-2 rounded-full border-2 border-black px-3 py-2 text-[9px] font-black uppercase transition-all duration-200 ${
                        isActive ? "bg-[#171717] text-white shadow-[2px_2px_0px_#5f94ff]" : "bg-white active:translate-y-0.5"
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`text-[8px] ${isActive ? "text-white/60" : "text-neutral-400"}`}>
                        {count.toString().padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP / MOBILE CONTENT */}
        <div className="grid min-h-0 flex-1 gap-8 overflow-hidden lg:grid-cols-[250px_1fr]">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:self-start">
            <div className="mb-4">
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

            <div>
              <button
                type="button"
                onClick={() => setCategoryOpen((prev) => !prev)}
                className="mb-3 flex w-full items-center justify-between text-xs font-black uppercase tracking-widest"
              >
                <span>Categories</span>

                <span
                  className={`transition-transform duration-300 ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={16} strokeWidth={3} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  categoryOpen
                    ? "max-h-125 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
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
              </div>
            </div>
          </aside>

          {/* POSTS */}
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div
              ref={postsRef}
              data-page-scroll
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 sm:pr-2"
            >
              {filteredBlogs.length > 0 ? (
                <div className="flex flex-col gap-3 pb-8 sm:gap-4 sm:pb-20">
                  {filteredBlogs.map((blog, index) => (
                    <BlogCard
                      key={blog.id}
                      blog={{
                        ...blog,
                        index: index + 1,
                        date: formatDate(blog.date),
                      }}
                      onClick={() => setSelectedBlog(blog)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-75 items-center justify-center border-2 border-dashed border-neutral-300">
                  <div className="px-6 text-center">
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
      </div>
    </main>
  );
};

export default Blog;