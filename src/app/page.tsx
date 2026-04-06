"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const reviews = [
  {
    quote: "Σπαταλούσαμε μήνες σε αγγελίες και συνεντεύξεις χωρίς αποτέλεσμα. Η διαδικασία αξιολόγησης και στελέχωσης μας έφερε επαγγελματίες που ταίριαξαν αμέσως στη φιλοσοφία μας. Το άγχος της καθημερινότητας μειώθηκε δραματικά.",
    name: "Μαρία Σ.",
    role: "Ιδιοκτήτρια Beauty Salon"
  },
  {
    quote: "Δεν μου βρήκε απλά μια δουλειά, μου έδειξε πώς να χτίσω την καριέρα μου. Η συνάντηση αξιολόγησης με βοήθησε να καταλάβω την αξία μου και να βρω ένα περιβάλλον που με σέβεται απόλυτα.",
    name: "Ελένη Κ.",
    role: "Expert Nail Tech"
  },
  {
    quote: "Ο επαγγελματισμός και η δομή που έφερε στην επιχείρησή μας είναι ανεκτίμητα. Αποφύγαμε λάθη που θα μας κόστιζαν χιλιάδες ευρώ στο ξεκίνημα. Η καλύτερη επένδυση που κάναμε.",
    name: "Γιώργος Π.",
    role: "Επενδυτής / Beauty Entrepreneur"
  },
  {
    quote: "Η οργάνωση των καθημερινών διαδικασιών στο spa μας μάς γλίτωσε εκατοντάδες ώρες. Πλέον έχουμε απόλυτο έλεγχο και οι πελάτες μας νιώθουν την αναβάθμιση.",
    name: "Σοφία Λ.",
    role: "Ιδιοκτήτρια Αλυσίδας Spa"
  },
  {
    quote: "Επιτέλους κατάλαβα πώς να κάνω scale! Από ένα μικρό συνοικιακό κομμωτήριο, ανοίξαμε 2ο υποκατάστημα σε λιγότερο από έναν χρόνο, βασισμένοι στο σωστό business plan.",
    name: "Ανδρέας Β.",
    role: "Hair Stylist & Owner"
  },
  {
    quote: "Οι τεχνικές εκπαίδευσης και το mentorship μεταμόρφωσαν την ομάδα μου. Τα λάθη του παρελθόντος διορθώθηκαν, και η κερδοφορία μας ανέβηκε κατά 40%.",
    name: "Κατερίνα Μ.",
    role: "Manager Κέντρου Αισθητικής"
  }
];

export default function Home() {
  const [reviewPage, setReviewPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewPage((prev) => (prev + 1) % (Math.ceil(reviews.length / 3)));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <main className="pt-24 bg-surface">
      {/* Hero Section: Split-Screen */}
      <section className="min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-display leading-[1.1] text-on-surface tracking-tighter">
              Δομή. Επιλογή. <span className="italic text-primary">Εξέλιξη.</span><br/>Στον τομέα της ομορφιάς.
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg text-on-surface-variant max-w-lg leading-relaxed font-light">
              Ο χώρος της ομορφιάς δεν χρειάζεται περισσότερη ταχύτητα. Χρειάζεται κατεύθυνση. 
              Η σωστή επιλογή ανθρώπων και η οργάνωση λειτουργίας είναι αυτό που καθορίζει τη σταθερότητα μιας επιχείρησης και την εξέλιξη ενός επαγγελματία. Η προσέγγιση βασίζεται σε αξιολόγηση, εμπειρία αγοράς και καθαρή διαδικασία. Όχι σε υποσχέσεις.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6">
              <Link href="/ergasia" className="bg-primary-container text-on-primary-container px-10 py-5 rounded-lg text-base font-bold text-center tracking-widest uppercase shadow-2xl hover:scale-105 transition-all duration-300">
                Αναζητω Εργασια
              </Link>
              <Link href="/epixeiriseis" className="border border-primary text-primary px-10 py-5 rounded-lg text-base font-bold text-center tracking-widest uppercase hover:bg-primary/10 hover:scale-105 transition-all duration-300">
                Εχω Επιχειρηση
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] md:h-[819px] w-full mt-10 md:mt-0"
          >
            <div className="absolute inset-0 bg-surface-container-low rounded-xl overflow-hidden shadow-[40px_-40px_0_0_rgba(233,193,118,0.05)]">
              <img 
                src="/hero-image.jpg" 
                alt="Professional Consultant Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-[0.5] transition-all duration-700" 
              />
            </div>
            {/* Aesthetic Detail */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-primary/20 rounded-lg -z-10 hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-32 bg-surface-container-low overflow-hidden">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline"
        >
          <motion.div variants={fadeUpVariant} className="md:col-span-5">
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-6">Authority Builder</span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-on-surface">
              14+ Χρόνια Πραγματικής Εμπειρίας. Όχι Απλώς Θεωρία.
            </h2>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="md:col-span-7 space-y-8">
            <p className="text-xl text-on-surface-variant leading-relaxed font-light">
              Η κατανόηση των αναγκών μιας επιχείρησης ομορφιάς δεν μαθαίνεται μέσα από βιβλία, αλλά μέσα από την ίδια την αγορά. Με περισσότερα από 14 χρόνια ενεργής παρουσίας στον κλάδο, δεν προσεγγίζω τον χώρο επιφανειακά. Ξεκινώντας ως επαγγελματίας και δημιουργώντας τις δικές μου επιτυχημένες επιχειρήσεις (beauty salons & concepts), γνωρίζω από πρώτο χέρι τις πραγματικές προκλήσεις.
            </p>
            <p className="text-xl text-on-surface-variant leading-relaxed font-light">
              Παράλληλα, ως Καθηγητής στον Εκπαιδευτικό Όμιλο ΙΕΚ ΑΚΜΗ, έρχομαι καθημερινά σε επαφή με τη νέα γενιά, διαμορφώνοντας και καθοδηγώντας τα ταλέντα του αύριο. Λειτουργώντας ως Beauty Business Consultant, έχω αναλάβει τον στρατηγικό σχεδιασμό, την οργάνωση και τη στελέχωση δεκάδων απαιτητικών projects.
            </p>
            <p className="text-xl text-on-surface font-semibold leading-relaxed">
              Ο στόχος μου είναι ένας: Να μετατρέψω το ταλέντο σας σε καριέρα και να δώσω αυστηρούς, κερδοφόρους κανόνες στην επιχείρησή σας.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Grid: 4-Card Bento */}
      <section className="py-32 bg-surface">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <motion.div variants={fadeUpVariant} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl font-display">Επιλέξτε την Κατεύθυνσή σας</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
            {/* Recruitment */}
            <motion.div variants={fadeUpVariant} className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-lg bg-surface-container-high p-8 md:p-10 flex flex-col justify-between border border-white/5 hover:border-primary/30 transition-all duration-500 min-h-[300px]">
              <div className="z-10">
                <div className="text-secondary-container bg-secondary/10 w-fit p-3 rounded-lg mb-6 group-hover:bg-secondary/20 transition-all">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h3 className="text-3xl font-display mb-4">Για Επαγγελματίες Ομορφιάς</h3>
                <p className="text-on-surface-variant font-light leading-relaxed">
                  Για όσους επιλέγουν τη σταθερότητα και αναζητούν το σωστό, οργανωμένο περιβάλλον για την καριέρα τους.
                </p>
              </div>
              <Link href="/ergasia" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mt-12 cursor-pointer group-hover:gap-4 transition-all">
                Δηλωση Ενδιαφεροντος <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </motion.div>
            {/* Business Strategy */}
            <motion.div variants={fadeUpVariant} className="group relative overflow-hidden rounded-lg bg-surface-container-high p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 min-h-[250px] md:translate-y-4">
              <span className="material-symbols-outlined text-primary mb-6 group-hover:scale-110 transition-transform">architecture</span>
              <h3 className="text-xl font-display mb-2">Για Επιχειρήσεις</h3>
              <p className="text-sm text-on-surface-variant font-light mb-8">
                Για επιχειρήσεις που λειτουργούν με επαγγελματισμό και αναζητούν στελέχωση, οργάνωση ή στρατηγική καθοδήγηση.
              </p>
              <Link href="/epixeiriseis" className="absolute bottom-8 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:underline">
                Υπηρεσιες & Αξιολογηση
              </Link>
            </motion.div>
            {/* Education */}
            <motion.div variants={fadeUpVariant} className="group relative overflow-hidden rounded-lg bg-surface-container-high p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 min-h-[250px] md:translate-y-8">
              <span className="material-symbols-outlined text-primary mb-6 group-hover:scale-110 transition-transform">school</span>
              <h3 className="text-xl font-display mb-2">Εκπαίδευση</h3>
              <p className="text-sm text-on-surface-variant font-light mb-8">
                Για επαγγελματίες που θέλουν να αναβαθμίσουν τις τεχνικές τους γνώσεις και να αποκτήσουν ισχυρό business mindset.
              </p>
              <Link href="/ekpaideusi" className="absolute bottom-8 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:underline">
                Δειτε Περισσοτερα
              </Link>
            </motion.div>
            {/* PR/Media */}
            <motion.div variants={fadeUpVariant} className="md:col-span-2 md:-translate-y-4 group relative overflow-hidden rounded-lg bg-secondary-container/20 p-8 border border-secondary/10 hover:border-secondary/40 transition-all duration-500 flex items-center justify-between min-h-[150px]">
              <div>
                <span className="material-symbols-outlined text-secondary-fixed-dim mb-4 group-hover:scale-110 transition-transform">podcasts</span>
                <h3 className="text-2xl font-display mb-2">Συνεργασίες & Media</h3>
                <p className="text-on-surface-variant font-light max-w-sm text-sm mb-6">
                  Για brands, εταιρείες και creators με κοινή φιλοσοφία και αυστηρά standards.
                </p>
                <Link href="/synergasies" className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-[10px] hover:underline">
                  Αιτημα Συνεργασιας
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-surface-container-low overflow-hidden">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <motion.div variants={fadeUpVariant} className="text-center mb-24">
            <h2 className="text-sm uppercase tracking-[0.5em] text-primary font-bold mb-4">Social Proof</h2>
            <p className="text-3xl font-display italic">Αποτελέσματα που μιλούν από μόνα τους.</p>
          </motion.div>
          <div className="relative min-h-[500px] md:min-h-[350px] overflow-hidden">
            <AnimatePresence mode="popLayout">
            <motion.div 
              key={reviewPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left absolute inset-0"
            >
              {reviews.slice(reviewPage * 3, reviewPage * 3 + 3).map((review, i) => (
                <div key={i} className="flex flex-col items-center md:items-start group">
                  <span className="material-symbols-outlined text-primary/30 text-6xl mb-6 group-hover:text-primary/60 transition-colors">format_quote</span>
                  <p className="text-lg leading-relaxed mb-8 italic font-light text-on-surface">
                    "{review.quote}"
                  </p>
                  <div className="mt-auto border-l-2 border-primary/50 pl-4 py-1 group-hover:border-primary transition-colors">
                    <p className="font-semibold text-on-surface">{review.name}</p>
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">{review.role}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-12 gap-3">
            {[0, 1].map((index) => (
              <button 
                key={index} 
                onClick={() => setReviewPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${reviewPage === index ? 'bg-primary scale-125' : 'bg-primary/20 hover:bg-primary/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

