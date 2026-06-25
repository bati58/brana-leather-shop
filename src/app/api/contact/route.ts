import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // In production: send email notification, save to Supabase
    console.log('Contact form submission:', { name, email, message: message.substring(0, 50) });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
