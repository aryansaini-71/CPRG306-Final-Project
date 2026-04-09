import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function Home() {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center bg-[#F9F9F7] px-4 overflow-hidden relative">
      <div className="h-[250px] md:h-[400px] flex items-center justify-center w-full relative z-20 pointer-events-none">
        <GooeyText
          texts={["VODKA", "GIN", "WHISKEY", "SPIRIT", "SOURCE"]}
          morphTime={1.5}
          cooldownTime={0.5}
          className="font-black tracking-tighter"
          textClassName="text-[#A3821A]" 
        />
      </div>

      <div className="text-center z-50 -mt-10 md:-mt-20 relative">
        <p className="text-sm md:text-base tracking-[0.4em] mb-10 text-black/60 uppercase font-light">
          THE ART OF EXTRAORDINARY TASTE
        </p>
        <a 
          href="/products" 
          className="group relative inline-block px-12 py-5 border border-[#A3821A] text-[#A3821A] overflow-hidden transition-all duration-500 bg-white"
        >
          <span className="relative z-10 tracking-[0.2em] font-bold group-hover:text-white transition-colors duration-500">
            EXPLORE COLLECTION
          </span>
          <div className="absolute inset-0 bg-[#A3821A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </a>
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04] z-0">
        <h1 className="text-[25vw] font-black leading-none select-none uppercase">
          LIQUOR
        </h1>
      </div>
    </main>
  );
}