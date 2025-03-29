import React from 'react'
import Contact from './Contact'
import '../css/style.css'
export default function Contacts() {
  return (
    <div>
        <div className="container list-contact-body">
            List of contacts
            <div style={{height:"100%"}} className="row">
                <Contact ></Contact>
      
       

            </div>
        </div>
    </div>
  )
}
