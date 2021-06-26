import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../lotties/updating.json';
import successAnimationData from '../lotties/success-check.json';
import { useConfirmUserMutation } from '../generated/graphql';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import { copyFileSync } from 'fs';

interface ConfirmationMailProps {
  token: string;
}

export const ConfirmationMail: React.FC<ConfirmationMailProps> = () => {

    const {token} = useParams<ConfirmationMailProps>()

    const defaultUpdateOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: successAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };


      const [updated , setUpdated] = useState(false)
 const [confirm] = useConfirmUserMutation()

      useEffect(() => {
         
        const startConfirming = async () => {
         console.log(token)
           const response = await confirm({
               variables: {
                   token: token
               }
           })


           console.log(response)

           if(response.data?.confirmTheUser)
           {
               setUpdated(true)
           }
        }

    startConfirming()

      } , [token , confirm])



    console.log(token)
        return (
          <>
          
         {
             !updated ?  <Lottie 
             options={defaultUpdateOptions}
             height={100}
             width={150}
           /> :  (
            <Col>
           <ListGroup>
               <ListGroup.Item>
               <Lottie 
            options={defaultOptions}
            height={150}
            width={150}
          />
               </ListGroup.Item>

               <ListGroup.Item>
                <Alert variant="success">
                   <Row className="justify-content-center"> You Can Now Register.</Row>
                   <Row className="justify-content-center"> Enter Your Mnit Id Again And You Will be Navigated to Register Screen</Row>
                </Alert>
               </ListGroup.Item>
           </ListGroup>
            </Col>
           )
             
               
         }
           </>
        );
}