import React from "react";

function PaneTitle({ title }: { title: string }) {
    return (
        <h1 className="top-0 left-0 text-xs absolute z-10 translate-y-[-8px] translate-x-[10px] bg-white dark:bg-black border-[1px] border-gray-300 dark:border-gray-700 px-2 rounded-lg">
            {title}
        </h1>
    );
}

export default PaneTitle;
