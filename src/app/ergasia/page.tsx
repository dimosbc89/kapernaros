"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().min(2, "Το όνομα είναι υποχρεωτικό"),
  email: z.string().email("Μη έγκυρο email"),
  phone: z.string().min(10, "Μη έγκυρο τηλέφωνο"),
  location: z.string().min(2, "Η τοποθεσία είναι υποχρεωτική"),
  specialization: z.string().min(1, "Επιλέξτε ειδικότητα"),
  experience: z.string().min(1, "Επιλέξτε εμπειρία"),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  expertise: z.string().max(500, "Το όριο είναι 500 λέξεις"),
  consentReview: z.boolean(),
  consentNotGuarantee: z.boolean(),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου" }),
  } as any),
});

type FormValues = z.infer<typeof formSchema>;

export default function ErgasiaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ergasia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Σφάλμα κατά την υποβολή");

      toast.success("Η αίτηση σας καταχωρήθηκε επιτυχώς!");
      reset();
    } catch (error) {
      toast.error("Υπήρξε ένα πρόβλημα. Προσπαθήστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 selection:bg-primary selection:text-on-primary">
      <Toaster position="bottom-right" />
      <motion.header 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Careers</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight tracking-tight text-on-surface">
              Η καριέρα σου χρειάζεται <br /> σωστή κατεύθυνση.
            </h1>
          </div>
          <div className="pb-4">
            <p className="text-on-surface-variant font-body text-lg max-w-md leading-relaxed">
              Αν είστε επαγγελματίας που αναζητά το σωστό περιβάλλον για την εξέλιξή του, η διαδικασία μας βασίζεται σε αξιολόγηση και καθαρή στρατηγική.
            </p>
          </div>
        </div>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="bg-surface-container-low p-8 lg:p-20 rounded-none border-none shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-24">
            {/* Section 1: Personal Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-headline font-bold text-primary mb-2">Προσωπικά Στοιχεία</h2>
                <p className="text-on-surface-variant text-sm font-body">Η βάση της επαγγελματικής σας ταυτότητας.</p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ονοματεπώνυμο</label>
                  <input {...register("fullName")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300 placeholder:text-white/10" placeholder="Π.χ. Μαρία Παπαδοπούλου" type="text" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                  <input {...register("email")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300 placeholder:text-white/10" placeholder="email@example.com" type="email" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Τηλέφωνο</label>
                  <input {...register("phone")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300 placeholder:text-white/10" placeholder="+30 690 000 0000" type="tel" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Τοποθεσία</label>
                  <input {...register("location")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300 placeholder:text-white/10" placeholder="Π.χ. Αθήνα" type="text" />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Professional Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-headline font-bold text-primary mb-2">Επαγγελματική Εμπειρία</h2>
                <p className="text-on-surface-variant text-sm font-body">Αναλύστε την πορεία σας στον κλάδο.</p>
              </div>
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block">Βασική Ειδικότητα</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Μανικιούρ", "Κομμωτική", "Αισθητική", "Management"].map((spec) => (
                      <label key={spec} className="relative group cursor-pointer">
                        <input {...register("specialization")} value={spec} className="peer sr-only" type="radio" />
                        <div className="p-4 border border-outline-variant/30 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                          <span className="text-xs font-bold uppercase tracking-tighter text-on-surface-variant peer-checked:text-primary">{spec}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Χρόνια Εμπειρίας</label>
                  <div className="relative">
                    <select {...register("experience")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 appearance-none cursor-pointer">
                      <option value="">Επιλέξτε...</option>
                      <option value="0-2">0-2 Χρόνια</option>
                      <option value="3-5">3-5 Χρόνια</option>
                      <option value="5-10">5-10 Χρόνια</option>
                      <option value="10+">10+ Χρόνια</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-primary pointer-events-none">expand_more</span>
                  </div>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Portfolio & Digital */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-headline font-bold text-primary mb-2">Portfolio & Social Media</h2>
                <p className="text-on-surface-variant text-sm font-body">Η οπτική σας ταυτότητα.</p>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">LinkedIn Profile URL</label>
                    <input {...register("linkedin")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300" type="url" placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Instagram / Portfolio URL</label>
                    <input {...register("instagram")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 transition-all duration-300" type="url" placeholder="https://instagram.com/..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Statement */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-headline font-bold text-primary mb-2">Επιπλέον Πληροφορίες</h2>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Περιγράψτε την επαγγελματική σας μεθοδολογία</label>
                  <textarea {...register("expertise")} className="w-full bg-surface-container-highest border border-outline-variant/20 focus:border-primary focus:ring-0 text-on-surface p-6 transition-all duration-300 rounded-none leading-relaxed placeholder:text-white/5" placeholder="Περιγράψτε το στυλ, τη μεθοδολογία και τους επαγγελματικούς σας στόχους..." rows={6}></textarea>
                  {errors.expertise && <p className="text-red-500 text-xs mt-1">{errors.expertise.message}</p>}
                </div>
              </div>
            </div>

            {/* GDPR & Submission */}
            <div className="pt-12 border-t border-outline-variant/20 flex flex-col items-start gap-6">
              <label className="flex items-start max-w-xl cursor-pointer">
                <input {...register("consentReview")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                <span className="text-sm text-on-surface-variant leading-relaxed">Μπορώ να παρευρεθώ σε συνάντηση αξιολόγησης εφόσον ζητηθεί.</span>
              </label>

              <label className="flex items-start max-w-xl cursor-pointer">
                <input {...register("consentNotGuarantee")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                <span className="text-sm text-on-surface-variant leading-relaxed">Κατανοώ ότι η διαδικασία αφορά αξιολόγηση και δεν αποτελεί εγγύηση τοποθέτησης.</span>
              </label>

              <label className="flex items-start max-w-xl cursor-pointer">
                <input {...register("gdpr")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                <span className="text-sm text-on-surface-variant leading-relaxed">
                  Αποδέχομαι την <span className="text-primary hover:underline">Πολιτική Απορρήτου</span> και συναινώ στην επεξεργασία των προσωπικών μου δεδομένων για τους σκοπούς της αξιολόγησης. (Υποχρεωτικό)
                </span>
              </label>
              {errors.gdpr && <p className="text-red-500 text-xs">{errors.gdpr.message}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto px-16 py-5 bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#412d00] font-bold uppercase tracking-[0.2em] text-sm rounded shadow-xl hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Υποβολη..." : "Υποβολη Αιτησης Αξιολογησης"}
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    </main>
  );
}
