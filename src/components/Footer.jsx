import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#3B2F1E]  text-[#B0A898] px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Brand Block */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-[#C9A96E] font-serif">
            StudyNook
          </h1>
          <p className="mt-4 max-w-xl text-[#B0A898]">
            Your campus study room booking platform. Find focus, book instantly, and study better — wherever you are.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Newsletter */}
          <div>
            <h3 className="text-[#C9A96E] mb-3 tracking-wide text-sm font-semibold uppercase">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-relaxed">
              Subscribe for room updates, tips, and exclusive study deals.
            </p>
            <div className="flex items-center bg-[#4e3d28] border border-[#5a4a38] px-4 py-3">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-transparent outline-none flex-1 text-sm text-[#F5EDD8] placeholder-[#7A5C38]"
              />
              <span className="text-[#C9A96E] text-lg cursor-pointer hover:text-[#F5EDD8] transition-colors">
                ↗
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C9A96E] mb-3 tracking-wide text-sm font-semibold uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#F5EDD8] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#F5EDD8] transition-colors">
                  All Rooms
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-[#F5EDD8] transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/my-listings" className="hover:text-[#F5EDD8] transition-colors">
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#C9A96E] mb-3 tracking-wide text-sm font-semibold uppercase">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#F5EDD8] cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-[#F5EDD8] cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-[#F5EDD8] cursor-pointer transition-colors">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#C9A96E] mb-3 tracking-wide text-sm font-semibold uppercase">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>+880 1700 000000</li>
              <li>hello@studynook.app</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#5a4a38] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 StudyNook. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-[#5a4a38] flex items-center justify-center text-[#C9A96E] hover:border-[#C9A96E] hover:text-[#F5EDD8] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              aria-label="X"
              className="w-8 h-8 rounded-full border border-[#5a4a38] flex items-center justify-center text-[#C9A96E] hover:border-[#C9A96E] hover:text-[#F5EDD8] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-[#5a4a38] flex items-center justify-center text-[#C9A96E] hover:border-[#C9A96E] hover:text-[#F5EDD8] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-[#5a4a38] flex items-center justify-center text-[#C9A96E] hover:border-[#C9A96E] hover:text-[#F5EDD8] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;