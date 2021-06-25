import React from 'react'
import { Alert } from 'react-bootstrap';

interface MessageProps {

}

export const Message: React.FC<MessageProps> = ({children}) => {
        return (
            <Alert variant='danger'>
             {children}
        </Alert>
        );
}