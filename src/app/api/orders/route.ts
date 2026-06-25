import { NextResponse } from 'next/server';
import { sendOrderEmails } from '@/lib/email';
import { saveOrder } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const order = await request.json();

    if (!order.items?.length || !order.customer?.email) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    const orderRecord = {
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const savedToDb = await saveOrder({
      id: order.id,
      customer: order.customer,
      items: order.items,
      deliveryMethod: order.deliveryMethod,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      status: 'pending',
    });

    await sendOrderEmails({
      id: order.id,
      customer: order.customer,
      items: order.items,
      deliveryMethod: order.deliveryMethod,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      persisted: savedToDb,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('[orders] Failed:', error);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Orders API — POST to create an order',
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}
