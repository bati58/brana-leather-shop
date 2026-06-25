import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, firstName, lastName, phone, orderId, paymentMethod } =
      await request.json();

    const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const demoCheckoutUrl = `/checkout?order=${orderId}&payment=demo`;

    if (!chapaSecretKey || !siteUrl) {
      return NextResponse.json({
        success: true,
        checkout_url: demoCheckoutUrl,
        message: 'Chapa not configured — demo mode active',
      });
    }

    const payment = paymentMethod || 'chapa';

    // COD & Stripe are handled as demo in this prototype (Stripe requires extra setup).
    if (payment === 'cod' || payment === 'stripe') {
      return NextResponse.json({
        success: true,
        checkout_url: `/checkout?order=${orderId}&payment=${payment}`,
      });
    }

    // Local payments: use Chapa direct charges for Telebirr / CBE Birr.
    if (payment === 'telebirr' || payment === 'cbe') {
      const type = payment === 'telebirr' ? 'telebirr' : 'cbebirr';

      if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
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
          headers: {
            Authorization: `Bearer ${chapaSecretKey}`,
          },
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
        {
          error: data?.message || 'Payment initialization failed',
        },
        { status: 400 }
      );
    }

    // Default: Chapa transaction initialize flow.
    const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${chapaSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'ETB',
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref: orderId,
        callback_url: `${siteUrl}/checkout?order=${orderId}`,
        return_url: `${siteUrl}/checkout?order=${orderId}`,
        customization: {
          title: 'Brana Leather',
          description: `Order ${orderId}`,
        },
      }),
    });

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.json({
        success: true,
        checkout_url: data.data.checkout_url,
      });
    }

    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 500 });
  }
}
