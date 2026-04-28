import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // ← keep this until you verify your domain
      to: "ruknabhbhattacharyya009@gmail.com",           // ← your email
      replyTo: email,                                     // ← visitor's email, so you can reply directly
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif; max-width:520px; padding:32px; border:1px solid #eee;">
          <h2 style="margin:0 0 24px; font-size:20px;">New contact from your portfolio</h2>

          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0; color:#888; width:80px; font-size:13px;">Name</td>
              <td style="padding:8px 0; font-weight:600; font-size:13px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0; color:#888; font-size:13px;">Email</td>
              <td style="padding:8px 0; font-size:13px;">
                <a href="mailto:${email}" style="color:#D94E28;">${email}</a>
              </td>
            </tr>
          </table>

          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

          <p style="margin:0; color:#444; font-size:14px; line-height:1.7; white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}