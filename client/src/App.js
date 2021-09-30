import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./routes/dasboard";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import ForgotPassword from "./routes/forgotpassword";
import NotFound from "./routes/notfound";
import Logout from "./routes/logout";
import ResetPassword from "./routes/resetpassword";
import VerifyEmail from "./routes/verifyemail";

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/not-found" component={NotFound} />
        <Route path="/logout" component={Logout} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/reset-password/:id" component={ResetPassword} />
        <Route
          path="/forgotpassword/verify-reset-link"
          component={VerifyEmail}
        />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect from="/" exact to="/signin" />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
};

export default App;
