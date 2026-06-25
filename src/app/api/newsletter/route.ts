import { NextResponse } from 'next/server';
import { saveSubscriber } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const saved = await saveSubscriber({
      name: name || '',
      email,
      whatsapp: whatsapp || '',
    });

    if (!saved && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('[newsletter] Signup (dev):', email);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('[newsletter] Failed:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
