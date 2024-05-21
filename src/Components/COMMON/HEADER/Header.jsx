import React, { useDeferredValue, useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
// import { useCart, useWishlist, wishCount } from "../../CONTEXT/context";
import {
  cartListApi,
  getCompanylistApi,
  wishListApi,
} from "../../Services/allApis";

// import Products from "../Products/Products";


function Header() {

  // const { cartCount } = useCart();
  // const { wishCount } = useWishlist();
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [companylist, setCompanylist] = useState();
  const [wishCount, setWishCount] = useState();
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    handlecompanylist();
  }, []);

  useEffect(() => {
    if (token) {
      console.log("cart eror")
      getWishlist();
      handleCart();

    }
  }, [token]);
  

  const getWishlist = async () => {
    try {
      if (token) {
        const response = await wishListApi(headers);
        setWishCount(response.data.length);
      } else {
        // If no token is available, set wishlist count to 0
        setWishCount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  





  const handleCart = async () => {
    try {
      if (token) { // Check if token exists
        const response = await cartListApi(headers);
        setCartCount(response.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };







  const location = useLocation().pathname;
  const isLogin = location === "/";
  const isRegister = location === "/register";

  //   product
  const isProducts = location === "/products";
  const isWishlist = location === "/wishlist";
  const isCart = location === "/cart";
  const isBilling = location === "/billing";


  //   agent
  const isAgentLogin = location === "/agentloginprofile";
  const isAgentcontactus = location === "/agentcontact-us";
  const isAgentaboutus = location === "/agentabout-us";
  const isAgentproductlist = location === "/agentproductlist";
  const isAgentbooking = location === "/agentviewBooking";
  const isagentchat = location === "/agentchat-us";

  const handleLogout = () => {
    localStorage.clear();
  };

  //   view company details
  //   const token = localStorage.getItem("token")
  //   const header={
  //     Authorization:`Bearer ${token}`
  //   }
  const handlecompanylist = async () => {
    const response = await getCompanylistApi();

    setCompanylist(response.data);
  };
  console.log(companylist);

  return (
    <div>
      {/* Header */}
      <header>
        {/* logo */}
        <div className="logo">
          <img
            className="logo-image"
            src="https://i.pinimg.com/564x/67/f8/0d/67f80dfb909022631a1a1780c4efe870.jpg"
            alt=""
          />
          {isLogin || isRegister ? (
            <h6 className="heading">Interior Harmony</h6>
          ) : (
            <Link to={"/home-page"} style={{ textDecoration: "none" }}>
              <h6 className="heading">Interior Harmony</h6>
            </Link>
          )}
        </div>

        {/* Navigation links */}

        <nav>
          {isAgentLogin ||
            isAgentaboutus ||
            isAgentcontactus ||
            isAgentproductlist ||
            isagentchat ||
            isAgentbooking ? (
            <ul style={{ display: isLogin || isRegister ? "none" : "" }}>
              <li>
                <Link to={"/agentloginprofile"} className="nav-links">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/agentproductlist"} className="nav-links">
                  Designs
                </Link>
              </li>
              <li>
                <Link to={"/agentviewBooking"} className="nav-links">
                  Booking
                </Link>
              </li>
              <li>
                <Link to={"/agentchat-us"} className="nav-links">
                  Chat Us
                </Link>
              </li>
              <li>
                <Link to={"/agentcontact-us"} className="nav-links">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={"/agentabout-us"} className="nav-links">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/"} onClick={handleLogout} className="nav-links">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <>
              {isProducts || isWishlist || isCart || isBilling ? (
                <ul style={{ display: isLogin || isRegister ? "none" : "" }}>

                  <li>
                    <Link to={"/home-page"} className="nav-links">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to={"products"} className="nav-links">
                      Products
                    </Link>
                  </li>


                  {/* <li>
                      <Link to={"/wishlist"}  className="nav-links">
                        Wishlist{" "}
                        <span class="badge bg-light text-warning ms-1 rounded-pill">
                        {wishCount}
                        </span>
                      </Link>
                  </li> */}
                  <li >
                    <Link to={"/wishlist"} className="nav-links" style={{ position: 'relative', display: 'inline-block', marginLeft: '20px' }}>
                      <i className="fa-solid fa-heart " style={{ fontSize: "20px", zIndex: '1' }}></i>{" "}
                      <span className="badge " style={{ position: 'relative', top: '-3px', left: '-11px', fontSize: '16px', zIndex: '5', color: ' var(--main-color)' }}>
                        {wishCount}
                      </span>
                    </Link>
                  </li>



                  {/* <li>
                    <Link to={"/cart"} className="nav-links">
                      Cart
                      <span class="badge bg-light text-warning ms-1 rounded-pill">
                        {cartCount}
                      </span>
                    </Link>
                  </li> */}


                  <li>
                    <Link to={"/cart"} className="nav-links" style={{ position: 'relative', display: 'inline-block' }}>
                      <i className="fa-solid fa-cart-plus  " style={{ fontSize: "20px" }} ></i>
                      <span class="badge  ms-1 rounded-pill" style={{ position: 'relative', top: '-3px', left: '-11px', fontSize: '16px', zIndex: '5', color: ' var(--main-color)' }}>
                        {cartCount}
                      </span>
                    </Link>
                  </li>






                  <li>
                    <Link to={"/"} onClick={handleLogout} className="nav-links">
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul style={{ display: isLogin || isRegister ? "none" : "" }}>
                  <li>
                    <Link to={"/home-page"} className="nav-links">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-links">Services</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to={"/home"} className="dropdown-links">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to={"/office"} className="dropdown-links">
                          Office
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link className="nav-links">Company</Link>
                    <ul className="dropdown">
                      {companylist ? (
                        companylist.map((item, index) => (
                          <li
                            key={
                              item.id /* Assuming 'id' is a unique identifier */
                            }
                          >
                            <Link
                              to={`/view-agent-product/${item.id}/${item.username}`}
                              className="nav-links"
                            >
                              {item.username}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                    </ul>
                  </li>

                  <li>
                    <Link to={"products"} className="nav-links">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to={"/gallery"} className="nav-links">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to={"/contact-us"} className="nav-links">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about-us"} className="nav-links">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} onClick={handleLogout} className="nav-links">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;

