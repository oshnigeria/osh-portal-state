/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { main_url, cookies_id } from "@/src/details";
import DashboadWrapperComp from "../dashboard_wrapper";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import AddFactory from "./registration/popup/add_factory";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import FactoryDocComp from "./factoryDetailsComp";
import IncidentDocComp from "./incidentDetailsComp.js";
import { mutate } from "swr";
import { success_message, error_message } from "../../toasts";
import { headers } from "@/next.config";
const TrashDashboadComp = () => {
  const [add_factory, setAdd_factory] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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
    data: incident,

    isLoading: incident_isLoading,
  } = useSWR(`${main_url}/inventory/incident/files/trash`, fetcher);

  const {
    data: factory,

    isLoading: factory_isLoading,
  } = useSWR(`${main_url}/inventory/factory/files/trash`, fetcher);

  console.log(factory);
  function formatDateToCustom(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }
  // console.log(factory);
  // console.log(incident);

  // console.log(
  //   factory.data.factories.filter(
  //     (item) => item.occupier_name.toLowerCase() === search.toLowerCase()
  //   )
  // );

  const restor_factory = (id) => {
    setLoading(true);
    // console.log(Cookies.get(cookies_id));
    axios
      .patch(
        `${main_url}/inventory/factory/file/restore?doc_id=${id}`,
        {},
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
        mutate(`${main_url}/inventory/factory/files/trash`);

        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response.data.message);
        console.log(error?.response);
        setLoading(false);
      });
  };

  const restor_incident = (id) => {
    setLoading(true);
    // console.log(Cookies.get(cookies_id));
    axios
      .patch(
        `${main_url}/inventory/incident/file/restore?doc_id=${id}`,
        {},
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
        mutate(`${main_url}/inventory/incident/files/trash`);

        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response.data.message);
        console.log(error?.response);
        setLoading(false);
      });
  };
  return (
    <DashboadWrapperComp>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div>
        <div
          css={(theme) => ({
            color: theme.colors.Gray_800,
            fontSize: 32,
            fontWeight: 700,
          })}
        >
          Trash
        </div>

        <div
          css={{
            marginTop: 40,
            background: "#fff",
            padding: "24px 24px",
            display: "flex",

            borderRadius: 16,
          }}
        >
          {/* <div
            css={(theme) => ({
              display: "grid",

              gridTemplateColumns: "repeat(2, 40% 20% 20% 20%)",

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
            <div>Occupier Name</div>
            <div>State</div>
            <div>Reg. date</div>
            <div>Last modified</div>
          </div> */}
          {factory_isLoading ? (
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
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
              {factory?.data.docs.length > 0 ||
              incident?.data.docs.length > 0 ? (
                <div
                  css={{
                    marginTop: 40,
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {factory?.data.docs.map((factory) => (
                    <div key={factory._id}>
                      <FactoryDocComp
                        name={factory.doc_type}
                        type={factory.file_type}
                        restore={() => restor_factory(factory._id)}
                        // delete={() => delete_a_factory(factory._id)}
                      />
                    </div>
                  ))}
                  {incident_isLoading ? null : (
                    <div
                    // css={{
                    //   marginTop: 40,
                    // }}
                    >
                      {incident?.data.docs.map((incident) => (
                        <div key={incident._id}>
                          <IncidentDocComp
                            name={incident.doc_type}
                            type={incident.file_type}
                            restore={() => restor_incident(incident._id)}
                            // delete={() => delete_a_factory(factory._id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  css={{
                    textAlign: "center",

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
    </DashboadWrapperComp>
  );
};

export default TrashDashboadComp;
