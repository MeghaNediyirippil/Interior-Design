import React from 'react'

function About() {
  return (
    <>
    <div className='mt-3 align-items-center justify-content-center'>
        <h1 className='fw-bolder text-center fs-4 mt-5'>ABOUT US</h1>
        <div className="row mb-5 mt-5">
            <div className="col-lg-6">
                <p style={{textAlign:"justify"}} className='mt-5 ms-4'>
                At Interior Harmoney, we believe that your living space should reflect your unique style and personality. We are passionate about creating a platform that brings together exceptional design and effortless shopping, making it easier than ever for you to transform your space into a haven that speaks volumes about who you are.
                </p>
                <p style={{textAlign:"justify"}} className=' ms-4'>
                We are committed to your satisfaction from the moment you browse our collections to the delivery of your chosen items. Our dedicated customer support team is here to assist you with any inquiries, ensuring that your experience withInterior Harmoney is exceptional.

                Thank you for choosing Interior Harmoney as your partner in creating spaces that inspire and captivate. Join us on this exciting design journey, and let's transform your vision into reality!
                </p>
            </div>
            <div className="col-lg-6">
                <img className='ms-5 img img-fluid' src="https://media.giphy.com/media/l41m2iA7jDHcmIWGI/giphy.gif" alt="" />
            </div>
        </div>

    </div>
      
    </>
  )
}

export default About
