import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

interface FormContainerProps {

}

export const FormContainer: React.FC<FormContainerProps> = ({children}) => {
        return (
            <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
        );
}