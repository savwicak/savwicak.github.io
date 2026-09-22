function PhotoCard({ photo, index, layout, onClick }) {
  const layoutClasses = {
    wide: "col-span-2",
    portrait: "col-span-1",
    square: "col-span-1",
  };

  const aspectClasses = {
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/6]",
    square: "aspect-[1/2]",
  };

  return (
    <article
      data-photo-card
      onClick={onClick}
      className={`group min-w-0 cursor-pointer ${layoutClasses[layout] || layoutClasses.square}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl border-[3px] border-[#171717] bg-white ${aspectClasses[layout] || aspectClasses.square}`}
      >
        <img
          src={photo.image}
          alt=""
          draggable={false}
          width="1200"
          height="900"
          loading={index < 4 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </article>
  );
}

export default PhotoCard;