import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
  textTransform: "initial",
  textTransform: "inherit",
  borderColor: "white",
  borderRadius: "50px",
  color: "white",
  paddingRight: "24px",
  paddingLeft: "24px",
  height: "48px",
  background: " #07617D",

  "&:hover": {
    background: " #07617D",
  },
}));

const PrimaryButton = ({ children, ...props }) => {
  return (
    <StyledButton
      variant="contained"
      sx={{
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
