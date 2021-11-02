import React, {useState} from "react";
import Slider from 'rc-slider';
import {ReactComponent as SidebarFilterIcon} from "../../../../assets/images/icons/sidebar-filter.svg";

import 'rc-slider/assets/index.css';

interface ISideBarFilter {
  filterCollapse: any,
  toggleFilter: any
}


const SideBarFilter: React.FC<ISideBarFilter> = ({filterCollapse, toggleFilter}) => {

  const [marks, setMarks] = useState([
    {
      value: 0,
      label: 'سالیانه',
      style: {
        color: '#193149'
      }
    },
    {
      value: 1,
      label: 'ماهانه',
      style: {
        color: '#B2B2B2'
      }
    },
    {
      value: 2,
      label: 'هفتگی',
      style: {
        color: '#B2B2B2'
      }
    },
    {
      value: 3,
      label: 'روزانه',
      style: {
        color: '#B2B2B2'
      }
    },
  ]) as any;

  const handleStyle = {
    border: 'none',
    outline: '1px solid #193149',
    outlineOffset: '2px',
    backgroundColor: '#193149',
    width: '10px',
    height: '10px',
    boxShadow: 'none'
  }

  const dotStyle = {
    backgroundColor: '#D5D5D5',
    borderColor: '#D5D5D5',
    width: '6px',
    height: '6px',
    bottom: '0'
  }

  const trackStyle = {
    backgroundColor: '#D5D5D5',
    height: '2px'
  }

  const railStyle = {
    backgroundColor: '#D5D5D5',
    height: '2px'
  }


  const detectSliderChange = (value: any) => {
    return setMarks((prevState: any) => {
      return prevState.map((it: any) => {
        if (it.value === value) {
          return {...it, style: {color: '#193149'}};
        }
        return {...it, style: {color: '#B2B2B2'}};
      })
    })
  }

  // @ts-ignore
  return (
    <div className={`side-bar-filter relative ${filterCollapse ? 'w-0' : 'w-80'}`}>
      <button
        type="button"
        className="absolute top-1/2"
        onClick={toggleFilter}
      >
        <SidebarFilterIcon/>
      </button>

      <div className="side-bar-filter__holder relative z-10 h-full overflow-hidden bg-white">
        <Slider marks={marks} step={1} min={0} max={3}
                onChange={detectSliderChange}
                className="filter-range-slider" railStyle={railStyle} trackStyle={trackStyle} dotStyle={dotStyle}
                handleStyle={handleStyle}/>
      </div>
    </div>
  )
}

export default SideBarFilter;