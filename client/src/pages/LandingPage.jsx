import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
export default function LandingPage() {
    const navigate =useNavigate();
  return (
    <div>LandingPage
        <Button variant="danger" onClick={() => navigate('/login')}>
            Login
        </Button>
    </div>
  )
}
