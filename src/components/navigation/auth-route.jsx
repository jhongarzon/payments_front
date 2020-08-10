import React, { Fragment } from "react";
import Paper from '@material-ui/core/Paper';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppsIcon from '@material-ui/icons/Apps';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
//import ListClients from "../../components/clients/list-clients.jsx";
import ListProducts from "../products/show-products.jsx";
//import UsersForm from "../users/usersForm.jsx";
//import AppsForm from "../../components/apps/appsForm.jsx";
//import RolesForm from "../../components/roles/rolesForm.jsx";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useUser } from "../../context/user-provider.jsx";

export default function NavBar() {


    const allTabs = ['/products'];
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
    return (
        <div>
            <Fragment>
                <AppBar position="static" color="secondary" >
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Payment Management App
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Fragment>
            <BrowserRouter>
                <Route
                    path="/"
                    render={({ location }) => (
                        <Fragment>
                            <Paper square>
                                <Tabs value={location.pathname}
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    selectionFollowsFocus
                                    textColor="secondary">
                                    <Tab icon={<AppsIcon />}
                                        label="Products"
                                        value="/products"
                                        component={Link}
                                        to={allTabs[0]} />
                                </Tabs>
                            </Paper>
                            <Switch>
                                <Route path={allTabs[0]}>
                                    <ListProducts></ListProducts>
                                </Route>                                
                            </Switch>
                        </Fragment>
                    )}
                />
            </BrowserRouter>

        </div>
    );

}