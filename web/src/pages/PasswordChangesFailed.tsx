import React from 'react'
import { Alert, ListGroup, Row } from 'react-bootstrap';
import Lottie from 'react-lottie';
import FailedAnimationData from '../lotties/failed.json'

interface PasswordChangesFailedProps {

}

export const PasswordChangesFailed: React.FC<PasswordChangesFailedProps> = () => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: FailedAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

        return (
            <ListGroup>
            <ListGroup.Item>
              <Lottie options={defaultOptions} height={150} width={150} />
            </ListGroup.Item>
    
            <ListGroup.Item>
              <Alert variant="danger">
                <Row className="justify-content-center">
                  {" "}
                  Some Error Occured.  Try Again Later!
                </Row>
              </Alert>
            </ListGroup.Item>
          </ListGroup>
        );
}