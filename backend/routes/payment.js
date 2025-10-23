const express = require("express");
const auth = require("../middleware/auth");
const {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

// ✅ Normal payment routes
router.post("/create-checkout-session", auth, createCheckoutSession);
router.post("/create-payment-intent", auth, createPaymentIntent);

// Export both router and webhook handler (for index.js)
module.exports = router;
module.exports.handleWebhook = handleWebhook;
