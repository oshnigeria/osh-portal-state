/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import DashboadWrapperComp from "../dashboard_wrapper";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import AddIncidents from "./incident/popup/add_incident";
import { success_message, error_message } from "../../toasts";
import { mutate } from "swr";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import DeletePopup from "./deletePopup";
import FilterComp from "./incident/filter";
const IncidentComp = () => {
  const [add_factory, setAdd_factory] = useState(false);
  const [select_id, setSelect_id] = useState("");
  const [willDelete, setWillDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [willFilter, setWillFilter] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter_params, setFilter_params] = useState({});

  const router = useRouter();
  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error:", error);
      });

  const {
    data: incidents,
    error,
    isLoading,
  } = useSWR(`${main_url}/inventory/incident/all`, fetcher);

  const delete_a_factory = (id) => {
    setLoading(true);
    axios
      .delete(
        `${main_url}/inventory/incident?id=${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        // router.push("/dashboard/registration?tab=b");

        success_message(response?.data.message);
        mutate(`${main_url}/inventory/incident/all`);

        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });
  };
  // console.log(
  //   incidents.data.incidents.filter(
  //     (item) =>
  //       item.factory_name.toLowerCase().includes(search) ||
  //       item.state.toLowerCase().includes(search)
  //   )
  // );

  const filter = (payload) => {
    setFilter_params(payload);
    setIsFiltering(true);
    console.log(filter_params);
    success_message("Done");
  };

  const reset = () => {
    setFilter_params({});
    setIsFiltering(false);
    success_message("Done");
  };
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <DashboadWrapperComp>
        <div>
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 32,
              fontWeight: 700,
            })}
          >
            Incidents
          </div>
          <div
            css={{
              marginTop: 64,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              css={{
                display: "flex",
              }}
            >
              <div
                css={{
                  position: "relative",
                }}
              >
                <input
                  css={(theme) => ({
                    padding: "16px 16px",
                    paddingLeft: 42,
                    marginRight: 32,
                    width: 252,
                    fontSize: 16,
                    color: theme.colors.Primary_500,
                    backgroundColor: "transparent",
                    outline: "none",
                    borderRadius: 30,
                    border: `1px solid ${theme.colors.Primary_500}`,
                    ":focus": {
                      padding: "16px 16px",
                      paddingLeft: 42,

                      border: `1px solid ${theme.colors.Primary_500}`,

                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      padding: "16px 16px",
                      paddingLeft: 42,
                      border: "none",
                      border: `1px solid ${theme.colors.Primary_500}`,

                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder="Search files"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <img
                  css={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    width: 24,
                    height: 24,
                  }}
                  src="/svg/dashboard/search.svg"
                />
              </div>
              <div
                css={(theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 136,
                  fontSize: 16,
                  color: theme.colors.Primary_500,
                  backgroundColor: "transparent",

                  borderRadius: 30,
                  border: `1px solid ${theme.colors.Primary_500}`,
                })}
                onClick={() => {
                  setWillFilter(true);
                }}
              >
                <img
                  css={{
                    width: 24,
                    height: 24,
                    marginRight: 4,
                  }}
                  src="/svg/dashboard/filter.svg"
                />
                <div
                  css={{
                    marginLeft: 4,
                  }}
                >
                  Filter
                </div>
              </div>
            </div>
            <button
              css={(theme) => ({
                width: 224,
                height: 56,
                borderRadius: 30,
                padding: "16px 24px",
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                color: theme.colors.Gray_50,
                backgroundColor: theme.colors.Primary_500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              })}
              onClick={() => {
                setAdd_factory(true);
                router.push("/dashboard/incidents?tab=a");
              }}
            >
              <img
                css={{
                  width: 24,
                  height: 24,
                  marginRight: 16,
                }}
                src="/svg/dashboard/plus.svg"
              />
              <div> Upload new file</div>
            </button>
          </div>
          <div
            css={{
              marginTop: 40,
              background: "#fff",
              padding: "24px 24px",
              borderRadius: 16,
            }}
          >
            <div
              css={(theme) => ({
                display: "grid",

                gridTemplateColumns: "repeat(2, 30% 20% 20% 30%)",

                justifyContent: "space-between",
                rowGap: 0,
                columnGap: 0,
                width: "100%",
                height: "auto",
                color: theme.colors.Primary_800,
                fontSize: 18,
                fontWeight: 600,
                lineHeight: "22px",
              })}
            >
              <div>Factory name</div>
              <div>State</div>
              <div>Reported by</div>
              <div>Incident type</div>
            </div>
            {isLoading ? (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  css={{
                    width: 64,
                    height: 64,
                    margin: "50px 0px",
                  }}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div>
                {incidents?.data.incidents.length > 0 ? (
                  <div
                    css={{
                      marginTop: 40,
                    }}
                  >
                    {incidents?.data.incidents
                      .filter(
                        (item) =>
                          item.factory_name.toLowerCase().includes(search) ||
                          item.state.toLowerCase().includes(search)
                      )
                      .filter((factory) => {
                        if (isFiltering) {
                          // reported_by
                          //type_of_incident

                          const meetsType =
                            !filter_params.type ||
                            factory.factory_type.trim().toLowerCase() ===
                              filter_params.type.trim().toLowerCase();

                          // Check if the factory's state matches the selected state (if any)
                          const meetsState =
                            !filter_params.state ||
                            factory.state.trim().toLowerCase() ===
                              filter_params.state.trim().toLowerCase();

                          const meetsReportBy =
                            !filter_params.reported_by ||
                            factory.reported_by.trim().toLowerCase() ===
                              filter_params.reported_by.trim().toLowerCase();

                          // Check if the factory's state matches the selected state (if any)
                          const meetsIncidentType =
                            !filter_params.incident_type ||
                            factory.type_of_incident.trim().toLowerCase() ===
                              filter_params.incident_type.trim().toLowerCase();

                          return (
                            meetsReportBy &&
                            meetsIncidentType &&
                            meetsType &&
                            meetsState
                          );
                        }

                        return true; // If no date range is specified, include all factories
                      })
                      .map((factory) => (
                        <div
                          key={factory._id}
                          css={(theme) => ({
                            marginBottom: 48,
                            display: "grid",

                            borderRadius: 16,
                            gridTemplateColumns: "repeat(2, 30% 20% 20% 30%)",

                            justifyContent: "space-between",
                            rowGap: 0,
                            columnGap: 0,
                            width: "100%",
                            height: "auto",
                            color: theme.colors.Gray_800,
                            fontSize: 18,
                            cursor: "pointer",
                            fontWeight: 500,
                            lineHeight: "22px",
                          })}
                        >
                          <div
                            onClick={() => {
                              router.push(
                                `/dashboard/incident_details/${factory._id}?factory_name=${factory.factory_name}`
                              );
                            }}
                          >
                            {factory.factory_name}
                          </div>
                          <div
                            onClick={() => {
                              router.push(
                                `/dashboard/incident_details/${factory._id}`
                              );
                            }}
                          >
                            {factory.state}
                          </div>
                          <div
                            onClick={() => {
                              router.push(
                                `/dashboard/incident_details/${factory._id}`
                              );
                            }}
                          >
                            {factory.reported_by}
                          </div>
                          <div
                            css={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {factory.type_of_incident}
                            <button
                              css={(theme) => ({
                                position: "relative",
                                borderRadius: 5,
                                padding: "4px 8px",
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: "17px",
                                border: "none",
                                color: theme.colors.Gray_50,
                                backgroundColor: theme.colors.Error_700,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                marginLeft: 12,
                                zIndex: 6,
                              })}
                              onClick={() => {
                                // delete_a_factory(factory._id);
                                setSelect_id(factory._id);
                                setWillDelete(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div
                    css={{
                      backgroundColor: "#fff",
                      borderRadius: "0px 0px 16px 16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      overflowY: "scroll",
                      height: 500,
                      padding: "54px 22px",
                    }}
                  >
                    <div
                      css={(theme) => ({
                        color: theme.colors.Gray_300,
                        fontSize: 32,
                        fontWeight: 700,
                        lineHeight: "38px",
                      })}
                    >
                      No records
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <AnimatePresence initial={false}>
            {add_factory && (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.4,
                  }}
                  css={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    // zIndex: 2,
                    zIndex: 3,
                    backgroundColor: "rgb(0,0,0,0.1)",
                    right: 0,
                    top: 0,
                    opacity: 0,
                  }}
                  onClick={() => {
                    setAdd_factory(false);
                    router.push("/dashboard/incidents");
                  }}
                >
                  {" "}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    ease: "easeInOut",
                    // duration: 0.4,
                  }}
                  id="location"
                  css={(theme) => ({
                    position: "fixed",
                    overflowY: "scroll",
                    overflowX: "hidden",

                    width: 868,
                    height: 530,
                    borderRadius: 14,
                    zIndex: 5,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                  })}
                >
                  {/* <CreateRiderAccount close={() => router.back()} /> */}
                  <AddIncidents
                    close={() => {
                      setAdd_factory(false);
                      router.push("/dashboard/incidents");
                    }}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {willDelete && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                css={{
                  position: "fixed",
                  width: "100vw",
                  height: "100vh",
                  // zIndex: 2,
                  zIndex: 3,
                  backgroundColor: "rgb(0,0,0,0.1)",
                  right: 0,
                  top: 0,
                  opacity: 0,
                }}
                onClick={() => setWillDelete(false)}
              >
                {" "}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 900 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 900 }}
                transition={{
                  ease: "easeInOut",
                  // duration: 0.4,
                }}
                id="location"
                css={(theme) => ({
                  position: "fixed",
                  width: ["90vw", 500, 500],
                  height: 300,
                  borderRadius: 14,
                  zIndex: 5,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                })}
              >
                {/* <CreateRiderAccount close={() => router.back()} /> */}
                <DeletePopup
                  close={() => setWillDelete(false)}
                  delete={() => {
                    delete_a_factory(select_id);
                    setSelect_id("");
                    setWillDelete(false);
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {willFilter && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                css={{
                  position: "fixed",
                  width: "100vw",
                  height: "100vh",
                  // zIndex: 2,
                  zIndex: 3,
                  backgroundColor: "rgb(0,0,0,0.1)",
                  right: 0,
                  top: 0,
                  opacity: 0,
                }}
                onClick={() => setWillFilter(false)}
              >
                {" "}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 900 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 900 }}
                transition={{
                  ease: "easeInOut",
                  // duration: 0.4,
                }}
                id="location"
                css={(theme) => ({
                  position: "fixed",
                  width: ["90vw", 500, 500],
                  height: 487,
                  borderRadius: 14,
                  zIndex: 5,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  margin: "auto",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  padding: "18px 32px",
                  backgroundColor: "#fff",
                })}
              >
                {/* <CreateRiderAccount close={() => router.back()} /> */}
                <FilterComp
                  handleClick={filter}
                  close={() => setWillFilter(false)}
                  reset={reset}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </DashboadWrapperComp>
    </div>
  );
};

export default IncidentComp;
