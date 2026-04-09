"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GooeyText({
  texts,
  morphTime = 1.5,
  cooldownTime = 0.5,
  className,
  textClassName
}: any) {
  // These refs link to our HTML spans so we can change them directly
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  
  // This tells us if the page is fully loaded (fixes Next.js errors)
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Page is loaded, safe to start!
    setIsLoaded(true);

    let animationFrameId: number;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    // This function handles the "melting" math
    function setMorph(fraction: number) {
      if (!text1Ref.current || !text2Ref.current) return;
      
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4)}`;
      
      fraction = 1 - fraction;
      
      text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4)}`;
    }

    // This function handles the pause between words
    function doCooldown() {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = "none";
      text2Ref.current.style.opacity = "1";
      text1Ref.current.style.filter = "none";
      text1Ref.current.style.opacity = "0";
    }

    // The main loop that runs 60 times a second
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (cooldown + dt > 0) { 
          // Switch to the next word in the list
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / morphTime;
        if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
        }
        setMorph(fraction);
      } else {
        doCooldown();
      }
    }

    // Set the very first words before the loop starts
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }
    
    // Start the animation engine
    animate();

    // Clean up the loop if we leave the page (prevents crashes!)
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [texts, morphTime, cooldownTime]);

  // If the page hasn't loaded yet, show nothing so Next.js doesn't crash
  if (!isLoaded) {
    return <div className={cn("relative h-[100px]", className)}></div>;
  }

  return (
    <div className={cn("relative", className)}>
      {/* CRITICAL FIX: 
        We use w-0 h-0 and absolute to hide the SVG.
        We DO NOT use 'hidden' or 'display: none', otherwise the browser 
        deletes the filter and makes all your text invisible!
      */}
      <svg className="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* This is where the actual text lives and where the filter is applied */}
      <div className="flex items-center justify-center" style={{ filter: "url(#threshold)" }}>
        <span 
          ref={text1Ref} 
          className={cn("absolute inline-block select-none text-center text-5xl md:text-[80pt] font-black uppercase tracking-tighter", textClassName)} 
        />
        <span 
          ref={text2Ref} 
          className={cn("absolute inline-block select-none text-center text-5xl md:text-[80pt] font-black uppercase tracking-tighter", textClassName)} 
        />
      </div>
    </div>
  );
}