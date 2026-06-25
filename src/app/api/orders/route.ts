import { NextResponse } from 'next/server';

const orders: unknown[] = [];

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

    orders.push(orderRecord);

    // In production: save to Supabase, send confirmation email via Mailchimp/SendGrid
    console.log('New order received:', orderRecord.id);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Order placed successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ orders: orders.length });
}
