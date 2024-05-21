import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "./Services/allApis";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
  const navigate = useNavigate();
  const registerForm = register ? true : false;
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    user_type: "",
  });
  console.log(userData);

  //  register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, user_type } = userData;
    if (!username || !email || !password || !user_type) {
      toast.warning("Please fill the form completely");
    } else {
      // api call
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/register/",
          userData,
          {}
        );
        console.log(response);
        // alert("Registred Succes");
        toast.success("Register Successfully")
        setUserData({ username: "", email: "", password: "", user_type: "" });
        navigate("/");
      } catch (error) {

        const errors = error?.response.data
        console.log(errors);
        if (errors) {
          if (errors.email) {
            toast.warning("Something Wrong")

          }
          else if (errors.password) {
            toast.warning("Please enter a password with at least 8 characters, including at least one alphabet letter, one special character, and one digit")

            // alert("Please enter a password with at least 8 characters, including at least one alphabet letter, one special character, and one digit.");
          }
          else {

            toast.warning("This username already exists. Please choose a different username")

            // alert("This username already exists. Please choose a different username.");
          }
        }


      }
      // if(response.status==200)
    }
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginAPI(userData);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("agentId", response.data.user_id);
      localStorage.setItem("username", response.data.username);

      if (response.data.user_type == "Customer") {
        navigate("/home-page");
      } else {
        navigate("/agentloginprofile");
      }
    } else {
      toast.warning("Incorrect Username and Password");
    }
  };


  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center  mb-5"
    >
      <div className="container w-75 border shadow ">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img
              className="img img-fluid rounded mb-4"
              src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex mt-2">
                  <span
                    className="h1 fw-bolder mb-5"
                    style={{ color: "var( --main-color)" }}
                  >
                    Interior Harmony
                  </span>
                </div>
                <Form className="text-light w-75">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Enter UserName"
                      name="username"
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                      value={userData.username}
                    />
                  </Form.Group>
                  {registerForm && (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter EmailId"
                        name="email"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      value={userData.password}
                    />
                  </Form.Group>
                  {registerForm && (
                    <Form.Group className="mb-3" controlId="formBasictype">
                      <Form.Control
                        as="select"
                        name="user_type"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            user_type: e.target.value,
                          })
                        }
                        value={userData.user_type}
                      >
                        <option value="">Select User Type</option>
                        <option value="Customer">Customer</option>
                        <option value="Agent">Company</option>
                        {/* Add other user types as needed */}
                      </Form.Control>
                    </Form.Group>
                  )}

                  {registerForm ? (
                    <div>
                      <Button
                        onClick={handleRegister}
                        variant="dark"
                        className="ms-5 mb-3 mt-3"
                        type="submit"
                        size="lg"
                        style={{ color: "var( --main-color)" }}
                      >
                        {" "}
                        Register{" "}
                      </Button>
                      <p className="text-dark mt-3">
                        Already have an account?{" "}
                        <Link to={"/"}>Login Here</Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={handleLogin}
                        // variant="dark"
                        className="ms-5 mb-3 mt-3"
                        type="submit"
                        size="lg"
                        style={{
                          color: "var( --main-color)",
                          backgroundColor: "black",
                          border: "none",
                        }}
                      >
                        {" "}
                        Login{" "}
                      </Button>
                      <p className="text-dark mt-3">
                        New User? <Link to={"/register"}>Register Here</Link>
                      </p>
                    </div>
                  )}
                </Form>
              </div>
            </div>
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
  );
}

export default Auth;
