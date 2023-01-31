import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Detail</h1>
      <p>
        Mostrando producto de Id: <b>{id}</b>
      </p>
    </div>
  );
};

export default ProductDetail;
