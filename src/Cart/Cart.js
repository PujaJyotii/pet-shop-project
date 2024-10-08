import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import { cartAction } from "../Redux/CartSlice";
import { listAction } from "../Redux/FormSlice";

function Cart(props) {
  const CartList = useSelector((state) => state.Cart.cart);
  let FormList = useSelector((state) => state.List.list);
  const dispatch = useDispatch();
  const IncreaseHandler = async (el) => {
    let index = CartList.findIndex((item) => item.nameV === el.nameV);
    let Index = FormList.findIndex((item) => item.nameV === el.nameV);
    try {
      let obj = {
        ...CartList[index],
        amount: CartList[index].amount + 1,
      };
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${CartList[index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: { "Content-type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Quantity Cart Increase Error");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(cartAction.increase(el));
    } catch (error) {
      console.log(error);
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
          secureToken: { "Content-type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("List DecreaseError");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.quantityReduce(el));
    } catch (error) {
      console.log(error);
    }
  };

  const DecreaseHandler = async (el) => {
    let index = CartList.findIndex((item) => item.nameV === el.nameV);
    let Index = FormList.findIndex((item) => item.nameV === el.nameV);

    try {
      let obj = { ...CartList[index], amount: CartList[index].amount - 1 };

      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/cart/${CartList[index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error("Decrease Quantity in Cart");
      }
      let data = await resp.json();
      console.log(data);
      dispatch(cartAction.decrease(el));
    } catch (error) {
      console.log(error);
    }

    try {
      let obj = { ...FormList[Index], quantity: FormList[Index].quantity + 1 };
      let resp = await fetch(
        `https://petshop-10b84-default-rtdb.firebaseio.com/data/${FormList[Index].id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(obj),
          secureToken: { "Content-Type": "application/json" },
        }
      );
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      let data = await resp.json();
      console.log(data);
      dispatch(listAction.quantityIncrease(el));
    } catch (error) {
      console.log(error);
    }
  };
  let totalAmount = CartList.reduce((total, el) => {
    return total + el.price * el.amount;
  }, 0);
  return (
    <Card className={classes.cart}>
      <h4>Cart</h4>
      <ul>
        {CartList.map((el) => (
          <li key={el.nameV} className={classes.values}>
            <div className={classes.content}>
              <div>Name of Product:{el.nameV}</div>
              <div>Price of Product:Rs.{el.price}</div>
            </div>
            <div className={classes.btn}>
              <span
                className={classes.btn1}
                onClick={() => IncreaseHandler(el)}
              >
                +
              </span>
              <span>x{el.amount}</span>
              <span
                className={classes.btn2}
                onClick={() => DecreaseHandler(el)}
              >
                -
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.totalA}>Total Amount:Rs.{totalAmount}</div>
      <div className={classes.bttn}>
        <button className={classes.close} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.purchase}>Purchase</button>
      </div>
    </Card>
  );
}

export default Cart;
