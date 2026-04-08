import { GooeyText } from "@/components/ui/gooey-text-morphing";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="h-[300px] flex items-center justify-center mb-10">
        <GooeyText
          texts={["VODKA", "GIN", "WHISKEY", "SPIRIT", "SOURCE"]}
          morphTime={1.5}
          cooldownTime={0.5}
          className="font-black"
          textClassName="text-[#A3821A]" 
        />
      </div>

      <div className="text-center z-10">
        <h2 className="text-xl tracking-[0.3em] mb-8 opacity-80 uppercase">
          Crafted for the refined palate
        </h2>
        
        <Link 
          href="/products" 
          className="px-10 py-4 border border-[#A3821A] text-[#A3821A] hover:bg-[#A3821A] hover:text-white transition-all duration-500 tracking-widest font-bold"
        >
          ENTER THE COLLECTION
        </Link>
      </div>

      {/* Subtle Background Detail */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <h1 className="text-[30vw] font-black leading-none mt-20">LUXURY</h1>
      </div>
    </main>
  );
}