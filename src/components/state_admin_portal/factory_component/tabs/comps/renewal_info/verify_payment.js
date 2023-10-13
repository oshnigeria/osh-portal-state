/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";

import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FactoryContext } from "@/src/context/factoryContext";
import FactoryDocComp from "@/src/components/factoryDetailsComp";

const RenewalVerifyPayment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    data: single_factory,
    error,
    isLoading,
  } = useSWR(`${main_url}/state-officer/factory/${router.query.id}`, fetcher);

  // const {
  //   data: single_factory_doc,
  //   error: doc_error,
  //   isLoading: doc_isLoading,
  // } = useSWR(
  //   isLoading
  //     ? null
  //     : `${main_url}/state-officer/factory/ammendment/files?factory=${router.query.id}`,
  //   fetcher
  // );

  const {
    data: single_factory_doc,
    error: doc_error,
    isLoading: doc_isLoading,
  } = useSWR(
    isLoading
      ? null
      : `${main_url}/state-officer/factory-docs?factory_id=${router.query.id}`,
    fetcher
  );
  console.log(single_factory_doc);
  console.log(single_factory);
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
        // success_message(response?.data.message);
        factory.set_tab("Inspection report");
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // error_message(error?.response?.data?.message);

        setLoading(false);
      });

    // console.log("ade");
  };
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {doc_isLoading ? (
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
            {single_factory_doc.data.docs.filter(
              (word) => word.doc_type === "renewal_payment_reciept"
            ).length >= 1 ? (
              <div
                css={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {single_factory_doc.data.docs
                  .filter((word) => word.doc_type === "renewal_payment_reciept")
                  .map((doc) => (
                    <div key={doc._id}>
                      <FactoryDocComp
                        name={doc.name}
                        doc_type={doc.doc_type}
                        factory_id={router.query.id}
                        file_key={doc.src}
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
              css={(theme) => ({
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
              })}
              type="submit"
              onClick={() => {
                // factory_details.add_factory_details(formData);
                update_progress(60);
              }}
            >
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>Verify & continue</div>
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
  );
};

export default RenewalVerifyPayment;
