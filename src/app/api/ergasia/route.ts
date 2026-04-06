import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock"); // fallback for mock
const TO_EMAIL = process.env.ADMIN_EMAIL || "contact@kapernarosbeauty.gr";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.log("[MOCK] Sending Email for Ergasia:", data);
      return NextResponse.json({ success: true, message: "Mock email sent" });
    }

    const { data: resData, error } = await resend.emails.send({
      from: "Kapernaros Beauty <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Νέα Αίτηση Αξιολόγησης (Εργασία): ${data.fullName}`,
      html: `
        <h2>Νέα Αίτηση Αξιολόγησης</h2>
        <ul>
          <li><strong>Ονοματεπώνυμο:</strong> ${data.fullName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Τηλέφωνο:</strong> ${data.phone}</li>
          <li><strong>Τοποθεσία:</strong> ${data.location}</li>
          <li><strong>Ειδικότητα:</strong> ${data.specialization}</li>
          <li><strong>Χρόνια Εμπειρίας:</strong> ${data.experience}</li>
          <li><strong>LinkedIn:</strong> ${data.linkedin || "-"}</li>
          <li><strong>Instagram:</strong> ${data.instagram || "-"}</li>
        </ul>
        <h3>Περιγραφή Μεθοδολογίας:</h3>
        <p>${data.expertise || "-"}</p>
        <p><small>Οι συγκαταθέσεις GDPR και συνάντησης έχουν δοθεί επιτυχώς.</small></p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: resData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
