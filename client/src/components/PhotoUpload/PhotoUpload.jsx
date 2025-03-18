import React, { useState } from "react";
import axios from "axios";

const PhotoUpload = ({ userId }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedPhoto) {
      setError("Please select a photo first.");
      return;
    }
  
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedPhoto);
    formData.append("user_id", userId); 
    try {
      const response = await axios.post(import.meta.env.VITE_API_KEY + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
  
      setUploadedPhotoUrl(response.data.imageUrl);
      setUploading(false);
    } catch (err) {
      setError("Error uploading the photo. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload a Photo</h2>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {uploadedPhotoUrl && (
        <div>
          <p>Photo uploaded successfully!</p>
          <img src={uploadedPhotoUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
