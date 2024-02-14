import React from "react";

// Type defintion for acccordtion
export type TypeAccordion = {
    title: string;
    content: React.ReactNode;
};

// Interface definition.
// Will accept an array of title & content. Each being its own drop down.
interface Props {
    accordion: TypeAccordion[];
}

/**
 * Automatically closing accordion
 * @param param0
 * @returns
 */
function Accordion({ accordion }: Props) {
    return (
        <div>
            {accordion.map(({ title, content }: TypeAccordion, key) => (
                <div
                    className="collapse collapse-arrow bg-gray-100 dark:bg-base-200 "
                    key={key}
                >
                    <input type="radio" name="my-accordion-2" checked={true} />
                    <div className="collapse-title text-xl font-medium">
                        {title}
                    </div>
                    <div className="collapse-content">{content}</div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;
