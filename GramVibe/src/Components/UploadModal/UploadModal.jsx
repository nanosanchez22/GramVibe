import React, { useState } from "react";
import "./UploadModal.css";



const UploadModal = ({ isOpen, onClose, onUpload }) => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = () => {

        if (!image) {
            alert("Please select an image");
            return;
        }

        onUpload({ image, description });
        setImage(null);
        setDescription("");
        window.location.reload();
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Subir una nueva foto</h2>

            <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} />
            <label htmlFor="fileInput" className="fileLabel">
              {image ? image.name : "Seleccionar archivo"}
            </label>

            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}  
            <textarea
              placeholder="Escribe una descripción..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="buttonGroup">
              <button onClick={handleUpload}>Postear</button>
              <button onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      );
    };



export default UploadModal;



