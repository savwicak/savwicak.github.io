import { useState } from "react";
import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Blog from "./pages/Blog";
import Photos from "./pages/Photos";
import Profile from "./pages/Profile";

import "./App.css";

// Urutan ini HARUS sama persis dengan urutan icon di Navbar
// (index 0 = Home, 1 = Favorite, 2 = List, 3 = Camera, 4 = Profile).
// Silakan sesuaikan pemetaan halamannya kalau menurutmu ada yang
// lebih pas — ini cuma tebakan paling masuk akal dari nama file
// yang ada di pages/ kamu:
//
//   Home     (icon)  -> Homepage.jsx
//   Favorite (icon)  -> Blog.jsx
//   List     (icon)  -> Project.jsx   <-- halaman yang baru kita bikin
//   Camera   (icon)  -> Photos.jsx
//   Profile  (icon)  -> Profile.jsx
const PAGES = [Homepage, Project, Blog, Photos, Profile];

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const ActivePage = PAGES[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 poppins-regular">
      {/* pb-32 biar konten paling bawah nggak ketutupan navbar
          yang posisinya fixed di bawah */}
      <main className="pb-32">
        <ActivePage />
      </main>

      <Navbar active={activeTab} onSelect={setActiveTab} />
    </div>
  );
};

export default App;