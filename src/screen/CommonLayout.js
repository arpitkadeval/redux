import React from "react";
import CommonDrawer from "./CommonDrawer.js";
import { Box, Toolbar } from "@mui/material";

const CommonLayout = ({ Children: ReactComponent }) => {
  return (
    <Box sx={{ display: "flex" }}>
      // !! this header set
      <CommonDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 }, overflow: "auto" }}
      >
        <Toolbar />
        <ReactComponent />
      </Box>
    </Box>
  );
};

export default CommonLayout;
