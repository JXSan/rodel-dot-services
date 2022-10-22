import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Landing from "../pages/Landing";

const Home = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <Header />
      <Landing />
      <Footer />
    </>
  );
};

export default Home;
