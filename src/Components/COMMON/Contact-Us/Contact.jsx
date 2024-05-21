import { TextField, Button } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contact() {
  const [userDetails,setUserDetails] = useState({
    name:"",
    email:"",
    contact_no:"",
    description:""
  })
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact_no, description } = userDetails;
    if (!name || !email || !contact_no || !description) {
      toast.warning("Please fill the form completely");
    } else {
      // api call
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/contact-us/",
          userDetails,
          { headers: headers }
        );
        console.log(response);
        if (response.status === 201||response.status===200) {
          // Handle success
          toast.success("Filled Successfully");
          setUserDetails({ name: "", email: "", contact_no: "", description: "" });
        }
        
      } catch (error) {
        const errors = error?.response.data;
        console.log(errors);
        if (errors) {
          if (errors.email) {
            toast.warning("Please provide a valid email format");
          } 
          else if(errors.contact_no){
            toast.warning("Please provide a valid contact  number");
          }
          else {
            toast.warning("An error occurred. Please try again later");
          }
        }
      }
    }
  };
  
  const handleCancel = () => {
    setUserDetails({
      username: "",
      email: "",
      contact_no: "",
      description: ""
    });
    toast.info('Form reset');
  };

  return (
    <>
      <div className='align-items-center justify-content-between mt-5 mb-5'>
        <div className="row">
          <div className="col-lg-6 ">
            <img src="https://i.postimg.cc/wvNDf9xh/pexels-marta-dzedyshko-2067638.jpg" className='img img-fluid' style={{ width: '500px', marginLeft: '100px', height: '550px' }} alt="" />
          </div>
          <div className="col-lg-6 ">
            <form action="">
              <div className='mb-4 mt-5 d-flex justify-content-center align-items-center '>
                <i className="fa-solid fa-user mt-3 me-2 "></i>
                <TextField style={{ fontSize: '' }} id="standard-basic1" label="Name" variant="standard" className='w-75 ' name='name'  onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                      value={userDetails.username}/>
              </div>

              <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                <i className="fa-solid fa-envelope mt-3 me-2 "></i>
                <TextField id="standard-basic1" label="Email-id" variant="standard" className='w-75' name='name'  onChange={(e) =>
                        setUserDetails({ ...userDetails, email: e.target.value })
                      }
                      value={userDetails.email}/>
              </div>

              <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                <i className="fa-solid fa-phone mt-3 me-2"></i>
                <TextField id="standard-basic1" label="Contact-Number" variant="standard" className='w-75' name='name'  onChange={(e) =>
                        setUserDetails({ ...userDetails, contact_no: e.target.value })
                      }
                      value={userDetails.contact_no} />
              </div>


              <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                <TextField id="outlined-basic" label="Text Here..." variant="outlined" className='w-75'  onChange={(e) =>
                        setUserDetails({ ...userDetails, description: e.target.value })
                      }
                      value={userDetails.description} />
              </div>


              <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                <Button variant="outlined" className='btn btn-success text-dark me-4' onClick={handlesubmit}>SUBMIT</Button>
                <Button variant="outlined" className='btn btn-danger text-dark me-4' onClick={handleCancel}>CANCEL</Button>

              </div>







            </form>
          </div>
        </div>

      </div>
           {/* toastify */}
     <ToastContainer
position="top-center"
style={{marginTop:'100px'}}
autoClose={2000}
type="success"
theme="light"
/>

    </>
  )
}

export default Contact
