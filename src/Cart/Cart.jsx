import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Components/Context/CartContext";
import Loading from "../Components/Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function Cart() {
  let { getCart, deletItem, setCartCounter, updateCartItem, clearCart } =
    useContext(cartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await getCart();

      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
        setCartItem(null);
      } else {
        setData(data);
        setCartItem(data);
        console.log(data);
      }
      //  setData(data)
      //  setCartItem(data)
      // console.log(data);
      setLoading(false);
    })();
  }, []);

  async function removeItem(productId) {
    let data = await deletItem(productId);
    console.log(data);
    if (data.status == "success") {
      toast.error("Product Delete Successfully");
      setCartCounter(data.numOfCartItems);
      setData(data);
      setCartItem(data);
    }
  }

  async function updateItem(productId, count) {
    let data = await updateCartItem(productId, count);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product  Update Successfully");
      setCartCounter(data.numOfCartItems);
      setData(data);
      setCartItem(data);
    }
  }

  if (!cartItem.numOfCartItems)
    return (
      <div className="cartEmpaty ">
        <h4 className="text-main text-center my-4">Your Cart is Empty .</h4>
        <Link to={"/"}>
          <button className="btn bg-main m-auto text-white">Go Shopping</button>
        </Link>
      </div>
    );

  if (loading) return <Loading />;
  return (
    <>
      <div className="container my-3 bg-main-light p-3 rounded-4">
        <h2>Shop Cart :</h2>
        <p className="text-main">
          Total Cart Price : {data?.data.totalCartPrice} EGP
        </p>
        {data?.data.products.map((item) => {
          return (
            <div key={item._id} className="row py-2 border-bottom">
              <div className="col-md-1">
                <img src={item.product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <p className="m-1">
                    {item.product.title.split(" ").slice(0, 12).join(" ")}
                  </p>
                  <p className="text-main m-1 p-0">Price :{item.price}</p>
                  <button
                    className="btn m-0 p-0"
                    onClick={() => {
                      removeItem(item.product._id);
                    }}
                  >
                    <i className="fa-solid fa-trash text-main mx-1"></i>
                    Remove
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      updateItem(item.product._id, item.count + 1);
                    }}
                    className="btn bordr"
                  >
                    +
                  </button>
                  <span className="px-2">{item.count}</span>
                  <button
                    onClick={() => {
                      updateItem(item.product._id, item.count - 1);
                    }}
                    className="btn bordr"
                    disabled={item.count <= 1}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <Link
          to={`/address/${data.data._id}`}
          className="btn bg-main mt-2 text-white w-100"
        >
          Pay
        </Link>
      </div>
    </>
  );
}
