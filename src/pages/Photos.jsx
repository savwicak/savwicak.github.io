import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { photos, photoCategories } from "../data/PhotosData";

function Photos() {
  const [category, setCategory] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const filtered =
    category === "ALL"
      ? photos
      : photos.filter((photo) => photo.category === category);

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-5 py-8 text-[#171717] sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="border-b-[3px] border-[#171717] pb-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-black tracking-[0.2em]">
              / VISUAL ARCHIVE
            </span>

            <span className="text-xs font-black">
              {String(filtered.length).padStart(2, "0")} PHOTOS
            </span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="text-[clamp(5rem,13vw,11rem)] font-black leading-[0.75] tracking-[-0.08em]">
              PHOTOS<span className="text-[#5f94ff]">.</span>
            </h1>

            <p className="max-w-sm text-sm font-bold leading-relaxed text-black/60">
              A collection of moments, places and things worth remembering.
            </p>
          </div>
        </header>

        {/* FILTER */}
        <div className="flex flex-wrap gap-2 border-b-[3px] border-[#171717] py-5">
          {photoCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border-[2px] border-[#171717] px-4 py-2 text-xs font-black transition ${
                category === item
                  ? "bg-[#171717] text-white"
                  : "bg-transparent hover:bg-[#ffef00]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* GALLERY */}
        <main className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((photo, index) => (
            <article
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[20px] border-[3px] border-[#171717] bg-white">
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#171717] bg-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} strokeWidth={3} />
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-[10px] font-black tracking-[0.15em] text-[#5f94ff]">
                    {photo.category}
                  </p>

                  <h2 className="text-lg font-black">{photo.title}</h2>
                </div>

                <span className="text-xs font-black text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </main>

        {/* FOOTER */}
        <footer className="border-t-[3px] border-[#171717] py-8">
          <div className="flex flex-col justify-between gap-3 text-xs font-black sm:flex-row">
            <span>/ END OF ARCHIVE</span>
            <span>MORE COMING SOON.</span>
          </div>
        </footer>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/95 p-5"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border-[2px] border-[#171717] bg-[#ffef00]"
          >
            <X size={20} strokeWidth={3} />
          </button>

          <div
            className="max-h-[90vh] max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[80vh] w-auto rounded-[16px] border-[3px] border-white object-contain"
            />

            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-[#5f94ff]">
                  {selected.category}
                </p>

                <h2 className="text-xl font-black">{selected.title}</h2>
              </div>

              <span className="text-xs font-bold text-white/50">
                ESC TO CLOSE
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photos;