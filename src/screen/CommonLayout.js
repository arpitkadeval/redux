import React from "react";
import CommonDrawer from "./CommonDrawer.js";
import { Box, Toolbar } from "@mui/material";

const CommonLayout = ({ Children: ReactComponent }) => {
  return (
    // !! this header set
    <Box sx={{ display: "flex" }}>
      <CommonDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 }, overflow: "auto" }}
      >
        {/* <Toolbar /> */}
        <div className="mt-5" />
        <ReactComponent />
      </Box>
    </Box>
  );
};

export default CommonLayout;
