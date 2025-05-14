import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpandedAccordion = ({ data, multiple = false }) => {
    // For single selection mode, keep track of which item is collapsed
    const [collapsed, setCollapsed] = useState(null);

    return (
        <div className="expanded-accordion">
            {data.map((tab, idx) => (
                <ExpandedAccordionItem
                    key={idx}
                    {...tab}
                    collapsed={collapsed === idx}
                    multiple={multiple}
                    onToggle={(e) => setCollapsed((c) => (c === idx ? null : idx))}
                />
            ))}
        </div>
    );
};

const ExpandedAccordionItem = ({ title, content, collapsed, multiple, onToggle }) => {
    // For multiple selection mode, each item maintains its own state
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isItemCollapsed = () => (multiple ? isCollapsed : collapsed);

    const toggleCollapse = () => {
        setIsCollapsed((v) => !v);
        onToggle();
    };

    return (
        <div className={`card ${isItemCollapsed() ? "accordion-collapsed" : ""}`}>
            <div className="card-header" onClick={toggleCollapse}>
                {title}
                <span className="accordion-icon">
                    <FontAwesomeIcon icon="chevron-right" />
                </span>
            </div>
            <div className="card-body">{content}</div>
        </div>
    );
};

export default ExpandedAccordion;