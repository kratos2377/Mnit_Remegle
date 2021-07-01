import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChangePassword } from "./pages/ChangePassword";
import { ConfirmationMail } from "./pages/ConfirmationMail";
import { PasswordChangesFailed } from "./pages/PasswordChangesFailed";
import { PasswordChangeSuccess } from "./pages/PasswordChangeSuccess";
import { WelcomePage } from "./pages/WelcomePage";
function App() {
  return (
    <Router>
      <Container>
        <Route path="/" component={WelcomePage} exact />
        <Route path="/user/confirm/:token" exact component={ConfirmationMail} />
        <Route
          path="/user/change-password/:token"
          exact
          component={ChangePassword}
        />
        <Route
          path="/change-password/success"
          component={PasswordChangeSuccess}
          exact
        />
        <Route
          path="/change-password/fail"
          component={PasswordChangesFailed}
          exact
        />
      </Container>
    </Router>
  );
}

export default App;
