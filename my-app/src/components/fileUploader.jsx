import React, { useState } from "react";
import { readTicketCall } from "../services/api_calls";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

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
    const imageData = await toBase64(selectedFile);
    const res = await readTicketCall(imageData);

    console.log(res);
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
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

export default FileUploader;
