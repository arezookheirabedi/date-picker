import React from 'react';
import {ReactComponent as NotFoundImg} from '../../assets/images/not-found.svg';

const NotFound: React.FC<any> = () => (
  <div className="flex justify-center items-center flex-col h-full space-y-8 mt-8">
    <NotFoundImg />

    <p className="text-center">صفحه مورد نظر وجود ندارد</p>
  </div>
);

export default NotFound;
