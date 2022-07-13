import React from 'react';
import { CSVLink } from "react-csv";
import download from '../../assets/images/icons/download.svg';

interface IProps {
    fileName: any;
    loading: boolean;
    data: any[];
    isDisabled: boolean;
}

const ExportFile: React.FC<IProps> = ({fileName, data, loading, isDisabled}) => {

    return (
        <CSVLink
            data={data}
            filename={fileName}
            style={{ "textDecoration": "none", "color": "#fff" }}
            onClick={() => {
                if(isDisabled) {return true;}
                return false;
            }}
        >
            {loading ? 'در حال پردازش...' : <button
                type="button"
                className="button button--primary flex space-x-2 px-5 rtl:space-x-reverse"
            >
                <img src={download} alt="download-information" className="h-4" />
                <span>دانلود اطلاعات</span>
            </button>}
        </CSVLink>
    )
}

export default ExportFile;