import { NextResponse } from 'next/server';

const subscribers: { name: string; email: string; whatsapp?: string; createdAt: string }[] = [];

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    subscribers.push({
      name: name || '',
      email,
      whatsapp: whatsapp || '',
      createdAt: new Date().toISOString(),
    });

    // In production: save to Supabase/Mailchimp
    console.log('Newsletter signup:', email);

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
