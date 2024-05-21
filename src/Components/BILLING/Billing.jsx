import React, { useEffect, useState } from 'react'
import { cartListApi, cartbuyApi } from '../Services/allApis';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { BASEURL } from '../Services/baseUrl';
import axios from 'axios'


function Billing() {
  const [cartProductList, setCartProductList] = useState([]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [total, setTotal] = useState(0);
  // const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState([])
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState(1);
  const [counts, setCounts] = useState({});
  const [cartquantity, setCartquantity] = useState()



  const [cardDetails, setcardDetails] = useState({
    cardname: "",
    cardnumber: "",
    mm: "",
    cvv: ""
  })

  console.log(cardDetails);

  const [buy, setBuy] = useState({
    name: "",
    apartment: "",
    pincode: "",
    place: "",
    phone_no: null,
    total_price: "",
  });

  console.log(buy);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const filtered = cartProductList.filter(product => (localStorage.setItem('cartId', product.cart)))
  }, [cartProductList])

  //function to buy products
  const handleBuy = async () => {
    const { cardname, cardnumber, mm, cvv } = cardDetails
    const cartId = localStorage.getItem('cartId')
    if (!cardname || !cardnumber | !mm || !cvv) {
      Swal.fire({
        icon: "warning",
        title: "Please Fill the Card Details Completely",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else {
      try {

        const result = await cartbuyApi(buy, headers)
        console.log(result);

        if (result.status === 200 || result.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Thanks For Purchase",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate('/thankyou')
            window.location.reload()

          }, 10000);


        }
        else if (result.status !== 200 || result.status !== 201) {
          alert("Booking failed");
        }
      } catch (error) {
        alert('internal server error')
      }
    }
  }

  const handleCart = async () => {
    const response = await cartListApi(headers);
    setCartProductList(response.data);
    console.log(response.data);

    localStorage.setItem('cartId', response.data.cart)
  };

  useEffect(() => {
    handleCart();
  }, []);




  // total amount
  const totalAmount = () => {
    if (cartProductList.length > 0) {
      const totalInteger = cartProductList.reduce((total, item) => {
        const price = item?.product?.price || 0; // Get price, default to 0 if not available
        const quantity = item?.quantity || 0; // Get quantity, default to 0 if not available
        return total + (price * quantity); // Add price multiplied by quantity to total
      }, 0);

      setTotal(totalInteger); // Set the total
      console.log(totalInteger); // Log the total
    } else {
      setTotal(0); // If cartProductList is empty, set total to 0
    }
  };


  useEffect(() => {
    totalAmount()
  }, [cartProductList, counts])

  //   total to buy
  useEffect(() => {
    setBuy((prevBuy) => ({
      ...prevBuy,
      price: total
    }));
  }, [total]);

  const handleProceedToBuy = (event) => {
    event.preventDefault(); // Prevent form submission
    const { name, apartment, place, pincode, phone_no } = buy
    if (validateForm()) {
      if (!name || !apartment || !place || !pincode || !phone_no) {
        Swal.fire({
          icon: "warning",
          title: "Please Fill the Details Completely",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else {
        setShowPaymentDetails(true)
      }
    }

  };


  const handleIncrement = async (id) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));


    try {
      const response = await axios.put(`${BASEURL}update-cart/${id}/`, { quantity: 1 }, {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      })
      if (response.status >= 200 && response.status <= 300) {
      }
    } catch (error) {
      console.log(error)
    }
    handleCart();
    totalAmount();
  };

  const handleDecrement = async (id, quantity) => {
    console.log(quantity);
    if (counts[id] > 1) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1
      }));
    };
    try {
      if (quantity > 1) {
        const response = await axios.put(`${BASEURL}update-cart/${id}/`, { quantity: -1 }, {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        })
        if (response.status >= 200 && response.status <= 300) {
        }
      }
    } catch (error) {
      console.log(error)
    }
    handleCart();
    totalAmount();
  }

  // validation
  const [errors, setErrors] = useState({
    name: '',
    apartment: '',
    place: '',
    pincode: '',
    phone_no: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name
    if (!buy.name || !isNaN(buy.name)) {
      newErrors.name = 'Please enter a valid username';
      valid = false;
    }

    // Validate apartment
    if (!buy.apartment) {
      newErrors.apartment = 'Please enter your apartment number';
      valid = false;
    }

    // Validate location
    if (!buy.place) {
      newErrors.place = 'Please enter your location';
      valid = false;
    }

    // Validate pincode
    if (!buy.pincode || !/^\d{6}$/.test(buy.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
      valid = false;
    }

    // Validate phone number
    if (!buy.phone_no || !/^\d{10}$/.test(buy.phone_no)) {
      newErrors.phone_no = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };




  return (
    <>
      <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        <div style={{ height: 'auto', marginTop: '100px' }} className='container mb-5 d-flex justify-content-center align-items-center w-100 flex-column'>

          <div className='w-50'>
            <form>
              <div className='form-floating mb-3'>
                <input
                  onChange={(e) => setBuy({ ...buy, name: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingInputName"
                  placeholder="Username"
                  name="name"
                  value={buy.name}
                />
                <label htmlFor="floatingInputName">UserName</label>
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>

              <div className='form-floating mb-3'>
                <input
                  onChange={(e) => setBuy({ ...buy, apartment: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingInputflat"
                  placeholder="Apartment / Flat.No"
                  name="apartment"
                  value={buy.apartment}
                />
                <label htmlFor="floatingInputflat">Apartment / Flat.No / House Name</label>
                {errors.apartment && <div className="text-danger">{errors.apartment}</div>}
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setBuy({ ...buy, place: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingInputplace"
                  placeholder="Place / Location"
                  name="place"
                  value={buy.place}
                />
                <label htmlFor="floatingInputplace">Place / Location</label>
                {errors.place && <div className="text-danger">{errors.place}</div>}
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setBuy({ ...buy, pincode: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingInputpincode"
                  placeholder="PinCode"
                  name="pincode"
                  value={buy.pincode}
                />
                <label htmlFor="floatingInputpincode">PinCode</label>
                {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setBuy({ ...buy, phone_no: e.target.value })}
                  type="text"
                  className="form-control"
                  id="floatingInputnumber"
                  placeholder="Phone number"
                  name="phone_no"
                  value={buy.phone_no}
                />
                <label htmlFor="floatingInputnumber">Phone number</label>
                {errors.phone_no && <div className="text-danger">{errors.phone_no}</div>}
              </div>

              <div className="d-flex justify-content-center">
                {/* <button className="btn btn-success ms-4" type="submit" onClick={handleProceedToBuy}>Proceed to Buy</button> */}
              </div>
            </form>
          </div>
        </div>


        {cartProductList.length > 0 && (
          <>
            <div className='row ms-5 me-5'>
              <div className='col-md-7'>
                <table className='container table mt-5 rounded shadow border'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProductList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.product.Name}</td>
                        <td>
                          <img src={item.product.photo} alt={item.product.name} width={'100px'} height={'100px'} />
                        </td>
                        <td>
                          <button className='border border-0 bg-light' onClick={() => handleDecrement(item.product.id, item.quantity)}>-</button>
                          <input name="" value={item.quantity} className='mx-2 text-center ' id="" style={{ width: '30px' }} />
                          <button className='border border-0 bg-light' onClick={() => handleIncrement(item.product.id)}>+</button></td>
                        <td>{item.product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='col-md-1'></div>

              <div className='col-md-4 border rounded p-2 mt-5 mb-5 shadow text-center d-flex flex-column justify-content-center '>
                <h3 className='text-warning fw-bolder'>Product Summary</h3>
                <h5>Total Products : {cartProductList.length} </h5>
                {/* Calculate total price */}
                <h4>Total : $ <span className='text-danger fw-bolder fs-3'>
                  {total}
                </span></h4>
                <button className="btn btn-outline-warning text-warning bg-dark w-50 mx-auto d-block" type="submit" onClick={handleProceedToBuy}>Proceed</button>
                {/* <button className="btn btn-success ms-4" type="submit" onClick={handleProceedToBuy}>Proceed to Buy</button> */}
              </div>

            </div>
          </>
        )}
        {showPaymentDetails && (
          <div className="w-50 border rounded shadow p-4 mt-4 mb-5 d-flex flex-column align-items-center mx-auto">
            <h1 className="mb-5">Payment Details</h1>
            <h2>Delivery Address</h2>
            <h5>{buy.name}</h5>
            <h5>{buy.apartment}</h5>
            <h5>{buy.place}</h5>
            <h5>{buy.pincode}</h5>
            <h5>{buy.phone_number}</h5>
            <div className="d-flex justify-content-center mt-3 flex-column">
              <h4 className="fw-bolder">Total Amount: <span className="text-danger">
                {/* Show total price again */}
                {total}
              </span></h4>
              <div className="m-3"></div>
              <button onClick={handleShow} className="btn btn-outline-warning text-warning bg-dark" type="submit">BUY</button>

            </div>
          </div>
        )}


      </div>



      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto', gap: '0px' }}>
          <div style={{ width: '100%', background: 'rgb(255, 250, 235)', boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)' }}>
            <label style={{ width: '100%', height: '40px', position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: '20px', borderBottom: '1px solid rgba(16, 86, 82, .75)', fontWeight: '700', fontSize: '25px', color: 'blue' }}>PAYPAL</label>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', marginBottom: '8px', display: 'block' }}>SHIPPING TO</span>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#000000' }}> <span>Name:</span> {buy.name}</p>

                  <div className='d-flex'>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#000000' }}> <span>Address:</span> </p>
                    <div className='d-flex flex-column  ms-2'>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#000000' }}>{buy.apartment}</p>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#000000' }}>{buy.place}</p>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#000000' }}>{buy.pincode}</p>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#000000' }}>{buy.phone_number}</p>
                    </div>
                  </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'rgba(16, 86, 82, .75)', border: 'none' }} />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', marginBottom: '8px', display: 'block' }}>PAYMENT METHOD</span>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#2d3748', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '0.375rem', maxWidth: '20rem', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <input
                        style={{ width: '100%', height: '2.5rem', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: '#2d3748', color: 'white', fontWeight: '600', paddingLeft: '0.5rem', flexGrow: '1' }}
                        onChange={(e) => setcardDetails({ ...cardDetails, cardname: e.target.value })}
                        maxLength="15"
                        type="text"
                        name="cardName"
                        id="cardName"
                        placeholder="Full Name"
                      />
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '3.5rem', height: '2.25rem', backgroundColor: '#2d3748', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.25rem' }}>
                        <svg
                          style={{ fill: 'white' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#ff9800"
                            d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                          ></path>
                          <path
                            fill="#d50000"
                            d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                          ></path>
                          <path
                            fill="#ff3d00"
                            d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <input
                        style={{ width: '100%', height: '2.5rem', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: '#2d3748', color: 'white', fontWeight: '600', paddingLeft: '0.5rem' }}
                        onChange={(e) => setcardDetails({ ...cardDetails, cardnumber: e.target.value })}
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        maxLength="16"
                        placeholder="0000 0000 0000 0000"
                      />
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <input
                          style={{ width: 'calc(50% - 0.375rem)', height: '2.5rem', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: '#2d3748', color: 'white', fontWeight: '600', paddingLeft: '0.5rem' }}
                          onChange={(e) => setcardDetails({ ...cardDetails, mm: e.target.value })}
                          type="text"
                          name="expiryDate"
                          id="expiryDate"
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                        <input
                          style={{ width: 'calc(50% - 0.375rem)', height: '2.5rem', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: '#2d3748', color: 'white', fontWeight: '600', paddingLeft: '0.5rem' }}
                          onChange={(e) => setcardDetails({ ...cardDetails, cvv: e.target.value })}
                          type="text"
                          name="cvv"
                          id="cvv"
                          placeholder="CVV"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr style={{ height: '1px', backgroundColor: 'rgba(16, 86, 82, .75)', border: 'none' }} />
                <div className="payments">
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000', marginBottom: '8px', display: 'block' }}>PAYMENT</span>
                  <div className="details" style={{ display: 'grid', gridTemplateColumns: '6fr 1fr', padding: '0px', gap: '5px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#000000', margin: 'auto auto auto 0' }}>Subtotal:</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#000000' }}>${total}</span>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card checkout" style={{ width: '100%', background: 'rgb(255, 250, 235)', boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)' }}>
            <div className="footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 10px 20px', backgroundColor: 'rgba(16, 86, 82, .5)' }}>
              <label className="price" style={{ position: 'relative', fontSize: '22px', color: '#2B2B2F', fontWeight: '900' }}>${total}</label>
              <Link to={"/home-page"}> <button onClick={handleBuy} className="checkout-btn" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '150px', height: '36px', background: 'rgba(16, 86, 82, .55)', boxShadow: '0px 0.5px 0.5px rgba(16, 86, 82, .75), 0px 1px 0.5px rgba(16, 86, 82, .75)', borderRadius: '7px', border: '1px solid rgb(16, 86, 82)', color: '#000000', fontSize: '13px', fontWeight: '600', transition: 'all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1)' }}>BUY</button></Link>
            </div>
          </div>

        </div>


      </Modal>
    </>
  )
}

export default Billing