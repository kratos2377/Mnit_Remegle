import React from 'react';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import { ChangePassword } from './pages/ChangePassword';
import { ConfirmationMail } from './pages/ConfirmationMail';
function App() {


 
  return (
   <Router>
     <Container>
        <Route path="/user/confirm/:token" component={ConfirmationMail}/>
        <Route path="/user/change-password/:token" component={ChangePassword}/>
     </Container>
   </Router>
  );
}

export default App;
