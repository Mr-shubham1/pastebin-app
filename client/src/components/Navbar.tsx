import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-blue-600">
          Paste app
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className=" flex items-center justify-center gap-1 w-30 py-1 text-sm border  bg-blue-500 text-white cursor-pointer rounded-2xl"
          >
            New Paste
            <span>
              <PlusIcon size={"20px"} />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
