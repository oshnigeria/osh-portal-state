/** @jsxImportSource @emotion/react */

import React, { createContext, useState, useEffect, useContext } from "react";
import StateAdminPortalComp from "../state_admin_portal";
import { useRouter } from "next/router";
import { cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import AuthNavWrapper from "../auth_nav";
const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get(cookies_id)) {
      null;
    } else {
      router.push("/signin");
    }
  }, []);

  const notification = [
    {
      title: "Modal Window",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor...",
    },
    {
      title: "Modal Window",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor...",
    },
    {
      title: "Modal Window",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor...",
    },
  ];

  return <StateAdminPortalComp />;
};

export default HomePage;
