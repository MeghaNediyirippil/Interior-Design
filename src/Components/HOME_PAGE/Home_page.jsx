import React from 'react'
import Banner from '../BANNER/Banner'
import AboutProfile from '../ABOUT_PROFILE/AboutProfile'
import ContactProfile from '../CONTACT_PROFILE/ContactProfile'
import AboutDesigns from '../DESIGNS_PROFILE/AboutDesigns'

function Home_page() {
  return (
    <div>
      <Banner/>
      <AboutProfile/>
      <AboutDesigns/>
      <ContactProfile/>
    </div>
  )
}

export default Home_page
