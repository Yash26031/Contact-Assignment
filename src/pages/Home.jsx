import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Add_Contact, Dlt_Contact } from "../actions/Action";
import DeleteModal from "../components/DeleteModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [myId, setMyId] = useState();

  const myArray = useSelector((s) => s.contactList);
  const dispatch = useDispatch();

  const handleId = (id) => {
    setMyId(id);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const removeItem = () => {
    let remove = myArray.filter((item, ind) => ind !== myId);

    dispatch(Dlt_Contact(remove));
    console.log("remove", remove);
    // Cookies.remove("list");
    Cookies.set("list", JSON.stringify(remove));
  };

  useEffect(() => {
    if (myArray == null || myArray.length == 0) {
      let getListCookie = Cookies.get("list");
      // console.log(getListCookie);
      if (getListCookie) {
        dispatch(Add_Contact(JSON?.parse(Cookies.get("list"))));
      }
    }
  }, []);

  console.log("myArray", myArray);

  return (
    <div className="pt-6 pb-12 h-full bg-gray-300">
      {myArray?.length ? (
        <div id="card" className="">
          <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
            All Contacts
          </h2>

          {myArray.map((item, index) => {
            return (
              <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
                <div
                  v-for="card in cards"
                  className="flex flex-col md:flex-row overflow-hidden
                                        bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2"
                >
                  <div className="h-64 w-auto md:w-1/2">
                    <img
                      className="inset-0 h-full w-full object-cover object-center"
                      src={item?.image}
                    />
                  </div>

                  <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      Name : {item.name}
                    </h3>
                    <p className="mt-2 font-semibold text-lg leading-tight truncate">
                      Phone : {item.phone}
                    </p>
                    <p className="font-semibold mt-2 text-lg leading-tight truncatemt-2">
                      Type : {item?.type}
                    </p>
                    <p className="font-semibold mt-2 text-lg leading-tight truncatemt-2">
                      What's App Contact : {item?.whats_app}
                    </p>
                    <div className="flex mt-2 justify-center">
                      <button
                        // onClick={() => removeItem(index)}
                        onClick={() => handleId(index)}
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        type="button"
                        className="focus:outline-none text-white mr-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                      <DeleteModal
                        removeItem={removeItem}
                        onClose={handleClose}
                        visible={showModal}
                      />
                      <Link to={`contact/${index}`}>
                        <button
                          type="button"
                          className="text-white bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen">
          {" "}
          <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
            Please Add Contact...
          </h2>
          <div className="flex justify-center mt-5">
            <Link to="add-contact">
              <button
                type="submit"
                className="
      w-44
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-lg
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              >
                Add Contact
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
