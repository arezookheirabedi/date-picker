import dayjs from 'dayjs';
import React, {useState} from 'react';
import DotLoading from 'src/components/DotLoading';

// import fileDownload from 'js-file-download';
import {EReportStatus} from './constant';
import download from '../../assets/images/icons/download.svg';

interface IProps {
  item: any;
  refresh: boolean;
  shouldRefresh: (data: boolean) => void;
  reportType: string;
}
const ExportButton: React.FC<IProps> = ({item, refresh, shouldRefresh, reportType}) => {
  const [loading, setLoading] = useState<boolean>(false);



 

  return <>jjj</>;
};

export default ExportButton;
