import { siteConfig, paymentMethodLabel } from '@/lib/site-config';
import { formatPrice } from '@/lib/utils';
import type { PaymentMethod } from '@/types';

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = Array.isArray(to) ? to : [to];

  if (!apiKey) {
    console.log('[email:dev-mode] Would send email:', {
      to: recipients,
      subject,
      replyTo,
    });
    return { ok: true, dev: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: siteConfig.notifications.from,
      to: recipients,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[email] Send failed:', error);
    return { ok: false, error };
  }

  return { ok: true };
}

interface OrderEmailPayload {
  id: string;
  customer: { name: string; email: string; phone: string; address: string; city: string };
  items: { name: string; quantity: number; price: number; color: string; size?: string }[];
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  total: number;
}

function orderItemsHtml(items: OrderEmailPayload['items']) {
  return items
    .map(
      (item) =>
        `<li>${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}<br/><small>${[item.color, item.size].filter(Boolean).join(' · ')}</small></li>`
    )
    .join('');
}

export async function sendOrderEmails(order: OrderEmailPayload) {
  const paymentLabel = paymentMethodLabel(order.paymentMethod);
  const deliveryLabel = order.deliveryMethod === 'pickup' ? 'Store pickup (Bishoftu)' : 'Home delivery';

  const customerHtml = `
    <h2>Thank you for your order, ${order.customer.name}!</h2>
    <p>Order <strong>${order.id}</strong> has been received.</p>
    <p><strong>Payment:</strong> ${paymentLabel}<br/>
    <strong>Delivery:</strong> ${deliveryLabel}</p>
    <ul>${orderItemsHtml(order.items)}</ul>
    <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
    <p>We will contact you on WhatsApp at ${order.customer.phone} with updates.</p>
    <p>— ${siteConfig.name}</p>
  `;

  const adminHtml = `
    <h2>New order: ${order.id}</h2>
    <p><strong>Customer:</strong> ${order.customer.name}<br/>
    <strong>Email:</strong> ${order.customer.email}<br/>
    <strong>Phone:</strong> ${order.customer.phone}<br/>
    <strong>Address:</strong> ${order.customer.address}, ${order.customer.city}</p>
    <p><strong>Payment:</strong> ${paymentLabel}<br/>
    <strong>Delivery:</strong> ${deliveryLabel}</p>
    <ul>${orderItemsHtml(order.items)}</ul>
    <p><strong>Subtotal:</strong> ${formatPrice(order.subtotal)}<br/>
    <strong>Shipping:</strong> ${order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}<br/>
    <strong>Total:</strong> ${formatPrice(order.total)}</p>
  `;

  await Promise.all([
    sendEmail({
      to: order.customer.email,
      subject: `Order confirmed — ${order.id} | ${siteConfig.name}`,
      html: customerHtml,
      replyTo: siteConfig.notifications.email,
    }),
    sendEmail({
      to: siteConfig.notifications.email,
      subject: `[New Order] ${order.id} — ${formatPrice(order.total)}`,
      html: adminHtml,
      replyTo: order.customer.email,
    }),
  ]);
}

export async function sendContactNotification(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const html = `
    <h2>New contact message</h2>
    <p><strong>From:</strong> ${payload.name} (${payload.email})</p>
    <p>${payload.message.replace(/\n/g, '<br/>')}</p>
  `;

  await sendEmail({
    to: siteConfig.notifications.email,
    subject: `[Contact] Message from ${payload.name}`,
    html,
    replyTo: payload.email,
  });
}
