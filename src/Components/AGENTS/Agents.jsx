import React from 'react'
import Banner from '../BANNER/Banner'
import ContactProfile from '../CONTACT_PROFILE/ContactProfile'
import AgentBanner from '../AGENT_BANNER/AgentBanner'
import AgentHomeContent from '../AGENT_HOME_CONTENT/AgentHomeContent'

function Agents() {
  return (
    <div>
      <AgentBanner />
      <AgentHomeContent/>
      <ContactProfile />
    </div>
  )
}

export default Agents