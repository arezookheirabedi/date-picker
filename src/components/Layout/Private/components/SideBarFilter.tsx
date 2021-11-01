import React from "react";
import {ReactComponent as SidebarFilterIcon} from "../../../../assets/images/icons/sidebar-filter.svg";


interface ISideBarFilter {
  filterCollapse: any,
  toggleFilter: any
}


const SideBarFilter: React.FC<ISideBarFilter> = ({filterCollapse, toggleFilter}) => {
  return (
    <div className={`side-bar-filter relative ${filterCollapse ? 'w-0' : 'w-80'}`}>
      <button
        type="button"
        className="absolute top-1/2"
        onClick={toggleFilter}
      >
        <SidebarFilterIcon />
      </button>
      <div className="side-bar-filter__holder relative z-10 h-full overflow-hidden bg-white">
        Sidebar Filter
      </div>
    </div>
  )
}

export default SideBarFilter;