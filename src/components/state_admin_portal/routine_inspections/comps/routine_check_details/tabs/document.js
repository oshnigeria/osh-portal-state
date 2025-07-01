/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";

import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import FactoryDocComp from "@/src/components/factoryDetailsComp";
import RoutineInspectionDocComp from "../routine_inspection_docs";
import AmmendedDocumentUploaded from "./comps/ammendment_info/document";
import RenewalDocumentUploaded from "./comps/renewal_info/document";
import ReplacementDocumentUploaded from "./comps/replacement_info/document";
import { success_message } from "@/src/components/toasts";
import toast, { Toaster } from "react-hot-toast";

import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const FacRoutineDocumentUploadTab = () => {
  const router = useRouter();
  const factory = useContext(FactoryContext);
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
    data: single_report,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );


   const delete_docs = (id) => {
    
    axios
      .delete(`${main_url}/state-officer/factory/routine-check/doc?routine_check_doc_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get(cookies_id)}`,
        },
      })
      .then((res) => {console.log(res.data)
success_message(res.data.message);
        mutate(`${main_url}/inventory/factory/routine-check?id=${router.query.id}`)
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // console.log("ade");
  };
  console.log(single_report);
  if (router.query.type === "ammendment") return <AmmendedDocumentUploaded />;
  if (router.query.type === "renewal") return <RenewalDocumentUploaded />;
  if (router.query.type === "replacement")
    return <ReplacementDocumentUploaded />;

  return (
    <div>
       
      <div
        css={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
              <img src="/svg/loader/loader-green.svg" />
            </div>
          </div>
        ) : (
          <div
            css={{
              width: "90%",
            }}
          >
            <div
              css={(theme) => ({
                marginTop: 54,

                border: `1px solid ${theme.colors.Primary_100}`,
                padding: "50px 32px",

                borderRadius: 8,
              })}
            >
              {single_report.data.docs
              .length ? (
                <div
                  css={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {single_report.data.docs
                    // .filter((word) => word.doc_type !== "payment_reciept")
                    .map((doc) => (
                      <div key={doc._id} css={{
                        marginRight:8
                      }}>
                        <RoutineInspectionDocComp
                          name={doc.title}
                          doc_type={doc.doc_type}
                          factory_id={router.query.id}
                          file_key={doc.src}
                          delete={() => delete_docs(doc._id)}
                          
                        />
                      </div>
                    ))}
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
            <div
              css={{
                marginTop: 64,
                display: "flex",
                justifyContent: "right",
              }}
            >
              <button
                css={(theme) =>
                  mq({
                    height: 56,
                    borderRadius: 30,
                    width: 356,
                    //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                    padding: "16px 24px",
                    fontSize: 20,
                    cursor: "pointer",
                    marginRight: 20,
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    backgroundColor: theme.colors.Primary_500,
                  })
                }
                type="submit"
                onClick={() => {
                  // factory_details.add_factory_details(formData);
                  factory.set_tab("Factory information");
                }}
              >
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>Back to Report</div>
                  <div
                    css={{
                      marginLeft: 8,
                    }}
                  >
                    <img
                      css={{
                        width: 24,
                        height: 24,
                      }}
                      src="/svg/registration/left_arrow.svg"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacRoutineDocumentUploadTab;
