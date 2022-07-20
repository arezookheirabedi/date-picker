import React from "react";

import Statistic from "../../../containers/Guild/components/Statistic";
import greenPeopleIcon from "../../../assets/images/icons/green-people.svg";
import redPeopleIcon from "../../../assets/images/icons/red-people.svg";

const OverviewOfTheEntryAndExitOfPilgrims = () => {
  return (
    <fieldset className="text-center border rounded-xl p-4 mb-16">
      <legend className="text-black mx-auto px-3">نگاه کلی به ورود و خروج زائران</legend>
      <div className="flex flex-col justify-between space-y-8">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0 space-x-0 md:space-x-5 rtl:space-x-reverse">
          <Statistic
            icon={redPeopleIcon}
            text="تعداد کل افراد خارج شده از کشور"
            count={11166}
            loading={false}
            hasInfo
            infoText="لورم اپیسوم"
          />
          <Statistic
            icon={greenPeopleIcon}
            text="تعداد کل افراد وارد شده به کشور"
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

export default OverviewOfTheEntryAndExitOfPilgrims;