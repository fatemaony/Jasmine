import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Root = () => {
  return (
    <>
      <Navbar />
      <Loading />
      <Outlet />
      
      
    </>
  );
};

export default Root;
