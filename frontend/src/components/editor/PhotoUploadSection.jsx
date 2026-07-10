import api from "../../api/axios";
import { Image, Camera, CheckCircle } from "lucide-react";

/**
 * PhotoUploadSection
 * Validates: image only, max 5MB
 * On success: sets personalInfo.photo to the returned URL
 */
export default function PhotoUploadSection({
  photo,
  uploading,
  onUploadStart,
  onUploadDone,
  onUploadError,
}) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onUploadError("Please select an image file (JPG, PNG, WebP, etc.).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onUploadError("Image must be smaller than 5 MB.");
      return;
    }

    onUploadStart();
    try {
      const data = new FormData();
      data.append("file", file);
    
      const res = await api.post("/upload", data);
    
      console.log(res.data);
    
      const imageUrl = res.data.url.startsWith("http")
        ? res.data.url
        : `http://localhost:3000${res.data.url}`;
    
      onUploadDone(imageUrl);
    } catch (err) {
      console.log(err);
      onUploadError("Upload failed — please try again.");
    }
  }

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon"><Image size={24} /></div>
        <div>
          <div className="editor-section-title">Profile photo</div>
          <div className="editor-section-desc">JPG, PNG or WebP · max 5 MB</div>
        </div>
      </div>

      <div className={`upload-zone${uploading ? " disabled" : ""}`}>
        <input
          type="file"
          accept="image/*"
          className="upload-input"
          onChange={handleChange}
          disabled={uploading}
          aria-label="Upload profile photo"
        />
        {uploading ? (
          <>
            <div className="upload-icon">
              <span
                className="spinner spinner-brand"
                style={{ width: 28, height: 28 }}
              />
            </div>
            <div className="upload-label">Uploading…</div>
          </>
        ) : (
          <>
            <div className="upload-icon"><Camera size={40} color="var(--brand)" /></div>
            <div className="upload-label">Click or drag photo here</div>
            <div className="upload-hint">JPG, PNG, WebP — max 5 MB</div>
          </>
        )}
      </div>

      {photo && !uploading && (
        <div className="upload-preview">
          <img
            src={photo}
            alt="Profile preview"
            className="upload-preview-img"
          />
          <div className="upload-preview-info">
            <div className="upload-preview-name">Profile photo</div>
            <div className="upload-preview-status" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle size={14} /> Uploaded successfully
            </div>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Click the upload zone to replace
          </div>
        </div>
      )}
    </div>
  );
}
