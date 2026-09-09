import { useState } from "react";
import { projects } from "../data/ProjectData";
import ProjectCard from "../components/ProjectCard";

const Project = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full max-w-8xl mx-auto flex flex-col gap-1 sm:gap-2 p-5 sm:p-10">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isOpen={openId === project.id}
          onToggle={() => handleToggle(project.id)}
        />
      ))}
    </div>
  );
};

export default Project;