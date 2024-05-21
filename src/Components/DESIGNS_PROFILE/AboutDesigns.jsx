import React from 'react'
import './AboutDesigns.css'

function AboutDesigns() {

    const cardData = [
        { id: 1, title: 'Inner peace', imageUrl: 'https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jas-1657179080-NnXAg/puja-room-1657182773-7ewEb/pooja-2-1659601746-uMicO.jpg' },
        { id: 2, title: 'Entertainment in Style', imageUrl: 'https://thearchitectsdiary.com/wp-content/uploads/2021/04/Family-Entertainment-Room-.jpeg' },
        { id: 3, title: 'First Impression', imageUrl: 'https://1stimpressionsdesign.com/wp-content/uploads/2022/07/houzz-featured-home-design.jpg' },
        { id: 4, title: 'Relax In style', imageUrl: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 5, title: 'TV Unit', imageUrl: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 6, title: 'Kitchens', imageUrl: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 7, title: 'Bed Rooms', imageUrl: 'https://images.pexels.com/photos/7601116/pexels-photo-7601116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 8, title: 'Wardrobes', imageUrl: 'https://images.pexels.com/photos/3315286/pexels-photo-3315286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 9, title: 'Bathrooms', imageUrl: 'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 10, title: 'Balcony', imageUrl: 'https://images.pexels.com/photos/3225561/pexels-photo-3225561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 11, title: 'Kids', imageUrl: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { id: 12, title: 'Study Room', imageUrl: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=600' },
        // ... add more data as needed
    ];

    return (
        <div className='designs-wrapper'>
            <div className="design-heading">
                <h3>Adding Warmth to Homes</h3>
                <p>Step into a world of interior design enchantment on our website, where every corner unveils a tapestry of sophistication. From chic modern arrangements to timeless classics, our curated designs breathe life into your spaces, transforming houses into homes. Discover a symphony of style that speaks to your unique taste and indulges your desire for a living space that resonates with elegance.</p>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {cardData.map((card) => (
                        <div key={card.id} className="col-md-3 mb-3">
                            <div className="card position-relative m-2">
                                <img src={card.imageUrl} className="card-img-top design-img" alt={card.title} />
                                <div className="card-img-overlay d-flex align-items-end">
                                    <div className="card-body design-title">
                                        <h5 className="title">{card.title}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AboutDesigns