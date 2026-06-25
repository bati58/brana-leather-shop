import { NextResponse } from 'next/server';
import { getActivePaymentMethods } from '@/lib/site-config';
import type { PaymentMethod } from '@/types';

const ALLOWED = () => new Set(getActivePaymentMethods().map((m) => m.id));

export async function POST(request: Request) {
  try {
    const { amount, email, firstName, lastName, phone, orderId, paymentMethod } =
      await request.json();

    const payment = paymentMethod as PaymentMethod;
    const allowed = ALLOWED();

    if (!allowed.has(payment)) {
      return NextResponse.json({ error: 'Payment method not available' }, { status: 400 });
    }

    if (payment === 'cod') {
      return NextResponse.json({
        success: true,
        checkout_url: `/checkout?order=${orderId}&payment=cod`,
      });
    }

    const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (!chapaSecretKey) {
      return NextResponse.json({
        success: true,
        checkout_url: `/checkout?order=${orderId}&payment=${payment}&status=pending`,
        message:
          'Chapa key not set — order saved. Add CHAPA_SECRET_KEY to enable live Telebirr/CBE checkout.',
      });
    }

    if (payment === 'telebirr' || payment === 'cbe') {
      const type = payment === 'telebirr' ? 'telebirr' : 'cbebirr';

      if (!phone) {
        return NextResponse.json({ error: 'Phone number is required for mobile payment' }, { status: 400 });
      }

      const formData = new FormData();
      formData.append('amount', String(amount));
      formData.append('currency', 'ETB');
      formData.append('tx_ref', String(orderId));
      formData.append('mobile', phone);
      if (email) formData.append('email', email);
      if (firstName) formData.append('first_name', firstName);
      if (lastName) formData.append('last_name', lastName);

      const response = await fetch(
        `https://api.chapa.co/v1/charges?type=${encodeURIComponent(type)}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${chapaSecretKey}` },
          body: formData,
        }
      );

      const data = await response.json().catch(() => null);

      if (data?.status === 'success' && data?.data?.checkout_url) {
        return NextResponse.json({
          success: true,
          checkout_url: data.data.checkout_url,
        });
      }

      return NextResponse.json(
        { error: data?.message || 'Payment initialization failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 500 });
  }
}
