import React, {useState} from 'react';
import eyes from '../../../assets/images/icons/eye_icon.svg';

interface IProps {
  value: any;
}
const HiddenMobileNumber: React.FC<IProps> = ({value}) => {
  const [typeInputText, setTypeInputText] = useState(false);

  return (
    <>
      <div className="flex justify items-center">
        <input
          className="focus:outline-none"
          value={value}
          type={`${typeInputText ? 'text' : 'password'}`}
          readOnly
        />

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img src={eyes} alt="" onClick={() => setTypeInputText(!typeInputText)} />
      </div>
    </>
  );
};
export default HiddenMobileNumber;
