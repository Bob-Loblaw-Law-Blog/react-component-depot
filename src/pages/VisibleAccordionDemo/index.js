import React from "react";
import ExpandedAccordion from "../../components/ExpandedAccordion";
import ExternalInfo from "../../components/ExternalInfo";

const ExpandedAccordionDemo = () => {
    const accordionData = [
        {
            title: "Section 1",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.`
        },
        {
            title: "Section 2",
            content: `Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.`
        },
        {
            title: "Section 3",
            content: `Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.`
        }
    ];

    return (
        <>
            <h2>Expanded Accordion Demo</h2>
            <div className="row">
                <div className="col-sm-6">
                    <h4>Single Selection (default)</h4>
                    <ExpandedAccordion data={accordionData} />
                </div>
                <div className="col-sm-6">
                    <h4>Multiple Selection</h4>
                    <ExpandedAccordion data={accordionData} multiple={true} />
                </div>
            </div>
        </>
    );
};

export default ExpandedAccordionDemo;