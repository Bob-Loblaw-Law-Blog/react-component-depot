import React, { useEffect } from 'react';
import './UnsavedChangesModal.css'; // We'll create this stylesheet below

/**
 * A simple, clean modal similar to browser alert but with customizable buttons
 * @param {Object} props
 * @param {string} props.message - Message to display in the modal
 * @param {Function} props.onConfirm - Callback when user confirms (e.g., "Leave Page")
 * @param {Function} props.onCancel - Callback when user cancels (e.g., "Stay On Page")
 * @param {string} props.confirmText - Text for confirm button (default: "Leave Page")
 * @param {string} props.cancelText - Text for cancel button (default: "Stay On Page")
 * @param {boolean} props.show - Whether to show the modal
 */
const UnsavedChangesModal = ({
  message = "You have unsaved changes",
  onConfirm,
  onCancel,
  confirmText = "Leave Page",
  cancelText = "Stay On Page",
  show = false
}) => {
  // Don't render if not shown
  if (!show) return null;

  // Prevent scrolling of the page when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="unsaved-changes-modal-overlay">
      <div className="unsaved-changes-modal">
        <div className="unsaved-changes-modal-content">
          <p className="unsaved-changes-modal-message">{message}</p>
        </div>
        <div className="unsaved-changes-modal-actions">
          <button 
            className="unsaved-changes-modal-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="unsaved-changes-modal-confirm"
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