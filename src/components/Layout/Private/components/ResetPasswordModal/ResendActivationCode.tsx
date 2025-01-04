import React, {useEffect, useState} from 'react';
import toast from 'cogo-toast';
import {EERRORS} from 'src/constants/errors.enum';

interface IProps {
  formData: any;
  setOtp: (data: string) => void;
}

function checkValue(val: any) {
  return typeof val !== 'undefined' && val !== null && val !== '';
}

function getDifferentTime(difference: any) {
  const minutesDifference = Math.floor(difference / 1000 / 60);
  // eslint-disable-next-line no-param-reassign
  difference -= minutesDifference * 1000 * 60;
  const secondsDifference = Math.floor(difference / 1000);
  return {
    min: minutesDifference,
    sec: secondsDifference,
  };
}

const defaultWaitTime = () => {
  const wt = localStorage.getItem('waiting-sms');
  if (checkValue(wt)) {
    const difference = new Date().getTime() - new Date(wt!).getTime();
    if (difference <= 2000 * 60) {
      return 2000 * 60 - difference;
    }
  }
  return 0;
};
const ResendActivationCode: React.FC<IProps> = ({formData, setOtp}) => {
  const [disabled, setDisabled] = useState(false);
  const [waitTime, setWaitTime] = useState(defaultWaitTime());

  const isDisabled = {
    backgroundColor: '#ebebeb',
    color: '#999999',
    borderColor: '#fbfbfb',
  };

  useEffect(() => {
    setOtp('');
    const wt = localStorage.getItem('waiting-sms');
    if (checkValue(wt)) {
      const difference = new Date().getTime() - new Date(wt!).getTime();
      if (difference <= 2000 * 60) {
        setDisabled(true);
      } else {
        setDisabled(false);
        localStorage.removeItem('waiting-sms');
      }
    }
  }, []);
  useEffect(() => {
    let refreshTime: any;
    if (waitTime > 0) {
      refreshTime = setTimeout(() => {
        setWaitTime(waitTime - 1000);
      }, 1000);
    } else if (waitTime <= 0) {
      setDisabled(false);
      localStorage.removeItem('waiting-sms');
      refreshTime = setWaitTime(0);
    }
    return () => {
      clearTimeout(refreshTime);
    };
  }, [waitTime]);
  const {min, sec} = getDifferentTime(waitTime);


  return (
    <div>
      {' '}
      <div className="mt-6 flex flex-col ">
        <button
          type="button"
          style={disabled ? isDisabled : {}}
          disabled={disabled}
          className="flex items-center justify-center rounded border border-gray-300 bg-white px-12 py-2 text-sm text-gray-900  hover:bg-gray-100   disabled:border-gray-100 disabled:bg-gray-50  "
        >
          <span>ارسال مجدد کد فعالسازی</span>
        </button>

        {waitTime > 0 && (
          <div className="mt-1 flex items-center justify-center">
            {min}:{sec} :پیامک ارسال شده
          </div>
        )}
      </div>
    </div>
  );
};
export default ResendActivationCode;
