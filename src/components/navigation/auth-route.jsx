import React, { Fragment } from "react";
import Paper from '@material-ui/core/Paper';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppsIcon from '@material-ui/icons/Apps';
// import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
import Home from "../../components/home/home.jsx";
import ShowProducts from "../../components/products/show-products.jsx";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useUser } from "../../context/user-provider.jsx";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../../components/payments/checkout-form";
// import productsApi from "../../components/products/products-api";


export default function NavBar() {


    const allTabs = ['/home', '/products', '/checkout'];
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();
    const { logout } = useUser();
    function handleLogout() {
        logout();
    }
    // const stripePromise = productsApi.getPublicStripeKey().then(key => loadStripe(key));
    return (
        <div>
            <Fragment>
                <AppBar position="static" color="secondary" >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Stripe payment
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Fragment>
            <BrowserRouter>
                <Route
                    path=""
                    render={({ location }) => (
                        <Fragment>
                            <Paper square>
                                <Tabs value={location.pathname}
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    selectionFollowsFocus
                                    textColor="secondary">
                                    <Tab icon={<AppsIcon />}
                                        label="Home"
                                        value="/home"
                                        component={Link}
                                        to={allTabs[0]} />
                                    <Tab icon={<PeopleIcon />}
                                        label="Products"
                                        value="/products"
                                        component={Link}
                                        to={allTabs[1]} />
                                    {/* <Tab icon={<WorkIcon />}
                                        label="Checkout"
                                        value="/checkout"
                                        component={Link}
                                        to={allTabs[2]}
                                    /> */}
                                </Tabs>
                            </Paper>
                            <Switch>
                                <Route path={allTabs[0]} render={() => <Home></Home>} />
                                <Route path={allTabs[1]}>
                                    <ShowProducts></ShowProducts>
                                </Route>
                                {/* <Route path={allTabs[2]}
                                    render={() =>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm />
                                        </Elements>} /> */}
                            </Switch>
                        </Fragment>
                    )}
                />
            </BrowserRouter>

        </div>
    );

}