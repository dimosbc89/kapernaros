"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().min(2, "Το όνομα είναι υποχρεωτικό"),
  company: z.string().min(2, "Το όνομα επιχείρησης είναι υποχρεωτικό"),
  industry: z.string().min(2, "Ο κλάδος είναι υποχρεωτικός"),
  budget: z.string(),
  needs: z.array(z.string()).min(1, "Επιλέξτε τουλάχιστον μία ανάγκη"),
  brief: z.string().max(1000, "Το όριο είναι 1000 χαρακτήρες"),
  consentContact: z.boolean(),
  consentNotGuarantee: z.boolean(),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου" }),
  } as any),
});

type FormValues = z.infer<typeof formSchema>;

export default function EpixeiriseisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: [],
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/epixeiriseis", {
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
    <main className="pt-32 pb-24 px-6 md:px-12 selection:bg-primary-container selection:text-on-primary-container">
      <Toaster position="bottom-right" />
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-7">
            <span className="text-primary font-label text-xs uppercase tracking-[0.3em] mb-6 block">Business Inquiry</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight mb-8 tracking-tighter">
              Στελέχωση, Οργάνωση <br /> & <span className="italic font-light text-primary">Στρατηγική</span>.
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
              Η σωστή λειτουργία μιας επιχείρησης παρέχει καλύτερη προοπτική ανάπτυξης.
              Προσφέρουμε ανάλυση, οργάνωση ρόλων και δομημένες διαδικασίες στελέχωσης που μετατρέπουν τα καταστήματα σε επιχειρήσεις κύρους.
            </p>
          </div>
        </motion.div>

        {/* Pricing/Services Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Tier 1 */}
          <div className="bg-surface-container-low p-10 flex flex-col h-full border-t border-white/5">
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold text-on-background mb-2">1. Στελέχωση & Αξιολόγηση</h3>
            </div>
            <p className="text-on-surface-variant text-sm flex-grow mb-8 leading-relaxed">
              Διαδικασία επιλογής επαγγελματιών μέσω δοκιμαστικών, όχι απλή προώθηση αγγελιών. Εξοικονόμηση χρόνου και μεγαλύτερη ασφάλεια.
            </p>
            <div className="space-y-2 mt-auto">
              <div className="text-sm text-primary flex justify-between border-b border-white/10 pb-2"><span>Junior / ΔΥΠΑ:</span> <span>300€ + ΦΠΑ</span></div>
              <div className="text-sm text-primary flex justify-between border-b border-white/10 pb-2"><span>Senior (Mani-Pedi):</span> <span>700€ + ΦΠΑ</span></div>
              <div className="text-sm text-primary flex justify-between"><span>Expert (Τεχνητά):</span> <span>1000€ + ΦΠΑ</span></div>
            </div>
          </div>
          
          {/* Tier 2 */}
          <div className="bg-surface-container p-10 flex flex-col h-full shadow-2xl relative border-x border-outline-variant/10">
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold text-on-background mb-2">2. Οργάνωση & Συμβουλευτική</h3>
            </div>
            <p className="text-on-surface-variant text-sm flex-grow mb-8 leading-relaxed">
              Αναλύουμε τη δομή σας και προσφέρουμε κατευθύνσεις για καλύτερη διαχείριση προσωπικού, οργάνωση ρόλων, και μείωση άγχους λειτουργίας.
            </p>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest text-primary/70">Το κοστος διαμορφωνεται κατοπιν αξιολογησης</p>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-surface-container-high p-10 flex flex-col h-full border-t border-secondary-container/30">
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold text-on-background mb-2">3. Franchise & Συνεργασίες</h3>
            </div>
            <p className="text-on-surface-variant text-sm flex-grow mb-8 leading-relaxed">
              Σε επιλεγμένες περιπτώσεις, δημιουργούμε ή εξελίσσουμε ένα κατάστημα μαζί. Περιλαμβάνει Business Plan, διαδικασίες, και πλήρη στελέχωση.
            </p>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest text-[#95d3ba]/70">Επιλεκτικες Συνεργασιες</p>
            </div>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 bg-surface-container-low p-6 md:p-16 rounded-xl">
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="text-primary font-headline text-2xl mb-4">Επικοινωνία B2B</h3>
              <p className="text-sm text-on-surface-variant leading-loose">
                Οι υπηρεσίες μας αφορούν διαδικασία αξιολόγησης και συμβουλευτικής, και δεν αποτελούν εγγύηση πρόσληψης ή έτοιμου οικονομικού αποτελέσματος.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block group-focus-within:text-primary transition-colors">Ονοματεπώνυμο</label>
                  <input {...register("fullName")} className="w-full bg-transparent border-0 border-b border-outline-variant py-3 focus:ring-0 focus:border-primary text-on-surface" type="text" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block group-focus-within:text-primary transition-colors">Όνομα Επιχείρησης</label>
                  <input {...register("company")} className="w-full bg-transparent border-0 border-b border-outline-variant py-3 focus:ring-0 focus:border-primary text-on-surface" type="text" />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block group-focus-within:text-primary transition-colors">Κλάδος</label>
                  <input {...register("industry")} className="w-full bg-transparent border-0 border-b border-outline-variant py-3 focus:ring-0 focus:border-primary text-on-surface" type="text" />
                  {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
                </div>
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block group-focus-within:text-primary transition-colors">Εκτιμώμενο Budget Ανάπτυξης</label>
                  <select {...register("budget")} className="w-full bg-transparent border-0 border-b border-outline-variant py-3 focus:ring-0 focus:border-primary text-on-surface appearance-none cursor-pointer">
                    <option className="bg-surface-container" value="1k-5k">1.000€ - 5.000€</option>
                    <option className="bg-surface-container" value="5k-15k">5.000€ - 15.000€</option>
                    <option className="bg-surface-container" value="15k+">15.000€+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-6 block">Κατηγορίες Ενδιαφέροντος</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "staffing", label: "Συσταση / Στελεχωση" },
                    { id: "consulting", label: "Οργανωση / Consulting" },
                    { id: "franchise", label: "Franchise" },
                  ].map((category) => (
                    <label key={category.id} className="flex items-center gap-4 p-4 bg-surface-container rounded-lg border border-transparent hover:border-outline-variant cursor-pointer transition-all">
                      <input {...register("needs")} value={category.id} type="checkbox" className="w-5 h-5 rounded-sm bg-background border-outline-variant text-primary focus:ring-offset-background focus:ring-primary" />
                      <span className="text-sm font-medium tracking-wide text-on-surface">{category.label}</span>
                    </label>
                  ))}
                </div>
                {errors.needs && <p className="text-red-500 text-xs mt-2">{errors.needs.message}</p>}
              </div>

              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2 block group-focus-within:text-primary transition-colors">Brief / Περιγραφή Έργου</label>
                <textarea {...register("brief")} className="w-full bg-surface-container-highest/30 border-0 border-b border-outline-variant py-4 px-4 focus:ring-0 focus:border-primary text-on-surface rounded-t-lg" rows={4}></textarea>
                {errors.brief && <p className="text-red-500 text-xs mt-1">{errors.brief.message}</p>}
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <label className="flex items-start cursor-pointer">
                  <input {...register("consentContact")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                  <span className="text-sm text-on-surface-variant">Επιθυμώ επικοινωνία για ενημέρωση υπηρεσιών.</span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input {...register("consentNotGuarantee")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                  <span className="text-sm text-on-surface-variant">Κατανοώ ότι η υποβολή στοιχείων αφορά αξιολόγηση αναγκών και δεν αποτελεί υποχρέωση συνεργασίας.</span>
                </label>
                <label className="flex items-start cursor-pointer">
                  <input {...register("gdpr")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                  <span className="text-sm text-on-surface-variant">Αποδέχομαι την <span className="text-primary hover:underline">Πολιτική Απορρήτου</span>. (Υποχρεωτικό)</span>
                </label>
                {errors.gdpr && <p className="text-red-500 text-xs">{errors.gdpr.message}</p>}

                <button type="submit" disabled={isSubmitting} className="group mt-4 flex items-center justify-center gap-4 bg-gradient-to-br from-[#c5a059] to-[#e9c176] text-[#412d00] px-12 py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_40px_rgba(233,193,118,0.2)] transition-all disabled:opacity-50">
                  {isSubmitting ? "Αποστολη..." : "Υποβολη Στοιχειων Επιχειρησης"}
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
