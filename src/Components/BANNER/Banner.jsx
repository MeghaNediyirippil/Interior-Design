import React, { useEffect, useState } from 'react'
import './Banner.css'
import { Link } from 'react-router-dom';

function Banner() {
    // image slide
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageList = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with your image file names

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex, imageList.length]);
    return (
        <div className="banner">
            <img
                className="banner-image"
                src={`${process.env.PUBLIC_URL}/images/${imageList[currentImageIndex]}`}
                alt={`${currentImageIndex + 1}`}
            />
            <p className="banner-text">
                Designing Dreams,<span className="golden">Crafting Spaces,</span> <span className="golden">  Inspiring Lives. </span> Welcome Home.
            </p>
            <button className='banner-btn'><Link to={'/agentabout-us'} style={{ textDecoration: "none",color:'white'}}>DISCOVER MORE</Link></button>
        </div>
    )
}

export default Banner