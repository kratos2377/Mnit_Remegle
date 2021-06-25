import React from 'react';
import { Alert } from 'react-bootstrap';

function App() {


  const data = [ 'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',]
  return (
    <div className="App">
    
 
{
  data.map((variant, idx) => (
    <Alert key={idx} variant={variant}>
      This is a {variant} alert—check it out!
    </Alert>
  ))
}
    </div>
  );
}

export default App;
