var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "9tst74b27hjb6w8r",
    publicKey: "hnxzjmf87fs644jj",
    privateKey: "19b8b8881bf868aab400c20d1d0674a3"
});
app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});
app.post("/checkout", function (req, res) {
    var nonce = req.body.payment_method_nonce;
    // Use payment method nonce here
});
gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
        submitForSettlement: true
    }
}, function (err, result) {
});// JavaScript source code
