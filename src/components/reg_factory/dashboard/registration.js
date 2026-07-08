/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id, states } from "@/src/details";
import { success_message, error_message } from "../../toasts";
import DashboadWrapperComp from "../dashboard_wrapper";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import AddFactory from "./registration/popup/add_factory";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import DeletePopup from "./deletePopup";
import FilterComp from "./registration/filter";
import { mutate } from "swr";

import facepaint from "facepaint";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const DashboadHomeComp = () => {
  const [add_factory, setAdd_factory] = useState(false);
  const [select_id, setSelect_id] = useState("");
  const [willDelete, setWillDelete] = useState(false);
  const [willFilter, setWillFilter] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  //state for filter
  const [filter_params, setFilter_params] = useState({});
  const currentYear = new Date().getFullYear();
  const startYear = 2005;

  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const factoryTypes = [
    "Automobile",
    "Textile",
    "Food Processing",
    "Electronics",
    "Chemical",
    "Pharmaceutical",
    "Paper",
    "Steel",
    "Aerospace",
    "Cement",
  ];
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
    data: factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/inventory/factory/all`, fetcher);

  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  const delete_a_factory = (id) => {
    setLoading(true);
    axios
      .delete(
        `${main_url}/inventory/factory?id=${id}`,

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

        success_message(response.data.message);
        mutate(`${main_url}/inventory/factory/all`);

        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });
  };
  const filter = (payload) => {
    setFilter_params(payload);
    setIsFiltering(true);
    success_message("Done");

    console.log(filter_params);
  };

  const reset = () => {
    setFilter_params({});
    success_message("Done");

    setIsFiltering(false);
  };
  return (
    <DashboadWrapperComp>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        <div
          css={mq({
            display: ["flex", "flex", "block"],
            justifyContent: "space-between",
            backgroundColor: ["#fff", "#fff", "transparent"],
            marginTop: [50, 50, 0],
            padding: ["12px 24px", "12px 24px", 0],
          })}
        >
          <div
            css={(theme) =>
              mq({
                color: theme.colors.Gray_800,
                fontSize: [16, 24, 32],
                fontWeight: 700,
              })
            }
          >
            Registrations
          </div>
          <div
            css={mq({
              display: ["block", "block", "none"],
            })}
          >
            {" "}
            <img
              css={{
                width: 32,
                height: 32,
              }}
              src="/svg/dashboard/profilepick.svg"
            />
          </div>
        </div>
        <div
          css={mq({
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: ["16px 24px", "16px 24px", 0],
          })}
        >
          <div
            css={{
              display: "flex",
            }}
          >
            <div
              css={mq({
                width: 38,
                height: 38,
                border: "1px solid #1A7D65",
                borderRadius: 12,
                display: ["flex", "flex", "none"],
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              <img
                css={{
                  width: 16,
                  height: 16,
                }}
                src="/svg/dashboard/search.svg"
              />
            </div>
            <div
              css={mq({
                width: 38,
                height: 38,
                border: "1px solid #1A7D65",
                borderRadius: 12,
                display: ["flex", "flex", "none"],
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              })}
            >
              <img
                css={{
                  width: 16,
                  height: 16,
                }}
                src="/svg/dashboard/filter.svg"
              />
            </div>
            <div
              css={mq({
                position: "relative",
                display: ["none", "none", "block"],
              })}
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
              css={(theme) =>
                mq({
                  display: ["none", "none", "flex"],
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 136,
                  fontSize: 16,
                  color: theme.colors.Primary_500,
                  backgroundColor: "transparent",

                  borderRadius: 30,
                  border: `1px solid ${theme.colors.Primary_500}`,
                })
              }
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
            css={(theme) =>
              mq({
                width: 224,
                height: 56,
                borderRadius: 30,
                padding: ["16px 22px", "16px 22px", "16px 24px"],
                fontSize: [12, 12, 16],
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                color: theme.colors.Gray_50,
                backgroundColor: theme.colors.Primary_500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              })
            }
            onClick={() => {
              setAdd_factory(true);
              router.push("/dashboard/registration?tab=a");
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
            <div>Upload new file</div>
          </button>
        </div>
        <div
          css={{
            marginTop: 40,
            background: "#fff",
            padding: "24px 24px",
            borderRadius: [0, 0, 16],
          }}
        >
          <div
            css={(theme) => ({
              display: "grid",

              gridTemplateColumns: "repeat(2, 40% 20% 20% 20%)",

              justifyContent: "space-between",
              rowGap: 0,
              columnGap: 0,
              width: "100%",
              height: "auto",
              color: theme.colors.Primary_800,
              fontSize: [14, 14, 18],
              fontWeight: 600,
              lineHeight: "22px",
            })}
          >
            <div>Occupier Name</div>
            <div>State</div>
            <div>Reg. date</div>
            <div>Last modified</div>
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
              {factory?.data.factories.length > 0 ? (
                <div
                  css={{
                    marginTop: 40,
                  }}
                >
                  {factory?.data.factories
                    .filter(
                      (item) =>
                        item.occupier_name.toLowerCase().includes(search) ||
                        item.state.toLowerCase().includes(search)
                    )
                    .filter((factory) => {
                      if (isFiltering) {
                        let meetsFirstDateRange = true;
                        if (
                          filter_params.start_year_first !== "" &&
                          filter_params.end_year_first !== ""
                        ) {
                          const registrationYear = parseInt(
                            factory.year_of_first_registration
                          );
                          const registrationDate = new Date(
                            registrationYear,
                            0,
                            1
                          );
                          const startYear =
                            filter_params.start_year_first !== ""
                              ? parseInt(filter_params.start_year_first)
                              : new Date().getFullYear();
                          const endYear =
                            filter_params.end_year_first !== ""
                              ? parseInt(filter_params.end_year_first)
                              : new Date().getFullYear();
                          meetsFirstDateRange =
                            registrationDate >= new Date(startYear, 0, 1) &&
                            registrationDate <= new Date(endYear, 0, 1);
                        }

                        let meetsLastDateRange = true;
                        if (
                          filter_params.start_year_last !== "" &&
                          filter_params.end_year_last !== ""
                        ) {
                          const renewalYear = parseInt(
                            factory.year_of_last_renewal
                          );
                          const renewalDate = new Date(renewalYear, 0, 1);
                          const startYear = parseInt(
                            filter_params.start_year_last
                          );
                          const endYear = parseInt(filter_params.end_year_last);
                          meetsLastDateRange =
                            renewalDate >= new Date(startYear, 0, 1) &&
                            renewalDate <= new Date(endYear, 0, 1);
                        }
                        const meetsType =
                          !filter_params.type ||
                          factory.type.trim().toLowerCase() ===
                            filter_params.type.trim().toLowerCase();

                        // Check if the factory's state matches the selected state (if any)
                        const meetsState =
                          !filter_params.state ||
                          factory.state.trim().toLowerCase() ===
                            filter_params.state.trim().toLowerCase();

                        return (
                          meetsFirstDateRange &&
                          meetsLastDateRange &&
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
                          gridTemplateColumns: "repeat(2, 40% 20% 20% 20%)",

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
                              `/dashboard/factory_details/${factory._id}?factory_name=${factory.occupier_name}`
                            );
                          }}
                        >
                          {factory.occupier_name}
                        </div>
                        <div
                          onClick={() => {
                            router.push(
                              `/dashboard/factory_details/${factory._id}`
                            );
                          }}
                        >
                          {factory.state}
                        </div>
                        <div
                          onClick={() => {
                            router.push(
                              `/dashboard/factory_details/${factory._id}`
                            );
                          }}
                        >
                          {factory.year_of_first_registration}
                        </div>
                        <div
                          css={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {formatDateToCustom(factory.updatedAt)}{" "}
                          <button
                            css={(theme) =>
                              mq({
                                position: "relative",
                                borderRadius: 5,
                                padding: "4px 8px",
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: "17px",
                                border: "none",
                                color: theme.colors.Gray_50,
                                backgroundColor: theme.colors.Error_700,
                                display: ["none", "none", "flex"],
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                marginLeft: 12,
                                zIndex: 6,
                              })
                            }
                            onClick={() => {
                              // delete_a_factory(factory._id);
                              setWillDelete(true);
                              setSelect_id(factory._id);
                            }}
                          >
                            Delete
                          </button>
                          <div
                            css={mq({
                              display: ["block", "block", "none"],
                              width: 64,
                              height: 64,
                            })}
                          >
                            <img src="/svg/dashboard/delete.svg" />
                          </div>
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
                  router.push("/dashboard/registration");
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
                <AddFactory
                  close={() => {
                    setAdd_factory(false);
                    router.push("/dashboard/registration");
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
                position: "absolute",
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
  );
};

export default DashboadHomeComp;
