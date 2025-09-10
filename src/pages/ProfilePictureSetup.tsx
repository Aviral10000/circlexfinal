import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePictureSetup() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png') || file.type.startsWith('image/gif'))) {
      if (file.size <= 10 * 1024 * 1024) { // 10MB limit
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert('File size must be less than 10MB');
      }
    } else {
      alert('Please select a JPG, PNG, or GIF file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSkip = () => {
    // Navigate to dashboard or next step
    navigate('/founder');
  };

  const handleContinue = () => {
    if (selectedFile) {
      // Here you would typically upload the file to your server
      console.log('Uploading file:', selectedFile);
      // For now, just navigate to dashboard
      navigate('/founder');
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#000", 
      color: "#fff", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="card" style={{ 
        maxWidth: "500px", 
        width: "100%", 
        padding: "40px",
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: "300", 
          margin: "0 0 16px",
          color: "#fff"
        }}>
          Welcome to Circle X
        </h1>
        
        <p style={{ 
          color: "rgba(255,255,255,0.7)", 
          margin: "0 0 40px",
          fontSize: "16px",
          lineHeight: "1.5"
        }}>
          Let's set up your profile picture to help other founders recognize you
        </p>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${isDragOver ? "#fff" : "rgba(255,255,255,0.3)"}`,
            borderRadius: "12px",
            padding: "60px 20px",
            margin: "0 0 20px",
            background: isDragOver ? "rgba(255,255,255,0.05)" : "transparent",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative"
          }}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          {previewUrl ? (
            <div>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  margin: "0 auto 16px",
                  display: "block"
                }} 
              />
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "0" }}>
                Click to change photo
              </p>
            </div>
          ) : (
            <div>
              <div style={{ 
                fontSize: "48px", 
                margin: "0 0 16px",
                color: "rgba(255,255,255,0.5)"
              }}>
                📷
              </div>
              <p style={{ 
                color: "rgba(255,255,255,0.7)", 
                margin: "0 0 8px",
                fontSize: "16px"
              }}>
                Drop your photo here
              </p>
              <p style={{ 
                color: "rgba(255,255,255,0.5)", 
                margin: "0",
                fontSize: "14px"
              }}>
                or click to browse • JPG, PNG, GIF up to 10MB
              </p>
            </div>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileInput}
          style={{ display: "none" }}
        />

        <button
          className="btn btn-outline"
          onClick={() => document.getElementById('fileInput')?.click()}
          style={{ 
            margin: "0 0 40px",
            padding: "12px 24px",
            fontSize: "14px"
          }}
        >
          Choose File
        </button>

        <div style={{ 
          display: "flex", 
          gap: "16px", 
          justifyContent: "center",
          margin: "0 0 24px"
        }}>
          <button
            className="btn btn-outline"
            onClick={handleSkip}
            style={{ 
              padding: "12px 24px",
              fontSize: "14px"
            }}
          >
            Skip for Now
          </button>
          <button
            className="btn btn-primary"
            onClick={handleContinue}
            disabled={!selectedFile}
            style={{ 
              padding: "12px 24px",
              fontSize: "14px",
              opacity: selectedFile ? 1 : 0.5,
              cursor: selectedFile ? "pointer" : "not-allowed"
            }}
          >
            Looks Good
          </button>
        </div>

        <p style={{ 
          color: "rgba(255,255,255,0.5)", 
          fontSize: "14px",
          margin: "0"
        }}>
          You can always update your profile picture later in Settings
        </p>
      </div>
    </div>
  );
}
