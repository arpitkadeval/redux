import React from "react";

const WithoutLayout = ({ Children: ReactComponent }) => {
  return (
    <>
      <ReactComponent />
    </>
  );
};

export default WithoutLayout;
