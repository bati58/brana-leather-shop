import { NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/email';
import { saveContactMessage } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await saveContactMessage({ name, email, message });
    await sendContactNotification({ name, email, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('[contact] Failed:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
