import React, {useEffect, useState} from 'react';

interface IProps {
  mobileNumber: any;
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
const SendActivationCode: React.FC<IProps> = ({mobileNumber}) => {
  const [disabled, setDisabled] = useState(false);
  const [waitTime, setWaitTime] = useState(defaultWaitTime());

  const isDisabled = {
    backgroundColor: '#ebebeb',
    color: '#999999',
    borderColor: '#fbfbfb',
  };

  useEffect(() => {
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

  //   const handleClick = async (params: {
  //     email: string;
  //     mobileNumber?: string;
  //     captchaKey: string;
  //     captchaValue: string;
  //   }) => {
  //     try {
  //       const res = await authenticateService.resendActivationCode({
  //         ...params,
  //         registerType: params.mobileNumber && params.mobileNumber.length ? 'SMS' : 'EMAIL',
  //       });
  //       if (res.data.status === 1) {
  //         message.success(res.data.msg || t('alert__success'));
  //         localStorage.setItem('waiting-sms', new Date().toString());
  //         setWaitTime(2000 * 60);
  //         setDisabled(true);
  //       } else {
  //         // eslint-disable-next-line
  //         throw {message: res.data.msg || t('alert__error')};
  //       }
  //     } catch (error: any) {
  //       message.error(error.message || t('alert__error'));
  //     } finally {
  //       if (refreshCaptcha) {
  //         refreshCaptcha();
  //       }
  //     }
  //   };
  const handleClick = () => {
    localStorage.setItem('waiting-sms', new Date().toString());
    setWaitTime(2000 * 60);
    setDisabled(true);
    console.log(mobileNumber);
  };

  return (
    <div>
      {' '}
      <div className="mt-6 flex items-baseline justify-between">
        <button
          type="button"
          onClick={handleClick}
          style={disabled ? isDisabled : {}}
          disabled={disabled}
          className="flex items-center justify-center rounded border border-gray-300 bg-white px-12 py-2 text-sm text-gray-900  hover:bg-gray-100   disabled:border-gray-100 disabled:bg-gray-50  "
        >
          <span>ارسال کد فعالسازی</span>
        </button>

        {waitTime > 0 && (
          <span>
            {min}:{sec} :پیامک ارسال شده
          </span>
        )}
      </div>
    </div>
  );
};
export default SendActivationCode;
