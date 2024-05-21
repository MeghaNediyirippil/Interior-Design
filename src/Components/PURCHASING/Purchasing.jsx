import { TextField } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'

function Purchasing() {
  return (
    <>
    <div className='align-items-center justify-content-center mt-5 mb-5'>
     
       
         <div style={{marginLeft:'330px'}} className='w-50  border rounded shadow-lg'>
              <form action="">
                <div className='mb-4 mt-5 d-flex justify-content-center align-items-center '>
                  <i className="fa-solid fa-user mt-3 me-2 "></i>
                  <TextField style={{ fontSize: '' }} id="standard-basic1" label="Name" variant="standard" className='w-75 ' name='name' />
                </div>
    
                <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                  <i className="fa-solid fa-envelope mt-3 me-2 "></i>
                  <TextField id="standard-basic1" label="Email-id" variant="standard" className='w-75' name='name' />
                </div>
    
                <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                  <i className="fa-solid fa-phone mt-3 me-2"></i>
                  <TextField id="standard-basic1" label="Contact-Number" variant="standard" className='w-75' name='name' />
                </div>
    
    
                <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                  <TextField id="outlined-basic" label="Address,PinCode,NearBy" variant="outlined" className='w-75' />
                </div>
    
    
                <div className='mb-4 mt-5 d-flex justify-content-center align-items-center  '>
                  <Button variant="outlined" className='btn btn-success text-dark me-4'>PAY</Button>
                  <Button variant="outlined" className='btn btn-danger text-dark me-4'>CANCEL</Button>
    
                </div>
    
    
    
    
    
    
    
              </form>
         </div>
        </div>


  </>  )
}

export default Purchasing