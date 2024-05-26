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
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const ImprovementNoticeComp = (props) => {
  const [old_password, setOld_password] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [loading, setLoading] = useState(false);
  const [signature_image, setSignature_image] = useState({
    file: null,
    filename: "",
  });
  const handleFileChange = (e, doc_type) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const uploadedFilename = file.name;
    setSignature_image({ file, filename: uploadedFilename });

    // const fileType = file.type;
    // setSelectedFileType(fileType);
  };
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
    data: signature,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/info`, fetcher);
  console.log(signature?.data?.name);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const change_password = () => {
    setLoading(true);
    if (true) {
      const formData = new FormData();
      formData.append("signature", signature_image.file);
      formData.append("name", signature?.data?.name);
      axios
        .patch(`${main_url}/state-officer/info`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          success_message(response.data.message);
          setLoading(false);
          setName("");
          props.close();
          // router.push("/signin");
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      error_message("Password doesn't match");
    }

    // console.log("ade");
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
          <div>Improvement Notice</div>
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
                    // onChange={(e) => setFactory_name(e.target.value)}
                    // value={factory_name}
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
                    // onChange={(e) => setFactory_name(e.target.value)}
                    // value={factory_name}
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
                    // onChange={(e) => setFactory_name(e.target.value)}
                    // value={factory_name}
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
                  Area(s) to Improve
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
                    // onChange={(e) => setFactory_name(e.target.value)}
                    // value={factory_name}
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
                    // onChange={(e) => setInspectionDate(e.target.value)}
                    // value={inspectionDate}
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
    </div>
  );
};

export default ImprovementNoticeComp;
