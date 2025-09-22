/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState, useContext, useRef } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig, mutate } from "swr";

import { success_message, error_message } from "@/src/components/toasts";
import DeclarationPopup from "./comps/declaration_popup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import ReactToPrint from "react-to-print";

import facepaint from "facepaint";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const InspectionReportComp = () => {
  if (typeof window !== "undefined") null;
  const router = useRouter();
  const componentRef = useRef();

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

    const {
    data: user,
    error:user_error,
    isLoading: user_isLoading,
  } = useSWR(`${main_url}/state-officer/info`, fetcher);

  console.log(single_factory?.data.factory);
  const [value, setValue] = useState("");
  const [willAmmend, setWillAmmend] = useState(false);
  const [factory, setFactory] = useState("650b125a69fcacc38ae2b0dd");
  const [natureOfWorkDone, setNatureOfWorkDone] = useState(
    single_factory?.data.factory?.inspection_report?.nature_of_work_done
  ); // Required
  const [inspectionDate, setInspectionDate] = useState(
    single_factory?.data.factory?.inspection_report?.inspection_date
  );
  const [inspectionSummary, setInspectionSummary] = useState(
    single_factory?.data.factory?.inspection_report?.inspection_summary
  );
  const [healthSafetyReport, setHealthSafetyReport] = useState(
    single_factory?.data.factory?.inspection_report?.health_safety_report
  );
  const [recommendations, setRecommendations] = useState(
    single_factory?.data.factory?.inspection_report?.recommendations
  );
  const [state, setState] = useState(single_factory?.data?.factory?.state);
  const [event, setEvent] = useState(
    router.query.type === "amendment" ? "ammendment" : router.query.type
  );
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [willAllowEdit, setWillAllowEdit] = useState(false);
  const [willCancel, setWillCancel] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const update_progress = (progress) => {
    setLoading(true);

    axios
      .patch(
        `${main_url}/state-officer/factory/progress`,
        {
          id: router.query.id,
          progress: progress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        success_message(response?.data.message);
        router.push("/");
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };

  const state_report = () => {
    setLoading(true);

    axios
      .post(
        `${main_url}/state-officer/factory/report`,
        {
          factory: router.query.id,
          nature_of_work_done: natureOfWorkDone,
          inspection_date: inspectionDate,
          inspection_summary: inspectionSummary,
          health_safety_report: healthSafetyReport,
          recommendations: recommendations,
          state: state,
          event: event ?? undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (router.query.type) {
          router.push(`/${router.query.type}`);
        } else {
          router.push("/");
        }

        setLoading(false);
        success_message(response?.data.message);
        setWillAmmend(false);
        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);
        console.log(error);
        setLoading(false);
      });

    // console.log("ade");
  };

  const will_allow_factory_edit = () => {
    // props.next();
    // router.push("/dashboard/registration?tab=b");

    setLoading(true);
    // factory.add_factory_details(
    //   occupier_name,
    //   state,
    //   type,
    //   address,
    //   year_of_last_renewal,
    //   year_of_first_registration
    // );
    // addDocuments("650b10c969fcacc38ae2b0b4");
    // delete details.date_of_occupation;

    axios
      .patch(
        `${main_url}/state-officer/factory-mutation?id=${single_factory.data.factory._id}`,
        {
          id: single_factory.data.factory._id,
          // occupier_name: formData.occupier_name,

          progress: 70,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        // factory.add_factory_id(response.data.data.factory._id);
        // router.push("/dashboard/registration?tab=a");
        // console.log(response.data.data.factory._id);
        // addDocuments(response.data.data.factory._id);
        success_message(response.data.message);
        mutate(`${main_url}/account/user/factory/${router.query.id}`);
        if (router.query.type) {
          router.push(`/${router.query.type}`);
        } else {
          router.push("/");
        }

        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error?.response?.data.message);
        console.log(error);
        setLoading(false);
      });
    console.log("ade");
  };

  const will_cancel = () => {
    // props.next();
    // router.push("/dashboard/registration?tab=b");

    setLoading(true);
    // factory.add_factory_details(
    //   occupier_name,
    //   state,
    //   type,
    //   address,
    //   year_of_last_renewal,
    //   year_of_first_registration
    // );
    // addDocuments("650b10c969fcacc38ae2b0b4");
    // delete details.date_of_occupation;

    axios
      .patch(
        `${main_url}/state-officer/factory/ammendments/cancel?id=${router.query.amm_id}`,
        {
          id: router.query.amm_id,
          // occupier_name: formData.occupier_name,
          reason: "Disorganized approach",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        // factory.add_factory_id(response.data.data.factory._id);
        // router.push("/dashboard/registration?tab=a");
        // console.log(response.data.data.factory._id);
        // addDocuments(response.data.data.factory._id);
        success_message(response.data.message);
        mutate(`${main_url}/account/user/factory/${router.query.id}`);
        if (router.query.type) {
          router.push(`/${router.query.type}`);
        } else {
          router.push("/");
        }

        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error?.response?.data.message);
        console.log(error);
        setLoading(false);
      });
    console.log("ade");
  };

  const handle_will_allow_edit_submit = () => {
    will_allow_factory_edit();
  };

  const handle_will_cancel = () => {
    will_cancel();
  };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div>
        <div
          css={(theme) =>
            mq({
              marginTop: [24, 24, 54],

              border: [0, 0, `1px solid ${theme.colors.Primary_100}`],
              padding: ["16px 16px", "16px 16px", "50px 32px"],
              width: "90%",
              borderRadius: 8,
            })
          }
        >

          <div   ref={componentRef}>
          <div css={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"0px 16px",
            marginTop:24
          }}>
          <div
            css={(theme) =>
              mq({
                fontSize: [16, 16, 32],
                color: theme.colors.Gray_700,
                textTransform: "capitalize",
              })
            }
          >
            Inspection Form
          </div>
          
            <div
                  css={(theme) =>
                    mq({
                        fontSize: [14, 14, 16],
                      color: theme.colors.Success_700,
                      textTransform: "capitalize",
                      fontWeight:600,
                      
                    })
                  }
                >
                   Form LAB|F|9
                </div>
          </div>
            <div
          
              css={mq({
                marginTop: [24, 24, 80],
                padding:"0px 16px"
              })}
            >
              <div>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    rowGap: 48,
                    columnGap: 50,
                    marginTop: 24,
                  }}
                >
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Name of undertaking
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory._occupier_name}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Phone number of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.phone_number}
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Nature of work
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {
                        single_factory?.data?.factory?.inspection_report
                          ?.nature_of_work_done
                      }
                    </div>
                  </div>

                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Postal address of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.postal_address}
                    </div>
                  </div>
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Inspection date
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {
                        single_factory.data?.factory?.inspection_report
                          ?.inspection_date
                      }
                    </div>
                  </div>
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_400,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Precise address of occupier
                    </div>
                    <div
                      css={(theme) => ({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: 20,
                      })}
                    >
                      {single_factory.data.factory.address}
                    </div>
                  </div>
                </div>
                <div
                  css={{
                    borderBottom: "1px solid #EAECF0",
                    margin: "48px 0px",
                  }}
                ></div>
                <div>
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Employee Information
                  </div>
                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Adults
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {
                          single_factory.data.factory.total_employees.adult
                            .female
                        }
                      </div>
                    </div>
                  </div>

                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Youths
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.adult.male}
                      </div>
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Female
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {
                          single_factory.data.factory.total_employees.adult
                            .female
                        }
                      </div>
                    </div>
                  </div>

                  <div
                    css={{
                      display: "grid",
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      alignItems: "center",
                      width: "50%",
                      height: "auto",
                      rowGap: 48,
                      marginTop: 24,
                      columnGap: 50,
                    }}
                  >
                    {" "}
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Total
                    </div>
                    <div
                      css={(theme) => ({
                        backgroundColor: theme.colors.Gray_100,
                        //   height: 67,
                        borderRadius: 8,
                        width: "100%",
                        padding: "12px 14px",
                      })}
                    >
                      <div
                        css={{
                          fontSize: 12,
                        }}
                      >
                        Male
                      </div>
                      <div
                        css={{
                          fontSize: 20,
                        }}
                      >
                        {single_factory.data.factory.total_employees.youth.male}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div
                  css={{
                    borderBottom: "1px solid #EAECF0",
                    margin: "48px 0px",
                  }}
                ></div>

                <div>
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Inspection summary
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data?.factory?.inspection_report
                          ?.inspection_summary,
                    }}
                  ></div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Health and safety report
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data?.factory?.inspection_report
                          ?.health_safety_report,
                    }}
                  ></div>
                </div>

                <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Recomendations
                  </div>
                  <div
                    css={(theme) => ({
                      marginTop: 12,
                      color: theme.colors.Gray_700,
                      lineHeight: "20px",
                      fontSize: 20,
                    })}
                    dangerouslySetInnerHTML={{
                      __html:
                        single_factory?.data?.factory?.inspection_report
                          ?.recommendations,
                    }}
                  ></div>
                </div>

                {/* <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_400,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Comment
                  </div>
                  <div
                    css={{
                      marginTop: 20,
                    }}
                  >
                    <textarea
                      rows={5}
                      css={(theme) =>
                        mq({
                          padding: "12px 14px",
                          width: ["100%", "100%", 450],
                          fontSize: 20,
                          color: theme.colors.Gray_400,
                          border: `1px solid ${theme.colors.Gray_200}`,
                          borderRadius: 8,

                          ":focus": {
                            outline: "none",
                            border: `1px solid ${theme.colors.Gray_200}`,

                            padding: "12px 14px",
                            color: theme.colors.Gray_400,
                          },
                          ":placeholder ": {
                            outline: "none",
                            border: "none",

                            padding: "12px 14px",
                            color: theme.colors.Gray_400,
                          },
                        })
                      }
                      {...register("email", { required: true })}
                      placeholder=""
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <div
                      css={{
                        marginTop: 48,
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <button
                        css={(theme) =>
                          mq({
                            height: [40, 40, 56],
                            borderRadius: 30,
                            width: ["auto", "auto", 356],
                            //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                            padding: ["12px 16px", "12px 16px", "16px 24px"],
                            fontSize: [12, 12, 20],
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
                          zonal_comments();
                        }}
                        // onClick={() => {
                        //   factory_details.add_factory_details(formData);
                        //   factory.set_tab("Upload document");
                        // }}
                      >
                        {loading ? (
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
                          <div
                            css={{
                              display: "flex",
                              marginTop: 4,
                              alignItems: "center",
                            }}
                          >
                            <div>Send comment</div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div></div>
         <ReactToPrint
                onBeforePrint={() => null}
                onAfterPrint={() => null}
                trigger={() => (
                  <button
                css={(theme) =>
                  mq({
                    height: [40, 40, 56],
                    borderRadius: 30,
                    width: ["auto", "auto", 156],
                    //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                    padding: ["12px 16px", "12px 16px", "16px 24px"],
                    fontSize: [12, 12, 16],
                    cursor: "pointer",
                    marginRight: 20,
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    backgroundColor: theme.colors.Gray_900,
                  })
                }
                type="submit"
                // onClick={() => {
                //   setWillCancel(true);
                // }}
              >
                 <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                     
                    >
                      Print Form
                    </div>
                    {/* <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [14, 14, 24],
                      height: [14, 14, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div> */}
                  </div>
              </button>
                )}
                content={() => componentRef.current}
              />
        </div>
        <div
          css={{
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 200
          }}
        >
          <div>
            {router.query.type ? (
              <button
                css={(theme) =>
                  mq({
                    height: [40, 40, 56],
                    borderRadius: 30,
                    width: ["auto", "auto", 356],
                    //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                    padding: ["12px 16px", "12px 16px", "16px 24px"],
                    fontSize: [12, 12, 20],
                    cursor: "pointer",
                    marginRight: 20,
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    backgroundColor: theme.colors.Gray_900,
                  })
                }
                type="submit"
                onClick={() => {
                  setWillCancel(true);
                }}
              >
                {loading ? (
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <div
                      css={mq({
                        width: [16, 16, 24],
                        height: [16, 16, 24],
                      })}
                    >
                      <img src="/svg/loader/loader.svg" />
                    </div>
                  </div>
                ) : (
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      css={{
                        paddingTop: 4,
                      }}
                    >
                      Cancel
                    </div>
                    {/* <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [14, 14, 24],
                      height: [14, 14, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div> */}
                  </div>
                )}
              </button>
            ) : (
              <button
                css={(theme) =>
                  mq({
                    height: [40, 40, 56],
                    borderRadius: 30,
                    width: ["auto", "auto", 356],
                    //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                    padding: ["12px 16px", "12px 16px", "16px 24px"],
                    fontSize: [12, 12, 20],
                    cursor: single_factory?.data.factory?.can_edit
                      ? "not-allowed"
                      : "pointer",
                    marginRight: 20,
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    backgroundColor: single_factory?.data.factory?.can_edit
                      ? theme.colors.Gray_200
                      : theme.colors.Gray_900,
                  })
                }
                type="submit"
                disabled={single_factory?.data.factory?.can_edit}
                onClick={() => {
                  setWillAllowEdit(true);
                }}
              >
                {loading ? (
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <div
                      css={mq({
                        width: [16, 16, 24],
                        height: [16, 16, 24],
                      })}
                    >
                      <img src="/svg/loader/loader.svg" />
                    </div>
                  </div>
                ) : (
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      css={{
                        paddingTop: 4,
                      }}
                    >
                      Adjust info
                    </div>
                    {/* <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [14, 14, 24],
                      height: [14, 14, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div> */}
                  </div>
                )}
              </button>
            )}
          </div>
          <button
            css={(theme) =>
              mq({
                height: [40, 40, 56],
                borderRadius: 30,
                width: ["auto", "auto", 356],
                //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                padding: ["12px 16px", "12px 16px", "16px 24px"],
                fontSize: [12, 12, 20],
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
              setWillAmmend(true);
            }}
          >
            {loading ? (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <div
                  css={mq({
                    width: [16, 16, 24],
                    height: [16, 16, 24],
                  })}
                >
                  <img src="/svg/loader/loader.svg" />
                </div>
              </div>
            ) : (
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Submit report</div>
                <div
                  css={{
                    marginLeft: 8,
                  }}
                >
                  <img
                    css={mq({
                      width: [14, 14, 24],
                      height: [14, 14, 24],
                    })}
                    src="/svg/registration/left_arrow.svg"
                  />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {willAmmend && (
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
              onClick={() => setWillAmmend(false)}
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
              <DeclarationPopup
                close={() => setWillAmmend(false)}
                ammend={() => {
                  state_report();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {willAllowEdit && (
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
              onClick={() => setWillAllowEdit(false)}
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
              <DeclarationPopup
                close={() => setWillAllowEdit(false)}
                content={
                  "Once you’ve submitted, your amendment will be processed and your will be notified for inspection"
                }
                ammend={() => {
                  handle_will_allow_edit_submit();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {willCancel && (
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
              onClick={() => setWillCancel(false)}
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
              <DeclarationPopup
                close={() => setWillCancel(false)}
                ammend={() => {
                  handle_will_cancel();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspectionReportComp;
