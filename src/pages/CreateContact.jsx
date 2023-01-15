import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Add_Contact } from "../actions/Action";
import { validationSchema } from "../FormikInput";

export const initialValues = {
  name: "",
  phone: "",
  type: "",
  image: "",
  whats_app: "",
};

const CreateContact = () => {
  const dispatch = useDispatch();
  const [whatsApp, setWhatsApp] = useState("");
  const [image, setImage] = useState();
  const [update, setUpdate] = useState(false);

  // let history = useHistory();

  const navigate = useNavigate();

  const goHome = () => {
    console.log("called");

    setTimeout(() => {
      // history.push("/");
      navigate("/");
    }, 3000);
  };

  // const imageUrl = () => {
  //   document.querySelector("#file1").addEventListener("change", function () {
  //     const reader = new FileReader();

  //     reader.addEventListener("load", () => {
  //       console.log(reader.result);
  //       setImage(reader.result);
  //     });
  //     reader.readAsDataURL(this.files[0]);
  //   });
  // };

  const imageUpload = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    getBase64(file).then((base64) => {
      // console.log(base64);
      setImage(base64);
      // localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
    });
  };

  // console.log(image);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        goHome();
        if (values.checkbox) {
          setWhatsApp("Yes");
        } else {
          setWhatsApp("No");
        }
        console.log(values.checkbox);
        // console.log(document.querySelector("#file1").files[0]);

        // let base64code = "";

        // const onLoad = (fileString) => {
        //   this.base64code = fileString;
        //   console.log(fileString);
        // };
        // const files = values.image;
        // const file = files[0];

        // const getbase64 = (file) => {
        //   let reader = new FileReader();
        //   reader.readAsDataURL(file);
        //   reader.onload = () => {
        //     onLoad(reader.result);
        //   };
        // };

        // getbase64(file);

        // setImage(this.base64code);
        // imageUrl();

        // var reader = new FileReader();
        // reader.readAsDataURL(document.getElementById("file1").files[0]);
        // console.log(reader.result);

        var itemList = [];
        // let a = Cookies.get("list");
        let a = localStorage["list"];
        if (a != undefined) {
          var b = JSON.parse(a);

          // console.log("b is ", b);
          let i = b;

          i.push({
            name: values.name,
            phone: values.phone,
            type: values.type,
            image: image,
            whats_app: values?.checkbox ? "Yes" : "No",
          });
          console.log("itemList", i);
          localStorage["list"] = JSON.stringify(i);
          dispatch(Add_Contact(i));
        } else {
          itemList.push({
            name: values.name,
            phone: values.phone,
            type: values.type,
            image: image,
            whats_app: values?.checkbox ? "Yes" : "No",
          });
          console.log("itemList", itemList);
          localStorage["list"] = JSON.stringify(itemList);
          dispatch(Add_Contact(itemList));
        }
        setUpdate(true);
      },
    });
  return (
    <div className="block p-6 rounded-lg shadow-lg m-auto mt-5 bg-white max-w-sm">
      <form onSubmit={handleSubmit}>
        {/* <div className="flex justify-center">
          <img
            className="w-32 h-32 border-2 border-black border-solid rounded-full object-cover"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMGhlYWRzaG90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div> */}
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
            value={values.name}
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
          {errors.name && touched.name ? (
            <span className="text-red-500 ">{errors.name}</span>
          ) : null}
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="phone"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Phone
          </label>
          <input
            type="number"
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
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone ? (
            <span className="text-red-500 ">{errors.phone}</span>
          ) : null}
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="phone"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Image URL
          </label>
          <input
            type="file"
            accept=".png,.jpeg"
            id="imageFile"
            name="imageFile"
            onChange={imageUpload}
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
            placeholder="Enter Image URL"
            // value={values.image}
            onBlur={handleBlur}
          />
          {errors.image && touched.image ? (
            <span className="text-red-500 ">{errors.image}</span>
          ) : null}
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
              value={values.type}
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
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="checkbox"
            value={values.checkbox}
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
              Contact Created Successfully..
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

export default CreateContact;
