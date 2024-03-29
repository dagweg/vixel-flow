import React, { ReactNode } from "react";

/**
 * Automatically closing accordion
 * @param param0
 * @returns
 */

function Accordion({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`collapse collapse-arrow bg-gray-100 dark:bg-gray-900 !rounded-md`}
    >
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title font-medium">{title}</div>
      <div className={`collapse-content ${className}`}>{children}</div>
    </div>
  );
}

export default Accordion;
