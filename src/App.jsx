import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Blog from "./pages/Blog";
import Photos from "./pages/Photos";
import Profile from "./pages/Profile";

import "./App.css";

const PAGES = [Homepage, Project, Blog, Photos, Profile];

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const ActivePage = PAGES[activeTab];

  const handlePageChange = (nextIndex) => {
    if (nextIndex === activeTab) return;

    setDirection(nextIndex > activeTab ? 1 : -1);
    setActiveTab(nextIndex);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveTab((prev) => (prev === 0 ? PAGES.length - 1 : prev - 1));
  };

  const goNext = () => {
    setDirection(1);
    setActiveTab((prev) => (prev === PAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <main className="relative h-screen w-full overflow-hidden">
        <ActivePage direction={direction} />
      </main>

      <button
        onClick={goPrev}
        className="group fixed left-0 top-1/2 z-50 flex h-32 w-10 -translate-x-7 -translate-y-1/2 items-center justify-center rounded-r-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
      >
        <ChevronLeft
          size={24}
          strokeWidth={6}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </button>

      <button
        onClick={goNext}
        className="group fixed right-0 top-1/2 z-50 flex h-32 w-10 translate-x-7 -translate-y-1/2 items-center justify-center rounded-l-2xl border-4 border-black bg-white transition-transform duration-300 hover:translate-x-0"
      >
        <ChevronRight
          size={24}
          strokeWidth={6}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </button>

      <Navbar active={activeTab} onSelect={handlePageChange} />
    </div>
  );
}

export default App;