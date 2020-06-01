// required npm packages
var express = require('express');

// router to handle stripe webhook
var stripeWebhook = express.Router();

stripeWebhook.route('/')
.post((req, res) => {
    let event = req.body;

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            console.log("Payment Intent : " + paymentIntent);
            res.status(200).send("success!");
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            console.log("Payment method : " + paymentMethod);
            res.status(200).send("success!");
            break;
        // ... handle other event types
        default:
        // Unexpected event type
            return response.status(400).send("Unexpected event type");
    }
})

module.exports = stripeWebhook;