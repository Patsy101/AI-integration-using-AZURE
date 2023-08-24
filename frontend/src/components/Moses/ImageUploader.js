import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const classifyByUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/classifyuploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={classifyByUpload}>Classify by Upload</button>
      </div>
      {loading && <div>Loading...</div>}
      {result && <div>Result: {JSON.stringify(result)}</div>}
    </div>
  );
}

export default ImageUploader;
