import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Add_Contact, Dlt_Contact } from "../actions/Action";
import DeleteModal from "../components/DeleteModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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

    // Cookies.set("list", JSON.stringify(remove));
    localStorage["list"] = JSON.stringify(remove);
    setShowModal(false);
  };

  useEffect(() => {
    if (myArray == null || myArray.length == 0) {
      let getListCookie = localStorage["list"];
      // console.log(getListCookie);
      if (getListCookie) {
        dispatch(Add_Contact(JSON?.parse(localStorage["list"])));
      }
    }
  }, []);

  console.log("myArray", myArray);

  return (
    <div className="pt-6 pb-12 h-full ">
      {myArray?.length ? (
        <div id="card" className="">
          <h2 className="text-center font-serif  uppercase text-4xl xl:text-5xl">
            All Contacts
          </h2>
          <div className="container flex justify-evenly flex-wrap">
            {myArray.map((item, index) => {
              return (
                <div className="flex  w-96 flex-col overflow-hidden bg-gray-200 rounded-lg shadow-2xl  mt-4 w-100 mx-2">
                  <div className="flex justify-center m-3">
                    <img
                      className="inset-0 w-44 h-44 rounded-full object-cover object-center"
                      src={item?.image}
                    />
                  </div>

                  <div className="w-full py-4 px-6 text-gray-800 flex flex-col">
                    <h3 className="font-semibold text-black text-xl leading-tight truncate">
                      <span className="font-bold "> Name : </span> {item.name}
                    </h3>
                    <p className="mt-2 font-semibold text-black text-xl leading-tight truncate">
                      <span className="font-bold "> Phone : </span> {item.phone}
                    </p>
                    <p className="font-semibold text-black mt-2 text-xl leading-tight truncatemt-2">
                      <span className="font-bold"> Type : </span> {item?.type}
                    </p>
                    <p className="font-semibold mt-2 text-black text-xl leading-tight truncatemt-2">
                      <span className="font-bold "> What's App Contact : </span>{" "}
                      {item?.whats_app}
                    </p>
                    <hr className="my-2"></hr>
                    <div className="flex mt-2 justify-center">
                      <button
                        // onClick={() => removeItem(index)}
                        onClick={() => handleId(index)}
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        type="button"
                        className="focus:outline-none flex text-white mr-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete <AiOutlineDelete className="mt-1 ml-1" />
                      </button>
                      <DeleteModal
                        removeItem={removeItem}
                        onClose={handleClose}
                        visible={showModal}
                      />
                      <Link to={`contact/${index}`}>
                        <button
                          type="button"
                          className="text-white flex bg-blue-700 ml-3 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit <AiOutlineEdit className="mt-1 ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-screen">
          {" "}
          <h2 className="text-center font-serif  uppercase text-lg xl:text-3xl">
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
