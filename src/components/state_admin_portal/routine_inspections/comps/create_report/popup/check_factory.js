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
const CheckFactory = (props) => {
  const [old_password, setOld_password] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cert_no, setCert_no] = useState("");

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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const check_fac_cert_no = (id) => {
    setLoading(true);

    axios
      .get(
        `${main_url}/inventory/factory/certificate?cert_no=${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        // router.push("/");
        console.log("fac");
        console.log(response?.data);

        console.log("fac");
        if (response?.data.factory === null) {
          // setFactory(null);
          router.push("/create-inspection-report");
        } else {
          // setFactory(response?.data?.data?.factory?._id);
          if (response?.data?.data?.factory?._id) {
            router.push(
              `/create-inspection-report?factory_id=${response?.data?.data?.factory?._id}`
            );
          } else {
            router.push("/create-inspection-report");
          }
        }

        setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };
  return (
    <div
      css={mq({
        backgroundColor: "#fff",
        padding: ["14px 16px", "14px 16px", "30px 40px"],
      })}
    >
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
              color: theme.colors.Gray_800,
              fontSize: [20, 20, 24],
              fontWeight: 700,
              textAlign: "center",
              flex: "flex",
              justifyContent: "center",
              width: "100%",
            })
          }
        >
          <div>New Report</div>
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <div
              css={{
                marginTop: 40,
                // display: "flex",
                // justifyContent: "center",
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
                Certificate Number of Factory
              </label>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <input
                  css={(theme) => ({
                    padding: "12px 8px",
                    width: "100%",
                    fontSize: 18,
                    color: theme.colors.Gray_500,
                    borderRadius: 8,
                    border: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      // border: "none",
                      borderRadius: 8,
                      border: `2px solid ${theme.colors.Gray_400}`,
                      padding: "12px 8px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      // border: "none",
                      borderRadius: 8,
                      border: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 9px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder=""
                  type="text"
                  onChange={(e) => setCert_no(e.target.value)}
                  value={cert_no}
                />
              </div>
            </div>
            <div
              css={{
                marginTop: 20,
                // display: "flex",
                // justifyContent: "center",
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
                Name of Factory
              </label>
              <div
                css={{
                  marginTop: 20,
                }}
              >
                <input
                  css={(theme) => ({
                    padding: "12px 8px",
                    width: "100%",
                    fontSize: 18,
                    color: theme.colors.Gray_500,
                    borderRadius: 8,
                    border: `2px solid ${theme.colors.Gray_300}`,
                    ":focus": {
                      outline: "none",
                      // border: "none",
                      borderRadius: 8,
                      border: `2px solid ${theme.colors.Gray_400}`,
                      padding: "12px 8px",
                      color: theme.colors.Gray_500,
                    },
                    ":placeholder ": {
                      outline: "none",
                      // border: "none",
                      borderRadius: 8,
                      border: `2px solid ${theme.colors.Gray_300}`,
                      padding: "12px 9px",
                      color: theme.colors.Gray_500,
                    },
                  })}
                  placeholder=""
                  type="text"
                  // onChange={(e) => setName(e.target.value)}
                  // value={name}
                />
              </div>
            </div>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                css={(theme) =>
                  mq({
                    width: [140, 140, 325],
                    height: 56,
                    borderRadius: 30,
                    marginTop: [32, 32, 64],
                    padding: "16px 24px",
                    cursor: "pointer",
                    fontSize: [12, 12, 16],
                    fontWeight: 600,
                    lineHeight: "17px",
                    border: "none",
                    color: theme.colors.Gray_50,
                    backgroundColor: theme.colors.Primary_500,
                  })
                }
                onClick={() => {
                  check_fac_cert_no(cert_no);
                }}
              >
                {loading ? "Checking..." : "Start Report"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckFactory;
