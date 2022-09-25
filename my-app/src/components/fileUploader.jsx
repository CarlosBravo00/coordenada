import React, { useState } from "react";
import { readTicketCall } from "../services/api_calls";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const changeHandler = (event) => {
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

  return (
    <div>
      <input
        type="file"
        name="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={changeHandler}
      />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
        </div>
      ) : null}
      <div>
        <button disabled={loading} onClick={handleSubmission}>
          Submit
        </button>
      </div>
      {loading ? <div>loading...</div> : null}
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "5px",
              border: "1px solid black",
              padding: "5px",
            }}
          >
            <div>{item.Articulo}</div>
            <div>{item.FechaExpiracion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
