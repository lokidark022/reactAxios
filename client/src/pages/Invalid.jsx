import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const Invalid = () => {

    const navigate = useNavigate();
    return (
        <div>
            Invalid Session Please Login<br/>
            <Button block variant="primary" onClick={() => navigate('/login')}>
                Login
            </Button>
        </div>
    );
}

export default Invalid;
