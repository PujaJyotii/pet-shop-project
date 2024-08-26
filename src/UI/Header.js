import { useSelector } from "react-redux";
import classes from "./Header.module.css";

function Header(props) {
  let Cart = useSelector((state) => state.Cart.cart);
  let totalNo = Cart.reduce((total, el) => {
    return total + el.amount;
  }, 0);
  return (
    <div className={classes.box}>
      <h2>Pet Product Corner</h2>
      <button className={classes.btn} onClick={props.onShow}>
        <span className={classes.res1}>Your Cart</span>
        <span className={classes.res2}>{totalNo}</span>
      </button>
    </div>
  );
}

export default Header;
