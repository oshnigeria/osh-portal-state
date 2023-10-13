/** @jsxImportSource @emotion/react */
import axios from "axios";
import useSWR, { useSWRConfig, mutate } from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";

import DashboadWrapperComp from "../nav_wrapper";
import { main_url, cookies_id } from "@/src/details";

const NewRegistrationComp = () => {
  const [progress, setProgress] = useState({
    min: 0,
    max: 50,
  });

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

    isLoading,
  } = useSWR(`${main_url}/state-officer/factories`, fetcher);

  const router = useRouter();
  console.log(factory);
  console.log(router.query.tab);
  const tabs = [
    {
      title: "Pending",
      route: "pending",
      state: () => {
        setProgress({
          min: 0,
          max: 50,
        });
      },
    },
    {
      title: "Ongoing",
      route: "ongoing",
      state: () => {
        setProgress({
          min: 50,
          max: 60,
        });
      },
    },
    {
      title: "Completed",
      route: "completed",
      state: () => {
        setProgress({
          min: 61,
          max: 70,
        });
      },
    },
  ];
  useEffect(() => {
    router.push("?tab=pending");
  }, []);
  const table = [
    {
      title: "Occupier name",
    },
    {
      title: "State",
    },
    {
      title: "Reg. date",
    },
  ];

  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
  return (
    <DashboadWrapperComp>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_700,
              fontSize: 32,
              lineHeight: "28px",
              fontWeight: 700,
            })}
          >
            Welcome, State officer
          </div>
          <div>
            <img
              css={{
                width: 34,
                height: 32,
                marginLeft: 8,
              }}
              src="/svg/state_admin_portal/waving_hand_sign.svg"
            />
          </div>
        </div>
        <div>
          <img
            css={{
              width: 34,
              height: 32,
              marginLeft: 8,
            }}
            src="/svg/dashboard/combined_space.svg"
          />
        </div>
      </div>

      <div
        css={(theme) => ({
          marginTop: 82,
          border: `1px solid ${theme.colors.Gray_200}`,
          //   padding: "42px 66px",
          borderRadius: 8,
          width: "100%",
        })}
      >
        <div
          css={(theme) => ({
            marginTop: 62,
            border: "none",
            borderBottom: `1px solid ${theme.colors.Gray_200}`,
            padding: "0px 66px",
            paddingBottom: 16,
          })}
        >
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              rowGap: 0,
              columnGap: 64,
              width: "60%",
              height: "auto",
            }}
          >
            {tabs.map((tab) => (
              <div
                css={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  cursor: "pointer",
                }}
                key={tab.title}
                onClick={() => {
                  tab.state();
                  router.push(`?tab=${tab.route}`);
                }}
              >
                <div
                  css={(theme) => ({
                    fontSize: 20,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    textAlign: "center",
                    color:
                      router.query.tab == `${tab.route}`
                        ? theme.colors.Primary_500
                        : theme.colors.Primary_50,
                  })}
                >
                  {tab.title}
                </div>
                <div
                  css={{
                    position: "absolute",
                    bottom: -16,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    // width: "100%",
                  }}
                >
                  <div
                    css={(theme) => ({
                      display:
                        router.query.tab == `${tab.route}` ? "block" : "none",
                      height: 4,
                      width: 72,

                      borderRadius: "4px 4px 0px 0px",

                      backgroundColor: theme.colors.Primary_500,
                    })}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
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
                    width: 24,
                    height: 24,
                  }}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div>
                {factory?.data?.factories.filter(
                  (item) =>
                    item.progress >= progress.min &&
                    item.progress <= progress.max
                ).length >= 1 ? (
                  <div>
                    <div
                      css={{
                        marginTop: 32,
                        padding: "24px 40px",
                      }}
                    >
                      <div
                        css={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",

                          rowGap: 0,
                          columnGap: 64,
                        }}
                      >
                        {table.map((tab) => (
                          <div
                            css={(theme) => ({
                              color: theme.colors.Gray_500,
                              fontSize: 18,
                              lineHeight: "22px",
                            })}
                          >
                            {tab.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      {factory?.data?.factories
                        .filter(
                          (item) =>
                            item.progress >= progress.min &&
                            item.progress <= progress.max
                        )
                        ?.map((factory) => (
                          <div
                            key={factory._id}
                            css={(theme) => ({
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              cursor: "pointer",
                              rowGap: 0,
                              columnGap: 64,
                              borderBottom: `1px solid ${theme.colors.Gray_200}`,
                              padding: "24px 40px",
                            })}
                            onClick={() =>
                              router.push(`/factory/${factory._id}`)
                            }
                          >
                            <div
                              css={(theme) => ({
                                textAlign: "left",
                                color: theme.colors.Gray_700,
                                fontSize: 18,
                                textTransform: "capitalize",
                                lineHeight: "22px",
                              })}
                            >
                              {factory.occupier_name}
                            </div>
                            <div
                              css={(theme) => ({
                                textAlign: "left",
                                color: theme.colors.Gray_700,
                                textTransform: "capitalize",
                                fontSize: 18,
                                lineHeight: "22px",
                              })}
                            >
                              {factory.state}
                            </div>
                            <div
                              css={(theme) => ({
                                textAlign: "left",
                                color: theme.colors.Gray_700,
                                fontSize: 18,
                                lineHeight: "22px",
                              })}
                            >
                              {formatDateToCustom(factory.createdAt)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <div
                        css={{
                          margin: "50px 0px",
                        }}
                      >
                        <img
                          css={{
                            width: 100,
                            height: 100,
                          }}
                          src="/svg/dashboard/empty.svg"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboadWrapperComp>
  );
};

export default NewRegistrationComp;
