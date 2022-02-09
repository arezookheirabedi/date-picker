import Slider from 'rc-slider';
import React, {useEffect, useState} from 'react';
// @ts-ignore
import moment from 'moment-jalaali';

const railStyle = {
  backgroundColor: '#D5D5D5',
  height: '2px',
};

const trackStyle = {
  backgroundColor: '#D5D5D5',
  height: '2px',
};

const handleStyle = {
  border: 'none',
  outline: '1px solid #193149',
  outlineOffset: '2px',
  backgroundColor: '#193149',
  width: '10px',
  height: '10px',
  boxShadow: 'none',
};

const dotStyle = {
  backgroundColor: '#D5D5D5',
  borderColor: '#D5D5D5',
  width: '6px',
  height: '6px',
  bottom: '0',
};

interface IProps {
  selectedType: any;
  changeType: (v: any) => void;
  wrapperClassName?: string;
  dates?: {
    from: any | null | undefined;
    to: any | null | undefined;
  };
}

// eslint-disable-next-line
const RangeDateSliderFilter: React.FC<IProps> = ({
  changeType,
  selectedType,
  dates,
  wrapperClassName,
}) => {
  const [disabledDays, setDisabledDays] = useState<any[]>([]);
  const [marks, setMarks] = useState([
    {
      value: 3,
      label: 'سالیانه',
      enLabel: 'ANNUAL',
      style: {
        color: '#B2B2B2',
      },
    },
    {
      value: 2,
      label: 'ماهانه',
      enLabel: 'MONTHLY',
      style: {
        color: '#193149',
      },
    },
    {
      value: 1,
      label: 'هفتگی',
      enLabel: 'WEEKLY',
      style: {
        color: '#B2B2B2',
      },
    },
    {
      value: 0,
      label: 'روزانه',
      enLabel: 'DAILY',
      style: {
        color: '#B2B2B2',
      },
    },
  ]) as any;
  const [selected, setSelected] = useState<number>(2);

  // eslint-disable-next-line
  const detectSliderChange = (value: any) => {
    return setMarks((prevState: any) => {
      return prevState.map((it: any) => {
        if (it.value === value) {
          return {...it, style: {color: '#193149'}};
        }
        return {...it, style: {color: '#B2B2B2'}};
      });
    });
  };

  useEffect(() => {
    const tmp: any[] = [];
    let lastState = 'ANNUAL';
    if (dates?.from && dates?.to) {
      const finalFromDate = `${dates.from.year}/${dates.from.month}/${dates.from.day}`;
      const finalToDate = `${dates.to.year}/${dates.to.month}/${dates.to.day}`;

      const start = moment(finalFromDate, 'jYYYY/jM/jD');
      const end = moment(finalToDate, 'jYYYY/jM/jD');

      const duration = moment.duration(end.diff(start));

      if (!duration.years()) {
        tmp.push(3);
        lastState = 'MONTHLY';
      }

      if (!duration.months() && !duration.years()) {
        tmp.push(2);
        lastState = 'WEEKLY';
      }

      if (!duration.weeks() && !duration.months() && !duration.years()) {
        tmp.push(1);
        lastState = 'DAILY';
      }
      setDisabledDays([...tmp]);
    } else {
      setDisabledDays([]);
    }

    changeType(lastState);
  }, [dates]);

  useEffect(() => {
    setSelected(
      // eslint-disable-next-line
      selectedType === 'ANNUAL'
        ? 3
        : // eslint-disable-next-line
        selectedType === 'MONTHLY'
        ? 2
        : // eslint-disable-next-line
        selectedType === 'WEEKLY'
        ? 1
        : // eslint-disable-next-line
        selectedType === 'DAILY'
        ? 0
        : 2
    );
  }, [selectedType]);

  useEffect(() => {
    detectSliderChange(selected);
  }, [selected]);

  function handleChangeSeleted(v: any) {
    changeType(
      // eslint-disable-next-line
      v === 3
        ? 'ANNUAL'
        : // eslint-disable-next-line
        v === 2
        ? 'MONTHLY'
        : // eslint-disable-next-line
        v === 1
        ? 'WEEKLY'
        : // eslint-disable-next-line
        v === 0
        ? 'DAILY'
        : 'MONTHLY'
    );
  }
  

  return (
    <>
      {marks.filter((x: any) => !disabledDays.includes(x.value)).length > 1 && (
        <div className={`inline-flex ${wrapperClassName || ''}`}>
          <Slider
            marks={marks
              .filter((x: any) => !disabledDays.includes(x.value))
              .sort((a: any, b: any) => {
                return a - b;
              })}
            step={1}
            min={0}
            defaultValue={selected}
            max={marks.filter((x: any) => !disabledDays.includes(x.value)).length - 1}
            onChange={handleChangeSeleted}
            className="filter-range-slider"
            railStyle={railStyle}
            trackStyle={trackStyle}
            dotStyle={dotStyle}
            handleStyle={handleStyle}
          />
        </div>
      )}
    </>
  );
};

export default RangeDateSliderFilter;
