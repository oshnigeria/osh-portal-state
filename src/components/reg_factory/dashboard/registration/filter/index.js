/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from "react";

const FilterComp = (props) => {
  const [start_year_first, setStart_year_first] = useState("");
  const [end_year_first, setEnd_year_first] = useState("");
  const [start_year_last, setStart_year_last] = useState("");
  const [end_year_last, setEnd_year_last] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");

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
        <div>
          <div
            css={(theme) => ({
              color: theme.colors.Gray_800,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "17px",
            })}
          >
            Year of first registration
          </div>
          <div
            css={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <input
                css={(theme) => ({
                  padding: "12px 16px",

                  width: 184,
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
                onChange={(e) => setStart_year_first(e.target.value)}
                value={start_year_first}
              />
            </div>
            <div
              css={{
                width: 8,
                height: 1,
                margin: "0px 16px",
                backgroundColor: "#98A2B3",
              }}
            ></div>
            <div>
              <input
                css={(theme) => ({
                  padding: "12px 16px",

                  width: 184,
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
                onChange={(e) => setEnd_year_first(e.target.value)}
                value={end_year_first}
              />
            </div>
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
            Year of last renewal
          </div>
          <div
            css={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <input
                css={(theme) => ({
                  padding: "12px 16px",

                  width: 184,
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
                onChange={(e) => setStart_year_last(e.target.value)}
                value={start_year_last}
              />
            </div>
            <div
              css={{
                width: 8,
                height: 1,
                margin: "0px 16px",
                backgroundColor: "#98A2B3",
              }}
            ></div>
            <div>
              <input
                css={(theme) => ({
                  padding: "12px 16px",

                  width: 184,
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
                onChange={(e) => setEnd_year_last(e.target.value)}
                value={end_year_last}
              />
            </div>
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

                width: 415,
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

                width: 415,
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
              cursor: "pointer",
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
            }}
          >
            <div
              css={(theme) => ({
                color: theme.colors.Gray_800,
                fontSize: 14,
                fontWeight: 500,
                lineHeight: "17px",
                cursor: "pointer",
                marginRight: 32,
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
                  start_year_first,
                  end_year_first,
                  start_year_last,
                  end_year_last,
                  type,
                  state,
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
