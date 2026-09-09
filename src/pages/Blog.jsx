import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import BlogCard from "../components/BlogCard";
import BlogPost from "../components/BlogPost";

const blogFiles = import.meta.glob("../data/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const parseFrontmatter = (content) => {
  const match = content.match(/^---\s*([\s\S]*?)\s*---/);

  if (!match) return { metadata: {}, content };

  const frontmatter = match[1];
  const markdown = content.replace(match[0], "").trim();
  const metadata = {};
  const lines = frontmatter.split("\n");
  let currentKey = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("- ") && currentKey) {
      if (!Array.isArray(metadata[currentKey])) metadata[currentKey] = [];
      metadata[currentKey].push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ""));
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

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((item) => item.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    }

    metadata[key] = value;
  });

  return { metadata, content: markdown };
};

const blogs = Object.entries(blogFiles).map(([path, rawContent]) => {
  const { metadata, content } = parseFrontmatter(rawContent);

  return {
    id: path.split("/").pop().replace(".md", ""),
    ...metadata,
    content,
  };
});

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return blogs.filter((blog) => {
      const matchesCategory = activeCategory === "All" || blog.category === activeCategory;

      const searchableText = [
        blog.title,
        blog.description,
        blog.category,
        ...(Array.isArray(blog.tags) ? blog.tags : []),
        blog.content,
      ].filter(Boolean).join(" ").toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [search, activeCategory]);

  if (selectedBlog) {
    return <BlogPost blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-5 sm:px-10 py-10 pb-32">
      <div className="flex mb-8 justify-between">
         <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari artikel..." className="w-full h-14 pl-12 pr-12 rounded-2xl border border-gray-200 bg-white outline-none focus:border-gray-400 transition-colors" />

          {search && (
            <button type="button" onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`shrink-0 px-5 py-2.5 rounded-full font-medium transition-all ${activeCategory === category ? "bg-[#FF5252] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {category}
            </button>
          ))}
        </div>
      </div>


      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onClick={() => setSelectedBlog(blog)} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl font-bold text-gray-400">Artikel nggak ditemukan.</p>
          <p className="mt-2 text-gray-400">Coba kata kunci atau kategori lain.</p>
        </div>
      )}
    </main>
  );
};

export default Blog;