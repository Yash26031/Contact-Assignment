import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineFileAdd } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-500 w-full">
      <Link
        to="/"
        className="text-4xl font-bold flex text-white cursor-pointer"
      >
        Home{" "}
        <span className="mt-1 ml-2">
          <AiFillHome />
        </span>
      </Link>
      <div>
        <Link
          to="add-contact"
          className="pr-4 flex text-white text-lg font-semibold"
        >
          Add Contact
          <AiOutlineFileAdd className="mt-1 ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
