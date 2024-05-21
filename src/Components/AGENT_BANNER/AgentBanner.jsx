import React, { useEffect, useState } from 'react';
import './AgentBanner.css';
import image1 from '../../Assets/banner1.jpg';
import image2 from '../../Assets/banner2.jpg';
import image3 from '../../Assets/banner3.jpg';

function AgentBanner() {
    // image slide
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageList = [image1, image2, image3]; // Import images directly

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
                src={imageList[currentImageIndex]}
                alt={`${currentImageIndex + 1}`}
            />
            <p className="banner-text">
                Designing Dreams,<span className="golden">Crafting Spaces,</span> <span className="golden">  Inspiring Lives. </span> Welcome Home.
            </p>
            {/* <button className='banner-btn'>DISCOVER MORE</button> */}
        </div>
    );
}

export default AgentBanner;
