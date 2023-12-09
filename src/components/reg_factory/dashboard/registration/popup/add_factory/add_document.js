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

const AddDocument = (props) => {
  const factory = useContext(FactoryContext);

  const [loading, setLoading] = useState(false);
  const [doc_type, setDoc_type] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("");
  const [coverLetter, setCoverLetter] = useState({ file: null, filename: "" });
  const [letterFromState, setLetterFromState] = useState({
    file: null,
    filename: "",
  });
  const [formLabF1, setFormLabF1] = useState({ file: null, filename: "" });
  const [formLabF9, setFormLabF9] = useState({ file: null, filename: "" });
  const [cacCertificate, setCacCertificate] = useState({
    file: null,
    filename: "",
  });
  const [cOfR, setCOfR] = useState({ file: null, filename: "" });
  const [listOfEquipments, setListOfEquipments] = useState({
    file: null,
    filename: "",
  });
  const [siteLayout, setSiteLayout] = useState({ file: null, filename: "" });
  const [paymentEvidence, setPaymentEvidence] = useState({
    file: null,
    filename: "",
  });
  const [treasuryReceipt, setTreasuryReceipt] = useState({
    file: null,
    filename: "",
  });
  const [acknowledgementLetter, setAcknowledgementLetter] = useState({
    file: null,
    filename: "",
  });
  const [changes, setChanges] = useState([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // console.log(factory);

  const login_account = () => {
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

    axios
      .post(
        `${main_url}/inventory/factory`,
        {
          occupier_name: factory.factory_details.occupier_name,
          state: factory.factory_details.state,
          type: factory.factory_details.type,
          address: factory.factory_details.address,
          year_of_last_renewal: factory.factory_details.year_of_last_renewal,
          year_of_first_registration:
            factory.factory_details.year_of_first_registration,
          cert_no: factory.factory_details.cert_no,
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
        // router.push("/dashboard/registration?tab=b");
        addDocuments(response.data.data.factory._id);
        success_message(response.data.message);
        mutate(`${main_url}/inventory/factory/all`);

        // setLoading(false);
      })
      .catch(function (error) {
        error_message(error?.response?.data.message);
        console.log(error);
        // setLoading(false);
      });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const uploadedFilename = file.name;

    const docTypeToStateMapping = {
      cover_letter: setCoverLetter,
      letter_from_state: setLetterFromState,
      form_lab_f1: setFormLabF1,
      form_lab_f9: setFormLabF9,
      cac_certificate: setCacCertificate,
      c_of_r: setCOfR,
      list_of_equipments: setListOfEquipments,
      site_layout: setSiteLayout,
      payment_evidence: setPaymentEvidence,
      treasury_receipt: setTreasuryReceipt,
      acknowledgement_letter: setAcknowledgementLetter,
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

  const addDocuments = (factoryId) => {
    setLoading(true);

    const documentStateMap = {
      cover_letter: coverLetter,
      letter_from_state: letterFromState,
      form_lab_f1: formLabF1,
      form_lab_f9: formLabF9,
      cac_certificate: cacCertificate,
      c_of_r: cOfR,
      list_of_equipments: listOfEquipments,
      site_layout: siteLayout,
      payment_evidence: paymentEvidence,
      treasury_receipt: treasuryReceipt,
      acknowledgement_letter: acknowledgementLetter,
    };
    let processedCount = 0;
    const totalDocs = Object.keys(documentStateMap).length;
    for (const docType in documentStateMap) {
      if (documentStateMap.hasOwnProperty(docType)) {
        const formData = new FormData();
        const state = documentStateMap[docType];
        const document = state.file;
        if (document) {
          formData.append("doc", document);
          formData.append("doc_type", docType);
          formData.append("factory", factoryId);

          axios
            .post(`${main_url}/inventory/factory/file`, formData, {
              headers: {
                "Content-Type": "multipart/form-data", // Use multipart/form-data for file upload
                Authorization: `Bearer ${Cookies.get(cookies_id)}`,
              },
            })
            .then((res) => {
              console.log(res);
              success_message(`${docType} uploaded`);
              processedCount++;

              // Check if this is the last iteration
              if (processedCount === changes.length) {
                // This is the last iteration
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
    //   // router.push("/dashboard/registration");
    //   // props.close();
    // }
  };

  console.log(factory);
  console.log("factory");

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
                placeholder="cover letter"
                value={coverLetter.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("cover_letter")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("cover_letter", { required: true })}
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
                placeholder=" Letter from state"
                value={letterFromState.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("letter_from_state")}
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
                placeholder=" Application Form"
                value={formLabF1.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("form_lab_f1")}
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
                placeholder="Application report "
                value={formLabF9.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("form_lab_f9")}
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
                placeholder="CAC Certificate"
                value={cacCertificate.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("cac_certificate")}
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
                placeholder="C of R"
                value={cOfR.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("c_of_r")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("c_of_r", { required: true })}
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
            {errors.c_of_r && (
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
                placeholder="List of equipment"
                value={listOfEquipments.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("list_of_equipments")}
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
                placeholder="Site layout"
                value={siteLayout.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("site_layout")}
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
                placeholder="Payment evidence"
                value={paymentEvidence.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("payment_evidence")}
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
                placeholder="Treasury receipt"
                value={treasuryReceipt.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("treasury_receipt")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("treasury_receipt", { required: true })}
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
            {errors.treasury_receipt && (
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
                placeholder="Acknowledgements from ministry"
                value={acknowledgementLetter.filename}
              />

              <label
                css={{
                  cursor: "pointer",
                }}
                onClick={() => setDoc_type("acknowledgement_letter")}
              >
                <input
                  css={{
                    display: "none",
                  }}
                  type="file"
                  accept=".pdf,.docx"
                  {...register("acknowledgement_letter", { required: true })}
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
            {errors.acknowledgement_letter && (
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
              // coverLetter.file &&
              // letterFromState.file &&
              // formLabF1.file &&
              // formLabF9.file &&
              // cacCertificate.file &&
              // cOfR.file &&
              // listOfEquipments.file &&
              // siteLayout.file &&
              // paymentEvidence.file &&
              // treasuryReceipt.file &&
              // acknowledgementLetter.file
              changes.length >= 3
                ? theme.colors.Primary_800
                : theme.colors.Primary_300,
          })}
          onClick={() => {
            if (
              // coverLetter.file &&
              // letterFromState.file &&
              // formLabF1.file &&
              // formLabF9.file &&
              // cacCertificate.file &&
              // cOfR.file &&
              // listOfEquipments.file &&
              // siteLayout.file &&
              // paymentEvidence.file &&
              // treasuryReceipt.file &&
              // acknowledgementLetter.file
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

export default AddDocument;
