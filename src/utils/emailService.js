import emailjs from '@emailjs/browser';

const SERVICE_ID = 'YOUR_SERVICE_ID';  // Replace with your EmailJS service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID  
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Replace with your EmailJS public key

export const sendOrderEmail = ({ name, email, phone, cart, total }) => {
  const deliveryCharge = total > 499 ? 0 : 79; // Logic for delivery based on dummy standard option
  const grandTotal = total + deliveryCharge;

  let itemsText = '';
  cart.forEach((item, index) => {
    itemsText += `${index + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}\n`;
  });

  const message = `Order from: ${name}\nContact: +91 ${phone}\nEmail: ${email}\n\nItems:\n${itemsText}\nSubtotal: ₹${total}\nDelivery: ₹${deliveryCharge}\nGrand Total: ₹${grandTotal}`;

  const templateParams = {
    to_name: 'Arcilla Arts Admin',
    from_name: name,
    message: message,
    reply_to: email,
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};
