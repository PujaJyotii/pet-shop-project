import ReactDOM from "react-dom";
import Cart from "../Cart/Cart";
import classes from "./Modal.module.css";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

function Overlay(props) {
  return (
    <div className={classes.overlay}>
      <Cart onClose={props.onClose} />
    </div>
  );
}

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop")
      )}
      ,
      {ReactDOM.createPortal(
        <Overlay onClose={props.onClose} />,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
