"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  brandName: z.string().min(2, "Το όνομα είναι υποχρεωτικό"),
  email: z.string().email("Μη έγκυρο email"),
  phone: z.string().min(10, "Μη έγκυρο τηλέφωνο"),
  category: z.string().min(1, "Επιλέξτε είδος συνεργασίας"),
  proposal: z.string().min(10, "Παρακαλούμε προσθέστε περιγραφή της πρότασης"),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου" }),
  } as any),
});

type FormValues = z.infer<typeof formSchema>;

export default function SynergasiesPage() {
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
      const response = await fetch("/api/synergasies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Σφάλμα κατά την υποβολή");

      toast.success("Η πρόταση σας απεστάλη επιτυχώς!");
      reset();
    } catch (error) {
      toast.error("Υπήρξε ένα πρόβλημα. Προσπαθήστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-surface">
      <Toaster position="bottom-right" />
      <div className="max-w-4xl mx-auto space-y-16">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">PR & Media</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-on-surface">
            Συνεργασίες με <br />
            <span className="italic text-primary">Κοινή Φιλοσοφία.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Απευθυνόμαστε σε brands, εταιρείες, media creators και διοργανωτές events που μοιράζονται το ίδιο όραμα για ποιότητα, δομή και εξέλιξη στον χώρο της ομορφιάς. Επίσης, δεχόμαστε προτάσεις για ολοκληρωμένες συνεργασίες Franchise.
          </p>
          <div className="inline-block mt-8 p-4 bg-error-container/20 border border-error/20 text-error/90 text-sm max-w-md mx-auto text-left">
            <span className="font-bold underline">ΣΗΜΑΝΤΙΚΟ:</span> Η διαδικασία πραγματοποιείται αποκλειστικά μέσω της παρακάτω φόρμας. Δεν εξετάζονται αιτήματα μέσω προσωπικών μηνυμάτων (DMs) στα Social Media.
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-surface-container-low p-8 md:p-12 border border-white/5 shadow-2xl relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Όνομα Εκπροσώπου / Brand / Εταιρεία</label>
                <input {...register("brandName")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3" type="text" />
                {errors.brandName && <p className="text-red-500 text-xs">{errors.brandName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Τηλέφωνο</label>
                <input {...register("phone")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3" type="tel" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                <input {...register("email")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3" type="email" />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Είδος Συνεργασίας</label>
                <select {...register("category")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3 appearance-none cursor-pointer">
                  <option value="">Επιλέξτε...</option>
                  <option value="sponsorship">Χορηγία-PR</option>
                  <option value="event">Event-Εκδήλωση</option>
                  <option value="media">Media-Συνέντευξη</option>
                  <option value="franchise">Franchise</option>
                  <option value="other">Άλλο</option>
                </select>
                <span className="material-symbols-outlined absolute right-0 top-[38px] text-primary pointer-events-none">expand_more</span>
                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Περιγραφή Πρότασης</label>
              <textarea {...register("proposal")} className="w-full bg-surface-container-highest/50 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 rounded-t-sm" rows={5}></textarea>
              {errors.proposal && <p className="text-red-500 text-xs">{errors.proposal.message}</p>}
            </div>

            <div className="pt-6">
              <label className="flex items-start max-w-xl cursor-pointer">
                <input {...register("gdpr")} type="checkbox" className="mt-1 mr-4 bg-transparent border-primary text-primary focus:ring-offset-background focus:ring-primary rounded-sm w-5 h-5" />
                <span className="text-sm text-on-surface-variant leading-relaxed">
                  Αποδέχομαι την <span className="text-primary hover:underline">Πολιτική Απορρήτου</span>.
                </span>
              </label>
              {errors.gdpr && <p className="text-red-500 text-xs mt-1">{errors.gdpr.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-secondary-container text-on-secondary-container font-bold uppercase tracking-[0.2em] text-sm px-8 py-4 mt-6 hover:bg-secondary-fixed transition-all disabled:opacity-50">
              {isSubmitting ? "Υποβολη..." : "Υποβολη Προτασης"}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
