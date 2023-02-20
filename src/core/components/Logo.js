import { Box } from "@mui/material";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";

const Logo = ({ colored = false, size = 40, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <LogoSvg height={size} width={size} />
    </Box>
  );
};

export default Logo;
