import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { homecategorysingleitemAPI, homedesignbookingAPI } from "../../Services/allApis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import validationSchema from "../../../Validation/YupValidation";


function Booking() {
  const { id } = useParams()
  const { categoryid } = useParams()
  const [num1, setNum1] = useState(id);
  const [num2, setNum2] = useState();
  const [total, setTotal] = useState();
  const [designdetails,setDesigndetails]=useState([])
  const navigate = useNavigate()

  const [errors,setErrors]=useState({});

 


  // const [booking,setbooking]=useState({
  //   product:designdetails,
  //   name:"",
  //   email:"",
  //   contact_no:"",
  //   address:""
  // })

  const [booking, setbooking] = useState({
    name: null,
    email: null,
    contact_no: null,
    address: null,
    product: {
      id: null,
      Name: null,
      photo: null,
      Category: null,
      price: null,
      Description: null
    }
  });


  
  
  useEffect(() => {
    handleviewitem()
  }, [])

// calculation
 const handleClick=() =>{
    setTotal(Number(num1) * Number(num2));
  }
  console.log(id)
  console.log(categoryid);

  // view a particular item
  const token = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const handleviewitem = async () => {
    const response = await homecategorysingleitemAPI(categoryid, headers)
   setDesigndetails(response)
   setbooking(prevBooking => ({
    ...prevBooking,
    product: {
      id: response.data.id,
      Name: response.data.Name,
      photo: response.data.photo,
      Category: response.data.Category,
      price: response.data.price,
      Description: response.data.Description
    }
  }));
   console.log("qwertyuj",designdetails)

  }

  // const handlehomebooking=async(e)=>{
  //   e.preventDefault();
  //   const{ name,email,contact_no,address,product}=booking;
  //   if (!name || !email || !contact_no || !address || !product){
  //     alert("Please fill the form completely");
  //   }
  //   else{
  //    try {
  //     const result= await homedesignbookingAPI(categoryid,booking,headers)
  //     console.log(result)
  //    } catch (error) {
  //     console.log(error);
  //    }
  //   }
  // }


//   const handlehomebooking = async (e) => {
//     e.preventDefault();

  

//     const{ name,email,contact_no,address,product}=booking;
//     if (!name || !email || !contact_no || !address || !product) {
//         alert("Please fill the form completely");
//     }
//     else {
//         try {
//             const result = await homedesignbookingAPI(categoryid, booking, headers)
//             if (result.status === 200 || result.status === 201 ) {
//               toast.success("Booking Completed", {
//                 onClose: () => {
//                   navigate('/thankyou');
//                 }
//               });

//             }
//             else if (result.status !== 200) {
//                 alert(result.response.data.error);
//                 navigate('/home')
//               }
//             console.log(result)

//             }
//              catch (error) {
//             console.log(error);
//         }
//     }
// }

const handlehomebooking = async (e) => {
  e.preventDefault();
  const { name, email, contact_no, address, product } = booking;
  // Validate the input data against the schema
  try {
      await validationSchema.validate({
          name,
          email,
          contact_no,
          address,
      }, { abortEarly: false }); // Abort early will ensure all validation errors are collected

      // If validation succeeds, proceed with booking
      try {
          const result = await homedesignbookingAPI(categoryid, booking, headers);
          if (result.status === 200 || result.status === 201) {
              toast.success("Booking Completed", {
                  onClose: () => {
                      navigate('/thankyou');
                  }
              });
          } else if (result.status !== 200) {
              alert(result.response.data.error);
              navigate('/home');
          }
          console.log(result);
      } catch (error) {
          console.log(error);
      }
  } catch (validationError) {
      // If validation fails, display validation errors
      const validationErrors = {};
      validationError.inner.forEach(error => {
          validationErrors[error.path] = error.message;
      });
      console.log(validationErrors); 
      setErrors(validationErrors)// You can handle the errors as per your UI requirement
      console.log(errors);
  }

};



console.log(booking);

  return (
    <>
      <div className="align-items-center justift-content-center " style={{ marginTop: '100px' }}>
        <div className="row gap-4">
          <div className="col-lg-5 mt-5 border rounded ms-5 mb-5 shadow-lg">
               <h4 className="text-center mt-5">{designdetails.Name}</h4>
            <div className="mb-4 mt-5 d-flex justify-content-between align-items-center ">
              <TextField
                onChange={(e) => {
                  setNum1(e.target.value)
                }}
                className="mt-3"
                id="outlined-basic"
                label="Sq.ft"
                variant="outlined"
                value={id}
                required
              />

              <TextField
                onChange={(e) => {
                  setNum2(e.target.value)
                }}
                className="mt-3"
                id="outlined-basic"
                label="Please Add Sq.ft"
                variant="outlined"
                required
              />
            </div>

            <div className="mb-4 mt-5 d-flex justify-content-center align-items-center  ">
              <Button
                onClick={handleClick}
                variant="outlined"
                className="btn btn-outline-warning text-warning bg-dark">
                calculate
              </Button>
            </div>
            <div className="mb-4 mt-5 d-flex justify-content-center align-items-center  ">
              <TextField
                value={total}
                className="mt-3"
                id="outlined-basic"
                label=" "

              />
            </div>
          </div>
          <div className="col-lg-6 mt-5 mb-5 ms-5">
          <div className="from-wrapper d-flex flex-column">
          <form action="">
              <div className="mb-4 mt-5 d-flex align-items-center ">
                <i className="fa-solid fa-user mt-3 me-2 "></i>
                <TextField
                  style={{ fontSize: "" }}
                  id="standard-basic1"
                  label="Name"
                  variant="standard"
                  className="w-75 "
                  name="name"
                  onChange={(e)=>setbooking({...booking,name:e.target.value})}
                  required
                />
              </div>
              {errors.name && <div className="text-danger">{errors.name}</div>}


              <div className="mb-4 mt-5 d-flex align-items-center  ">
                <i className="fa-solid fa-envelope mt-3 me-2 "></i>
                <TextField
                  id="standard-basic1"
                  label="Email-id"
                  variant="standard"
                  className="w-75"
                  name="email"
                  onChange={(e)=>setbooking({...booking,email:e.target.value})}
                  required
                />
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}


              <div className="mb-4 mt-5 d-flex align-items-center ">
                <i className="fa-solid fa-phone mt-3 me-2"></i>
                <TextField
                  id="standard-basic1"
                  label="Contact-Number"
                  variant="standard"
                  className="w-75"
                  name="contact_no"
                  onChange={(e)=>setbooking({...booking,contact_no:e.target.value})}
                  required
                />
              </div>
              {errors.contact_no && <div className="text-danger">{errors.contact_no}</div>}

              <div className="mb-4 mt-5 d-flex align-items-center">
              <i class="fa-solid fa-address-book  mt-3 me-2"></i>
                <TextField
                  id="standard-basic1"
                  label="Address"
                  variant="standard"
                  className="w-75"
                  name="address"
                  onChange={(e)=>setbooking({...booking,address:e.target.value})}
                  required
                />
              </div>
              {errors.address && <div className="text-danger">{errors.address}</div>}


              <div className="mb-4 mt-5 text-center  ">
                <Button
                onClick={handlehomebooking}
                  variant="outlined"
                  className="btn btn-outline-warning text-warning bg-dark"
                >
                  BOOK NOW

                </Button>
              </div>
            </form>
          </div>
          </div>
        </div>
           {/* toastify */}
      <ToastContainer
        position="top-center"
        style={{ marginTop: '100px' }}
        autoClose={2000}
        type="success"
        theme="light"
      />
      </div>
    </>
  );
}

export default Booking;
