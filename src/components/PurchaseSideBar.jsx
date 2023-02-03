import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchaseThunk } from "../store/slices/cart.slice";

const PurchaseSideBar = ({ show, handleClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  console.log(cart);

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary">Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="mb-0">
            {cart.map((itemCart) => (
              <li key={itemCart.createdAt} style={{ listStyle: "none" }}>
                <img
                  style={{ width: 100 }}
                  src={itemCart.product?.images[0].url}
                  alt=""
                ></img>
                {itemCart.product?.title}
              </li>
            ))}
          </ul>
          <div className="container__button-buy">
            <button
              className="btn btn-primary"
              onClick={() => dispatch(purchaseThunk())}
            >
              Buy
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default PurchaseSideBar;
