/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";

const FilterComp = (props) => {
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [reported_by, setReported_by] = useState("");
  const [incident_type, setIncident_type] = useState("");
  return (
    <div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          border: "none",
          borderBottom: "1px solid rgba(220, 219, 234, 0.40)",
          padding: "10px 0px",
        }}
      >
        <div
          css={(theme) => ({
            color: theme.colors.Gray_800,
            fontSize: 24,
            fontWeight: 500,
          })}
        >
          Filter by:
        </div>
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
      <div
        css={{
          marginTop: 24,
        }}
      >
        <div
          css={{
            marginTop: 16,
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
          >
            Type of factory
          </div>
          <div
            css={{
              marginTop: 16,
            }}
          >
            <input
              css={(theme) => ({
                padding: "12px 16px",

                width: "94%",
                fontSize: 12,
                color: theme.colors.Primary_500,
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: 4,
                border: `1px solid #EAECF0`,
                ":focus": {
                  padding: "12px 16px",

                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
                ":placeholder ": {
                  padding: "12px 16px",

                  border: "none",
                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
              })}
              placeholder="Factory type"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
          </div>
        </div>
        <div
          css={{
            marginTop: 16,
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
          >
            State
          </div>
          <div
            css={{
              marginTop: 16,
            }}
          >
            <input
              css={(theme) => ({
                padding: "12px 16px",

                width: "94%",
                fontSize: 12,
                color: theme.colors.Primary_500,
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: 4,
                border: `1px solid #EAECF0`,
                ":focus": {
                  padding: "12px 16px",

                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
                ":placeholder ": {
                  padding: "12px 16px",

                  border: "none",
                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
              })}
              placeholder="Factory type"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </div>
        </div>
        <div
          css={{
            marginTop: 16,
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
          >
            Reported by
          </div>
          <div
            css={{
              marginTop: 16,
            }}
          >
            <select
              css={(theme) => ({
                padding: "12px 16px",

                width: "94%",
                fontSize: 12,
                color: theme.colors.Primary_500,
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: 4,
                border: `1px solid #EAECF0`,
                ":focus": {
                  padding: "12px 16px",

                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
                ":placeholder ": {
                  padding: "12px 16px",

                  border: "none",
                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
              })}
              placeholder=""
              value={reported_by}
              onChange={(e) => {
                setReported_by(e.target.value);
                // console.log(e.target.value);
                // console.log(catId);
              }}
            >
              <option value={"eye_witness"}>Eye witness</option>
              <option value={"occupier"}>Occupier</option>
              <option value={"inpspector"}>Inspector</option>
            </select>
          </div>
        </div>
        <div
          css={{
            marginTop: 16,
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
          >
            Type of incident
          </div>
          <div
            css={{
              marginTop: 16,
            }}
          >
            <select
              css={(theme) => ({
                padding: "12px 16px",
                width: "94%",
                fontSize: 12,
                color: theme.colors.Primary_500,
                backgroundColor: "transparent",
                outline: "none",
                borderRadius: 4,
                border: `1px solid #EAECF0`,
                ":focus": {
                  padding: "12px 16px",

                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
                ":placeholder ": {
                  padding: "12px 16px",

                  border: "none",
                  border: `1px solid #EAECF0`,

                  color: theme.colors.Gray_500,
                },
              })}
              placeholder="Factory type"
              value={incident_type}
              onChange={(e) => {
                setIncident_type(e.target.value);
                // console.log(e.target.value);
                // console.log(catId);
              }}
            >
              <option value={"near_miss"}>Near miss</option>
              <option value={"accidents"}>Accidents</option>
              <option value={"occupational_diseases"}>
                Occupational diseases
              </option>
            </select>
          </div>
        </div>
        <div
          css={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            css={(theme) => ({
              color: theme.colors.Error_500,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
            onClick={() => props.reset()}
          >
            Clear filter
          </div>
          <div
            css={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              css={(theme) => ({
                color: theme.colors.Gray_800,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: "17px",
                marginRight: 32,
                cursor: "pointer",
              })}
              onClick={() => props.close()}
            >
              Cancel
            </div>
            <button
              css={(theme) => ({
                height: 32,
                borderRadius: 30,
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "17px",
                border: "none",
                color: theme.colors.Gray_50,
                backgroundColor: theme.colors.Primary_500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              })}
              onClick={(event) =>
                props.handleClick({
                  type,
                  state,
                  reported_by,
                  incident_type,
                })
              }
            >
              <div> Apply</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
