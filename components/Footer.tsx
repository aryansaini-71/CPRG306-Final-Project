import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 mt-20">
      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 md:pr-10">
          <p className="text-[#A3821A] font-black tracking-widest text-lg mb-4">
            SPIRIT SOURCE
          </p>
          <p className="text-xs text-black/50 leading-relaxed tracking-wide">
            Premium spirits, curated for the discerning palate. Quality in every bottle.
          </p>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/30 uppercase mb-5">
            Shop
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/products" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Collection
              </Link>
            </li>
            <li>
              <Link href="/products?category=Hard+Liquor" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Hard Liquor
              </Link>
            </li>
            <li>
              <Link href="/products?category=Wine" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Wine
              </Link>
            </li>
            <li>
              <Link href="/products?category=Cooler" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Cooler
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/30 uppercase mb-5">
            Account
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/login" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Register
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Info Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/30 uppercase mb-5">
            Info
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-xs tracking-widest text-black/70 hover:text-[#A3821A] transition-colors uppercase">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Age Disclaimer */}
      <div className="border-t border-black/5 py-4 px-6 md:px-10">
        <p className="text-center text-[10px] tracking-widest text-black/30 uppercase">
          You must be of legal drinking age to purchase. Please drink responsibly.
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/5 py-5 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.2em] text-black/30 uppercase">
          &copy; {new Date().getFullYear()} Spirit Source. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-[10px] tracking-widest text-black/30 hover:text-[#A3821A] transition-colors uppercase">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-[10px] tracking-widest text-black/30 hover:text-[#A3821A] transition-colors uppercase">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}