import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductsApi } from "../Services/allApis";


function AgentProductList() {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    photo: "",
    price: "",
    catgory: "",
    propertytype: "",
  });
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProduct((prevDetails) => ({
      ...prevDetails,
      photo: file,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("photo", product.photo);
      formData.append("price", product.price);
      formData.append("catgory", product.catgory);
      formData.append("propertytype", product.propertytype);

      const response = await axios.post(
        "http://127.0.0.1:8000/agent-product-create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product Added")
        handleClose();
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    const id = localStorage.getItem("agentId");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await getProductsApi(id, reqHeader);
      setAllProducts(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = allProducts
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="align-items-center justify-content-center d-flex mt-5 mb-5">
        <div className="d-flex w-50 align-items-center border rounded">
          <input
            type="text"
            placeholder="Search By Design"
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div style={{ marginLeft: "-50px" }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="ms-5">
          <Button className="btn btn-outline-warning text-warning bg-dark" onClick={handleShow}>
            ADD
          </Button>
        </div>
      </div>
      <div className="m-5 ">
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={3}>
              <Card style={{ width: "18rem",margin:'15px' }}>
                <Card.Img
                  variant="top"
                  src={product?.photo}
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>&#x20B9; {product.price}</Card.Text>
                  {/* <Link to={'/agentviewBooking'}><Button variant="primary" >VIEW</Button></Link> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ height: "600rem" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="border border-secondary p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Product Name"  onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                      value={product.name} />
            </Form.Group>
            <label htmlFor="profile" className="text-center mb-3 ">
              <input id="profile" type="file"   onChange={handleImageChange}/>
            </label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Product Price"  onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                      }
                      value={product.price} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Product Description"
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                value={product.description}
              />
            </Form.Group>
            <Form.Control as="select" name="propertytype" className="mb-3"  onChange={(e) =>
                        setProduct({ ...product, propertytype: e.target.value })
                      }
                      value={product.propertytype}>
              <option value="">Select categories</option>
              <option value="home">Home</option>
              <option value="shop">Shop</option>
              <option value="office">Office</option>
            </Form.Control>
            <Form.Control as="select" name="catgory" className=""  onChange={(e) =>
                        setProduct({ ...product, catgory: e.target.value })
                      }
                      value={product.catgory}>
              <option value="">Select SubCategories</option>
              <option value="kitchen">kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="bedroom">Bedroom</option>
              <option value="diningroom">Diningroom</option>
              <option value="reception">Reception</option>
              <option value="pantry">Pantry</option>
              <option value="meetingroom">Meetingroom</option>
              <option value="shoproom">Shoproom</option>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-danger me-4"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-warning"
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
       {/* toastify */}
     <ToastContainer
position="top-center"
style={{marginTop:'150px'}}
autoClose={2000}
theme="dark"
/>
    </>
  );
}

export default AgentProductList;
