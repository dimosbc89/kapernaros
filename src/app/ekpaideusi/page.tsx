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
  specialization: z.string().min(2, "Συμπληρώστε ειδικότητα και εμπειρία"),
  improvement: z.string().optional(),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου" }),
  } as any),
});

type FormValues = z.infer<typeof formSchema>;

export default function EkpaideusiPage() {
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
      const response = await fetch("/api/ekpaideusi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Σφάλμα κατά την υποβολή");

      toast.success("Η εγγραφή σας στη λίστα αναμονής ολοκληρώθηκε!");
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
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Education & Mentoring</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-on-surface">
            Η τεχνική σε κάνει καλό. <br/>
            <span className="italic text-primary">Η νοοτροπία σε κάνει κορυφαίο.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Η εκπαίδευση στον χώρο της ομορφιάς δεν σταματά στην αποφοίτηση. Εκεί ακριβώς ξεκινά. Με την εμπειρία χρόνων ως Καθηγητής στο ΙΕΚ ΑΚΜΗ και την καθημερινή τριβή με την αγορά, τα εκπαιδευτικά προγράμματα προσαρμόζονται στις σύγχρονες απαιτήσεις. 
            <br/><br/> Είτε είστε νέος απόφοιτος είτε έμπειρος επαγγελματίας, η εκπαίδευση μαζί μου αναβαθμίζει τεχνική, επαγγελματισμό και business mindset.
          </p>
          <p className="text-primary font-semibold uppercase tracking-widest text-sm pt-6">Συντομα νεα Masterclasses & Mentoring Sessions</p>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-surface-container-low p-8 md:p-12 border border-white/5 shadow-2xl relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <h2 className="text-2xl font-display text-on-surface mb-8 border-b border-white/10 pb-4">Λίστα Αναμονής</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ονοματεπώνυμο</label>
                <input {...register("fullName")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3" type="text" />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
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
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Ειδικότητα & Χρόνια Εμπειρίας</label>
                <input {...register("specialization")} className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface px-0 py-3" placeholder="π.χ. Μανικιούρ, 3 χρόνια" type="text" />
                {errors.specialization && <p className="text-red-500 text-xs">{errors.specialization.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Τι θα θέλατε να βελτιώσετε;</label>
              <textarea {...register("improvement")} className="w-full bg-surface-container-highest/50 border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 rounded-t-sm" rows={4}></textarea>
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

            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-on-primary font-bold uppercase tracking-[0.2em] text-sm px-8 py-4 mt-6 hover:bg-primary-fixed-dim transition-all disabled:opacity-50">
              {isSubmitting ? "Εγγραφη..." : "Εγγραφη στη Λιστα Αναμονης"}
            </button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
