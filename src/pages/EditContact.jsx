import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Add_Contact } from "../actions/Action";
import { validationSchema } from "../FormikInput";

const EditContact = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const myArray = useSelector((s) => s.contactList);
  const [feild, setFeild] = useState({
    name: "",
    phone: "",
    type: "",
    image: "",
    whats_app: "",
  });

  // var initialValues = {
  //   name: data[0]?.name,
  //   phone: data[0]?.phone,
  //   type: data[0]?.type,
  //   image: data[0]?.image,
  //   whats_app: data[0]?.whats_app,
  // };

  // var initialValues = {
  //   name: data[0]?.name,
  //   phone: data[0]?.phone,
  //   type: data[0]?.type,
  //   image: data[0]?.image,
  //   whats_app: data[0]?.whats_app,
  // };
  const { index } = useParams();

  console.log("myArray is", myArray);

  const compare = () => {
    let compareData = myArray.filter((e, ind) => {
      return ind == Number(index);
    });
    console.log("e is", compareData);
    // setFeild({
    //   name: compareData[0]?.name,
    //   phone: compareData[0]?.phone,
    //   type: compareData[0]?.type,
    //   image: compareData[0]?.image,
    //   whats_app: compareData[0]?.whats_app,
    // });
    setFeild({
      name: compareData[0]?.name,
      phone: compareData[0]?.phone,
      type: compareData[0]?.type,
      image: compareData[0]?.image,
      whats_app: compareData[0]?.whats_app,
    });

    setData(compareData);
  };
  const dispatch = useDispatch();
  const reload = () => {
    window.location.reload();
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

  useEffect(() => {
    compare();
  }, []);

  // console.log(data[0]);

  const handleChange = (e) => {
    setFeild({ ...feild, [e.target.name]: e.target.value });
  };

  const { values, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: feild,

    onSubmit: (values) => {
      setUpdate(true);
      console.log(values);
      var itemList = [];
      // let a = Cookies.get("list");
      let a = localStorage["list"];
      console.log("a is ", a);
      if (a != undefined) {
        var b = JSON.parse(a);
        console.log("b is ", b);
        let c = b.findIndex((item, ind) => ind == Number(index));
        // console.log("c is ", c);
        if (c !== -1) {
          b[c]["name"] = feild.name;
          b[c]["phone"] = feild.phone;
          b[c]["image"] = feild.image;
          b[c]["type"] = feild.type;
          b[c]["whats_app"] = feild.whats_app;
          console.log("b is ", b);
          // b.map((key, index) => {
          //   // console.log("dgdehhh", productList);
          //   itemList.push({
          //     name: values.name,
          //     phone: values.phone,
          //     type: values.type,
          //     image:
          //       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          //     whats_app: "Yes",
          //   });
          // });
          // setProductList(productList);
          // Cookies.set("list", JSON.stringify(b));
          localStorage["list"] = JSON.stringify(b);
          reload();
        }
      }
    },
  });

  console.log("data is ", feild);
  return (
    <div className="block p-6 rounded-lg shadow-lg m-auto mt-5 bg-white max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <img
            className="w-32 h-32 border-2 border-black border-solid rounded-full object-cover"
            src={feild?.image}
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="name"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={feild.name}
            defaultValue={feild.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="name"
            placeholder="Enter Contact Name"
          />
          <small id="name" className="block mt-1 text-xs text-gray-600">
            We'll never share your contact with anyone else.
          </small>
          {/* {errors.name && touched.name ? (
            <span className="text-red-500 ">{errors.name}</span>
          ) : null} */}
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="phone"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="phone"
            placeholder="Enter Phone Number"
            value={feild.phone}
            defaultValue={feild.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {/* {errors.phone && touched.phone ? (
            <span className="text-red-500 ">{errors.phone}</span>
          ) : null} */}
        </div>

        <div className="flex">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="type"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Type
            </label>
            <select
              value={feild.type}
              defaultValue={feild.type}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-select appearance-none
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding bg-no-repeat
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="type"
            >
              <option selected>Select Type</option>
              <option value="Personal">Personal</option>
              <option value="Office">Office</option>
            </select>
            {/* {errors.type && touched.type ? (
        <span className="text-red-500 ">{errors.type}</span>
      ) : null} */}
          </div>
        </div>
        <div className="form-group form-check mb-6">
          <input
            type="checkbox"
            name="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="checkbox"
            value={feild.checkbox}
            defaultValue={feild.checkbox}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="checkbox"
          >
            Is this a whats'app contact ?
          </label>
        </div>
        {update ? (
          <div className="flex justify-center mb-2">
            <span className="text-lg border w-full text-center py-2 px-3 border-green-700 text-green-500 font-semibold">
              Contact Edit Successfully..
            </span>
          </div>
        ) : null}
        <button
          type="submit"
          className="
  w-full
  px-6
  py-2.5
  bg-blue-600
  text-white
  font-medium
  text-xs
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
          Save
        </button>
        <Link to="/">
          <button
            type="submit"
            className="
  w-full
  px-6
  mt-2
  py-2.5
  bg-gray-300
  text-black
  font-medium
  text-xs
  leading-tight
  uppercase
  rounded
  shadow-md
  hover:bg-blue-200 hover:shadow-lg
  focus:bg-blue-200 focus:shadow-lg focus:outline-none focus:ring-0
  active:bg-blue-300 active:shadow-lg
  transition
  duration-150
  ease-in-out"
          >
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EditContact;
