import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h2 style={centered}>About This App</h2>
      <p style={centered}>A small recipe finder application using spoonacular API.</p>
    </Fragment>
  );
};

const centered = {
  marginTop: "3rem",
  textAlign: "center",
};

export default About;
