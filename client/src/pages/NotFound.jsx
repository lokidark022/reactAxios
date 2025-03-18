import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            Not Found<br/>
            Please login <Button variant="primary" onClick={() => navigate('/login')}>
                Login
            </Button>
        </div>
    );
}

export default NotFound;
