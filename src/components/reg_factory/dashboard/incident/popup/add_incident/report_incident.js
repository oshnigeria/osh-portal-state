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
const ReportIncident = (props) => {
  const [factory_name, setFactory_name] = useState("");
  const [state, setState] = useState("");
  const [factory_type, setFactory_type] = useState("");
  const [victim_name, setVictim_name] = useState("");
  const [reported_by, setReported_by] = useState("");
  const [incident_type, setIncident_type] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const factory = useContext(FactoryContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const login_account = () => {
    // props.next();
    // router.push("/dashboard/incidents?tab=b");
    setLoading(true);
    factory.add_incident_details(
      factory_name,
      state,
      reported_by,
      incident_type,
      victim_name,
      factory_type
    );
    router.push("/dashboard/incidents?tab=b");
    // axios
    //   .post(
    //     `${main_url}/inventory/incident`,
    //     {
    //       factory_name: factory_name,
    //       state: state,
    //       reported_by: reported_by,
    //       type_of_incident: incident_type,
    //       victim_name: victim_name,
    //       factory_type: factory_type,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${Cookies.get(cookies_id)}`,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     // console.log(response.data.data.incident._id);
    //     factory.add_incident_id(response.data.data.incident._id);
    //     console.log(factory.incident_id);
    //     router.push("/dashboard/incidents?tab=b");
    //     success_message("Incident reported");
    //     // mutate(`${main_url}/inventory/factory/all`);

    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     // error_message(error.response.data.message);
    //     console.log(error);
    //     setLoading(false);
    //   });
    console.log("ade");
  };
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
  return (
    <div>
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
                  placeholder="Factory name"
                  {...register("factory_name", { required: true })}
                  type="text"
                  onChange={(e) => setFactory_name(e.target.value)}
                  value={factory_name}
                />
                {errors.factory_name && (
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
                  placeholder="Victim name"
                  {...register("victim_name", { required: true })}
                  type="text"
                  onChange={(e) => setVictim_name(e.target.value)}
                  value={victim_name}
                />
                {errors.victim_name && (
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
              <div
                css={{
                  position: "relative",
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
                  placeholder="Reported by"
                  {...register("reported_by", { required: true })}
                  value={reported_by}
                  onChange={(e) => {
                    setReported_by(e.target.value);
                    // console.log(e.target.value);
                    // console.log(catId);
                  }}
                >
                  {/* <option value={"victim"}>Victim</option> */}
                  <option value={"eye_witness"}>Eye witness</option>
                  <option value={"occupier"}>Occupier</option>
                  {/* <option value={"inpspector"}>Inspector</option> */}
                </select>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_500,
                    fontSize: 12,
                    position: "absolute",
                    marginTop: 4,
                    left: 0,
                  })}
                >
                  (Click here to select, Reported by)
                </div>
                {errors.reported_by && (
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
                  position: "relative",
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
                  placeholder="Reported by"
                  {...register("incident_type", { required: true })}
                  value={incident_type}
                  onChange={(e) => {
                    setIncident_type(e.target.value);
                    // console.log(e.target.value);
                    // console.log(catId);
                  }}
                >
                  {/* <option value={"near_miss"}>Near miss</option> */}
                  <option value={"accidents"}>Accidents</option>
                  <option value={"occupational_diseases"}>
                    Occupational diseases
                  </option>
                  <option value={"dangerous_disease"}>Dangerous disease</option>
                </select>
                <div
                  css={(theme) => ({
                    color: theme.colors.Gray_500,
                    fontSize: 12,
                    position: "absolute",
                    marginTop: 4,
                    left: 0,
                  })}
                >
                  (Click here to select, Type of incident)
                </div>
                {errors.incident_type && (
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
                  placeholder="Type of factory"
                  {...register("factory_type", { required: true })}
                  type="text"
                  onChange={(e) => setFactory_type(e.target.value)}
                  value={factory_type}
                >
                  <option>Type of factory</option>
                  {factoryTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>

                {errors.factory_type && (
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
                  factory_name &&
                  state &&
                  reported_by &&
                  incident_type &&
                  victim_name &&
                  factory_type
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

export default ReportIncident;
