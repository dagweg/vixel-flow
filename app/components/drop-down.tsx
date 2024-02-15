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
function CDropDown({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default CDropDown;
