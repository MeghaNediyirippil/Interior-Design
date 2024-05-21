import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './Components/HOME_PAGE/Home';
import Header from './Components/COMMON/HEADER/Header';
import Footer from './Components/COMMON/FOOTER/Footer';

import Auth from './Components/Auth';
import Home from './Components/Home';
import Home_page from './Components/HOME_PAGE/Home_page';
import Gallery from './Components/GALLERY/Gallery';
import Contact from './Components/COMMON/Contact-Us/Contact';
import About from './Components/COMMON/About-Us/About';
import Products from './Components/COMMON/Products/Products';
import Cart from './Components/COMMON/Cart';
import Wishlist from './Components/COMMON/Wishlist';
// import DiningRoom from './Components/DINING_ROOM/DiningRoom';
import HomeCategory from './Components/HOME_CATEGORY/HomeCategory';
import Office from './Components/OFFICE/Office';
import Office_category from './Components/OFFICE_CATEGORY/Office_category';
import Booking from './Components/COMMON/Booking/Booking';
import Purchasing from './Components/PURCHASING/Purchasing';
import Billing from './Components/BILLING/Billing';
import Thankyou from './Components/THANKYOU/Thankyou';
import Agents from './Components/AGENTS/Agents';
import Payment from './Components/Payment/Payment';
import AgentProductList from './Components/Agent Product List/AgentProductList';
import Chat from './Components/Chat/Chat'

import AgentBanner from './Components/AGENT_BANNER/AgentBanner';
import AgentHomeContent from './Components/AGENT_HOME_CONTENT/AgentHomeContent';
import Officebooking from './Components/OfficeBooking/Officebooking';
import AgentViewBooking from './Components/AgentViewBooking/AgentViewBooking';
import ViewAgentProductList from './Components/ViewAgentProductList';
import UserBookAgentProduct from './Components/UserBookAgentProduct/UserBookAgentProduct';
// import ChatBar from './Components/Chat/ChatBar';
import AgentChat from './Components/Agent Chat/AgentChat';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home-page' element={<Home_page />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/payment' element={<Payment details />} />

        {/* <Route path='/diningroom/:id' element={<DiningRoom/>} /> */}
        <Route path='/homecategory/:id' element={<HomeCategory/>} />
        <Route path='/office' element={<Office/>} />
        <Route path='/officecategory/:id' element={<Office_category/>} />
        <Route path='/booking/:id/:categoryid' element={<Booking/>} />
        <Route path='/officebooking/:id' element={<Officebooking/>} />
        {/* <Route path='/booking/:id/:name' element={<Booking/>} /> */}
        <Route path='view-agent-product/:agentid/:agentname' element={<ViewAgentProductList/>} />
        <Route path='view-agent-product/:agentid/:agentname/userbookagentproduct/:designid' element={<UserBookAgentProduct/>} />
        <Route path='/chat/:agentid/:agentname' element={<Chat/>} />
        <Route path='/purchase' element={<Purchasing/>} />
        <Route path='/billing' element={<Billing/>} />
        <Route path='/thankyou' element={<Thankyou/>} />

        {/* agent */}
        <Route path='/agentloginprofile' element={<Agents/>} />
        <Route path='/agentproductlist' element={<AgentProductList/>} />
        <Route path='/agentviewBooking' element={<AgentViewBooking/>} />

        <Route path='/agentbanner' element={<AgentBanner/>}/>
        <Route path='/agenthomecontent' element={<AgentHomeContent/>}/>
        {/* header */}
        <Route path='/agentchat-us' element={<AgentChat />} />

        <Route path='/agentcontact-us' element={<Contact />} />
        <Route path='/agentabout-us' element={<About />} />
        <Route path='/agentabout-us' element={<About />} />

      </Routes>
      <Footer />


    </>
  );
}

export default App;
