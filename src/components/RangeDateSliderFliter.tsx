import Slider from "rc-slider";
import React, {useState} from "react";

const railStyle = {
  backgroundColor: '#D5D5D5',
  height: '2px'
}

const trackStyle = {
  backgroundColor: '#D5D5D5',
  height: '2px'
}

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

const RangeDateSliderFilter = () => {

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

  return (
    <>
      <Slider marks={marks} step={1} min={0} max={3}
              onChange={detectSliderChange}
              className="filter-range-slider" railStyle={railStyle} trackStyle={trackStyle} dotStyle={dotStyle}
              handleStyle={handleStyle}/>
    </>
  )
}

export default RangeDateSliderFilter;