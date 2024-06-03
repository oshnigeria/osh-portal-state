import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { cookies_id } from "../details";

const RoutineChecksContext = createContext();

const RoutineChecksProvider = ({ children }) => {
  const [notice_details, setNotice_details] = useState({});

  const add_notice_details = (object) => {
    setNotice_details(object);
  };

  return (
    <RoutineChecksContext.Provider
      value={{
        add_notice_details,
        notice_details,
      }}
    >
      {children}
    </RoutineChecksContext.Provider>
  );
};

export { RoutineChecksContext, RoutineChecksProvider };
