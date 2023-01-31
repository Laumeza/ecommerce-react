import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  return (
    <div>
      <Row>
        <Col lg={8}>
          <img src={product.images?.[0].url} alt="" className="img-fluid" />
        </Col>
        <Col lg={4}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </Col>
      </Row>
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
