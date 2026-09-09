import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPost = ({ blog, onBack }) => {
  return (
    <main className="w-full min-h-screen px-5 sm:px-10 pt-8 sm:pt-12 pb-32">
      <div className="max-w-4xl mx-auto">
        <button type="button" onClick={onBack} className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 mb-12">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to blog
        </button>

        <header className="mb-14">
          {blog.category && (
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#FF5252]">
              {blog.category}
            </p>
          )}

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05] text-gray-900">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-500 leading-relaxed">
              {blog.description}
            </p>
          )}

          {blog.date && (
            <p className="mt-6 text-sm text-gray-400">
              {new Date(blog.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </header>

        <div className="w-full h-px bg-gray-200 mb-12" />

        <article className="max-w-3xl prose prose-lg sm:prose-xl prose-gray">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mt-14 mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mt-12 mb-5">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-600 leading-[1.9] mb-7">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="text-gray-600 leading-[1.9] mb-7">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="text-gray-600 leading-[1.9] mb-7">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#FF5252] pl-5 my-8 text-gray-500 italic">
                  {children}
                </blockquote>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="px-1.5 py-0.5 rounded bg-gray-100 text-[#FF5252] text-[0.9em]">
                    {children}
                  </code>
                ) : (
                  <code>{children}</code>
                ),
              pre: ({ children }) => (
                <pre className="my-8 p-5 sm:p-6 rounded-2xl bg-[#1E1E1E] text-gray-100 overflow-x-auto text-sm sm:text-base leading-relaxed">
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-[#FF5252] font-medium hover:underline">
                  {children}
                </a>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
};

export default BlogPost;