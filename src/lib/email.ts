import { siteConfig, paymentMethodLabel, whatsappUrl } from '@/lib/site-config';
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
  createdAt?: string;
}

function formatOrderDate(iso?: string): string {
  const date = iso ? new Date(iso) : new Date();
  return date.toLocaleString('en-ET', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Addis_Ababa',
  });
}

function paymentStatusLabel(method: PaymentMethod): string {
  if (method === 'cod') return 'Pay on delivery';
  if (method === 'telebirr' || method === 'cbe') return 'Awaiting payment';
  return 'Pending';
}

function emailLayout(title: string, body: string): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1A1A1A;">
      <div style="background: #1A1A1A; padding: 24px; text-align: center;">
        <p style="margin: 0; color: #B8860B; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;">${siteConfig.name}</p>
        <h1 style="margin: 8px 0 0; color: #FAF7F2; font-size: 22px; font-weight: normal;">${title}</h1>
      </div>
      <div style="background: #FAF7F2; padding: 28px 24px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6;">
        ${body}
      </div>
      <div style="padding: 16px 24px; text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #888;">
        ${siteConfig.address} · ${siteConfig.phone}
      </div>
    </div>
  `;
}

function orderItemsHtml(items: OrderEmailPayload['items']) {
  return items
    .map(
      (item) =>
        `<li style="margin-bottom: 8px;">${item.name} × ${item.quantity} — <strong>${formatPrice(item.price * item.quantity)}</strong><br/><span style="color: #666; font-size: 13px;">${[item.color, item.size].filter(Boolean).join(' · ')}</span></li>`
    )
    .join('');
}

function customerWhatsAppLink(order: OrderEmailPayload): string {
  const message = `Hello ${order.customer.name}, this is Brana Leather regarding your order ${order.id}.`;
  return whatsappUrl(message, order.customer.phone);
}

export async function sendOrderEmails(order: OrderEmailPayload) {
  const paymentLabel = paymentMethodLabel(order.paymentMethod);
  const deliveryLabel = order.deliveryMethod === 'pickup' ? 'Store pickup (Bishoftu)' : 'Home delivery';
  const statusLabel = paymentStatusLabel(order.paymentMethod);
  const orderDate = formatOrderDate(order.createdAt);
  const waLink = customerWhatsAppLink(order);

  const customerBody = `
    <p>Thank you, <strong>${order.customer.name}</strong>!</p>
    <p>Your order <strong>${order.id}</strong> has been received on ${orderDate}.</p>
    <p>
      <strong>Payment:</strong> ${paymentLabel} (${statusLabel})<br/>
      <strong>Delivery:</strong> ${deliveryLabel}
    </p>
    <ul style="padding-left: 20px;">${orderItemsHtml(order.items)}</ul>
    <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
    <p>We will contact you on WhatsApp at ${order.customer.phone} with updates.</p>
    <p style="margin-top: 24px;">— ${siteConfig.name}</p>
  `;

  const adminBody = `
    <p style="color: #666; margin-top: 0;">Placed ${orderDate}</p>
    <p>
      <strong>Customer:</strong> ${order.customer.name}<br/>
      <strong>Email:</strong> <a href="mailto:${order.customer.email}">${order.customer.email}</a><br/>
      <strong>Phone:</strong> <a href="tel:${order.customer.phone}">${order.customer.phone}</a><br/>
      <strong>Address:</strong> ${order.customer.address}, ${order.customer.city}
    </p>
    <p>
      <strong>Payment:</strong> ${paymentLabel}<br/>
      <strong>Status:</strong> ${statusLabel}<br/>
      <strong>Delivery:</strong> ${deliveryLabel}
    </p>
    <ul style="padding-left: 20px;">${orderItemsHtml(order.items)}</ul>
    <p>
      <strong>Subtotal:</strong> ${formatPrice(order.subtotal)}<br/>
      <strong>Shipping:</strong> ${order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}<br/>
      <strong>Total:</strong> ${formatPrice(order.total)}
    </p>
    <p style="margin-top: 24px;">
      <a href="${waLink}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply on WhatsApp</a>
    </p>
  `;

  await Promise.all([
    sendEmail({
      to: order.customer.email,
      subject: `Order confirmed — ${order.id} | ${siteConfig.name}`,
      html: emailLayout('Order Confirmed', customerBody),
      replyTo: siteConfig.notifications.email,
    }),
    sendEmail({
      to: siteConfig.notifications.email,
      subject: `[New Order] ${order.id} — ${formatPrice(order.total)}`,
      html: emailLayout(`New Order ${order.id}`, adminBody),
      replyTo: order.customer.email,
    }),
  ]);
}

export async function sendContactNotification(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const receivedAt = formatOrderDate();
  const body = `
    <p style="color: #666; margin-top: 0;">Received ${receivedAt}</p>
    <p><strong>From:</strong> ${payload.name}<br/>
    <strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
    <p style="background: #fff; padding: 16px; border-left: 3px solid #B8860B;">${payload.message.replace(/\n/g, '<br/>')}</p>
    <p><a href="mailto:${payload.email}?subject=Re: Your message to Brana Leather">Reply by email</a></p>
  `;

  await sendEmail({
    to: siteConfig.notifications.email,
    subject: `[Contact] Message from ${payload.name}`,
    html: emailLayout('New Contact Message', body),
    replyTo: payload.email,
  });
}
