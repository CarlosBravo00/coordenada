import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { helloWorldCall } from "../services/api_calls";
import FileUploader from "../components/fileUploader";

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
    setHelloWorld(response.data);
  }

  return (
    <div className={classes.container}>
      <Typography> hi {helloWorld}</Typography>
      <button onClick={makeCall}> hi clickeame </button>
      <FileUploader></FileUploader>
    </div>
  );
}

export default Main;
