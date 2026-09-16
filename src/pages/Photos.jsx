import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { photos, photoCategories } from "../data/PhotosData";

function Photos() {
  const [category, setCategory] = useState("ALL");
  const [selected, setSelected] = useState(null);

  const filtered = (
    category === "ALL"
      ? photos
      : photos.filter((photo) => photo?.category === category)
  ).filter(Boolean);

  return (
    <div
      data-page-scroll
      className="h-screen w-full overflow-y-auto overscroll-y-auto bg-[#f7f7f5] text-[#171717]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

        {/* FILTER */}
        <div className="flex flex-wrap items-center gap-2 border-b-[3px] border-[#171717] py-5">
          {photoCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border-2 border-[#171717] px-4 py-2 text-[10px] font-black tracking-wide transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-[11px] ${
                category === item
                  ? "bg-[#171717] text-white"
                  : "bg-transparent hover:-translate-y-0.5 hover:bg-[#ffef00]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <main
          className="photos-grid py-8"
        >
          {filtered.map((photo, index) => (
            <article
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="group min-w-0 cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border-[3px] border-[#171717] bg-white">
                <img
                  src={photo.image}
                  alt={photo.title}
                  width="900"
                  height="1050"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex w-full items-end justify-between p-5">
                    <div className="text-white">
                      <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-[#ffef00]">
                        {photo.category}
                      </p>

                      <h2 className="text-xl font-black">
                        {photo.title}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffef00] text-[#171717]">
                      <ArrowUpRight size={19} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.18em] text-[#5f94ff]">
                    {photo.category}
                  </p>

                  <h2 className="text-lg font-black">
                    {photo.title}
                  </h2>
                </div>

                <span className="text-[10px] font-black text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </main>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#171717]/95 p-4 sm:p-8"
          onClick={() => setSelected(null)}
        >
          {/* CLOSE */}
          <button
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#171717] bg-[#ffef00] transition-transform duration-300 hover:rotate-90 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <X size={19} strokeWidth={3} />
          </button>

          <div
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              width="1400"
              height="1750"
              className="mx-auto max-h-[70vh] w-auto max-w-full rounded-xl border-[3px] border-white object-contain sm:max-h-[75vh]"
            />

            <div className="mx-auto mt-4 flex max-w-5xl items-end justify-between gap-4 text-white sm:mt-5">
              <div className="min-w-0">
                <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-[#5f94ff] sm:text-[10px]">
                  {selected.category}
                </p>

                <h2 className="truncate text-xl font-black tracking-tight sm:text-2xl">
                  {selected.title}
                </h2>
              </div>

              <span className="hidden shrink-0 text-[10px] font-bold tracking-[0.15em] text-white/40 sm:block">
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