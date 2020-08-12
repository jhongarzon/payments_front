import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../payments/checkout-form.css";
import productsApi from "../products/products-api";
import { useUser } from '../../context/user-provider.jsx';

export default function CheckoutForm(props) {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useUser();
    // const [selectedProduct, setSelectedProduct] = useState({ name: "", price:0, description: "", image: "" });

    // setSelectedProduct(props.product);
    debugger;

    useEffect(() => {

        async function loadProductDetails() {

            var roundedAmount = Math.round(props.product.price);
            var currency = props.product.currency.name;
            setAmount(roundedAmount);
            setCurrency(currency);
            debugger;
            // Step 2: Create PaymentIntent over Stripe API
            productsApi
                .createPaymentIntent(roundedAmount, currency)
                .then((clientSecret) => {
                    setClientSecret(clientSecret);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
        loadProductDetails();




    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setProcessing(true);

        // Step 3: Use clientSecret from PaymentIntent and the CardElement
        // to confirm payment with stripe.confirmCardPayment()
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
            console.log("[error]", payload.error);
        } else {
            setError(null);
            setSucceeded(true);
            setProcessing(false);
            setMetadata(payload.paymentIntent);
            console.log("[PaymentIntent]", payload.paymentIntent);
        }
    };

    const renderSuccess = () => {
        return (
            <div className="sr-field-success message">
                <h1>Your test payment succeeded</h1>
                <p>View PaymentIntent response:</p>
                <pre className="sr-callout">
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre>
            </div>
        );
    };

    const renderForm = () => {
        const options = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4",
                    },
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            },
        };

        return (
            <div className="chk_container">
                <form onSubmit={handleSubmit} className="frm">
                    <h1>
                        {currency.toLocaleUpperCase()}{" "}
                        {amount.toLocaleString(navigator.language, {
                            minimumFractionDigits: 2,
                        })}{" "}
                    </h1>
                    <h4>Pre-order</h4>

                    <div className="sr-combo-inputs">
                        <div className="sr-combo-inputs-row">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                autoComplete="cardholder"
                                className="sr-input"
                                defaultValue={user?.user?.name}
                            />
                        </div>

                        <div className="sr-combo-inputs-row">
                            <CardElement
                                className="sr-input sr-card-element"
                                options={options}
                            />
                        </div>
                    </div>

                    {error && <div className="message sr-field-error">{error}</div>}

                    <button
                        className="btn"
                        disabled={processing || !clientSecret || !stripe}
                    >
                        {processing ? "Processing…" : "Pay"}
                    </button>
                </form>
            </div>
        );
    };

    return (
        <div className="checkout-form">
            <div className="sr-payment-form">
                <div className="sr-form-row" />
                {succeeded ? renderSuccess() : renderForm()}
            </div>
        </div>
    );
}