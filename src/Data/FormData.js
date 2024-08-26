import { useEffect, useState } from "react";
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
  const Cart = useSelector((state) => state.Cart.cart);

  const dispatch = useDispatch();
  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (nameV.length === 0 || +price <= 0 || +quantity <= 0) {
      return;
    }
    let obj = {
      nameV: nameV,
      price: price,
      quantity: quantity,
    };
    try {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/data.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Post Error");
      }
      let data = await resp.json();
      dispatch(listAction.set({ ...obj, id: data.name }));
    } catch (error) {
      console.log(error);
    }

    setNameV("");
    setPrice("");
    setQuantity("");
  };
  useEffect(() => {
    async function getData() {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/data.json"
      );
      let data = await resp.json();
      let res = [];
      for (let key in data) {
        res.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(listAction.get(res));
    }
    getData();
  }, [dispatch]);

  const EditHandler = async (item) => {
    setNameV(item.nameV);
    setPrice(item.price);
    setQuantity(item.quantity);
    let index = FormList.findIndex((items) => items.nameV === item.nameV);
    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/data/${FormList[index].id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!resp.ok) {
        throw new Error("Delete Error");
      }
      dispatch(listAction.remove(item));
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteHandler = async (item) => {
    let index = FormList.findIndex((items) => items.nameV === item.nameV);
    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/data/${FormList[index].id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!resp.ok) {
        throw new Error("Delete Error");
      }
      dispatch(listAction.remove(item));
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateHandler = async (item) => {
    let index = FormList.findIndex((items) => items.nameV === item.nameV);
    if (nameV.length === 0 || +price <= 0 || +quantity <= 0) {
      return;
    }
    let obj = {
      nameV: nameV,
      price: price,
      quantity: quantity,
    };
    try {
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/data/${FormList[index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: { "Content-type": "application/json" },
        }
      );
      if (!resp.okay) {
        throw new Error("Put Error");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.update({ obj, item }));
    } catch (error) {
      console.log(error);
    }
    setNameV("");
    setPrice("");
    setQuantity("");
  };

  useEffect(() => {
    async function getData() {
      let resp = await fetch(
        "https://petshop-10b84-default-rtdb.firebaseio.com/cart.json"
      );
      let data = await resp.json();
      let res = [];
      for (let key in data) {
        res.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(cartAction.get(res));
    }
    getData();
  }, [dispatch]);

  const AddHandler = async (item) => {
    let index = Cart.findIndex((items) => items.nameV === item.nameV);
    let Index = FormList.findIndex((items) => items.nameV === item.nameV);
    if (index === -1) {
      let obj = { ...item, amount: 1 };
      try {
        let resp = await fetch(
          "https://petshop-10b84-default-rtdb.firebaseio.com/cart.json",
          {
            method: "POST",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error("Post Cart Error");
        }
        let data = await resp.json();
        dispatch(cartAction.add({ ...item, amount: 1, id: data.name }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let obj = {
          ...Cart[index],
          amount: Cart[index].amount + 1,
        };
        let resp = await fetch(
          `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${Cart[index].id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
            secureToken: { "Content-Type": "application/json" },
          }
        );
        if (!resp.ok) {
          throw new Error("Post Cart Error");
        }
        let data = await resp.json();
        console.log(data);
        dispatch(cartAction.add(item));
      } catch (error) {
        console.log(error);
      }
    }

    try {
      let obj = {
        ...FormList[Index],
        quantity: FormList[Index].quantity - 1,
      };
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/data/${FormList[Index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Post Cart Error");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.quantityReduce(item));
    } catch (error) {
      console.log(error);
    }
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
