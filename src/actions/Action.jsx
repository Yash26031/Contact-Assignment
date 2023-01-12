export const ADD_CONTACT = "Add_contact";
export const DLT_FROM_LIST = "Delete_from_cart";
// export const REMOVE_LIST = "remove_list_from_cookies";
// export const UPDATE_QUANTITY = "update_quantity";

export const Add_Contact = (item) => {
  console.log(item);
  return {
    type: ADD_CONTACT,
    payload: item,
  };
};

export const Dlt_Contact = (id) => {
  return {
    type: DLT_FROM_LIST,
    payload: id,
  };
};

// export const Dlt_List = (remove) => {
//   return {
//     type: REMOVE_LIST,
//     payload: remove,
//   };
// };
