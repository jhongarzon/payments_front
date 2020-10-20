import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from './components/account/login.jsx';
import { UserProvider, useUser } from './context/user-provider.jsx';
import { initAxiosInterceptors } from "./helpers/auth-helper.js";
import NavBar from "./components/navigation/auth-route.jsx";

export default () => 
  <App></App>;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  }
}));
function App(){
  var i =0;
  i.dtuyiho();

  return <button type="button" onClick={() => console.error("test")}>   
  Test Error button 
</button>
}
// initAxiosInterceptors();
// function App() {
//   const classes = useStyles();
//   const { loadingUser } = useUser();
//   if (!loadingUser) {
//     return (
//       <div className={classes.root}>
//         <NavBar></NavBar>
//       </div>
//     );
//   }
//   return (
//     <div className={classes.root}>
//       <LoginForm></LoginForm>
//     </div>
//   );
// }