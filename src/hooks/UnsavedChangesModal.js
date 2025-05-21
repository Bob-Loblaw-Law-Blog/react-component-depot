import React from 'react';
import './UnsavedChangesModal.css';

const UnsavedChangesModal = ({ 
  isOpen, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="unsavedchangesmodal">
      <div className="ucm-div">
        <div className="ucm-content">
          <p>{message}</p>
        </div>
        <div className="ucm-actions">
          <button 
            className="ucm-button ucm-button-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="ucm-button ucm-button-confirm" 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesModal;
