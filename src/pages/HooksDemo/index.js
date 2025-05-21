import React, { useState, useEffect } from "react";
import Header from "components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the modal version of the hook
import useUnsavedChangesWarning from "hooks/useUnsavedChangesWarning";
import useFullscreenMode from "hooks/useFullscreenMode";
import ExternalInfo from "components/ExternalInfo";
import ContactCard from "components/ContactCard";
import useVisiblityToggler from "hooks/useVisiblityToggler";
import useGeoLocation from "hooks/useGeoLocation";

const HooksDemo = () => {
    const [name, setName] = useState("");
    // Use the enhanced hook with custom modal
    const [Prompt, modal, updateField, setPristine, savedValues] = useUnsavedChangesWarning();
    const [elementRef, FullscreenIcon] = useFullscreenMode();
    const location = useGeoLocation();

    const [ContactCardComponent, toggleCardVisiblity] = useVisiblityToggler(
        <ContactCard index={1} name="D'coders Tech" phone="+959595959595" />,
        true
    );
    
    // When component mounts, check if we have saved form data
    useEffect(() => {
        if (savedValues && savedValues.userName) {
            setName(savedValues.userName);
        }
    }, [savedValues]);

    return (
        <>
            <Header title="Hooks demo" />

            <ExternalInfo page="hooks" />

            <div className="separator">Hook 1: Unsaved changes warning Hook with Custom Modal</div>

            <div
                className="row justify-content-center mt-5 bg-light"
                ref={elementRef}
            >
                <div className="col-lg-6 text-center ">
                    Go Full Screen {FullscreenIcon}
                    <div className="card">
                        <div className="card-header text-left font-weight-bold">
                            Custom Hook - "useUnsavedChangesWarning()" with Custom Modal
                        </div>
                        <div className="card-body">
                            <div>
                                Type something in the box below and try to navigate to another page.
                                You'll see a custom modal with custom button text.
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon="user" />
                                    </span>
                                </div>
                                <input
                                    name="userName"
                                    className="form-control"
                                    placeholder="Full name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        updateField("userName", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={() => {
                                        setName("");
                                        setPristine();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* This renders both the Prompt and the Modal */}
            {Prompt}
            {modal}

            <div class="separator">Hook 2: Visiblity Toggler Hook</div>
            <div className="row d-flex justify-content-center mt-3 mb-5 pb-5">
                <div className="col-6">
                    <div class="card">
                        <div class="card-header text-left font-weight-bold d-flex">
                            <div className="inline-block mr-auto pt-1">
                                useVisiblityToggler Hook
                            </div>
                            <button
                                className="btn btn-primary "
                                onClick={toggleCardVisiblity}
                            >
                                Toggle Visiblity
                            </button>
                        </div>
                        <div className="card-body">{ContactCardComponent}</div>
                    </div>
                </div>
            </div>

            <div class="separator">Hook 3: User Geo Location Hook</div>

            <div className="row d-flex justify-content-center mt-3 mb-5 pb-5">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header text-left font-weight-bold">
                            <div className="inline-block mr-auto pt-1">
                                useGeoLocation Hook
                            </div>
                        </div>
                        <div className="card-body">
                            {!location.loaded ? (
                                <div className="alert alert-info">
                                    Attempting to get your location...
                                </div>
                            ) : location.error ? (
                                <div className="alert alert-danger">
                                    <strong>Error: </strong> 
                                    {location.error.message === "User denied Geolocation" 
                                        ? "Location permission was denied. Please enable location access to use this feature."
                                        : location.error.message}
                                </div>
                            ) : (
                                <div className="alert alert-success">
                                    <strong>Your coordinates:</strong><br/>
                                    Latitude: {location.coordinates.lat}<br/>
                                    Longitude: {location.coordinates.lng}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HooksDemo;
