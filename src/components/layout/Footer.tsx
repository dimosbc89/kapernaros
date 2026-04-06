import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0b1311] w-full py-16 px-6 md:px-12 border-t border-white/5 font-body z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-lg font-display text-primary">Kapernaros Beauty</div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs transition-opacity">
            Η σωστή επιλογή ανθρώπων και η οργάνωση λειτουργίας είναι αυτό που καθορίζει τη σταθερότητα μιας επιχείρησης και την εξέλιξη ενός επαγγελματία.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/40 hover:text-white transition-all">Instagram</a></li>
              <li><a href="#" className="text-white/40 hover:text-white transition-all">LinkedIn</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/40 hover:text-white transition-all">Privacy Policy (GDPR)</Link></li>
              <li><Link href="/" className="text-white/40 hover:text-white transition-all">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">Επικοινωνια</h4>
            <p className="text-white/40 text-sm">contact@kapernarosbeauty.gr</p>
          </div>
          <div className="text-xs tracking-wide mt-auto flex flex-col gap-2">
            <span className="text-white/30">© {new Date().getFullYear()} Kapernaros Beauty Consulting. All rights reserved.</span>
            <span className="text-white/40">
              Designed & Developed by <a href="https://growagency.online" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary/80 hover:text-primary transition-colors">GROW Agency</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
