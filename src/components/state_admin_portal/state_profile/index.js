/** @jsxImportSource @emotion/react */

import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useEffect, useContext, useState } from "react";
import facepaint from "facepaint";
import { AuthContext } from "@/src/context/authContext";
import { decodeToken } from "react-jwt";
import DashboadWrapperComp from "../nav_wrapper";
import ChangeImage from "./popup/change_image";
import ChangeName from "./popup/change_name";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const StateProfileComp = (props) => {
  const [willAmmend, setWillAmmend] = useState(false);
  const [willChangeName, setWillChangeName] = useState(false);
  const [willChangeImage, setWillChangeImage] = useState(false);

  const router = useRouter();
  const auth = useContext(AuthContext);

  const handleChangeName = () => {
    setWillChangeName(true);
  };

  const handleChangeImage = () => {
    setWillChangeImage(true);
  };
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
    data: user,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/info`, fetcher);
  // console.log(user?.data.user.role);
  // useEffect(() => {
  //   if (Cookies.get(cookies_id)) {
  //     router.push("/dashboard/registration");
  //   } else {
  //     router.push("/");
  //   }
  // }, []);
  console.log(user);
  useEffect(() => {
    if (
      decodeToken(Cookies.get(cookies_id)) &&
      decodeToken(Cookies.get(cookies_id)).exp
    ) {
      // Convert the expiration time to seconds
      const expirationTimeInSeconds = decodeToken(Cookies.get(cookies_id));

      // Get the current time in seconds
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      // Check if the token has expired
      if (expirationTimeInSeconds < currentTimeInSeconds) {
        // Token has expired, perform logout action
        auth.remove_token();
      }
    }
  }, []);

  const tabs = [
    {
      title: "New Registration",
      route: "/",
      path: "",
      icon: "register",
      active_icon: "register_active",
    },
    {
      title: "Renewal",
      route: "/renewal",
      path: "renewal",
      icon: "renewal",
      active_icon: "renewal_active",
    },
    {
      title: "Amendment",
      route: "/amendment",
      path: "amendment",
      icon: "ammendments",
      active_icon: "ammendments_active",
    },
    {
      title: "Replacement",
      route: "/replacement",
      path: "replacement",
      icon: "replacement",
      active_icon: "replacement_active",
    },
    {
      title: "Incident reports",
      route: "/incident",
      path: "incident",
      icon: "incident",
      active_icon: "incident_active",
    },
    {
      title: "Routine inspection",
      route: "/dashboard/routine-inspections",
      path: "dashboard/routine-inspections",
      icon: "incident",
      active_icon: "incident_active",
    },
    // {
    //   title: "canceled",
    //   route: "/dashboard/routine-inspections",
    //   path: "dashboard/routine-inspections",
    //   icon: "incident",
    //   active_icon: "incident_active",
    // },
  ];

  return (
    <DashboadWrapperComp>
      <div
        css={(theme) =>
          mq({
            color: theme.colors.Gray_700,
            fontSize: [16, 16, 32],
            lineHeight: "28px",
            fontWeight: 700,
          })
        }
      >
        Profile
      </div>
      <div>
        <div
          css={(theme) =>
            mq({
              marginTop: [0, 0, 82],
              border: [0, 0, `1px solid ${theme.colors.Gray_200}`],
              //   padding: "42px 66px",
              borderRadius: 8,
              width: "100%",
              padding: "32px 36px",
              backgroundColor: theme.colors.Gray_25,
            })
          }
        >
          <div
            css={(theme) =>
              mq({
                color: theme.colors.Gray_700,
                fontSize: [16, 16, 16],
                lineHeight: "28px",
                fontWeight: 700,
              })
            }
          >
            Signature settings
          </div>

          <div
            css={{
              marginTop: 42,
            }}
          >
            <div>
              {isLoading ? null : (
                <div
                  css={{
                    marginBottom: 12,
                  }}
                >
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "70%",
                    }}
                  >
                    <div>
                      <div
                        css={(theme) =>
                          mq({
                            color: theme.colors.Gray_400,
                            fontSize: [16, 16, 16],
                            lineHeight: "28px",
                            fontWeight: 400,
                          })
                        }
                      >
                        Signatory name
                      </div>
                      <div>
                        <div>
                          <div
                            css={(theme) =>
                              mq({
                                color: theme.colors.Gray_700,
                                fontSize: [16, 16, 16],
                                lineHeight: "28px",
                                fontWeight: 700,
                              })
                            }
                          >
                            {user?.data.state_officer.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Primary_500,
                          fontSize: [16, 16, 16],
                          lineHeight: "28px",
                          fontWeight: 700,
                          cursor: "pointer",
                        })
                      }
                      onClick={() => {
                        handleChangeName();
                      }}
                    >
                      Change
                    </div>
                  </div>

                  <div
                    css={{
                      marginTop: 48,
                    }}
                  >
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <div>
                        <div
                          css={(theme) =>
                            mq({
                              color: theme.colors.Gray_400,
                              fontSize: [16, 16, 16],
                              lineHeight: "28px",
                              fontWeight: 400,
                            })
                          }
                        >
                          Signature
                        </div>
                        <div>
                          <div
                            css={{
                              marginRight: 8,
                            }}
                          >
                            <img
                              css={{
                                width: 45,
                                height: 45,
                              }}
                              src={user?.data.state_officer.signature_image}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        css={(theme) =>
                          mq({
                            color: theme.colors.Primary_500,
                            fontSize: [16, 16, 16],
                            lineHeight: "28px",
                            fontWeight: 700,
                            cursor: "pointer",
                          })
                        }
                        onClick={() => {
                          handleChangeImage();
                        }}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {willChangeName && (
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
              onClick={() => setWillChangeName(false)}
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
                width: ["90vw", 524, 524],
                height: 427,
                overflowY: "scroll",

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
              <ChangeName
                close={() => {
                  setWillChangeName(false),
                    mutate(`${main_url}/state-officer/info`);
                }}
                ammend={() => {
                  state_report();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {willChangeImage && (
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
              onClick={() => setWillChangeImage(false)}
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
                width: ["90vw", 524, 524],
                height: 427,
                overflowY: "scroll",

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
              <ChangeImage
                close={() => {
                  setWillChangeImage(false),
                    mutate(`${main_url}/state-officer/info`);
                }}
                ammend={() => {
                  state_report();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboadWrapperComp>
  );
};

export default StateProfileComp;
