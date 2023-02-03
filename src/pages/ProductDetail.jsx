import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCartThunk } from "../store/slices/cart.slice";
import { filterProductsCategoryThunk } from "../store/slices/products.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productSuggested = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data.category.id);
        dispatch(filterProductsCategoryThunk(res.data.category.id));
      });
  }, [id]);

  const [quantity, setQuantity] = useState("");

  const addToCart = () => {
    const productToBuy = {
      productId: product.id,
      quantity: quantity,
    };
    dispatch(addCartThunk(productToBuy));
  };

  return (
    <div>
      <Row>
        <Col lg={8}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={product.images?.[0].url}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={product.images?.[1].url}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-50"
                src={product.images?.[2].url}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* Descripción del producto*/}

        <Col lg={4}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p style={{ paddingTop: 50, fontSize: 20 }}>
            <b>Price ${product.price}</b>
          </p>
          <div className="container__input-quantity">
            <button class="btn btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-down-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>
            </button>
            <input
              style={{ width: 100 }}
              class="form-control"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={"Quantity"}
            ></input>
            <button class="btn btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-up-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
                />
              </svg>
            </button>
          </div>
          <div className="container__button-buy">
            <Button className="btn btn-lg btn-primary" onClick={addToCart}>
              Add Cart
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Otros productos */}

      <h2>Discover similar items</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {productSuggested.map((product) => (
          <Col
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Card style={{ boxShadow: "0px 0px 5px 0px #EEEEEE" }}>
              <img
                style={{
                  height: 200,
                  objectFit: "contain",
                  backgroundColor: "whitesmoke",
                }}
                src={product.images?.[0].url}
                alt=""
              />
              {product.title}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductDetail;
