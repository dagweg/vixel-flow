import React, { ReactNode } from "react";

/**
 * Automatically closing accordion
 * @param param0
 * @returns
 */

function Accordion({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="collapse collapse-arrow bg-gray-100 dark:bg-base-200 ">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content">{children}</div>
        </div>
    );
}

export default Accordion;
