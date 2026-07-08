/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import facepaint from "facepaint";
import { AuthContext } from "@/src/context/authContext";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const MobileNav = () => {
  const [options, setOptions] = useState(false);
  const auth = useContext(AuthContext);
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
    data: user,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/info`, fetcher);
  console.log(user?.data.state_officer)
  const menu = [
    // {
    //   title: "Settings",
    //   icon: "setting.svg",
    //   click: () => {
    //     console.log();
    //   },
    // },
    {
      title: "Log out",
      icon: "logout.svg",
      click: () => {
        auth.remove_token();
      },
    },
  ];

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
    <div
      css={(theme) =>
        mq({
          backgroundColor: theme.colors.Primary_500,
          padding: ["16px 16px", "16px 16px", "40px 140px"],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })
      }
    >
      <div
      // css={mq({
      //   display: ["none", "block", "block"],
      // })}
      >
        <img
          css={mq({
            width: ["auto", "auto", 266],
            height: [32, 40, 50],
          })}
          src={"/svg/auth/logo_white.svg"}
        />
      </div>
      {/* <div
          css={mq({
            display: ["block", "none", "none"],
            marginTop: 56,
          })}
        >
          <img
            css={{
              width: "auto",
              height: 40,
            }}
            src={"/auth/fmle_logo_black.png"}
          />
        </div> */}
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            css={mq({
              width: 24,
              height: 24,
            })}
            src={"/svg/nav/notification.svg"}
          />
        </div>
        <div
          css={{
            marginLeft: 24,
            position: "relative",
          }}
        >
          <div onClick={() => setOptions(!options)}>
            <img
              css={mq({
                width: 24,
                height: 24,
              })}
              src={"/svg/nav/menu.svg"}
            />
          </div>

          <AnimatePresence initial={false}>
            {options && (
              <div>
                <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.2,
              }}
              css={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                // zIndex: 2,
                zIndex: 3,
                // backgroundColor: "rgb(0,0,0,0.1)",
                // backdropFilter: "blur(12px)",
                // WebkitBackdropFilter: "blur(12px)", 
                right: 0,
                top: 0,
                opacity: 0,
              }}
          onClick={() => setOptions(!options)}
            >
              {" "}
            </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    // duration: 0.4,
                  }}
                  id="location"
                  css={(theme) => ({
                    position: "absolute",
                    borderRadius: 8,

                    width: 206,
                    height: "auto",
                    boxShadow:
                      "0px 0px 0px 0px rgba(107, 133, 127, 0.20), 0px 0px 1px 0px rgba(107, 133, 127, 0.19), 2px 2px 3px 0px rgba(107, 133, 127, 0.17), 4px 4px 4px 0px rgba(107, 133, 127, 0.10), 7px 8px 4px 0px rgba(107, 133, 127, 0.03), 12px 12px 5px 0px rgba(107, 133, 127, 0.00)",
                    zIndex: 50,

                    right: 0,
                    top: 30,

                    margin: "auto",

                    backgroundColor: "#fff",
                  })}
                >
                  {
                    isLoading ? null :  <div
                    css={theme => ({
                      padding: "16px 16px",
                      cursor: "pointer",
                      border:"none",
                      borderBottom:`1px solid ${theme.colors.Gray_100}`
                      // display: "flex",
                    })}
                    onClick={() => router.push('/profile')}
                  >
                    <div
                      css={{
                        marginRight: 4,
                      }}
                    >
                      <img
                        css={mq({
                          width: 36,
                          height: 36,
                        })}
                        src={"/svg/nav/profile.svg"}
                      />
                    </div>
                    <div>
                      {/* <div
                        css={(theme) => ({
                          fontSize: 12,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                        })}
                      >
                         {user?.data.state_officer.name}
                      </div> */}
                      <div
                        css={(theme) => ({
                          fontSize: 10,
                          fontWeight: 500,
                          color: theme.colors.Gray_500,
                          lineHeight: "18px",
                        })}
                      >
                         {auth.dec_token?.email}
                      </div>
                    </div>
                  </div>
                  }
                 
{
                    tabs.map((menu_items, index) => (
                        <div
                        key={{index}}
                      css={{
                        padding: "16px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        border:"none",
                        borderBottom:"1px solid #f5f5f5"
                      }}
                      onClick={() => router.push(`/${menu_items.path}`)}
                    >
                      
                      <div css={(theme) => ({
                    color:
                      router.pathname == `/${menu_items.path}`
                        ? theme.colors.Primary_500
                        : theme.colors.Gray_900,
                    fontWeight: router.pathname == `/${menu_items.path}` ? 600 : 500,
                    fontSize: 16,
                    textTransform: "capitalize",
                  })}> {menu_items.title}</div>
                    </div>
                    ))
                  }
                  {menu.map((menu_option) => (
                    <div
                      css={{
                        padding: "16px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => menu_option.click()}
                    >
                      <div
                        css={{
                          marginRight: 24,
                        }}
                      >
                        <img
                          css={mq({
                            width: 24,
                            height: 24,
                          })}
                          src={`/svg/nav/${menu_option.icon}`}
                        />
                      </div>
                      <div> {menu_option.title}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
