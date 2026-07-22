import footerLogo from "../assets/footer-img.png";

export default function Footer() {
  return (
    <footer className="bg-brand-500 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src={footerLogo}
            alt="ParentGenius"
            className="h-8 w-auto object-contain"
          />
          <span className="text-sm opacity-90 border-l border-white/30 pl-3 leading-tight">
            Virtual Class<br />for Zoom
          </span>
        </div>

        <div className="text-center mb-8">
          <p className="font-medium mb-3">Subscribe to get our Newsletter</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <input
              type="email"
              placeholder="Your Email"
              className="h-11 w-full max-w-xs sm:w-64 rounded-full px-5 text-sm outline outline-1 outline-white bg-transparent text-white placeholder:text-white/80"
            />
            <button className="h-11 px-6 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm mb-3">
          <a href="#" className="transition-colors hover:text-accent-300 hover:underline">Careers</a>
          <span className="opacity-50">|</span>
          <a href="#" className="transition-colors hover:text-accent-300 hover:underline">Privacy Policy</a>
          <span className="opacity-50">|</span>
          <a href="#" className="transition-colors hover:text-accent-300 hover:underline">Terms &amp; Conditions</a>
        </div>

        <p className="text-center text-xs opacity-80">© 2025 ParentGenius</p>
      </div>
    </footer>
  );
}