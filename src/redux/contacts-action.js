import shortid from "shortid";
import { createAction } from "@reduxjs/toolkit";

const addItem = createAction("items/Add", (name, number) => {
  return {
    payload: {
      id: shortid.generate(),
      name,
      number,
    },
  };
});

const removeItem = createAction("items/Remove");

const filterItem = createAction("items/Filter");

export default { addItem, removeItem, filterItem };
