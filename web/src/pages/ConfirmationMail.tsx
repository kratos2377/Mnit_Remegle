import React from 'react'
import { useParams } from 'react-router-dom';

interface ConfirmationMailProps {
  token: string;
}

export const ConfirmationMail: React.FC<ConfirmationMailProps> = () => {

    const {token} = useParams<ConfirmationMailProps>()

    console.log(token)
        return (
            <div>
                Confirmation Mail
            </div>
        );
}