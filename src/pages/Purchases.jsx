import React, { useEffect } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  console.log(purchases);

  return (
    <div>
      <h1>Purchases</h1>
      <Row xs={1} md={1} className="g-4">
        {purchases.map((purchase) => (
          <>
            <Col
              xs={1}
              md={7}
              key={purchase.id}
              onClick={() => navigate(`/products/${purchase.product.id}`)}
            >
              {purchase.product?.title}
            </Col>
            <Col xs={1} md={2}>
              {purchase.quantity}
            </Col>
            <Col xs={1} md={3}>
              {purchase.product?.price}
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
};

export default Purchases;
