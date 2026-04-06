import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock");
const TO_EMAIL = process.env.ADMIN_EMAIL || "contact@kapernarosbeauty.gr";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.log("[MOCK] Sending Email for Epixeiriseis:", data);
      return NextResponse.json({ success: true, message: "Mock email sent" });
    }

    const { data: resData, error } = await resend.emails.send({
      from: "Kapernaros Beauty B2B <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Νέο Business Inquiry: ${data.company}`,
      html: `
        <h2>Νέο Αίτημα Συνεργασίας/Στελέχωσης Επιχείρησης</h2>
        <ul>
          <li><strong>Επιχείρηση:</strong> ${data.company}</li>
          <li><strong>Εκπρόσωπος:</strong> ${data.fullName}</li>
          <li><strong>Κλάδος:</strong> ${data.industry}</li>
          <li><strong>Budget:</strong> ${data.budget}</li>
          <li><strong>Ανάγκες:</strong> ${data.needs.join(", ")}</li>
        </ul>
        <h3>Περιγραφή/Brief:</h3>
        <p>${data.brief || "-"}</p>
        <p><small>Οι συγκαταθέσεις ενημέρωσης και GDPR έχουν δοθεί επιτυχώς.</small></p>
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
