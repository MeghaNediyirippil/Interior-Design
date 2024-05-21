import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { getProductsApi } from './Services/allApis';
import { Link, useParams } from 'react-router-dom';


function ViewAgentProductList() {
  const { agentid } = useParams();
  const {agentname}=useParams();
  const token = localStorage.getItem("token");
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to get products
  const getProducts = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    try {
      const response = await getProductsApi(agentid, reqHeader);
      console.log(response.data);
      setAllProducts(response.data);
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
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="align-items-center justify-content-center d-flex mt-5 mb-5">
        <div className="d-flex w-50 align-items-center border rounded">
          <input
            type="text"
            placeholder="Search By Products"
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div style={{ marginLeft: "-50px" }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="ms-5 btn ">
          <Link to={`/chat/${agentid}/${agentname}`}>
            <i className="fa-brands fa-rocketchat ms-5 " style={{ fontSize: '20px' }}>Chat us</i>
          </Link>
        </div>
      </div>
      <div className="m-5 ">
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={3}>
              <Card style={{ width: '18rem' }} className='mb-4'>
                <Card.Img variant="top" src={product.photo} style={{ height: "250px" }}/>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    &#x20B9; {product.price}
                  </Card.Text>
                  <Button variant="primary">
                    <Link to={`userbookagentproduct/${product.id}`} className="text-light" style={{ textDecoration: "none" }}>Book Now</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default ViewAgentProductList;