import React from "react";

import Statistic from "../../../containers/Guild/components/Statistic";
import openDoor from "../../../assets/images/icons/open-door.svg";
import connectDirectionPathWay from "../../../assets/images/icons/connect-direction-path-way.svg"

const GeneralLookAtTransportationAxesAndExitBordersOfCountry = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به محورهای مواصلاتی و مرزهای خروجی کشور</legend>
      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={connectDirectionPathWay}
            text="تعداد کل محورها"
            count={11166}
            loading={false}
            hasInfo
            infoText="لورم اپیسوم"
          />
          <Statistic
            icon={openDoor}
            text="تعداد کل مرزهای خارجی"
            count={11084}
            loading={false}
            hasInfo
            infoText="لورم اپیسوم"
          />
        </div>
      </div>
    </fieldset>
  )
}

export default GeneralLookAtTransportationAxesAndExitBordersOfCountry;