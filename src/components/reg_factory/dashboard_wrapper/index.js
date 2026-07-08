/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";

import EditIcon from "../svg/edit_svg";
import UserIcon from "../svg/user_svg";
import { useRouter } from "next/router";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { useEffect } from "react";
import facepaint from "facepaint";
import { decodeToken } from "react-jwt";
import { AuthContext } from "@/src/context/authContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const DashboadWrapperComp = (props) => {
  const router = useRouter();

  const auth = useContext(AuthContext);

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
  } = useSWR(
    `${main_url}/account/repo/user/${jwt.decode(Cookies.get(cookies_id))?.id}`,
    fetcher
  );
  // console.log(user?.data.user.role);
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
  return (
    <div
      css={(theme) =>
        mq({
          display: ["block", "block", "flex"],
          gridTemplateColumns: "repeat(2, 30% 70%)",
          background: theme.colors.Gray_100,
          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })
      }
    >
      <div
        css={(theme) =>
          mq({
            display: ["none", "none", "block"],
            position: "fixed",
            top: 0,
            left: 0,
            padding: ["16px 16px", "16px 16px", "102px 20px"],
            width: 312,
            height: "100vh",
            background: theme.colors.Primary_500,
          })
        }
      >
        <div>
          <img
            css={{
              width: 268,
              height: 52,
            }}
            src="/auth/fmle_logo_white.png"
          />
        </div>
        <div
          css={{
            marginTop: 30,
          }}
        >
          <div
            css={{
              backgroundColor:
                router.pathname == "/dashboard/registration"
                  ? "#fff"
                  : "transparent",

              display: "flex",
              alignItems: "center",
              marginBottom: 26,
              padding: "16px 36px",
              cursor: "pointer",
              borderRadius: 30,
            }}
            onClick={() => router.push("/dashboard/registration")}
          >
            <div
              css={{
                width: 24,
                height: 24,
                marginRight: 16,
              }}
            >
              <EditIcon
                color={
                  router.pathname == "/dashboard/registration"
                    ? "#1A7D65"
                    : "#D1E5E0"
                }
              />
            </div>
            <div
              css={(theme) => ({
                color:
                  router.pathname == "/dashboard/registration"
                    ? theme.colors.Primary_500
                    : theme.colors.Primary_50,
                fontWeight:
                  router.pathname == "/dashboard/registration" ? 600 : 500,
              })}
            >
              Registration
            </div>
          </div>

          <div
            css={{
              backgroundColor:
                router.pathname == "/dashboard/incidents"
                  ? "#fff"
                  : "transparent",

              display: "flex",
              alignItems: "center",
              marginBottom: 26,
              cursor: "pointer",
              padding: "16px 36px",
              borderRadius: 30,
            }}
            onClick={() => router.push("/dashboard/incidents")}
          >
            <div
              css={{
                width: 24,
                height: 24,
                marginRight: 16,
              }}
            >
              <UserIcon
                color={
                  router.pathname == "/dashboard/incidents"
                    ? "#1A7D65"
                    : "#D1E5E0"
                }
              />
            </div>
            <div
              css={(theme) => ({
                color:
                  router.pathname == "/dashboard/incidents"
                    ? theme.colors.Primary_500
                    : theme.colors.Primary_50,
                fontWeight:
                  router.pathname == "/dashboard/incidents" ? 600 : 500,
              })}
            >
              Incidents
            </div>
          </div>

          {(user?.data.user.role !== "lv-1" ||
            user?.data.user.role !== "lv-2") && (
            <div>
              <div
                css={{
                  backgroundColor:
                    router.pathname == "/dashboard/account"
                      ? "#fff"
                      : "transparent",

                  display: "flex",
                  alignItems: "center",
                  marginBottom: 26,
                  cursor: "pointer",
                  padding: "16px 36px",
                  borderRadius: 30,
                }}
                onClick={() => router.push("/dashboard/account")}
              >
                <div
                  css={{
                    marginRight: 16,
                  }}
                >
                  {router.pathname == "/dashboard/account" ? (
                    <img
                      css={{
                        width: 20,
                        height: 20,
                        marginTop: 4,
                      }}
                      src="/svg/dashboard/manage_account_active.svg"
                    />
                  ) : (
                    <img
                      css={{
                        width: 20,
                        height: 20,
                        marginTop: 4,
                      }}
                      src="/svg/dashboard/manage_account.svg"
                    />
                  )}
                </div>
                <div
                  css={(theme) => ({
                    color:
                      router.pathname == "/dashboard/account"
                        ? theme.colors.Primary_500
                        : theme.colors.Primary_50,
                    fontWeight:
                      router.pathname == "/dashboard/trash" ? 600 : 500,
                  })}
                >
                  Manage Accounts
                </div>
              </div>

              <div
                css={{
                  backgroundColor:
                    router.pathname == "/dashboard/trash"
                      ? "#fff"
                      : "transparent",

                  display: "flex",
                  alignItems: "center",
                  marginBottom: 56,
                  cursor: "pointer",
                  padding: "16px 36px",
                  borderRadius: 30,
                }}
                onClick={() => router.push("/dashboard/trash")}
              >
                <div
                  css={{
                    marginRight: 16,
                  }}
                >
                  {router.pathname == "/dashboard/trash" ? (
                    <img
                      css={{
                        width: 20,
                        height: 20,
                        marginTop: 4,
                      }}
                      src="/svg/dashboard/trash_active.svg"
                    />
                  ) : (
                    <img
                      css={{
                        width: 20,
                        height: 20,
                        marginTop: 4,
                      }}
                      src="/svg/dashboard/trash.svg"
                    />
                  )}
                </div>
                <div
                  css={(theme) => ({
                    color:
                      router.pathname == "/dashboard/trash"
                        ? theme.colors.Primary_500
                        : theme.colors.Primary_50,
                    fontWeight:
                      router.pathname == "/dashboard/trash" ? 600 : 500,
                  })}
                >
                  Trash
                </div>
              </div>
            </div>
          )}
        </div>

        <div
        // css={{
        //   position: "fixed",
        //   bottom: 30,
        //   left: 60,
        // }}
        >
          {isLoading ? null : (
            <div
              css={{
                marginBottom: 12,
              }}
            >
              <div
                css={(theme) => ({
                  fontSize: 16,
                  lineHeight: "24px",
                  color: theme.colors.Gray_25,
                  fontWeight: 500,
                })}
              >
                {user?.data.user.username}
              </div>
              <div
                css={(theme) => ({
                  fontSize: 12,
                  lineHeight: "24px",
                  color: theme.colors.Gray_25,
                  fontWeight: 500,
                })}
              >
                {user?.data.user.email}
              </div>
            </div>
          )}

          <div
            css={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            <div>
              <img
                css={{
                  width: 24,
                  height: 24,
                  marginTop: 4,
                }}
                src="/svg/dashboard/logout.svg"
              />
            </div>
            <div
              css={(theme) => ({
                color: theme.colors.Primary_50,
                fontSize: 20,
                marginLeft: 16,
                lineHeight: "24px",
                textTransform: "capitalize",
              })}
            >
              {" "}
              back to home
            </div>
          </div>
        </div>
      </div>
      <div
        css={mq({
          marginLeft: [0, 0, 430],
          width: "100%",
          minHeight: "100vh",
          padding: [0, 0, "36px 0px"],
          paddingRight: [0, 0, 70],
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

export default DashboadWrapperComp;
