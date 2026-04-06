import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock");
const TO_EMAIL = process.env.ADMIN_EMAIL || "contact@kapernarosbeauty.gr";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.log("[MOCK] Sending Email for Synergasies:", data);
      return NextResponse.json({ success: true, message: "Mock email sent" });
    }

    const { data: resData, error } = await resend.emails.send({
      from: "Kapernaros Beauty PR <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `Νέα Πρόταση Συνεργασίας: ${data.brandName}`,
      html: `
        <h2>Νέα Πρόταση Συνεργασίας (PR & Media)</h2>
        <ul>
          <li><strong>Brand/Εκπρόσωπος:</strong> ${data.brandName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Τηλέφωνο:</strong> ${data.phone}</li>
          <li><strong>Είδος Συνεργασίας:</strong> ${data.category}</li>
        </ul>
        <h3>Περιγραφή Πρότασης:</h3>
        <p>${data.proposal || "-"}</p>
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
