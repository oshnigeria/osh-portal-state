/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext, useRef } from "react";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import DashboadWrapperComp from "@/src/components/state_admin_portal/nav_wrapper";
import facepaint from "facepaint";
import EmployeeInfoComp from "./regsitration_components/employee_info_comp";
import toast, { Toaster } from "react-hot-toast";
import { success_message, error_message } from "@/src/components/toasts";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import FactoryDocComp from "@/src/components/factoryDetailsComp";
import DeclarationPopup from "./comps/declaration_popup";
import CautionaryCertComp from "../../../certs/cautionary";
import WarningCertComp from "../../../certs/warning";
import ProhibitionCertComp from "../../../certs/prohibition";
import AddRoutineCheckDoc from "../../popup/add_document";
import ReactToPrint from "react-to-print";

import { FactoryContext } from "@/src/context/factoryContext";

const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const FacRoutineDetailsComp = () => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [willAmmend, setWillAmmend] = useState(false);
    const [toggle_add_doc, setToggleAddDoc] = useState(false);
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
    data: single_report,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );
  console.log(single_report);

    const factory = useContext(FactoryContext);

    const handle_document_page = () =>{
      factory.set_tab("Document verification")
    }
  const handle_add_document = () =>{
      setToggleAddDoc(true)
    }
  return (
    <div>
      

      {isLoading || error ? (
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
        <div>
          {router.query.view_cart ? (
            <div ref={componentRef}>
              <div>
                {single_report.data?.report?.letter_type ===
                  "WARNING-NOTICE" && (
                  <WarningCertComp
                    address={single_report.data?.report?.location}
                    ref_number={single_report.data?.report?.reference_number}
                    notice_type={single_report.data?.report?.letter_type}
                    inspec_date={single_report.data?.report?.inspection_date}
                    sections_of_contraventions={single_report.data?.report?.sections_of_contraventions}
                  />
                )}
              </div>

              <div>
                {single_report.data?.report?.letter_type ===
                  "PROHIBITION-NOTICE" && (
                  <ProhibitionCertComp
                    inspection_date={
                      single_report.data?.report?.inspection_date
                    }
                    factory_name={single_report.data?.report?.factory_name}
                    address={single_report.data?.report?.location}
                    ref_number={single_report.data?.report?.reference_number}
                    notice_type={single_report.data?.report?.letter_type}
                    inspec_date={single_report.data?.report?.inspection_date}
                  />
                )}
              </div>

              <div>
                {single_report.data?.report?.letter_type ===
                  "CAUTIONARY-NOTICE" && (
                  <CautionaryCertComp
                    inspection_date={
                      single_report.data?.report?.inspection_date
                    }
                    factory_name={single_report.data?.report?.factory_name}
                    address={single_report.data?.report?.location}
                    ref_number={single_report.data?.report?.reference_number}
                    notice_type={single_report.data?.report?.letter_type}
                    inspec_date={single_report.data?.report?.inspection_date}
                    areas_to_improve={single_report.data?.report?.areas_to_improve}

                  />
                )}
              </div>
            </div>
          ) : (
            <div
            ref={componentRef}
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                <div
                  css={(theme) =>
                    mq({
                      fontSize: [16, 16, 32],
                      color: theme.colors.Gray_700,
                      textTransform: "capitalize",
                    })
                  }
                >
                  Factory information
                </div>

                <div>
                  <div
                    css={mq({
                      marginTop: [24, 24, 48],
                    })}
                  >
                    <div
                      css={{
                        display: "grid",
                        gridTemplateColumns: `repeat(2, 1fr)`,
                        rowGap: 48,
                        columnGap: 50,
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
                          css={(theme) =>
                            mq({
                              marginTop: 12,
                              color: theme.colors.Gray_700,
                              lineHeight: "20px",
                              fontSize: [14, 14, 20],
                            })
                          }
                        >
                          {single_report.data?.report?.factory_name}
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
                          Postal Address of Factory
                        </div>
                        <div
                          css={(theme) =>
                            mq({
                              marginTop: 12,
                              color: theme.colors.Gray_700,
                              lineHeight: "20px",
                              fontSize: [14, 14, 20],
                            })
                          }
                        >
                          {single_report.data?.report?.postal_address}
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
                          css={(theme) =>
                            mq({
                              marginTop: 12,
                              color: theme.colors.Gray_700,
                              lineHeight: "20px",
                              fontSize: [14, 14, 20],
                            })
                          }
                        >
                          {single_report.data?.report?.nature_of_work}
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
                          Precise address of Factory
                        </div>
                        <div
                          css={(theme) =>
                            mq({
                              marginTop: 12,
                              color: theme.colors.Gray_700,
                              lineHeight: "20px",
                              fontSize: [14, 14, 20],
                            })
                          }
                        >
                          {single_report.data?.report?.location}
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
                          css={(theme) =>
                            mq({
                              marginTop: 12,
                              color: theme.colors.Gray_700,
                              lineHeight: "20px",
                              fontSize: [14, 14, 20],
                            })
                          }
                        >
                          {single_report.data?.report?.inspection_date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  css={{
                    borderBottom: "1px solid #EAECF0",
                    margin: "48px 0px",
                  }}
                ></div>
                <div
                  css={{
                    width: "80%",
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
                    Employee Information
                  </div>
                  <EmployeeInfoComp
                    adult_male={
                      single_report.data?.report?.no_of_male_employees
                    }
                    adult_female={
                      single_report.data?.report?.no_of_female_employees
                    }
                  />
                </div>

                <div
                  css={{
                    marginTop: 48,
                    marginBottom: 48,
                  }}
                >
                  <div
                    css={(theme) => ({
                      width: "80%",

                      borderBottom: `1px solid ${theme.colors.Gray_200}`,
                    })}
                  ></div>
                </div>
                <div>
                  <div>
                    <div
                      css={(theme) =>
                        mq({
                          color: theme.colors.Gray_500,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Inspection Summary
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                      dangerouslySetInnerHTML={{
                        __html: single_report.data?.report?.inspection_summary,
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
                          color: theme.colors.Gray_500,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Health and Safety Report
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                      dangerouslySetInnerHTML={{
                        __html: single_report.data?.report?.inspection_summary,
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
                          color: theme.colors.Gray_500,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                    >
                      Recomendations
                    </div>
                    <div
                      css={(theme) =>
                        mq({
                          marginTop: 12,
                          color: theme.colors.Gray_700,
                          lineHeight: "20px",
                          fontSize: [14, 14, 20],
                        })
                      }
                      dangerouslySetInnerHTML={{
                        __html: single_report.data?.report?.recommendations,
                      }}
                    ></div>
                  </div>
                  {single_report.data?.report?.has_contraventions && (
                    <div
                      css={{
                        marginTop: 48,
                      }}
                    >
                      <div
                        css={(theme) =>
                          mq({
                            color: theme.colors.Gray_500,
                            lineHeight: "20px",
                            fontSize: [14, 14, 20],
                          })
                        }
                      >
                        Sections of Contraventions
                      </div>
                      <div
                        css={(theme) =>
                          mq({
                            marginTop: 12,
                            color: theme.colors.Gray_700,
                            lineHeight: "20px",
                            fontSize: [14, 14, 20],
                            textTransform: "capitalize",
                          })
                        }
                      >
                        {single_report.data?.report?.sections_of_contraventions}
                      </div>
                    </div>
                  )}
                   <div
                  css={{
                    marginTop: 48,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_500,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                        fontWeight:700
                      })
                    }
                  >
                    State Officer
                  </div>
                 <div
                  css={{
                    marginTop: 16,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_500,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Name
                  </div>
                  <div
                    css={(theme) =>
                      mq({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    {single_report.data?.report?.state_officer_name}
                  </div>
                </div>
                   <div
                  css={{
                    marginTop: 16,
                  }}
                >
                  <div
                    css={(theme) =>
                      mq({
                        color: theme.colors.Gray_500,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    Signature
                  </div>
                  <div
                    css={(theme) =>
                      mq({
                        marginTop: 12,
                        color: theme.colors.Gray_700,
                        lineHeight: "20px",
                        fontSize: [14, 14, 20],
                      })
                    }
                  >
                    <img
                              src={single_report.data?.report?.state_officer_signature}
                              css={{
                                width: 60,
                                height: 20,
                              }}
                            />
                
                  </div>
                </div>
                </div>
                  {/* <div
                css={{
                  marginTop: 48,
                }}
              >
                <div
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_500,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Notice generated
                </div>
                <div>
                  <FactoryDocComp
                        name={doc.name}
                        doc_type={doc.doc_type}
                        type={doc.file_type}
                        factory_id={router.query.id}
                        file_key={doc.src}
                      />
                </div>
              </div> */}

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
                    rows={8}
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", 450],
                        fontSize: [14, 14, 20],
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
                          width: [140, 140, 356],
                          //   padding: ["10px 16px", "10px 16px", "16px 24px"],
                          padding: "16px 24px",
                          fontSize: [12, 12, 16],
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
                        handleSubmit();
                      }}
                    >
                      <div
                        css={{
                          display: "flex",
                          marginTop: 4,
                          alignItems: "center",
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
                              css={{
                                width: 24,
                                height: 24,
                              }}
                            >
                              <img src="/svg/loader/loader.svg" />
                            </div>
                          </div>
                        ) : (
                          <div>Send comment</div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {single_report.data?.report?.letter_type !== "IMPROVEMENT-NOTICE" && (
        <div
          css={{
            marginTop: 64,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
        
          {single_report.data?.report?.letter_type && (
          <div css={{
  // marginTop:24
}}>
          {router.query.view_cart ? 
            <div css={{
              display:"flex",
              justifyContent:"space-between"
            }}>
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
                // factory_details.add_factory_details(formData);
                router.back();
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Back</div>
              </div>
            </button>
            
              <ReactToPrint
                onBeforePrint={() => null}
                onAfterPrint={() => null}
                trigger={() => (
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
                    // onClick={() => {
                    //   factory_details.add_factory_details(formData);
                    //   factory.set_tab("Upload document");
                    // }}
                  >
                    <div
                      css={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <div>Print Report</div>
                    </div>
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div> :   
            <div css={{
        // marginTop:24,
        display:"flex",
        justifyContent:"space-between"
      }}>
  <ReactToPrint
                onBeforePrint={() => null}
                onAfterPrint={() => null}
                trigger={() => (
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
                    // onClick={() => {
                    //   factory_details.add_factory_details(formData);
                    //   factory.set_tab("Upload document");
                    // }}
                  >
                    <div
                      css={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <div>Print Report</div>
                    </div>
                  </button>
                )}
                content={() => componentRef.current}
              />
              {single_report.data?.report?.letter_type !== "IMPROVEMENT-NOTICE" && <button
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
                // factory_details.add_factory_details(formData);
                router.push(`${router.asPath}?view_cart=true`);
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>View Certificate</div>
              </div>
            </button>}
                  
      </div>
          


        }
    </div>
          )}
        </div>
      )}
      <div css={{
        display:"flex",
        justifyContent:"space-between",
          marginTop:24
      }}>
<button
          css={(theme) =>
            mq({
              width: 200,
              height: 56,
              borderRadius: 30,
              padding: ["16px 22px", "16px 22px", "16px 24px"],
              fontSize: [14, 14, 14],
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
            handle_document_page();
          }}
        >
         
          <div>View Documents</div>
        </button>
        <button
          css={(theme) =>
            mq({
              width: 200,
              height: 56,
              borderRadius: 30,
              padding: ["16px 22px", "16px 22px", "16px 24px"],
              fontSize: [14, 14, 14],
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
          handle_add_document()
          }}
        >
          <img
            css={{
              width: 24,
              height: 24,
              marginRight: 16,
            }}
            src="/svg/factory/add.svg"
          />
          <div>Add Document</div>
        </button>
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
                loading={isLoading}
                ammend={() => {
                  handleSubmitApprove();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        <AnimatePresence initial={false}>
          {toggle_add_doc && (
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
                  // setAdd_factory(false);
                  setToggleAddDoc(false);
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

                  width: 525,
                  height: 600,
                  borderRadius: 14,
                  zIndex: 5,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  margin: "auto",
                  // display: "flex",
                  // justifyContent: "center",
                  backgroundColor: "#fff",
                })}
              >
                {/* <CreateRiderAccount close={() => router.back()} /> */}
                <AddRoutineCheckDoc close={() => setToggleAddDoc(false)} doc_page={() => handle_document_page()} />
                {/* <div>ade</div> */}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default FacRoutineDetailsComp;
