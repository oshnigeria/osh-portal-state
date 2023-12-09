import React from "react";

function EditIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <g>
          <g>
            <path
              fill={props.color}
              d="M19.99 18.953c.557 0 1.01.46 1.01 1.024 0 .565-.453 1.023-1.01 1.023h-5.71c-.557 0-1.01-.458-1.01-1.023s.453-1.024 1.01-1.024h5.71zM16.03 3.7l1.475 1.172c.605.473 1.008 1.096 1.146 1.752.16.721-.01 1.43-.488 2.042L9.376 20.028a2.104 2.104 0 01-1.634.817l-3.502.043a.4.4 0 01-.392-.312l-.796-3.45c-.138-.635 0-1.29.403-1.796l6.23-8.062a.313.313 0 01.424-.054l2.62 2.086c.17.14.404.215.648.182a.945.945 0 00.817-1.042 1.05 1.05 0 00-.329-.635l-2.547-2.042a.378.378 0 01-.063-.526l.986-1.28c.913-1.172 2.505-1.28 3.789-.258z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default EditIcon;
