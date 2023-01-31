import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterProductsCategoryThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => dispatch(filterProductsCategoryThunk(category.id))}
        >
          {category.name}
        </button>
      ))}
      <ul>
        {productsList.map((product) => (
          <Card
            style={{ width: "18rem" }}
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Card.Img variant="top" src={product.images[0].url} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary">More info</Button>
            </Card.Body>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Home;
