import React from 'react'
import { useParams } from 'react-router-dom';

interface ChangePasswordProps {
 token: string;
}

export const ChangePassword: React.FC<ChangePasswordProps> = () => {

    const {token} = useParams<ChangePasswordProps>()

    console.log(token)
        return (
            <div>
                Change Password
            </div>
        );
}