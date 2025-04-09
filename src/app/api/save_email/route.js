import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { name, email, message } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "zailak@nexodesigns.com", // aapki Hostinger wali email
      pass: "Zaialak#12", // uska password
    },
  });

  try {
    await transporter.sendMail({
      from: `"${email}" <zailak@nexodesigns.com>`,  // Use your email as the sender
      to: "zailak@nexodesigns.com",  // Recipient email
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Email sending failed:", err);
     return NextResponse.json({ error: err.message }, { status: 500 });
  
  }
}
