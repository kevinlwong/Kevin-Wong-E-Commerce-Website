import {initMongoose} from "../../lib/mongoose";
import Order from "../../models/Order";
import {buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// localhost:3000/api/webhook
export default async function handler(req, res) {
  await initMongoose();
  const signingSecret = 'whsec_922452661de5004fbb10d62d1de51c83a142666260a8e69eb81b9a6d1bc9b5a6';
  const payload = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

  if (event?.type === 'checkout.session.completed') {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === 'paid') {
      await Order.findByIdAndUpdate(metadata.orderId, {paid:1});
    }
  }

  res.json('ok');
}

export const config = {
  api: {
    bodyParser: false,
  }
};