/** @jsxImportSource @emotion/react */
import { FactoryContext } from "@/src/context/factoryContext";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { success_message, error_message } from "@/src/components/toasts";
import { mutate } from "swr";
import { useRouter } from "next/router";

const AddIncident = (props) => {
  const factory = useContext(FactoryContext);
  const [loading, setLoading] = useState(false);
  const [doc_type, setDoc_type] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");

  const [notificationForm, setNotificationForm] = useState({
    file: null,
    filename: "",
  });
  const [notificationLetter, setNotificationLetter] = useState({
    file: null,
    filename: "",
  });
  const [medicalReport, setMedicalReport] = useState({
    file: null,
    filename: "",
  });
  const [investigationReport, setInvestigationReport] = useState({
    file: null,
    filename: "",
  });
  const [accidentDetailedReport, setAccidentDetailedReport] = useState({
    file: null,
    filename: "",
  });
  const [statementAccount, setStatementAccount] = useState({
    file: null,
    filename: "",
  });
  const [otherDocument, setOtherDocument] = useState({
    file: null,
    filename: "",
  });
  const [mediaDocument, setMediaDocument] = useState({
    file: null,
    filename: "",
  });
  const [changes, setChanges] = useState([]);
  const router = useRouter();
  // console.log(factory.incident_id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const mediahandleFileChange = (e) => {
    const file = e.target.files[0];

    const uploadedFilename = file.name;

    setMediaDocument({ file, filename: uploadedFilename });
    if (!changes.includes("media_proof")) {
      setChanges((changes) => [...changes, "media_proof"]);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const uploadedFilename = file.name;

    const docTypeToStateMapping = {
      notification_form: setNotificationForm,
      notification_letter: setNotificationLetter,
      medical_report: setMedicalReport,
      investigation_report: setInvestigationReport,
      accident_detailed_report: setAccidentDetailedReport,
      statement_account: setStatementAccount,
      other: setOtherDocument,
    };

    if (docTypeToStateMapping[doc_type]) {
      docTypeToStateMapping[doc_type]({ file, filename: uploadedFilename });
    }
    if (!changes.includes(doc_type)) {
      setChanges((changes) => [...changes, doc_type]);
    }

    const fileType = file.type;
    setSelectedFileType(fileType);
  };
  const addMedia = (factoryId) => {
    if (mediaDocument.file) {
      const formData = new FormData();
      formData.append("media", mediaDocument.file);
      formData.append("doc_type", "media_proof");
      formData.append("incident", factoryId);
      axios
        .post(`${main_url}/inventory/incident/file/media`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          success_message(`media_proof uploaded`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(factory.incident_details);
  const login_account = () => {
    // props.next();
    // router.push("/dashboard/incidents?tab=b");
    setLoading(true);
    // factory.add_factory_details(
    //   factory_name,
    //   state,
    //   reported_by,
    //   incident_type,
    //   victim_name,
    //   factory_type
    // );
    // router.push("/dashboard/incidents?tab=b");
    axios
      .post(
        `${main_url}/inventory/incident`,
        {
          factory_name: factory.incident_details.factory_name,
          state: factory.incident_details.state,
          reported_by: factory.incident_details.reported_by,
          type_of_incident: factory.incident_details.type_of_incident,
          victim_name: factory.incident_details.victim_name,
          factory_type: factory.incident_details.factory_type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get(cookies_id)}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data.incident._id);
        // factory.add_incident_id(response.data.data.incident._id);
        addDocuments(response.data.data.incident._id);
        console.log(factory.incident_id);
        router.push("/dashboard/incidents?tab=b");

        success_message("Incident reported");
        // mutate(`${main_url}/inventory/factory/all`);

        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error.response.data.message);
        console.log(error);
        setLoading(false);
      });
  };

  const addDocuments = (factoryId) => {
    setLoading(true);

    const documentStateMap = {
      notification_form: notificationForm,
      notification_letter: notificationLetter,
      medical_report: medicalReport,
      investigation_report: investigationReport,
      accident_detailed_report: accidentDetailedReport,
      statement_account: statementAccount,
      other: otherDocument,
    };
    let processedCount = 0;
    const totalDocs = Object.keys(documentStateMap).length;
    for (const docType in documentStateMap) {
      if (documentStateMap.hasOwnProperty(docType)) {
        const state = documentStateMap[docType];
        const document = state.file;
        if (document) {
          const formData = new FormData();
          formData.append("doc", document);
          formData.append("doc_type", docType);
          formData.append("incident", factoryId);

          axios
            .post(`${main_url}/inventory/incident/file`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get(cookies_id)}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              success_message(`${docType} uploaded`);
              processedCount++;

              // Check if this is the last iteration
              if (processedCount === changes.length) {
                // This is the last iteration
                addMedia(factoryId);
                setLoading(false);
                if (!loading) {
                  // You can navigate or close the dialog here
                  // router.push("/dashboard/registration");

                  setTimeout(function () {
                    props.close();
                  }, 3000);
                }
              }
            });
        }
      }
    }

    // setLoading(false);
    // if (!loading) {
    //   // router.push("/dashboard/incidents");
    //   // props.close();
    // }
  };
  return (
    <div>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          css={(theme) => ({
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            marginTop: 58,
            justifyContent: "space-between",
            rowGap: 0,
            columnGap: 64,
            width: "100%",
            height: "auto",
          })}
        >
          <div>
            {" "}
            <div
              css={{
                position: "relative",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Notification form"
                value={notificationForm.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("notification_form")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("notification_form", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.cover_letter && (
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
            <div
              css={{
                position: "relative",
                marginTop: 32,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Notification Letter"
                value={notificationLetter.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("notification_letter")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("letter_from_state", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.letter_from_state && (
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
            <div
              css={{
                position: "relative",
                marginTop: 32,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Medical report"
                value={medicalReport.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("medical_report")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("form_lab_f1", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.form_lab_f1 && (
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
            <div
              css={{
                position: "relative",
                marginTop: 32,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Investigation report "
                value={investigationReport.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("investigation_report")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("form_lab_f9", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.form_lab_f9 && (
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
          <div>
            {" "}
            <div
              css={{
                position: "relative",
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Accident detailed report"
                value={accidentDetailedReport.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("accident_detailed_report")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("list_of_equipments", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.list_of_equipments && (
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
            <div
              css={{
                position: "relative",
                marginTop: 32,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Statement of account"
                value={statementAccount.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("statement_account")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("site_layout", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.site_layout && (
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
            <div
              css={{
                position: "relative",
                marginTop: 32,
              }}
            >
              <input
                css={(theme) => ({
                  padding: "12px 4px",
                  width: 325,
                  fontSize: 16,
                  color: theme.colors.Gray_500,
                  border: "none",
                  borderBottom: `2px solid ${theme.colors.Gray_300}`,
                  ":focus": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                  ":placeholder ": {
                    outline: "none",
                    border: "none",
                    borderBottom: `2px solid ${theme.colors.Gray_300}`,
                    padding: "12px 4px",
                    color: theme.colors.Gray_500,
                  },
                })}
                placeholder="Others"
                value={otherDocument.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("other")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("payment_evidence", { required: true })}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div
                  css={(theme) => ({
                    backgroundColor: theme.colors.Primary_50,
                    position: "absolute",
                    color: theme.colors.Primary_500,
                    right: 0,
                    bottom: 12,
                    fontSize: 12,
                    borderRadius: 4,
                    padding: "4px 24px",
                  })}
                >
                  Browse
                </div>
              </label>
            </div>
            {errors.payment_evidence && (
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

      <div
        css={{
          display: "flex",
          justifyContent: "center",
          marginTop: 38,
        }}
      >
        <label
          css={{
            cursor: "pointer",
          }}
        >
          <input
            css={{
              display: "none",
            }}
            type="file"
            accept=".jpg,.png,.mp4,.mp3"
            {...register("payment_evidence", { required: true })}
            onChange={(e) => {
              mediahandleFileChange(e);
            }}
          />
          <div
            css={(theme) => ({
              width: 694,
              height: "auto",
              border: "2px dashed #B3D4CC",
              borderRadius: 4,
              backgroundColor: theme.colors.Primary_25,
              padding: "18px 18px",
            })}
          >
            <div
              css={(theme) => ({
                color: "#676767",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: "38px",
                textAlign: "center",
              })}
            >
              {mediaDocument.filename
                ? mediaDocument.filename
                : "Upload Images/video proof"}
            </div>

            <div
              css={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <img
                css={{
                  width: 48,
                  height: 41,
                }}
                src="/svg/dashboard/upload.svg"
              />
            </div>
            <div
              css={(theme) => ({
                color: theme.colors.Gray_400,
                fontSize: 14,
                lineHeight: "24px",
                fontWeight: 400,
                textAlign: "center",
              })}
            >
              Drag & drop files or{" "}
              <span
                css={(theme) => ({
                  color: theme.colors.Primary_500,
                  textDecoration: "underline",
                })}
              >
                Browse
              </span>
            </div>
            <div
              css={(theme) => ({
                color: "#676767",
                fontSize: 10,
                lineHeight: "18px",
                fontWeight: 400,
                textAlign: "center",
              })}
            >
              Supported formats: JPEG, PNG, MP4,
            </div>
          </div>{" "}
        </label>
      </div>
      <div
        css={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          css={(theme) => ({
            width: 478,
            height: 56,
            borderRadius: 30,
            padding: "16px 24px",
            marginBottom: 30,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            lineHeight: "17px",
            border: "none",
            color: theme.colors.Gray_50,
            backgroundColor:
              // notificationForm &&
              // notificationLetter &&
              // medicalReport &&
              // investigationReport &&
              // accidentDetailedReport &&
              // statementAccount &&
              // otherDocument &&
              // mediaDocument
              changes.length >= 3
                ? theme.colors.Primary_800
                : theme.colors.Primary_300,
          })}
          onClick={() => {
            if (
              // notificationForm &&
              // notificationLetter &&
              // medicalReport &&
              // investigationReport &&
              // accidentDetailedReport &&
              // statementAccount &&
              // otherDocument &&
              // mediaDocument
              changes.length >= 3
            ) {
              login_account();
            }
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default AddIncident;
