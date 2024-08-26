import { useState } from "react";
import Card from "../UI/Card";
import classes from "./FormData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { listAction } from "../Redux/FormSlice";
import { cartAction } from "../Redux/CartSlice";

function FormData() {
  const [nameV, setNameV] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const FormList = useSelector((state) => state.List.list);

  const dispatch = useDispatch();
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (nameV.length === 0 || +price <= 0 || +quantity <= 0) {
      return;
    }
    let obj = {
      nameV: nameV,
      price: price,
      quantity: quantity,
    };
    dispatch(listAction.set(obj));
    setNameV("");
    setPrice("");
    setQuantity("");
  };

  const EditHandler = (item) => {
    setNameV(item.nameV);
    setPrice(item.price);
    setQuantity(item.quantity);
    dispatch(listAction.remove(item));
  };

  const DeleteHandler = (item) => {
    dispatch(listAction.remove(item));
  };

  const UpdateHandler = (item) => {
    if (nameV.length === 0 || +price <= 0 || +quantity <= 0) {
      return;
    }
    let obj = {
      nameV: nameV,
      price: price,
      quantity: quantity,
    };
    dispatch(listAction.update({ obj, item }));
  };

  const AddHandler = (item) => {
    dispatch(cartAction.add({ ...item, amount: 1 }));
    dispatch(listAction.quantityReduce(item));
  };
  return (
    <>
      <Card className={classes.box}>
        <form onSubmit={SubmitHandler}>
          <h3>For Owners Use Only</h3>
          <label>Name</label>
          <input
            type="text"
            value={nameV}
            onChange={(e) => setNameV(e.target.value)}
          />
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button>Add To List</button>
        </form>
      </Card>
      <Card className={classes.list}>
        <ul>
          {FormList.map((item) => (
            <li key={item.nameV}>
              <div className={classes.box1}>
                <div className={classes.innerBox1}>
                  <div className={classes.name}>
                    Name of Product:{item.nameV}
                  </div>
                  <div className={classes.price}>
                    Price of Product:Rs.{item.price}
                  </div>
                  <div className={classes.quantity}>
                    Quantity of Product:{item.quantity}
                  </div>
                </div>
                <div className={classes.innerBox2}>
                  <button onClick={() => EditHandler(item)}>Edit</button>
                  <button onClick={() => UpdateHandler(item)}>Update</button>
                  <button onClick={() => DeleteHandler(item)}>Delete</button>
                </div>
              </div>
              <div>
                {item.quantity > 0 ? (
                  <button
                    className={classes.btn}
                    onClick={() => AddHandler(item)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  "Out of Stock"
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export default FormData;
