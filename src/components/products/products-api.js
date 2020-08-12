import api from '../../lib/api';

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

const createPaymentIntent = (amount, currency) => {    
    const url = "api/v1/payment_intents";
    return api.post(url, { amount, currency })
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
                return data.client_secret;
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
    getPublicStripeKey: getPublicStripeKey,
    getProductDetails: getProductDetails
};



export default productsApi;