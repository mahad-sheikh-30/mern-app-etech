const express = require("express");
const auth = require("../middleware/auth");
const {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-checkout-session", auth, createCheckoutSession);
router.post("/create-payment-intent", auth, createPaymentIntent);

module.exports = router;
module.exports.handleWebhook = handleWebhook;
