import React, {useState} from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from '@hassanmojab/react-modern-calendar-datepicker';

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
    <div className={`side-bar-filter fixed top-0 left-0 z-50 ${filterCollapse ? 'w-0' : 'w-80'}`}>
      <button
        type="button"
        className="side-bar-filter__button absolute top-1/2"
        onClick={toggleFilter}
      >
        <SidebarFilterIcon/>
      </button>

      <div className="side-bar-filter__holder relative z-10 h-screen overflow-auto bg-white">
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
        <div className="radio-holder flex justify-between mb-12">
          <div className="radio-holder__group">
            <input type="radio" id="male" name="gender" className="radio-holder__radio-input"/>
            <label htmlFor="male" className="radio-holder__radio-label">
              <span className="radio-holder__radio-button"/>
              مذکر
            </label>
          </div>
          <div className="radio-holder__group">
            <input type="radio" id="female" name="gender" className="radio-holder__radio-input"/>
            <label htmlFor="female" className="radio-holder__radio-label">
              <span className="radio-holder__radio-button"/>
              مونث
            </label>
          </div>
        </div>

        <h5 className="text-right  text-primary-color text-base mb-3 mx-auto">استان</h5>
        <div className="input-wrapper mb-12">
          <input type="text" placeholder="استان" />
        </div>

        <h5 className="text-right  text-primary-color text-base mb-4 mx-auto">واکسن</h5>
        <div className="select-radio mb-12">
          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="not-done"
                   name="vaccine"/>
            <label htmlFor="not-done"
                   className="select-radio__label">
              <span className="select-radio__button"/>
              انجام نشده
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="first-dose-done" name="vaccine"/>
            <label htmlFor="first-dose-done" className="select-radio__label">
              <span className="select-radio__button"/>
              دوز اول انجام شده
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="second-dose-done" name="vaccine"/>
            <label htmlFor="second-dose-done" className="select-radio__label">
              <span className="select-radio__button"/>
              هر دو دوز انجام شده
            </label>
          </div>
        </div>


        <h5 className="text-right  text-primary-color text-base mb-4 mx-auto">برند واکسن</h5>
        <div className="select-radio mb-12">
          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="barekat"
                   name="vaccine-type"/>
            <label htmlFor="barekat"
                   className="select-radio__label">
              <span className="select-radio__button"/>
              برکت
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="sinopharm" name="vaccine-type"/>
            <label htmlFor="sinopharm" className="select-radio__label">
              <span className="select-radio__button"/>
              سینوفارم
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="astrazeneca" name="vaccine-type"/>
            <label htmlFor="astrazeneca" className="select-radio__label">
              <span className="select-radio__button"/>
              آسترازنکا
            </label>
          </div>
        </div>


        <h5 className="text-right  text-primary-color text-base mb-4 mx-auto">وضعیت</h5>
        <div className="select-radio mb-12">
          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="improved"
                   name="status"/>
            <label htmlFor="improved"
                   className="select-radio__label">
              <span className="select-radio__button"/>
              بهبود یافتگان
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="infected" name="status"/>
            <label htmlFor="infected" className="select-radio__label">
              <span className="select-radio__button"/>
              مبتلا شدگان
            </label>
          </div>

          <div className="select-radio__group">
            <input type="radio" className="select-radio__input" id="dead" name="status"/>
            <label htmlFor="dead" className="select-radio__label">
              <span className="select-radio__button"/>
              فوت شدگان
            </label>
          </div>
        </div>

        <div className="w-3/5 mx-auto" >
          <button type="button" className="button button--primary">
            اعمال فیلتر
          </button>
        </div>

      </div>
    </div>
  )
}

export default SideBarFilter;