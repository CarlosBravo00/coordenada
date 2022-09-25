import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";

import FileUploader from "../components/fileUploader";
import ItemsList from "../components/itemsList";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    border: "none",
  },
  topBar: {
    cursor: "pointer",
    height: "30px",
    borderBottom: "3px grey solid",
    textAlign: "center",
    padding: "10px 0px 15px 0px",
  },
  topBarText: {
    font: "Roboto",
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: "8px",
  },
  buttonBox: {
    cursor: "pointer",
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: "4px",
    textAlign: "center",
    padding: "40px 20px 40px 20px",
    margin: "25px 15px 0px 15px",
    backgroundColor: "#abf7b1",
    border: "4px solid #0E9D3B",
    borderRadius: "25px",
  },
}));

function Main() {
  const classes = useStyles();
  const [viewRegister, setViewRegister] = useState(false);
  const [viewList, setViewList] = useState(false);

  function goToHome() {
    setViewRegister(false);
    setViewList(false);
  }

  function openRegister() {
    setViewRegister(true);
  }

  function openList() {
    setViewList(true);
  }

  function loadContent() {
    if (viewRegister) {
      return <FileUploader></FileUploader>;
    }
    if (viewList) {
      return <ItemsList></ItemsList>;
    }
    return (
      <>
        <div className={classes.buttonBox} onClick={openRegister}>
          Registrar Productos
        </div>
        <div className={classes.buttonBox} onClick={openList}>
          Ver Despensa
        </div>
      </>
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.topBar} onClick={goToHome}>
        <Typography className={classes.topBarText}>INVENTARI</Typography>
      </div>
      <div className={classes.mainContainer}>{loadContent()}</div>
    </div>
  );
}

export default Main;
