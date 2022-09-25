import React, { useState } from "react";
import { helloWorldCall } from "../services/api_calls";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    border: "solid",
  },
}));

function Main() {
  const classes = useStyles();
  const [helloWorld, setHelloWorld] = useState("false");

  async function makeCall() {
    const response = await helloWorldCall();
    console.log(response);
    setHelloWorld("hello");
  }

  return (
    <div className={classes.container}>
      <Typography> hi {helloWorld}</Typography>
      <button onClick={makeCall}> hi clickeame </button>
    </div>
  );
}

export default Main;
