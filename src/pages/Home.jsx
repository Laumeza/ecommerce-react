import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartThunk, setCart } from "../store/slices/cart.slice";
import {
  filterProductsCategoryThunk,
  filterProductsSearchThunk,
  getProductsThunk,
} from "../store/slices/products.slice";
import getConfig from "../utils/getConfig";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(addCartThunk());

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  return (
    <div>
      <Row>
        {/* Categorías */}

        <Col lg={3}>
          <h2 className="title__home">Price</h2>
          <div className="input__price">
            <label htmlFor="" className="form-label mt-4" for="readOnlyInput">
              From
            </label>
            <input type="text" className="form-control" id="readOnlyInput" />{" "}
            <label htmlFor="" className="form-label mt-4" for="readOnlyInput">
              to
            </label>
            <input type="text" className="form-control" id="readOnlyInput" />
            <button className="btn btn-outline-primary">Filter price</button>
          </div>
          <h2 className="title__home">Category</h2>
          <ListGroup className="list-home" variant="flush">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() =>
                  dispatch(filterProductsCategoryThunk(category.id))
                }
                style={{ cursor: "pointer" }}
                className="text-secondary"
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Input */}

        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search products"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <Button
              class="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={() => dispatch(filterProductsSearchThunk(productSearch))}
              variant="outline-secondary"
            >
              Search
            </Button>
          </InputGroup>
          <ul>
            {/* Tarjetas con Productos */}

            <Row xs={1} md={2} lg={3} className="g-4">
              {productsList.map((product) => (
                <Col key={product.id}>
                  <Card
                    style={{ boxShadow: "0px 0px 5px 0px #78C2AD" }}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={product.images[0].url}
                      style={{
                        height: 170,
                        objectFit: "contain",
                      }}
                    />
                    <Card.Body
                      style={{ height: 150 }}
                      className="container__info-card"
                    >
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                    </Card.Body>
                    <div className="container__button-card">
                      <Button
                        className="button-card"
                        onClick={() => dispatch(addCartThunk(addCart))}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-bag-heart"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
