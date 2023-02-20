import { Box, Container, GlobalStyles, useTheme } from "@mui/material";
import React from "react";
import Logo from "./Logo.js";

const BoxedLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ body: { backgroundColor: theme.palette.background.paper } }}
      />
      <Container component="main" maxWidth="xs" sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo sx={{ mb: 2 }} />
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BoxedLayout;
