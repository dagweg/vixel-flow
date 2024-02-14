import React, { ReactNode } from "react";
import CButton from "./custom-button";
import CDButton from "./custom-context-menu-button";

export type TypeContent = {
    content: React.ReactNode;
};

interface Props {
    dropDownElements: TypeContent[];
}

// Custom Dropdown component
function CDropDown({ dropDownElements }: Props) {
    return (
        <div>
            {dropDownElements.map(({ content }: TypeContent, key) => (
                <div key={key}>{content}</div>
            ))}
        </div>
    );
}

export default CDropDown;
