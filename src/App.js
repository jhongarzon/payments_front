import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from './components/account/login.jsx';
import { UserProvider, useUser } from './context/user-provider.jsx';
import { initAxiosInterceptors } from "./helpers/auth-helper.js";
import NavBar from "./components/navigation/auth-route.jsx";


export default () => <UserProvider>
  <App></App>
</UserProvider>;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  }
}));
initAxiosInterceptors();
function App() {
  const classes = useStyles();
  const { loadingUser } = useUser();
  if (!loadingUser) {
    return (
      <div className={classes.root}>
        <NavBar></NavBar>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <LoginForm></LoginForm>
    </div>
  );
}