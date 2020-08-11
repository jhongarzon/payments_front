import axios from "axios";

export default axios.create({
    baseURL: "https://api.stripe.com/",
    responseType: "json"
});