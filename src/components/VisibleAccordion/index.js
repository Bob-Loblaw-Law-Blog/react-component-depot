import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VisibleAccordion = ({ data, multiple = false }) => {
    const [active, setActive] = useState("");  // Start with empty string for no active item

    return (
        <div className="custom-visible-accordion">
            {data.map((tab, idx) => (
                <VisibleAccordionItem
                    key={idx}
                    {...tab}
                    active={active === idx}
                    multiple={multiple}
                    onToggle={(e) => setActive((a) => (a === idx ? "" : idx))}
                />
            ))}
        </div>
    );
};

const VisibleAccordionItem = ({ title, content, active, multiple, onToggle }) => {
    const [visibility, setVisibility] = useState(true);  // Start visible by default

    const isActive = () => (multiple ? visibility : active);

    const toggleVisibility = () => {
        setVisibility((v) => !v);
        onToggle();
    };

    return (
        <div className={`card ${isActive() ? "visible-accordion-active" : ""}`}>
            <div className="card-header" onClick={toggleVisibility}>
                {title}
                <span className="visible-accordion-icon">
                    <FontAwesomeIcon icon="chevron-right" />
                </span>
            </div>
            <div className="card-body" style={{ display: visibility ? "block" : "none" }}>{content}</div>
        </div>
    );
};

export default VisibleAccordion;
