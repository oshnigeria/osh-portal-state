/** @jsxImportSource @emotion/react */
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/context/authContext";
import DashboadWrapperComp from "../dashboard_wrapper";
import { main_url, cookies_id } from "@/src/details";
import useSWR, { useSWRConfig } from "swr";
import Cookies from "js-cookie";
import axios from "axios";
import FactoryDocComp from "./factoryDetailsComp";
import IncidentDocComp from "./incidentDetailsComp.js";
import { success_message, error_message } from "../../toasts";
import { mutate } from "swr";
const IncidentDetails = (props) => {
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(false);
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
    data: factory_details,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/inventory/incident/files?incident_id=${props.id}`,
    fetcher
  );

  const delete_a_factory = (id) => {
    console.log(id);
    setLoading(true);
    axios
      .delete(
        `${main_url}/inventory/incident/file?doc_id=${id}`,

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

        success_message("User deleted");
        mutate(`${main_url}/inventory/incident/files?incident_id=${props.id}`);

        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });
  };
  console.log(factory_details);

  const download_document = (factory_id, file_key, doc_type) => {
    console.log(factory_id, file_key, doc_type);
    setLoading(true);
    axios
      .get(
        `${main_url}/inventory/incident/wr/file?incident_id=${factory_id}&file_key=${file_key}&doc_type=${doc_type}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
    // console.log("ade");
  };
  return (
    <DashboadWrapperComp>
      <div
        css={{
          cursor: "pointer",
        }}
        onClick={() => router.back()}
      >
        <img
          css={{
            width: 32,
            height: 28,
          }}
          src="/svg/dashboard/arrow_left.svg"
        />
      </div>
      <div
        css={{
          marginTop: 64,
        }}
      >
        <div
          css={(theme) => ({
            padding: "24px 32px",
            backgroundColor: theme.colors.Primary_50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "16px 16px 0px 0px",
          })}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 32,
              fontWeight: 700,
              lineHeight: "38px",
            })}
          >
            {router.query.factory_name}
          </div>
          <div
            css={{
              position: "relative",
            }}
            onClick={() => setDetails(!details)}
          >
            <img
              css={{
                width: 24,
                height: 24,
              }}
              src="/svg/dashboard/info_square.svg"
            />
            <AnimatePresence initial={false}>
              {details && (
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
                    onClick={() => setDetails(false)}
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
                      position: "absolute",
                      borderRadius: 4,
                      padding: "28px 24px",
                      width: 325,
                      height: "auto",
                      boxShadow:
                        "0px 0px 0px 0px rgba(107, 133, 127, 0.20), 0px 0px 1px 0px rgba(107, 133, 127, 0.19), 2px 2px 3px 0px rgba(107, 133, 127, 0.17), 4px 4px 4px 0px rgba(107, 133, 127, 0.10), 7px 8px 4px 0px rgba(107, 133, 127, 0.03), 12px 12px 5px 0px rgba(107, 133, 127, 0.00)",
                      zIndex: 5,

                      right: 0,
                      top: 30,

                      margin: "auto",

                      backgroundColor: "#fff",
                    })}
                  >
                    {/* <CreateRiderAccount close={() => router.back()} /> */}
                    {/* <AddFactory close={() => setAdd_factory(false)} /> */}
                    <div
                      css={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        css={(theme) => ({
                          color: theme.colors.Gray_500,
                          fontSize: 24,
                          fontWeight: 400,
                        })}
                      >
                        Details
                      </div>{" "}
                      <div
                        onClick={() => {
                          setDetails(false);
                        }}
                      >
                        <img
                          css={{
                            width: 12,
                            height: 12,
                          }}
                          src="/svg/dashboard/cancel.svg"
                        />
                      </div>
                    </div>
                    <div
                      css={{
                        marginTop: 22,
                      }}
                    >
                      <div
                        css={(theme) => ({
                          color: theme.colors.Gray_500,
                          fontSize: 16,
                          fontWeight: 400,
                        })}
                      >
                        Factory name
                      </div>
                      <div
                        css={(theme) => ({
                          color: theme.colors.Gray_800,
                          fontSize: 16,
                          fontWeight: 600,
                        })}
                      >
                        Factory name
                      </div>
                    </div>
                    <div
                      css={{
                        marginTop: 22,
                      }}
                    >
                      <div
                        css={(theme) => ({
                          color: theme.colors.Gray_500,
                          fontSize: 16,
                          fontWeight: 400,
                        })}
                      >
                        State
                      </div>
                      <div
                        css={(theme) => ({
                          color: theme.colors.Gray_800,
                          fontSize: 16,
                          fontWeight: 600,
                        })}
                      >
                        Lagos state
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {isLoading ? null : (
          <div>
            {factory_details.data.docs.length > 0 ? (
              <div
                css={{
                  backgroundColor: "#fff",
                  borderRadius: "0px 0px 16px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  overflowY: "scroll",
                  height: 500,
                  padding: "54px 22px",
                }}
              >
                {factory_details.data.docs.map((up) => (
                  <div key={up._id}>
                    <IncidentDocComp
                      name={up.doc_type}
                      type={up.file_type}
                      factory_id={up.incident}
                      file_key={up.src}
                      doc_type={up.doc_type}
                      delete={() => delete_a_factory(up._id)}
                    />
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
                  No Document
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboadWrapperComp>
  );
};

export default IncidentDetails;
