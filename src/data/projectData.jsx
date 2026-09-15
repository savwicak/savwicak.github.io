export const projects = [
  {
    id: "project-01",
    name: "Portfolio Website",
    description:
      "Personal portfolio website untuk menampilkan project, pengalaman, dan berbagai karya yang pernah dibuat.",
    images: [
      "/images/image3.jpg",
      "/images/image.png",
      "/images/image2.jpg",
    ],
    imageCount: 3,
    github: "https://github.com/username/portfolio",
    demo: "https://portfolio.vercel.app",
    techStack: [
      { name: "React", icon: "React" },
      { name: "Tailwind CSS", icon: "Tailwind" },
      { name: "Vite", icon: "Vite" },
    ],
  },

  {
    id: "project-02",
    name: "Dashboard",
    description:
      "Dashboard untuk mengelola data dengan tampilan sederhana dan responsive.",
    images: [
      "/images/image2.jpg",
      "/images/image.png",
    ],
    imageCount: 2,
    github: "https://github.com/username/dashboard",
    demo: "",
    techStack: [
      { name: "React", icon: "React" },
      { name: "Node.js", icon: "Node" },
      { name: "MongoDB", icon: "MongoDB" },
    ],
  },

  {
    id: "project-03",
    name: "Landing Page",
    description:
      "Landing page modern dengan fokus pada typography, responsive layout, dan visual interaction.",
    images: [
      "/images/image.png",
    ],
    imageCount: 1,
    github: "https://github.com/username/landing-page",
    demo: "https://landing-page.vercel.app",
    techStack: [
      { name: "Next.js", icon: "Next" },
      { name: "TypeScript", icon: "TypeScript" },
      { name: "Figma", icon: "Figma" },
    ],
  },
];