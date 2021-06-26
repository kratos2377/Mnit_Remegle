import React from "react";
import { Alert, ListGroup, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import successAnimationData from "../lotties/success-check.json";

interface PasswordChangeSuccessProps {}

export const PasswordChangeSuccess: React.FC<PasswordChangeSuccessProps> =
  () => {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: successAnimationData,
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
          <Alert variant="success">
            <Row className="justify-content-center">
              {" "}
              Password Changed SuccessFully
            </Row>
          </Alert>
        </ListGroup.Item>
      </ListGroup>
    );
  };
