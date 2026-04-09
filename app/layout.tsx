import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Providers } from "./providers"; // We import the new file here

export const metadata = {
  title: "Spirit Source",
  description: "Premium Spirits & Exceptional Quality",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F9F7]">
        {/* We wrap the app in the Providers component instead */}
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}