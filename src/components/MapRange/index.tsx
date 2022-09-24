import React, {useEffect, useState} from 'react';
import Slider from 'rc-slider';

// eslint-disable-next-line
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const MapRange = ({min, max, value, animationSpeed, formatLabel, onChange}: any) => {
  //   eslint-disable-next-line
  const [isPlaying, setIsPlaying] = useState(false);
  // const [initialFilterValue, setInitialFilterValue] = useState<any>(null);
  const [animation] = useState<any>({});

  // prettier-ignore
  useEffect(() => {
    return () => animation.id && cancelAnimationFrame(animation.id);
  }, [animation]);

  if (isPlaying && !animation.id) {
    // const span = value[1] - value[0];
    // const nextValueMin = value[0] + animationSpeed;

    animation.id = requestAnimationFrame(() => {
      // if (nextValueMin + span >= max) {
      //   nextValueMin = min;
      // }
      let initialValue = null;
      if (!initialValue) {
        // eslint-disable-next-line prefer-destructuring
        initialValue = value[0];
      }
      animation.id = 0;
      if (value[0] <= value[1]) {
        onChange([(value[0] + animationSpeed), value[1]]);
      } else {
        onChange([min, value[1]]);
      }

    });
  }

  //   const isButtonEnabled = value[0] > min || value[1] < max;

  return (
    <div className="absolute bottom-8 left-0 flex justify-center w-full items-center">
      <div className="max-w-sm w-full space-x-4 flex flex-row-reverse justify-center items-center">
        <button
          className=""
          style={{color: '#ffcc00'}}
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <Range
          min={min}
          max={max}
          value={value}
          trackStyle={[{backgroundColor: '#ffcc00'}]}
          handleStyle={[{borderColor: '#ffcc00', boxShadow: 'none'}]}
          // onChange={(newValue: any) => {
          //   setInitialFilterValue(newValue);
          //   onChange(newValue)
          // }}
          tipFormatter={formatLabel}
        />
      </div>
    </div>
  );
};

export default MapRange;
