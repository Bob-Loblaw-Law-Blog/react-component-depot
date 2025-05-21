import React, { useState, useEffect, useCallback, useRef} from "react";
import { Prompt, useHistory, useNavigate } from "react-router-dom";
import UnsavedChangesModal from "./UnsavedChangesModal";

const STORAGE_KEY = "unsaved_form_data";

const useUnsavedChangesWarning = (
  message = "You have unsaved changes"
) => {
  const [isDirty, setDirty] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [showModal, setShowModal] = useState(false);
	const [clearPrompt, setClearPrompt] = useState(false)
  const history = useHistory();
  
  // Store the target location when navigation is attempted
  const pendingNavigation = useRef(null);

  // Load saved form data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormValues(parsedData);
        // If we have saved data, the form is considered dirty initially
        if (Object.keys(parsedData).length > 0) {
          setDirty(true);
        }
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Handle browser close/refresh (we still use the browser's native dialog for this)
  useEffect(() => {
    window.onbeforeunload = isDirty && (() => message);

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty, message]);

	// Handle Prompt blocking logic to be cleared by 'handleConfirmNavigation'
	useEffect(() => {
		if (clearPrompt) {
			// Navigate to the previously blocked URL
			history.push(pendingNavigation.current.pathname);
		}
	}, [clearPrompt, history, pendingNavigation])

  // Function to save the current form state
  const saveFormState = useCallback((values) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setFormValues(values);
  }, []);

  // Function to clear saved form state
  const clearSavedFormState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormValues({});
  }, []);

  // Handle confirming navigation
  const handleConfirmNavigation = useCallback(() => {
    setShowModal(false);

		// Set the properties that allow to navigate away
		setDirty(false);
		setClearPrompt(true);

  }, [history]);

  // Handle cancelling navigation
  const handleCancelNavigation = useCallback(() => {
    setShowModal(false);
    pendingNavigation.current = null;
  }, []);

  // Custom prompt message handler
  const handlePrompt = useCallback((location) => {
    // Don't show the modal if form isn't dirty
    if (!isDirty) return true;

    // Store the location we're trying to navigate to
    pendingNavigation.current = location;
    
    // Show our custom modal
    setShowModal(true);
    
    // Return false to prevent the immediate navigation
    // We'll navigate manually after confirmation
    return false;
  }, [isDirty, history]);

  // Function to mark the form as dirty and update a field
  const updateField = useCallback((name, value) => {
    setDirty(true);
    const updatedValues = { ...formValues, [name]: value };
    saveFormState(updatedValues);
    return updatedValues;
  }, [formValues, saveFormState]);

  // Function to reset the form to pristine state
  const setPristine = useCallback(() => {
    setDirty(false);
    clearSavedFormState();
  }, [clearSavedFormState]);

  // Create the modal component with our custom buttons
  const modal = (
    <UnsavedChangesModal
      isOpen={showModal}
      message={`${message}\n\nYour changes will be saved and restored when you return.`}
      onConfirm={handleConfirmNavigation}
      onCancel={handleCancelNavigation}
      confirmText="Leave Page"
      cancelText="Stay on Page"
    />
  );

  // Create the React Router prompt
  const routerPrompt = <Prompt when={isDirty} message={handlePrompt} />;


  // Return everything needed by components using this hook
  return [
    routerPrompt,
    modal,
    updateField,  // Function to update a field and mark as dirty
    setPristine,  // Function to mark form as pristine and clear saved state
    formValues    // The saved form values for restoration
  ];
};

export default useUnsavedChangesWarning;
