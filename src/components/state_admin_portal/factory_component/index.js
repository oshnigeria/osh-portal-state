/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import FactoryRegistration from "./tabs/registration";
import { useRouter } from "next/router";
import DashboadWrapperComp from "../nav_wrapper";
import useSWR, { useSWRConfig, mutate } from "swr";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import DocumentUploadTab from "./tabs/document";
import VerifyPaymentTab from "./tabs/verify_payment";
// import InspectionReportComp from "./tabs/inspection_report";
import dynamic from "next/dynamic";
import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const InspectionReportComp = dynamic(import("./tabs/inspection_report"), {
  ssr: false,
  loading: () => (
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
        <img src="/svg/loader/loader-green.svg" />
      </div>
    </div>
  ),
});
const FactoryPageComp = () => {
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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/factory/${router.query.id}`, fetcher);

  const factory = useContext(FactoryContext);

  const steps = [
    "Factory information",
    "Document verification",
    "Payment verification",
    "Inspection report",
  ];
  return (
    <div>
      <DashboadWrapperComp>
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
            <div
              css={mq({
                display: "flex",
                alignItems: "center",
                marginTop: [16, 16, 0],
                padding: ["16px 16px", "16px 16px", 0],
              })}
            >
              <div>
                {" "}
                <div
                  css={mq({
                    cursor: "pointer",
                    marginRight: [16, 16, 38],
                  })}
                  onClick={() => router.back()}
                >
                  <img
                    css={mq({
                      width: [8, 8, 24],
                      height: [12, 12, 20],
                    })}
                    src="/svg/dashboard/arrow_left.svg"
                  />
                </div>
              </div>
              <div
                css={mq({
                  fontSize: [12, 12, 24],

                  color: "#000",
                  textTransform: "capitalize",
                })}
              >
                {single_factory?.data?.factory?._occupier_name}
              </div>
            </div>
            <div
              css={(theme) => ({
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: [16, 16, 60],
              })}
            >
              <div
                css={mq({
                  display: "grid",
                  gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                  alignItems: "center",
                  justifyContent: "space-between",
                  rowGap: 0,
                  columnGap: [2, 2, 10],
                })}
              >
                {steps.map((step) => (
                  <div
                    key={step}
                    css={(theme) =>
                      mq({
                        padding: ["4px 4px", "4px 4px", "14px 28px"],
                        backgroundColor:
                          factory.tab === step
                            ? theme.colors.Primary_500
                            : theme.colors.Primary_50,
                        fontSize: [10, 10, 12],
                        textAlign: "center",
                        cursor: "pointer",
                        color: factory.tab === step ? "#fff" : "#000",
                      })
                    }
                    onClick={() => factory.set_tab(step)}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            {factory.tab === steps[0] && <FactoryRegistration />}
            {factory.tab === steps[1] && <DocumentUploadTab />}
            {factory.tab === steps[2] && <VerifyPaymentTab />}
            {factory.tab === steps[3] && <InspectionReportComp />}
          </div>
        )}
      </DashboadWrapperComp>
    </div>
  );
};

export default FactoryPageComp;
