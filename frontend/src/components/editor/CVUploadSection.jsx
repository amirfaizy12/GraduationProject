import api from "../../api/axios";

/**
 * CVUploadSection
 * Validates: PDF only, max 5MB
 * On success: sets personalInfo.cvFilename to the returned filename (NOT url)
 */
export default function CVUploadSection({
  cvFilename,
  uploading,
  onUploadStart,
  onUploadDone,
  onUploadError,
}) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      onUploadError("CV must be a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onUploadError("CV must be smaller than 5 MB.");
      return;
    }

    onUploadStart();
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await api.post("/upload", data);
      // ⚠ Store filename, not URL — per spec
      onUploadDone(res.data.filename);
    } catch {
      onUploadError("Upload failed — please try again.");
    }
    e.target.value = "";
  };

  return (
    <div className="editor-section">
      <div className="editor-section-header">
        <div className="editor-section-icon">📄</div>
        <div>
          <div className="editor-section-title">CV / Résumé</div>
          <div className="editor-section-desc">PDF only · max 5 MB</div>
        </div>
      </div>

      <div className={`upload-zone${uploading ? " disabled" : ""}`}>
        <input
          type="file"
          accept=".pdf"
          className="upload-input"
          onChange={handleChange}
          disabled={uploading}
          aria-label="Upload CV PDF"
        />
        {uploading ? (
          <>
            <div className="upload-icon">
              <span
                className="spinner spinner-brand"
                style={{ width: 28, height: 28 }}
              />
            </div>
            <div className="upload-label">Uploading CV…</div>
          </>
        ) : (
          <>
            <div className="upload-icon">📎</div>
            <div className="upload-label">Click or drag your CV here</div>
            <div className="upload-hint">PDF only — max 5 MB</div>
          </>
        )}
      </div>

      {cvFilename && !uploading && (
        <div className="upload-preview">
          <div
            style={{
              width: 44,
              height: 44,
              background: "rgba(248,113,113,0.1)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            📕
          </div>
          <div className="upload-preview-info">
            <div
              className="upload-preview-name"
              style={{ wordBreak: "break-all" }}
            >
              {cvFilename}
            </div>
            <div className="upload-preview-status">✓ CV uploaded</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Upload again to replace
          </div>
        </div>
      )}
    </div>
  );
}
