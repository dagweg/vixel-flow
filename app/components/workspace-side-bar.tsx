import React from "react";
import RecentModificationsPane from "./recent-modifications-pane";
import ModifierPane from "./modifier-pane";

function WorkspaceSidebar() {
  return (
    <div className="flex flex-col gap-4 w-full md:max-w-[450px] md:w-[450px]    md:h-screen">
      <ModifierPane />
      <RecentModificationsPane />
    </div>
  );
}

export default WorkspaceSidebar;
