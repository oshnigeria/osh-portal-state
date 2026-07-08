/** @jsxImportSource @emotion/react */

const DeletePopup = (props) => {
  return (
    <div>
      <div
        css={{
          fontSize: 18,
        }}
      >
        Are you sure you want to delete this
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        <button
          css={(theme) => ({
            height: 32,
            width: 108,
            fontSize: theme.font_sizes.Body_400,

            fontWeight: theme.font_weight.size_400,
            lineHeight: "26px",
            color: "#fff",
            letterSpacing: "0.3px",
            padding: "0px 16px",
            backgroundColor: theme.colors.Gray_800,
            border: "none",
            outline: "none",
            borderRadius: 5,
            cursor: "pointer",
            textTransform: "capitalize",
            marginRight: 4,
            "&:active": {
              backgroundColor: theme.colors.Primary_800,
            },
          })}
          onClick={() => props.close()}
        >
          No
        </button>
        <button
          css={(theme) => ({
            height: 32,
            width: 108,
            fontSize: theme.font_sizes.Body_400,
            marginLeft: 4,
            fontWeight: theme.font_weight.size_400,
            lineHeight: "26px",
            color: "#fff",
            letterSpacing: "0.3px",
            padding: "0px 16px",
            backgroundColor: theme.colors.Error_800,
            border: "none",
            outline: "none",
            cursor: "pointer",
            borderRadius: 5,
            textTransform: "capitalize",
            "&:active": {
              backgroundColor: theme.colors.Primary_800,
            },
          })}
          onClick={() => props.delete()}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
