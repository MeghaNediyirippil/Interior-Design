import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function Payment() {

  //   const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // const handleProceedToBuy = (event) => {
  //   event.preventDefault(); // Prevent form submission
  //   setShowPaymentDetails(true);
  // };
  return (
    <div style={{height:'auto',marginTop:'100px'}} className='container mb-5 d-flex justify-content-center align-items-center w-100 flex-column'>
    
        <div className='w-50'>
        <Form>
         <div className='form-floating mb-3'>
             <input type="text" class="form-control" id="floatingInputName" placeholder="Username" name="uname" formControlName="uname"/>
             <label htmlFor="floatingInput">UserName</label>
         </div>
         <div className='form-floating mb-3'>
             <input type="text" class="form-control" id="floatingInputflat" placeholder="Apartment / Flat.No" name="flat" formControlName="flat"/>
             <label htmlFor="floatingInputflat">Apartment / Flat.No</label>
         </div>
         <div class="form-floating mb-3">
             <input type="text"  class="form-control" id="floatingInputplace" placeholder="Place / Location" name="place" formControlName="place"/>
         <label for="floatingInputplace">Place / Location</label>
       </div>
       <div class="form-floating mb-3">
         <input type="text" class="form-control" id="floatingInputpincode" placeholder="PinCode" name="pincode" formControlName="pincode" />
         <label for="floatingInputpincode">PinCode</label>
       </div>
       <div class="form-floating mb-3">
         <input type="text"  class="form-control" id="floatingInputnumber" placeholder="Phone number" name="number" formControlName="number"/>
         <label for="floatingInputnumber">Phone number</label>
       </div>
       <div class="d-flex justify-content-center">
         <button  class="btn btn-warning me-4"><Link to={`/billing`} className="text-dark" style={{ textDecoration: "none" }}>Delivery to this Address</Link></button>
         <button  class="btn btn-warning me-4">Cancel</button>
         {/* <button class="btn btn-success ms-4"  type="submit"  onClick={handleProceedToBuy}>Proceed to Buy </button> */}
       </div>
        </Form>
    </div>
     
    {/* {showPaymentDetails && (
     <div  class="w-50 border rounded shadow p-4 mt-4 mb-5">
    <h1 class="mb-5">Payment Details</h1>
    <h2>Delivery Address</h2>
    <h5></h5>
    <h5></h5>
    <h5></h5>
    <h5></h5>
    <h5></h5>
    <div class="d-flex justify-content-center mt-3 flex-column">
        <h4 class="fw-bolder">Total Amount :<span class="text-danger"> total</span></h4>
        <div class="m-3">
        </div>
    </div>
 </div>
    )} */}
    </div>
  )
}

export default Payment
