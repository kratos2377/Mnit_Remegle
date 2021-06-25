import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FormContainer } from "../components/FormContainer";
import { AiFillLock, AiOutlineUnlock } from "react-icons/ai";
import { Message } from "../components/Message";

interface ChangePasswordProps {
  token: string;
}

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const { token } = useParams<ChangePasswordProps>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [error , setError] = useState(false)
  const [errorMessage , setErrorMessage] = useState("")
  const [changing , setChanging] = useState(false);

  const passwordSubmitHandler = () => {
     
     setChanging(true)

     if(password.length < 8){
         setChanging(false)
         setErrorMessage("Password Length Must Be Greater Than or Equal to 8")
         setError(true)
         return;
     } 

   if(password !== confirmPassword){
        setChanging(false)
        setErrorMessage("Password's Don't Match. Try Again")
        setError(true)
        return;
     }

    console.log("success")
  }

  return (
    <>
      <FormContainer>
          <h1>Change Password</h1>
          {error && <Message>{errorMessage}</Message>}
        <Form onSubmit={passwordSubmitHandler}>
          <Form.Group controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  type={!showPassword ? "password" : "text"}
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>

              <Col xs={6} md={4}>
                <Button onClick={() => setShowPassword(!showPassword)}>
                  {!showPassword ? <AiFillLock /> : <AiOutlineUnlock />}
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Row> 
               <Col xs={12} md={8}> 
               <Form.Control
             type={!showConfirmPassword ? "password" : "text"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
               </Col>

               <Col xs={6} md={4}>
               <Button onClick={() => setConfirmShowPassword(!showConfirmPassword)}>
                  {!showConfirmPassword ? <AiFillLock /> : <AiOutlineUnlock />}
                </Button>
               </Col>

            </Row>
        
          </Form.Group>
          {
             changing ? <Spinner className="mt-3" animation="border" /> :
             <Button variant="primary" type="submit" className="mt-2">
             Change Password
           </Button>
          }
         
        </Form>
      </FormContainer>
    </>
  );
};
