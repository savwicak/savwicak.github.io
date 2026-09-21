import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function PhotoPreview({ photo, onClose }) {
  const overlayRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (!photo || typeof gsap === "undefined") return;

    const overlay = overlayRef.current;
    const preview = previewRef.current;

    gsap.killTweensOf([overlay, preview]);

    gsap.fromTo(
      overlay,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      preview,
      {
        y: "110vh",
        opacity: 0,
        rotation: -4,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.75,
        ease: "back.out(1.35)",
      }
    );

    return () => {
      gsap.killTweensOf([overlay, preview]);
    };
  }, [photo]);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo]);

  const handleClose = () => {
    if (!photo || typeof gsap === "undefined") {
      onClose();
      return;
    }

    const overlay = overlayRef.current;
    const preview = previewRef.current;

    gsap.to(preview, {
      y: "110vh",
      opacity: 0,
      rotation: 4,
      duration: 0.45,
      ease: "power3.in",
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  if (!photo) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#171717]/40 p-4 opacity-0 backdrop-blur-sm sm:p-6"
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#171717] bg-[#ffef00] transition-transform duration-300 hover:rotate-90 hover:scale-110 sm:right-6 sm:top-6"
      >
        <X size={19} strokeWidth={3} />
      </button>

      <div
        ref={previewRef}
        className="relative max-h-[88vh] max-w-[90vw] cursor-default rounded-2xl border-[3px] border-[#171717] bg-white p-3 pb-4 shadow-[12px_14px_0_#000] sm:max-h-[86vh] sm:max-w-[80vw] sm:p-4 sm:pb-5"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerMove={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
        onPointerCancel={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-lg bg-[#111111]">
          <img
            src={photo.image}
            alt={photo.title || ""}
            className="block max-h-[72vh] max-w-[82vw] object-contain sm:max-h-[74vh] sm:max-w-[72vw]"
          />
        </div>

        {photo.description && (
          <div className="px-2 pt-3 text-center sm:px-4 sm:pt-4">
            <p className="text-xs font-medium leading-relaxed text-[#171717]/70 sm:text-sm">
              {photo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoPreview;