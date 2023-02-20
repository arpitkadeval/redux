import { useNavigate } from "react-router-dom";
import Result from "../core/components/Result.js";
import { ReactComponent as NotFoundSvg } from "../core/assets/404.svg";
import { Button } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      extra={
        <Button
          color="secondary"
          onClick={() => navigate(-1)}
          variant="contained"
        >
          back to home
        </Button>
      }
      image={<NotFoundSvg />}
      maxWidth="sm"
      subTitle={"This Url is not founded"}
      title={"Page not found"}
    />
  );
};

export default NotFound;
