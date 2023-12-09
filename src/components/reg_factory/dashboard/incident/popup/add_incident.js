/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";
import ReportIncident from "./add_incident/report_incident";
import AddIncident from "./add_incident/add_incident";
import { useRouter } from "next/router";

const AddIncidents = (props) => {
  const [option, setOption] = useState("a");
  const router = useRouter();

  return (
    <div
      css={{
        padding: "30px 78px",
      }}
    >
      <div
        css={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",

          justifyContent: "space-between",
          rowGap: 0,
          columnGap: 0,
          width: "100%",
          height: "auto",
        })}
      >
        <div></div>
        <div
          css={(theme) => ({
            color: theme.colors.Gray_800,
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
          })}
        >
          Upload new FIle
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
            marginTop: 38,
            justifyContent: "space-between",
            rowGap: 0,
            columnGap: 2,
            width: 426,
            height: "auto",
          })}
        >
          <div
            css={(theme) => ({
              backgroundColor: theme.colors.Primary_500,
              width: 212,
              height: 16,
              borderRadius: "100px 0px 0px 100px",
            })}
          ></div>
          <div
            css={(theme) => ({
              backgroundColor:
                router.query.tab === "b"
                  ? theme.colors.Primary_500
                  : theme.colors.Primary_50,
              width: 212,
              height: 16,
              borderRadius: "0px 100px 100px 0px",
            })}
          ></div>
        </div>
      </div>
      {router.query.tab === "a" && (
        <ReportIncident
          next={() => {
            setOption("a");
            console.log("ade");
          }}
        />
      )}
      {router.query.tab === "b" && (
        <AddIncident
          next={() => setOption("b")}
          close={() => {
            props.close();
          }}
        />
      )}
    </div>
  );
};

export default AddIncidents;
