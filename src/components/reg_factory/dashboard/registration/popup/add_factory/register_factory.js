/** @jsxImportSource @emotion/react */

import { main_url, cookies_id, states } from "@/src/details";
import { success_message, error_message } from "@/src/components/toasts";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { FactoryContext } from "@/src/context/factoryContext";
const RegisterFactory = (props) => {
  const [occupier_name, setOccupier_name] = useState("");
  const [state, setState] = useState("");
  const [factory_type, setFactory_type] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [first_year, setFirst_year] = useState("");
  const [last_year, setLast_year] = useState("");
  const [certificate_num, setCertificate_num] = useState("");

  const router = useRouter();
  const factory = useContext(FactoryContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const currentYear = new Date().getFullYear();
  const startYear = 2005;

  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const factoryTypes = [
    "Accommodation and food service activities",
    "Administrative and support service activities",
    "Agriculture, forestry and fishing",
    "Arts, entertainment and recreation",
    "Construction",
    "Education",
    "Electricity, gas, steam and air conditioning supply",
    "Financial and insurance activities",
    "Human health and social work activities",
    "Information and communication",
    "Mining and quarrying",
    "Manufacturing",
    "Professional, scientific and technical activities",
    "Public administration and defence; compulsory social security",
    "Real estate activities",
    "Transportation and storage",
    "Water supply; sewerage, waste management and remediation activities",
    "Wholesale and retail trade; repair of motor vehicles and motorcycles",
    "Other service activities",
  ];
  const login_account = () => {
    // props.next();
    // router.push("/dashboard/registration?tab=b");

    setLoading(true);
    factory.add_factory_details(
      occupier_name,
      state,
      factory_type,
      address,
      last_year,
      first_year,
      certificate_num
    );
    router.push("/dashboard/registration?tab=b");
    // console.log(factory.factory_details);

    setLoading(false);

    // axios
    //   .post(
    //     `${main_url}/inventory/factory`,
    //     {
    //       occupier_name: occupier_name,
    //       state: state,
    //       type: factory_type,
    //       address: address,
    //       year_of_last_renewal: last_year,
    //       year_of_first_registration: first_year,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${Cookies.get(cookies_id)}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response.data);
    //     factory.add_factory_id(response.data.data.factory._id);
    //     router.push("/dashboard/registration?tab=b");
    //     success_message("User created");
    //     mutate(`${main_url}/inventory/factory/all`);

    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     error_message(error.response.data.message);
    //     console.log(error);
    //     setLoading(false);
    //   });
    console.log("ade");
  };

  console.log(factory.factory_details);
  console.log("factory");
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit(() => login_account())}>
          <div
            css={(theme) => ({
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              marginTop: 58,
              justifyContent: "space-between",
              rowGap: 0,
              columnGap: 64,
              width: "100%",
              height: "auto",
            })}
          >
            <div>
              <div>
                <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Occupier name"
                  {...register("occupation", { required: true })}
                  type="text"
                  onChange={(e) => setOccupier_name(e.target.value)}
                  value={occupier_name}
                />
                {errors.occupation && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
              <div
                css={{
                  marginTop: 32,
                }}
              >
                <select
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="State"
                  {...register("state", { required: true })}
                  type="text"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <option>State</option>
                  {states.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
              <div
                css={{
                  marginTop: 32,
                }}
              >
                {/* <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Type of factory"
                  {...register("type", { required: true })}
                  type="text"
                  onChange={(e) => setFactory_type(e.target.value)}
                  value={factory_type}
                /> */}
                <select
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Type of factory"
                  {...register("type", { required: true })}
                  type="text"
                  onChange={(e) => setFactory_type(e.target.value)}
                  value={factory_type}
                >
                  <option>Type of factory</option>
                  {factoryTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                {errors.type && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
              <div
                css={{
                  marginTop: 32,
                }}
              >
                <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Certificate Number"
                  {...register("certificate_number", { required: true })}
                  type="text"
                  onChange={(e) => setCertificate_num(e.target.value)}
                  value={certificate_num}
                />
                {errors.certificate_number && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
            </div>
            <div>
              {" "}
              <div>
                {/* <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Year of first registration"
                  {...register("firstyear", { required: true })}
                  type="text"
                  onChange={(e) => setFirst_year(e.target.value)}
                  value={first_year}
                /> */}
                <select
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Year of first registration"
                  {...register("firstyear", { required: true })}
                  type="text"
                  onChange={(e) => setFirst_year(e.target.value)}
                  value={first_year}
                >
                  <option>Year of first registration</option>
                  {yearsArray.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                {errors.firstyear && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
              <div
                css={{
                  marginTop: 32,
                }}
              >
                {/* <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Year of last renewal"
                  {...register("lastyear", { required: true })}
                  type="text"
                  onChange={(e) => setLast_year(e.target.value)}
                  value={last_year}
                /> */}
                <select
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Year of last renewal"
                  {...register("lastyear", { required: true })}
                  type="text"
                  onChange={(e) => setLast_year(e.target.value)}
                  value={last_year}
                >
                  <option>Year of last renewal</option>
                  {yearsArray.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                {errors.lastyear && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
              <div
                css={{
                  marginTop: 32,
                }}
              >
                <input
                  css={(theme) => ({
                    padding: "12px 4px",
                    width: 325,
                    fontSize: 16,
                    color: theme.colors.Gray_500,
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      border: "none",
                      borderBottom: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 4px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Address"
                  {...register("address", { required: true })}
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {errors.address && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            css={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              css={(theme) => ({
                width: 478,
                height: 56,
                borderRadius: 30,
                padding: "16px 24px",
                marginBottom: 30,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                color: theme.colors.Gray_50,
                backgroundColor:
                  occupier_name &&
                  state &&
                  factory_type &&
                  address &&
                  last_year &&
                  first_year
                    ? theme.colors.Primary_800
                    : theme.colors.Primary_300,
              })}
              type="submit"
            >
              {loading ? "Creating..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFactory;
