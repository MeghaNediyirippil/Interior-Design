import React from 'react'
import './ContactProfile.css'

function ContactProfile() {
  return (
    <div className='contact-wrapper'>
      <div className="heading-section">
        <button className='contact-btn'>Contact Us</button>
        <p className='contact-des'>If you have a vision for your home, we can bring it to life.</p>
        <div className="card-section">
          <div className="contact-card">
            <i class="fa-solid fa-building-circle-exclamation icon"></i>
            <p>Our Office</p>
            <p>ABC, 2798, 27th Main Rd, Agara Village, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102</p>
          </div>
          <div className="contact-card">
            <i class="fa-solid fa-envelope icon"></i>
            <p>Our Email</p>
            <p>abc@gmail.com</p>
          </div>
          <div className="contact-card">
            <i class="fa-solid fa-address-book icon"></i>
            <p>Our Phone lines</p>
            <p>9876543210</p>
          </div>
        </div>
      </div>

      {/* card */}
     
    </div>
  )
}

export default ContactProfile