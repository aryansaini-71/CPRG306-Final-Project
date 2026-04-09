"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  
  // State to hold the screen while Supabase figures out if you are logged in
  const [isChecking, setIsChecking] = useState(true);

  // Your exact admin email
  const ADMIN_EMAIL = "aryan9817692114@gmail.com"; 

  useEffect(() => {
    // We give Supabase 500 milliseconds to fetch your session from the browser
    const timer = setTimeout(() => {
      // 1. If there is no user at all after half a second...
      if (!user) {
        router.push("/");
      } 
      // 2. Or if the user's email doesn't match (ignoring capital letters)...
      else if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        router.push("/");
      } 
      // 3. You passed the test! Let them in.
      else {
        setIsChecking(false);
      }
    }, 500); 

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [user, router]);

  // While waiting for that half-second, show a clean loading screen
  // This prevents the page from flickering weirdly before kicking you out
  if (isChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F7]">
        <p className="text-[#A3821A] font-bold tracking-[0.2em] animate-pulse">
          VERIFYING CREDENTIALS...
        </p>
      </div>
    );
  }

  // If we pass the checking phase, show the Admin Dashboard!
  return <>{children}</>;
}