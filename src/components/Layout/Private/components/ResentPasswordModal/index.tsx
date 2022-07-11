import React, {useState} from 'react';
import ConfirmOtp from './ConfirmOtp';

import GetOtpForm from './GetOtpForm';

interface IProps {
  resetIsOpen: boolean;
  setResetIsOpen: (data: boolean) => void;
}
const ResendPasswordModal: React.FC<IProps> = ({resetIsOpen, setResetIsOpen}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmOtpModal, setConfirmOtpModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();

  return (
    <>
      <GetOtpForm
        resetIsOpen={resetIsOpen}
        setResetIsOpen={setResetIsOpen}
        setConfirmOtpModal={setConfirmOtpModal}
        setFormData={setFormData}
      />
      <ConfirmOtp
        confirmOtpModal={confirmOtpModal}
        setConfirmOtpModal={setConfirmOtpModal}
        formData={formData}
      />
    </>
  );
};
export default ResendPasswordModal;
