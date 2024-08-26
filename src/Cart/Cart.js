import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import { cartAction } from "../Redux/CartSlice";
import { listAction } from "../Redux/FormSlice";

function Cart(props) {
  const CartList = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const IncreaseHandler = (el) => {
    dispatch(cartAction.increase(el));
    dispatch(listAction.quantityReduce(el));
  };

  const DecreaseHandler = (el) => {
    dispatch(cartAction.decrease(el));
    dispatch(listAction.quantityIncrease(el));
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
