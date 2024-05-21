import React from 'react'

import { FaPalette, FaBriefcase, FaHome, FaUsers } from 'react-icons/fa';


function AgentHomeContent() {
    return (
        <>
            <div className='align-items-center justify-content-between  bg-black  '>
                <div className="row p-0" style={{height:'600px'}}>
                <div className="col-lg-6" style={{ backgroundImage: `url('https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=600')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        {/* <img src="https://images.pexels.com/photos/1374125/pexels-photo-1374125.jpeg?auto=compress&cs=tinysrgb&w=600" className='img img-fluid' style={{ width: '500px', marginLeft: '100px', height: '550px' }} alt="" /> */}
                    </div>
                    <div className="col-lg-6 text-light p-5 text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {/* content */}
                        <h3 className='mb-5' style={{ color: 'var(--main-color)' }}>"Discover Your Design Spotlight: Showcasing Interior Excellence"</h3>
                        <p>Welcome to our platform dedicated to showcasing the finest in interior design. Here, we offer a unique opportunity to expose your creative vision and expertise to a wide audience. Whether you specialize in residential, commercial, or decorative design, our platform provides the perfect stage to highlight your work. Join us in sharing your passion for design excellence and inspiring others with your innovative ideas. Let your designs shine and captivate the world through our platform.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 text-light p-5 text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--secondary-color)', borderRadius: '10px' }}>
                        {/* content */}
                        {/* <h3 className='mb-5' style={{ color: 'var(--main-color)' }}>Elevate Your Space with Expert Design Services</h3> */}
                        <div className="service-row d-flex ">
                            <div className="service">
                                <FaPalette size={40} style={{ color: 'var(--main-color)', marginBottom: '10px' }} />
                                <h4>Residential Design</h4>
                                <p>Transform your living spaces into personalized sanctuaries with our expert residential design solutions.</p>
                            </div>
                            <div className="service">
                                <FaBriefcase size={40} style={{ color: 'var(--main-color)', marginBottom: '10px' }} />
                                <h4>Commercial Design</h4>
                                <p>Create inspiring work environments that reflect your brand identity and optimize functionality.</p>
                            </div>
                        </div>
                        <div className="service-row d-flex ">
                            <div className="service">
                                <FaHome size={40} style={{ color: 'var(--main-color)', marginBottom: '10px' }} />
                                <h4>Interior Decoration</h4>
                                <p>Enhance the aesthetic appeal of your spaces with our curated selection of furniture and accessories.</p>
                            </div>
                            <div className="service">
                                <FaUsers size={40} style={{ color: 'var(--main-color)', marginBottom: '10px' }} />
                                <h4>Consultation Services</h4>
                                <p>Receive expert advice and personalized recommendations from our team of experienced consultants to address your specific interior design needs.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" style={{ backgroundImage: `url('https://images.pexels.com/photos/609768/pexels-photo-609768.jpeg?auto=compress&cs=tinysrgb&w=600')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        {/* <img src="https://images.pexels.com/photos/609768/pexels-photo-609768.jpeg?auto=compress&cs=tinysrgb&w=600" className='img img-fluid' style={{ marginLeft: '100px'}} alt="" /> */}
                    </div>
                </div>

            </div>

        </>
    )
}

export default AgentHomeContent