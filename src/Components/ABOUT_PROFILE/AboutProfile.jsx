import React from 'react'
import './AboutProfile.css'
import icon1 from '../../Assets/icon1.png'
import icon2 from '../../Assets/icon2.png'
import icon3 from '../../Assets/icon3.png'
import icon4 from '../../Assets/icon4.png'

function AboutProfile() {
    return (
        <div className='about-wrapper'>
            <div className="about-heading">
                <h3>Best Interior Design</h3>
            </div>
            <div className="about-colums">
                <div className="about-col">
                    <img src={icon1} alt="" />
                    <h5>Turnkey Project</h5>
                    <p>From conceptualization to curation to putting everything in its place, we undertake complete turnkey projects for villas and apartments</p>
                </div>
                <div className="about-col">
                    <img src={icon2} alt="" />
                    <h5>Bespoke Modular Furniture</h5>
                    <p>We customize wardrobes, entertainment units, modular kitchens and built-in furniture to fit your space and your style.</p>
                </div>
                <div className="about-col">
                    <img src={icon3} alt="" />
                    <h5>Colour Coordination</h5>
                    <p>We choose cohesive color palettes inspired by your vision to transform the ordinary into sensational spaces</p>
                </div>
                <div className="about-col">
                    <img src={icon4} alt="" />
                    <h5>3D Visualization</h5>
                    <p>Don’t rely on mere imagination. A detailed 3D walkthrough gives you a preview of your home interiors.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutProfile