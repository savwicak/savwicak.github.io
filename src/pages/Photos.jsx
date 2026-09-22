import { useEffect, useMemo, useRef, useState } from "react";

import { photos, photoCategories } from "../data/PhotosData";
import PhotoCard from "../components/PhotoCard";
import PhotoPreview from "../components/PhotoPreview";

function Photos() {
  const [category, setCategory] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    return (category === "ALL" ? photos : photos.filter((photo) => photo?.category === category)).filter(Boolean);
  }, [category]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-photo-card]");
    if (!cards.length) return;

    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform,opacity",
      }
    );

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [category]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const getLayout = (index) => {
    const layouts = [
      "wide",
      "wide",
      "wide",
      "wide",
      "wide",
    ];

    return layouts[index % layouts.length];
  };

  return (
    <div className="h-screen w-full overflow-y-auto overscroll-y-contain text-[#171717]">
      <div className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="border-b-[3px] border-[#171717] pb-5">
          <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {photoCategories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setSelected(null);
                  }}
                  className={`shrink-0 rounded-full border-2 border-[#171717] px-4 py-2 text-[10px] font-black tracking-wide transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-[11px] ${
                    active
                      ? "bg-[#171717] text-white"
                      : "bg-transparent text-[#171717] hover:-translate-y-0.5 hover:bg-[#ffef00]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <main
          ref={gridRef}
          className="grid grid-cols-2 gap-4 py-8 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {filtered.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              layout={getLayout(index)}
              onClick={() => setSelected(photo)}
            />
          ))}
        </main>
      </div>

      <PhotoPreview photo={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default Photos;