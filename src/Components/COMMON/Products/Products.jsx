import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { productlistAPI, wishListApi } from "../../Services/allApis";
// import { useCart, useWishlist } from "../../CONTEXT/context";
import './Product.css'
import axios from "axios";
import Swal from "sweetalert2";

function Products() {

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [product, setProduct] = useState([]);

  const handleProduct = async () => {
    console.log(token);
    const response = await productlistAPI(headers);
    console.log(response);
    setProduct(response.data);
  };
  useEffect(() => {
    handleProduct();
  }, []);

  const handleCart = async (id) => {
    try {

      const response = await axios.post(`http://127.0.0.1:8000/AddToCart/${id}/1/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 201) {
        console.log(response);
        // alert("Added to cart")
      }
    
      window.location.reload()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This item is currently out of stock.',
        confirmButtonColor: '#dbaf40',
      });
    }

  }
  const getWishlist = async () => {

    try {
      const response = await wishListApi(headers)
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  const handleWishList = async (id) => {
    console.log(id);
    try {

      const response = await axios.post(`http://127.0.0.1:8000/wishlist/add/${id}/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 201) {
        console.log(response);
        // alert("Added to Wishlist")
        getWishlist()

      }

      window.location.reload()
    } catch (error) {
      alert("Not Added")

      console.log(error);
    }

  }
  console.log(product);

  return (
    <>

      <div className="align-item-center justify-content-center mt-5 mb-5 row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {product ? (
          product.map((i) => (
            <Card style={{ width: "22rem" }} className="ms-5 shadow p-2 cards-product mb-5 mt-5">
              <Card.Img
                variant="top"
                src={i.photo}
                className="img img-fluid"
                style={{ height: "250px" }}
              />
              <Card.Body>
                <Card.Title className="text-center text-dark">{i?.Name}</Card.Title>
                <div className="d-flex mt-4 justify-content-between ">
                <Card.Text>
                      <h5 className="card-price text-center">
                        <span className="text-warning">${i.price}</span>
                      </h5>
                    </Card.Text>
                    { i.quantity > 0 ? (
                     <Card.Text>
                     <span className="text-success d-lg-flex justify-content-center ">Stock : {i.quantity}</span>
                   </Card.Text>
                  ):(
                    <Card.Text>
                    <span className="text-danger d-lg-flex justify-content-center ">Out of Stock</span>
                  </Card.Text>
                  )}


                 

                </div>
                <div className="d-flex justify-content-between ">

                  <Button onClick={() => handleWishList(i?.id)} className="btn  mt-auto btn-light">
                    <i
                      className="fa-solid fa-heart text-danger"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </Button>
                  {" "}

                  <Button onClick={() => handleCart(i?.id)} className="btn  mt-auto  btn-light">
                    <i
                      className="fa-solid fa-cart-plus text-success "
                      style={{ fontSize: "30px" }}
                    ></i>
                  </Button>

                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>

    </>
  );
}

export default Products;
