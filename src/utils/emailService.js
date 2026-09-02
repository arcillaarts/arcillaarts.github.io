import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// Initialize emailjs once
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY);
}

export const sendOrderEmail = async ({ name, email, phone, cart, total, deliveryCharge = 0 }) => {
  const grandTotal = total + deliveryCharge;

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  let itemsText = cart.map(item => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`).join('\n');
  let itemsHtml = cart.map(item => `<li>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</li>`).join('');

  const templateParams = {
    customer_name: name,
    customer_email: email,
    items_list: itemsText,
    items_html: `<ul>${itemsHtml}</ul>`,
    order_total: `₹${grandTotal}`,
    order_date: new Date().toLocaleString(),
    order_id: orderId,
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};
