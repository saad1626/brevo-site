// dashboard/ImageUpload.jsx
// Lets the admin pick an image, uploads it, and shows a preview.
// Used for the site logo AND for blog post pictures.
//
//   <ImageUpload label="Logo" value={logo} onChange={setLogo} />
//   value    = the current image URL ("" means no image)
//   onChange = called with the new URL after upload (or "" after remove)

import { useState } from "react";
import { uploadImage } from "../api";

function ImageUpload(props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event) {
    const file = event.target.files[0];

    // The user closed the window without choosing a file
    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const url = await uploadImage(file);
      props.onChange(url);
    } catch (err) {
      setError(err.message);
    }

    setUploading(false);

    // Clear the file input so the same file can be chosen again
    event.target.value = "";
  }

  function removeImage() {
    props.onChange("");
  }

  return (
    <div className="field">
      <span className="field-label">{props.label}</span>

      <div className="image-upload">
        {props.value ? (
          <img src={props.value} alt="Preview" className="image-upload-preview" />
        ) : (
          <div className="image-upload-preview empty">No image</div>
        )}

        <div className="image-upload-actions">
          <label className="dash-btn dash-btn-light">
            {uploading ? "Uploading..." : "Choose image"}
            <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleFileChange} hidden />
          </label>

          {props.value && (
            <button type="button" className="dash-btn dash-btn-danger-light" onClick={removeImage}>
              Remove
            </button>
          )}

          <span className="field-hint">JPG, PNG, GIF or WebP. Max 2 MB.</span>
        </div>
      </div>

      {error && <p className="alert alert-error">{error}</p>}
    </div>
  );
}

export default ImageUpload;
