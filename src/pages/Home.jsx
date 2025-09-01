import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "../components/layout/HomeLayout";
import Banner from "../components/home/Banner";
import HowItWorks from "../components/home/HowItWorks";
import KeyFeatures from "../components/home/KeyFeatures";
import Testimonials from "../components/home/Testimonials";
import FinalCTA from "../components/home/FinalCTA";

const Home = () => {
  return (
    <>
      <Banner />
      <HowItWorks />
      <KeyFeatures />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

export default Home;
