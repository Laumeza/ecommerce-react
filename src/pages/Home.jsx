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
import {
  filterProductsCategoryThunk,
  filterProductsSearchThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [productSearch, setProductSearch] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div>
      <Row>
        {/* Categorías */}

        <Col lg={3}>
          <h1>Categories</h1>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() =>
                  dispatch(filterProductsCategoryThunk(category.id))
                }
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search products"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(filterProductsSearchThunk(productSearch))}
              variant="outline-secondary"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
          <ul>
            <Row xs={1} md={2} lg={3} className="g-4">
              {productsList.map((product) => (
                <Col key={product.id}>
                  <Card
                    style={{ boxShadow: "0px 0px 5px 0px #EEEEEE" }}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={product.images[0].url}
                      style={{
                        height: 200,
                        objectFit: "contain",
                        backgroundColor: "whitesmoke",
                      }}
                    />
                    <Card.Body style={{ height: 150 }}>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              <Button variant="primary">More info</Button>
            </Row>
            ))
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
