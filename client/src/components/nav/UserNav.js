import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav className="border bg-info text-light pt-1 pl-1 h-100">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="text-light nav-link p-0 pb-1">
            User History
          </Link>
        </li>
        <li>
          <Link to="/user/password" className=" text-light nav-link p-0 pb-1">
            Manage Password
          </Link>
        </li>
        <li>
          <Link to="/user/wishlist" className=" text-light nav-link p-0 pb-1">
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
