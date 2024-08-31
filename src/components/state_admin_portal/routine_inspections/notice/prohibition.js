/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { main_url, cookies_id } from "@/src/details";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig } from "swr";

import { error_message, success_message } from "@/src/components/toasts";
import { useRouter } from "next/router";
import facepaint from "facepaint";
import { RoutineChecksContext } from "@/src/context/routineChecksContext";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const ProhibitionNoticeComp = (props) => {
  const [factory_name, setFactory_name] = useState(props.factory_name ?? "");
  const [postal_address, setPostal_address] = useState(
    props.postal_address ?? ""
  );
  const [ref_number, setRef_number] = useState("");
  const [improvement, setImprovements] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [saved, setSaved] = useState(false);

  const notice = useContext(RoutineChecksContext);

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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleNoticeDetails = () => {
    notice.add_notice_details({
      previous_notice_reference_number: ref_number,

      date_of_last_inspection: inspectionDate,
    });
    setSaved(true);
  };

  return (
    <div>
      <div
        css={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(2, 90% 10%)",

          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })}
      >
        {/* <div></div> */}
        <div
          css={(theme) =>
            mq({
              color: theme.colors.Primary_500,
              fontSize: [20, 20, 24],
              fontWeight: 700,
              textAlign: "left",

              width: "100%",
            })
          }
        >
          <div>Prohibition Notice</div>
        </div>
        <div
          css={{
            width: "100%",

            display: "flex",
            justifyContent: "right",
          }}
        >
          {" "}
          <div
            css={{
              cursor: "pointer",
            }}
            onClick={() => props.close()}
          >
            <img
              css={{
                width: 16,
                height: 16,
              }}
              src="/svg/dashboard/cancel.svg"
            />
          </div>
        </div>
      </div>

      <div css={{}}>
        <div
          css={{
            // display: "flex",
            // justifyContent: "center",
            marginTop: 64,
          }}
        >
          <div>
            <div
              css={mq({
                marginTop: [8, 20],
              })}
            >
              <div>
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Name of Factory
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <input
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", "100%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_400}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_800,
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
                    onChange={(e) => setFactory_name(e.target.value)}
                    value={factory_name}
                  />
                </div>
              </div>
              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Postal Address of Factory
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <input
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", "100%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_400}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_800,
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
                    onChange={(e) => setPostal_address(e.target.value)}
                    value={postal_address}
                  />
                </div>
              </div>
              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Reference Number
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <input
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", "100%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_400}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_800,
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
                    onChange={(e) => setRef_number(e.target.value)}
                    value={ref_number}
                  />
                </div>
              </div>

              <div
                css={{
                  marginTop: 48,
                }}
              >
                <label
                  css={(theme) =>
                    mq({
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Inspection date
                </label>
                <div
                  css={{
                    marginTop: 20,
                  }}
                >
                  <input
                    css={(theme) =>
                      mq({
                        padding: "12px 14px",
                        width: ["100%", "100%", "70%"],
                        fontSize: [14, 14, 18],
                        color: theme.colors.Gray_400,
                        border: `1px solid ${theme.colors.Gray_200}`,
                        borderRadius: 8,

                        ":focus": {
                          outline: "none",
                          border: `1px solid ${theme.colors.Gray_400}`,

                          padding: "12px 14px",
                          color: theme.colors.Gray_800,
                        },
                        ":placeholder ": {
                          outline: "none",
                          border: "none",

                          padding: "12px 14px",
                          color: theme.colors.Gray_400,
                        },
                      })
                    }
                    {...register("inspection_date", { required: true })}
                    placeholder=""
                    type="date"
                    onChange={(e) => setInspectionDate(e.target.value)}
                    value={inspectionDate}
                  />
                </div>
                {errors.inspection_date && (
                  <span
                    css={{
                      fontSize: 12,
                      marginTop: 12,
                      color: "red",
                    }}
                  >
                    * this field is required
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        css={{
          marginTop: 20,
        }}
      >
        <button
          css={(theme) =>
            mq({
              height: [40, 40, 56],
              borderRadius: 30,
              width: ["auto", "auto", 156],
              //   padding: ["10px 16px", "10px 16px", "16px 24px"],
              padding: ["12px 16px", "12px 16px", "12px 16px"],
              fontSize: [12, 12, 16],
              cursor: "pointer",
              marginRight: 20,
              fontWeight: 600,
              lineHeight: "17px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              backgroundColor: theme.colors.Primary_500,
            })
          }
          type="submit"
          onClick={() => {
            handleNoticeDetails();
          }}
        >
          <div>{saved ? "Saved" : "Save"}</div>
        </button>
      </div>
    </div>
  );
};

export default ProhibitionNoticeComp;
