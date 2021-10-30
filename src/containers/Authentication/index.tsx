import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from 'src/containers/Authentication/Register';
import Activate from 'src/containers/Authentication/Activate';
import BusinessLicense from 'src/containers/Authentication/BusinessLicense';
import WorkstationCode from 'src/containers/Authentication/WorkstationCode';
import EPUBLICROUTE from 'src/constants/PublicRoute.enum';
import EPRIVATEROUTE from 'src/constants/PrivateRoute.enum';
import bgAuth from 'src/assets/images/patterns/bg-auth.svg';
import grid from 'src/assets/images/patterns/repeat-grid.svg';


const Authentication: React.FC<any> = () => (
  <div
    className="flex flex-col-reverse lg:flex-row min-h-screen rtl:space-y-reverse"
    style={{backgroundImage: `url(${grid})`}}
  >
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="w-full max-w-md md:max-w-sm lg:max-w-md">
        <div className="flex-1 flex flex-col min-h-screen px-3 py-10 space-y-24">
          <Switch>
            <Route path={EPUBLICROUTE.REGISTER} exact component={Register} />
            <Route path={EPUBLICROUTE.ACTIVATE} exact component={Activate} />
            <Route path={EPRIVATEROUTE.BUSINESSLICENSE} exact component={BusinessLicense} />
            <Route path={EPRIVATEROUTE.WORKSTATIONCODE} exact component={WorkstationCode} />
            <Route component={Register} />

          </Switch>

          <div className="bg-transparent rounded-md border-gray-300 border p-3">
            <p className="text-base font-semibold mb-2">اطلاعات مورد نیاز جهت ثبت نام:</p>
            <ul className="list-inside list-disc space-y-1 text-sm font-light">
              <li className="">کد ملی و شماره تلفن همراه</li>
              <li className="">شماره پروانه کسب واحد صنفی</li>
              <li className="">شماره کد گارگاه (تامین اجتماعی) واحد صنفی</li>
              <li className="">کد شعبه تامین اجتماعی</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      style={{backgroundImage: `url(${bgAuth})`, backgroundColor: 'black'}}
      className="flex-1 relative bg-center bg-cover hidden xl:flex flex-col justify-center items-center lg:rounded-r-3xl min-h-screen"
    />
  </div>
);

export default Authentication;
