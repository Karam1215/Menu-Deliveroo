import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart,AddressBook } from "phosphor-react";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/">Menu</Link>
        <Link to="/contact">
        <AddressBook size={32} />
        </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
