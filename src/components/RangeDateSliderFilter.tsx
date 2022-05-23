import Slider from 'rc-slider';
import React, {useEffect, useState} from 'react';
// @ts-ignore
// eslint-disable-next-line
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
  selectedType: string;
  changeType: (v: string) => void;
  wrapperClassName?: string;
  dates?: {
    from: any | null | undefined;
    to: any | null | undefined;
  };
}

// eslint-disable-next-line
const convertLabelToValue: (label: string) => number = label => {
  switch (label) {
    case 'ANNUAL':
      return 2;
    case 'MONTHLY':
      return 1;
    // case 'WEEKLY':
    //   return 1;
    case 'DAILY':
      return 0;
    default:
      return 2;
  }
};

const convertValueToLabel: (value: number) => string = value => {
  switch (value) {
    case 2:
      return 'ANNUAL';
    case 1:
      return 'MONTHLY';
    // case 1:
    //   return 'WEEKLY';
    case 0:
      return 'DAILY';
    default:
      return 'MONTHLY';
  }
};

const RangeDateSliderFilter: React.FC<IProps> = ({
  selectedType,
  changeType,
  dates = {from: null, to: null},
  wrapperClassName,
}) => {
  // eslint-disable-next-line
  const [disabledDays, setDisabledDays] = useState<any[]>([]);
  const [marks, setMarks] = useState([
    {
      value: 2,
      label: 'سالیانه',
      enLabel: 'ANNUAL',
      style: {
        color: '#B2B2B2',
      },
    },
    {
      value: 1,
      label: 'ماهانه',
      enLabel: 'MONTHLY',
      style: {
        color: '#B2B2B2',
      },
    },
    // {
    //   value: 1,
    //   label: 'هفتگی',
    //   enLabel: 'WEEKLY',
    //   style: {
    //     color: '#B2B2B2',
    //   },
    // },
    {
      value: 0,
      label: 'روزانه',
      enLabel: 'DAILY',
      style: {
        color: '#B2B2B2',
      },
    },
  ]) as any;

  // eslint-disable-next-line
  const detectSliderChange = (value: number) => {
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
    if (dates?.from && dates?.to) {
      const finalFromDate = `${dates.from.year}/${dates.from.month}/${dates.from.day}`;
      const finalToDate = `${dates.to.year}/${dates.to.month}/${dates.to.day}`;

      const start = moment(finalFromDate, 'jYYYY/jM/jD');
      const end = moment(finalToDate, 'jYYYY/jM/jD');

      const duration = moment.duration(end.diff(start));

      if (!duration.years()) {
        tmp.push(3);
      }

      if (!duration.months() && !duration.years()) {
        tmp.push(2);
      }

      if (!duration.weeks() && !duration.months() && !duration.years()) {
        tmp.push(1);
      }
      setDisabledDays([...tmp]);
    } else {
      setDisabledDays([]);
    }
  }, [dates]);

  useEffect(() => {
    detectSliderChange(convertLabelToValue(selectedType));
  }, [selectedType]);

  // eslint-disable-next-line
  function handleChangeSeleted(v: any) {
    changeType(convertValueToLabel(v));
  }

  return (
    <>
      {marks.filter((x: any) => !disabledDays.includes(x.value)).length > 1 && (
        <div className={`inline-flex ${wrapperClassName || ''}`}>
          <Slider
            marks={marks
              .filter((x: any) => !disabledDays.includes(x.value))
              .sort((a: any, b: any) => {
                return a.value - b.value;
              })}
            step={1}
            min={0}
            // max={3}
            max={marks.filter((x: any) => !disabledDays.includes(x.value)).length - 1}
            value={convertLabelToValue(selectedType)}
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
