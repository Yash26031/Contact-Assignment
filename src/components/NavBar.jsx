import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineFileAdd } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-500 w-full">
      <Link
        to="/"
        className="text-lg md:text-3xl font-bold hover:text-black transition duration-150 ease-in-out flex text-white cursor-pointer"
      >
        Home{" "}
        <span className="mt-1 ml-2">
          <AiFillHome />
        </span>
      </Link>
      <div>
        <Link
          to="add-contact"
          className="pr-4 flex text-white md:text-3xl hover:text-black transition duration-150 ease-in-out text-lg font-semibold"
        >
          Add Contact
          <AiOutlineFileAdd className="mt-1 ml-2" />
        </Link>
      </div>
    </div>
    // <nav className="bg-gray-800">
    //   <div className="flex items-center justify-between p-4">
    //     <Link to="/" className="text-white">
    //       Home
    //     </Link>
    //     <div className="flex items-center">
    //       <Link to="add-contact" className="text-white mr-2">
    //         <svg
    //           className="h-6 w-6 fill-current hover:text-green-500 transition duration-150 ease-in-out"
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 20 20"
    //         >
    //           <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    //         </svg>
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
