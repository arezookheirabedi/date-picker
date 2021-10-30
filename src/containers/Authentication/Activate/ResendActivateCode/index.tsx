import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { IInfoResendCode } from 'src/containers/Authentication/Activate';

import qs from 'qs';
import EPUBLICROUTE from 'src/constants/PublicRoute.enum';

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
    if (difference <= 1000 * 120) {
      return 1000 * 120 - difference;
    }
  }
  return 0;
};
interface IProps {
  info: IInfoResendCode;
}
const ResendActivateCode: React.FC<IProps> = ({info}) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [waitTime, setWaitTime] = useState(defaultWaitTime());

  useEffect(() => {
    setDisabled(true);
  }, []);

  const resendActivationCode = async () => {
    const data = {
      mobileNumber: info.mobileNumber,
      nationalId: info.nationalId,
    };
    history.push(`${EPUBLICROUTE.REGISTER}?${qs.stringify(data, {skipNulls: true})}`);
  };
  
  const handleClick = () => {
    resendActivationCode();
  };

  useEffect(() => {
    const wt = localStorage.getItem('waiting-sms');
    if (checkValue(wt)) {
      const difference = new Date().getTime() - new Date(wt!).getTime();
      if (difference <= 1000 * 60) {
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
    <>
      <div className="flex justify-between items-baseline">
        {waitTime > 0 ? (
          <div>
            ارسال کد فعال سازی {min}:{sec}
          </div>
        ) : (
          <button className="" type="button" onClick={handleClick} disabled={disabled}>
            <div className="flex">ارسال مجدد کد فعالسازی</div>
          </button>
        )}
      </div>
    </>
  );
};
export default ResendActivateCode;
