import dayjs from 'dayjs';
import React, {useState} from 'react';
import guildService from 'src/services/guild.service';
import DotLoading from 'src/components/DotLoading';

// import fileDownload from 'js-file-download';
import {EReportStatus} from './constant';
import download from '../../assets/images/icons/download.svg';

interface IProps {
  item: any;
  refresh: boolean;
  shouldRefresh: (data: boolean) => void;
}
const GuildExportButton: React.FC<IProps> = ({item, refresh, shouldRefresh}) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function handelDownload(id: any) {
    setLoading(true);
    const fileName = `${item.reportName}- ${dayjs(item.requestDateTime)
      .calendar('jalali')
      .format('YYYY-MM-DD')
      .toPersianDigits()}.csv`;
    try {
      const response = await guildService.reportDownload(id);
      const blob = new Blob([response.data]);
      const blobuUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobuUrl;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();

      // window.open(url);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    } finally {
      setLoading(false);
      shouldRefresh(!refresh);
    }
  }

  const getButton = (data: any) => {
    switch (data) {
      case EReportStatus.PROCESSING:
        return <span style={{color: '#F3BC06'}}>در حال پردازش</span>;
      case EReportStatus.READY_FOR_DOWNLOAD:
        return (
          <div className="inline-flex">
            <button
              disabled={loading}
              type="button"
              className="button button--primary px-8 inline-flex w-auto justify-center items-center space-x-2 rtl:space-x-reverse"
              onClick={() => handelDownload(item.id)}
            >
              {loading ? (
                <DotLoading />
              ) : (
                <>
                  <img src={download} alt="download" className="w-5 h-4" />
                  <span>دانلود</span>
                </>
              )}
            </button>
          </div>
        );
      case EReportStatus.DOWNLOADED:
        return <span className="text-gray-600">دانلود شده</span>;
      case EReportStatus.READY_FOR_SMS:
        return <span className="text-gray-600"> در انتظار تایید</span>;
      case EReportStatus.FAILED:
        return <span className="text-orange-600"> خطا</span>;
      default:
        return '';
    }
  };

  return <>{getButton(item.reportStatus)}</>;
};

export default GuildExportButton;
