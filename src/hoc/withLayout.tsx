import React from "react";

const withLayout = (Component: any) => {
  return (
    <>
      <div>withLayout</div>
      <Component />
      Footer
    </>
  );
};

export default withLayout;
