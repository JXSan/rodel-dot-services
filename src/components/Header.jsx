import React from "react";
import { useStateValue } from "../StateProvider";
import { auth } from "../config/firebase";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();

  const signOut = () => {
    if (user) auth.signOut();
  };
  return <div>Header</div>;
};

export default Header;
