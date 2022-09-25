import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { readTicketCall } from "../services/api_calls";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 15,
    paddingBottom: 5,
    border: "none",
  },
  uploadTicket: {
    backgroundColor: "#0E9D3B",
    border: "none",
    padding: "40px 80px 40px 80px",
    borderRadius: "20px",
    color: "white",
    fontSize: 28
  },
  fileName: {
    borderRadius: "5px",
    fontSize: 14,
    padding: 2
  },
  submitButton: {
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "3px",
    fontSize: 18,
    margin: "10px",
    padding: "10px 20px 10px 20px"
  }
}));

function FileUploader() {
  const classes = useStyles();
  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = event => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function handleSubmission() {
    setItems([]);
    setLoading(true);
    const imageData = await toBase64(selectedFile);
    const res = await readTicketCall(imageData);
    console.log(res.data);
    setItems(res.data);
    setLoading(false);
  }

  function formatDate(dateString = "") {
    let formattedDate = "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    formattedDate += month < 10 ? `0${month}` : `${month}`;
    formattedDate += day < 10 ? `/0${day}` : `/${day}`;
    formattedDate += `/${year}`;

    return formattedDate;
  }

  return (
    <div className={classes.container}>
      <input
        type="file"
        name="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleChange}
        style={{ display: 'none' }}
        ref={hiddenFileInput}
      />
      <button className={classes.uploadTicket} onClick={handleClick}>
        Tomar Foto
      </button>
      {isFilePicked ? (<div style={{ marginTop: 10 }}>
        <Typography className={classes.fileName}>
          Archivo Cargado = {selectedFile.name}
        </Typography>
        <button className={classes.submitButton} disabled={loading} onClick={handleSubmission}>
          Subir
        </button>
      </div>) : null}

      {loading ? <div>Cargando...</div> : null}
      {items.length ? (
        <div
          style={{
            marginTop: "35px",
            fontSize: 20,
            fontWeight: 600,
            color: "dark green",
          }}
        >
          Articulos Agregados
        </div>
      ) : null}
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              margin: "15px 90px 10px 90px",
              border: "4px solid #0E9D3B",
              padding: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, font: "Roboto" }}>
                {item.Articulo}
              </div>
              <div style={{ fontSize: 8 }}>
                Exp: {formatDate(item.FechaExpiracion)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
