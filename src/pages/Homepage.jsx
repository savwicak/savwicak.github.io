import { ArrowUpRight, Download } from "lucide-react";

function Homepage() {
    return (
    <div className="w-full max-w-8xl flex items-center justify-center px-5 py-45 sm:px-10 sm:py-24 lg:py-32">
        <div className="w-full max-w-7xl grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
        {/* LEFT */}
        <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="dela-gothic text-5xl font-black leading-[0.85] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-8xl">
            SAVANNA
            <br/>
            WICAKSONO
            </h1>
            <div className="mx-auto my-5 h-px w-full max-w bg-black/15 md:mx-0" />
            <p className="mx-auto max-w-xl text-sm font-medium leading-7 tracking-[-0.01em] sm:text-base md:mx-0 lg:text-lg">
                HELLO MATE, IM A JUNIOR <b>flutter developer</b> HIGHLY Interested in GAMES AND IOT, i love exploring new things ALOOOOT OF diffrent activities, im a really brave person to try new thing like jumping off from a cliff (for sky diving (never tried(would love to))) really love games
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
                href="/cv.pdf"
                download
                className="group flex items-center gap-2 rounded-full bg-[#fff21c] px-5 py-2.5 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_5px_0_#171717] active:translate-y-0 active:shadow-none sm:text-base"
            >
                DOWNLOAD CV

                <Download
                size={16}
                strokeWidth={3}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
            </a>

            <a
                href="#contact"
                className="group flex items-center gap-2 rounded-full bg-[#5d8df5] px-5 py-2.5 text-sm font-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_5px_0_#171717] active:translate-y-0 active:shadow-none sm:text-base"
            >
                CONTACT ME

                <ArrowUpRight
                size={17}
                strokeWidth={3}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </a>

            </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end">

            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]">

            <div className="overflow-hidden bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <img
                src="/images/profile.jpg"
                alt="Savanna Wicaksono"
                className="aspect-[4/5] w-full object-cover object-center"
                />
            </div>

            </div>
        </div>

        </div>
    </div>
    );
}

export default Homepage;