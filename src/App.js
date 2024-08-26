import React, { useState } from "react";
import Header from "./UI/Header";
import FormData from "./Data/FormData";
import Modal from "./Modal/Modal";

function App() {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };
  return (
    <div>
      {show && <Modal onClose={hideHandler} />}
      <Header onShow={showHandler} />
      <FormData />
    </div>
  );
}

export default App;
