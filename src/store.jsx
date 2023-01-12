import { createStore } from "redux";
import { ADD_CONTACT, DLT_FROM_LIST } from "./actions/Action";

const initial_state = {
  contactList: [],
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contactList: action.payload,
      };

    // case REMOVE_LIST:
    //   return {
    //     ...state,
    //     cartItem: action.payload,
    //   };

    case DLT_FROM_LIST:
      // const data = state.cartItem.filter((elem) => elem.id !== action.payload);
      return {
        ...state,
        contactList: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
