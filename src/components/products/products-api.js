import api from '../../lib/api';

// FEEDBACK: this is cool but Spraypaint might make things a lot easier for you. graphiti.dev/js
const getProductDetails = (productId) => {
    const url = "api/v1/products.json?include=currency&fields[products]=price&filter[id]=" + productId;
    return api.get(url)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        }).then(data => {
            if (!data || data.error || data.data == null || data.data[0] == null) {
                console.log("API error:", { data });
                throw Error("API Error");
            } else {
                return data.data[0];
            }
        });
};

const createPaymentIntent = (amount, currency, currencyId, productId) => {
    const url = "api/v1/payment_intents";
    return api.post(url, { amount, currency, currency_id: currencyId, product_id: productId })
        .then(res => {
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        }).then(data => {
            if (!data || data.error) {
                console.log("API error:", { data });
                throw new Error("PaymentIntent API Error");
            } else {
                return data;
            }
        });
};
const paymentResult = (paymentIntentId, status,productId) => {
    const url = "api/v1/payments";
    return api.post(url, { payment_intent_id: paymentIntentId, status, product_id: productId})
        .then(res => {
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        }).then(data => {
            if (!data || data.error) {
                console.log("API error:", { data });
                throw new Error("PaymentIntent API Error");
            } else {
                return data.success;
            }
        });
};
const getPublicStripeKey = options => {
    const url = "getstripeKey";

    return api.get(url)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        }).then(data => {
            if (!data || data.error || data.public_key == null) {
                console.log("API error:", { data });
                throw Error("API Error");
            } else {
                return data.public_key;
            }
        });
};

const productsApi = {
    createPaymentIntent,
    paymentResult,
    getPublicStripeKey: getPublicStripeKey,
    getProductDetails: getProductDetails
};



export default productsApi;
