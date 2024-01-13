/** @jsxImportSource @emotion/react */
import axios from "axios";
import { main_url, cookies_id } from "@/src/details";
import React, { useState, useContext } from "react";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import DashboadWrapperComp from "@/src/components/state_admin_portal/nav_wrapper";
import facepaint from "facepaint";
import EmployeeInfoComp from "@/src/components/state_admin_portal/factory_component/tabs/regsitration_components/employee_info_comp";
const breakpoints = [576, 768, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const FacRoutineDetailsComp = () => {
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
    data: single_report,
    error,
    isLoading,
  } = useSWR(
    `${main_url}/inventory/factory/routine-check?id=${router.query.id}`,
    fetcher
  );

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
        <div
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
                      Occupier name
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
                      {single_report.data?.report?.factory?._occupier_name}
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
                      State of occupier
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
                      {single_report.data?.report?.factory?.state}
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
                      Phone number of occupier
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
                      {single_report.data?.report?.factory.phone_number}
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
                      Date of Expiration of CoR
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
                      {/* {single_factory.data.factory._occupier_name} */}
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
                      Postal address of occupier
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
                      {single_report.data?.report?.factory?.postal_address}
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
                      Registration Status
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
                      {single_report.data?.report?.factory?.progress}
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
                      Precise address of occupier
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
                      {single_report.data?.report?.factory?.address}
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
                      Company Registration number
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
                      {
                        single_report.data?.report?.factory
                          .company_registration_no
                      }
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
                      Date of occupation
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
                      {
                        single_report.data?.report?.factory
                          .date_operations_started
                      }
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
                      {
                        single_report.data?.report?.factory?.inspection_report
                          ?.nature_of_work_done
                      }
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
                Employee Information
              </div>
              <EmployeeInfoComp
                adult_male={
                  single_report.data?.report?.factory.night_shift_employees
                    .adult.male
                }
                adult_female={
                  single_report.data?.report?.factory.night_shift_employees
                    .adult.female
                }
                youths_male={
                  single_report.data?.report?.factory.night_shift_employees
                    .youth.male
                }
                youths_female={
                  single_report.data?.report?.factory.night_shift_employees
                    .youth.female
                }
              />
            </div>

            <div
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
                Employee shift Information
              </div>

              <div
                css={{
                  marginTop: 24,
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
                  Morning shift
                </div>

                <EmployeeInfoComp
                  adult_male={
                    single_report.data?.report?.factory.morning_shift_employees
                      .adult.male
                  }
                  adult_female={
                    single_report.data?.report?.factory.morning_shift_employees
                      .adult.female
                  }
                  youths_male={
                    single_report.data?.report?.factory.morning_shift_employees
                      .youth.male
                  }
                  youths_female={
                    single_report.data?.report?.factory.morning_shift_employees
                      .youth.female
                  }
                />
              </div>
              <div
                css={{
                  marginTop: 24,
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
                  Afternoon shift
                </div>

                <EmployeeInfoComp
                  adult_male={
                    single_report.data?.report?.factory
                      .afternoon_shift_employees.adult.male
                  }
                  adult_female={
                    single_report.data?.report?.factory
                      .afternoon_shift_employees.adult.female
                  }
                  youths_male={
                    single_report.data?.report?.factory
                      .afternoon_shift_employees.youth.male
                  }
                  youths_female={
                    single_report.data?.report?.factory
                      .afternoon_shift_employees.youth.female
                  }
                />
              </div>
              <div
                css={{
                  marginTop: 24,
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
                  Evening shift
                </div>

                <EmployeeInfoComp
                  adult_male={
                    single_report.data?.report?.factory.night_shift_employees
                      .adult.male
                  }
                  adult_female={
                    single_report.data?.report?.factory.night_shift_employees
                      .adult.female
                  }
                  youths_male={
                    single_report.data?.report?.factory.night_shift_employees
                      .youth.male
                  }
                  youths_female={
                    single_report.data?.report?.factory.night_shift_employees
                      .youth.female
                  }
                />
              </div>
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
                  Will mechanical power machine be used?
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
                  {single_report.data?.report?.factory?.use_mechanical_power
                    ? "Yes"
                    : "No"}
                </div>
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
                  What type of mechanical power is used/ intended to be used
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
                  {single_report.data?.report?.factory?.use_mechanical_power
                    ? "Yes"
                    : "No"}
                </div>
              </div>
              {single_report.data?.report?.factory?.mechanical_power && (
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
                    What type of mechanical power is used/ intended to be used
                  </div>
                  <div>
                    <ul>
                      {Object.keys(
                        single_report.data?.report?.factory?.mechanical_power
                      )
                        .filter(
                          (key) =>
                            single_report.data?.report?.factory
                              ?.mechanical_power[key] === true
                        )
                        .map((key) => (
                          <li
                            key={key}
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
                            <div
                              css={{
                                display: single_report.data?.report?.factory
                                  ?.mechanical_power[key]
                                  ? "block"
                                  : "none",
                                marginTop: 12,
                              }}
                            >
                              {key.replace(/_/g, " ")}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
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
                    Are boilers going to be used?
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
                    {single_report.data?.report?.factory?.use_boiler
                      ? "Yes"
                      : "No"}
                  </div>
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
                    Type, description and distinctive number
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
                    dangerouslySetInnerHTML={{
                      __html:
                        single_report.data?.report?.factory?.boiler_description,
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
                    Country and year of manufacture
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
                    {
                      single_report.data?.report?.factory
                        ?.country_and_year_of_manufacture
                    }
                  </div>
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
                    Date of last thorough test and examination and name &
                    address of the examiner
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
                    dangerouslySetInnerHTML={{
                      __html:
                        single_report.data?.report?.factory?.examination_report,
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
                    Maximum permissible working pressure in kg/sq Cm
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
                    {single_report.data?.report?.factory?.working_pressure}
                  </div>
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
                    Location in the factory (indicate also the linear distance
                    to the nearest workroom)
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
                    {single_report.data?.report?.factory?.address}
                  </div>
                </div>

                <div
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
                    Type of fuel to be used
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
                    {single_report.data?.report?.factory?.fuel_type}
                  </div>
                </div>

                <div
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
                    Particulars of boiler attendants
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
                    {single_report.data?.report?.factory?.boiler_attendants}
                  </div>
                </div>
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
              {single_report.data?.report?.factory?.tools && (
                <div
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
                    Equipment available
                  </div>
                  <div>
                    <ul>
                      {Object.keys(
                        single_report.data?.report?.factory?.tools
                      ).map((key) => (
                        <li
                          key={key}
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
                          <div
                            css={{
                              display: single_report.data?.report?.factory
                                ?.tools[key]
                                ? "block"
                                : "none",
                              marginTop: 12,
                            }}
                          >
                            {key.replace(/_/g, " ")}
                          </div>
                        </li>
                      ))}
                    </ul>
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
                      color: theme.colors.Gray_400,
                      lineHeight: "20px",
                      fontSize: [14, 14, 20],
                    })
                  }
                >
                  Give brief particulars
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
                  dangerouslySetInnerHTML={{
                    __html: single_report.data?.report?.factory?.particulars,
                  }}
                ></div>
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
              <div
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
                  Has the premises previously been used as a factory?
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
                  {single_report.data?.report?.factory
                    ?.previously_used_as_factory
                    ? "Yes"
                    : "No"}
                </div>
              </div>

              <div
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
                  State the name of previous occupier, nature of processes
                  carried out and CoR number
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
                  dangerouslySetInnerHTML={{
                    __html:
                      single_report.data?.report?.factory?.previous_occupier,
                  }}
                ></div>
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
              <div
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
                  Other documents/ information submitted in support of this
                  application
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
                  dangerouslySetInnerHTML={{
                    __html: single_report.data?.report?.factory?.other_document,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        css={{
          marginTop: 64,
          display: "flex",
          justifyContent: "right",
        }}
      >
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
            factory.set_tab("Document verification");
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
  );
};

export default FacRoutineDetailsComp;
