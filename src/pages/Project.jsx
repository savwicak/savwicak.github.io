import { useEffect, useRef, useState } from "react";
import { projects } from "../data/ProjectData";
import ProjectCard from "../components/ProjectCard";

const Project = ({ direction }) => {
  const [openId, setOpenId] = useState(null);
  const cardRefs = useRef([]);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    const dir = direction === 1 ? 1 : -1;
    const cards = cardRefs.current.filter(Boolean);

    if (!cards.length) return;

    gsap.killTweensOf(cards);

    gsap.set(cards, {
      x: `${dir * 100}vw`,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.to(cards, {
      x: "0vw",
      duration: 1,
      stagger: 0.12,
    });

    return () => {
      tl.kill();
    };
  }, [direction]);

  return (
    <div className="h-screen w-full overflow-hidden pb-15 md:pb-0">
      <div className="mx-auto flex h-full w-full max-w-8xl flex-col gap-4 overflow-y-auto overscroll-contain p-5 touch-pan-y sm:gap-5 sm:p-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="shrink-0"
          >
            <ProjectCard
              project={project}
              isOpen={openId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          </div>
        ))}

        <div className="h-20 shrink-0 md:hidden" />
      </div>
    </div>
  );
};

export default Project;