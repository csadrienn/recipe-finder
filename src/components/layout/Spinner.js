import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "200px",
        height: "200px",
        margin: "auto",
        marginTop: "2rem",
        display: "block",
      }}
    />
  </Fragment>
);

export default Spinner;
