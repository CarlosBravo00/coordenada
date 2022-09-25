import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { readTicketCall } from "../services/api_calls";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 15,
    paddingBottom: 5,
    border: "none",
  },
}));

function FileUploader() {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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
        onChange={changeHandler}
      />
      <div>
        <button disabled={loading} onClick={handleSubmission}>
          Submit
        </button>
      </div>
      {loading ? <div>Cargando...</div> : null}
      {items.length ? (
        <div
          style={{
            marginTop: "40px",
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
              margin: "15px 70px 10px 70px",
              border: "3px solid #0E9D3B",
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
