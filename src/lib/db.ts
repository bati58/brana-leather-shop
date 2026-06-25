import type { PaymentMethod } from '@/types';
import { getSupabaseAdmin } from '@/lib/supabase';

export interface OrderRecord {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: unknown[];
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  total: number;
  status?: string;
}

export async function saveOrder(order: OrderRecord): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from('orders').insert({
    id: order.id,
    customer: order.customer,
    items: order.items,
    delivery_method: order.deliveryMethod,
    payment_method: order.paymentMethod,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    status: order.status ?? 'pending',
  });

  if (error) {
    console.error('[supabase] saveOrder failed:', error.message);
    return false;
  }

  return true;
}

export async function saveSubscriber(data: {
  name: string;
  email: string;
  whatsapp?: string;
}): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from('subscribers').upsert(
    {
      name: data.name || '',
      email: data.email,
      whatsapp: data.whatsapp || '',
    },
    { onConflict: 'email' }
  );

  if (error) {
    console.error('[supabase] saveSubscriber failed:', error.message);
    return false;
  }

  return true;
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from('contact_messages').insert({
    name: data.name,
    email: data.email,
    message: data.message,
  });

  if (error) {
    console.error('[supabase] saveContactMessage failed:', error.message);
    return false;
  }

  return true;
}
