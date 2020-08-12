import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SingleProduct from './single-product';
import ProductDetail from './product-detail';
import api from '../../lib/api';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/payments/checkout-form";
import productsApi from "../../components/products/products-api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

export default function ShowProducts() {
    const stripePromise = productsApi.getPublicStripeKey().then(key => loadStripe(key));
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    // const [stripePublicKey, setStripeKey] = useState("");
    const [isReadyToPay, setReadyToPay] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", description: "", image: "1.jpg", price:0, currency:{name:""} });

    const handleClickOpen = (e, product) => {
        setOpen(true);
        setSelectedProduct(product);
        console.log(product);
    };

    const handleClose = () => {
        setOpen(false);
        setReadyToPay(false);
    };
    const handlePay = () => {
        setReadyToPay(true);
    };


    useEffect(() => {

        async function loadApps() {
            const url = "api/v1/products.json?include=currency"; //?fields[apps]=code,name
            const result = await api.get(url);
            if (result?.data?.data != null)
                setRows(result.data.data);
        }
        loadApps();

    }, []);
    if (isReadyToPay && selectedProduct != null) {
        return (
            <Elements stripe={stripePromise}>
                <CheckoutForm product={selectedProduct} />
            </Elements>
        );
    }
    return (
        <div>
            <div className={classes.root}>
                <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                    {rows.map((tile) => (
                        <GridListTile key={tile.id} cols={tile.is_enabled ? 2 : 1} rows={tile.is_enabled ? 2 : 1}>
                            <SingleProduct handleClick={handleClickOpen} product={tile} ></SingleProduct>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <ProductDetail open={open} close={handleClose} pay={handlePay} product={selectedProduct}></ProductDetail>
        </div>
    );
}