import React, {useState} from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {Calendar} from "react-modern-calendar-datepicker";

import {ReactComponent as SidebarFilterIcon} from "../../../../assets/images/icons/sidebar-filter.svg";

interface ISideBarFilter {
  filterCollapse: any,
  toggleFilter: any
}


const SideBarFilter: React.FC<ISideBarFilter> = ({filterCollapse, toggleFilter}) => {

  const [selectedDay] = useState(null);
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
    <div className={`side-bar-filter ${filterCollapse ? 'w-0' : 'w-80'}`}>
      <button
        type="button"
        className="side-bar-filter__button absolute top-1/2"
        onClick={toggleFilter}
      >
        <SidebarFilterIcon/>
      </button>

      <div className="side-bar-filter__holder relative z-10 h-full overflow-hidden bg-white">
        <h5 className="text-center  text-primary-color text-xl mb-4">فیلتر</h5>
        <Slider marks={marks} step={1} min={0} max={3}
                onChange={detectSliderChange}
                className="filter-range-slider" railStyle={railStyle} trackStyle={trackStyle} dotStyle={dotStyle}
                handleStyle={handleStyle}/>
        <div className="side-bar-filter__holder__calendar mt-16">
          <h5 className="text-right  text-primary-color text-base mb-3 mx-auto">تقویم</h5>
          <Calendar
            value={selectedDay}
            calendarClassName="filter-calendar"
            shouldHighlightWeekends
            locale="fa"
          />
        </div>

        <h5 className="text-right  text-primary-color text-base mb-3 mx-auto">جنسیت</h5>
        <div className="form__group flex justify-between">
          <div className="form__radio-group">
            <input type="radio" id="male" name="gender" className="form__radio-input"/>
            <label htmlFor="male" className="form__radio-label">
              <span className="form__radio-button"/>
              مذکر
            </label>
          </div>
          <div className="form__radio-group">
            <input type="radio" id="female" name="gender" className="form__radio-input"/>
            <label htmlFor="female" className="form__radio-label">
              <span className="form__radio-button"/>
              مونث
            </label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SideBarFilter;