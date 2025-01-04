import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {cancelTokenSource, msgRequestCanceled, sideCities} from 'src/helpers/utils';
import DatepickerQuery from 'src/components/DatepickerQuery';
import LocalTableSearch from 'src/components/LocalTableSearch';
import {EERRORS} from 'src/constants/errors.enum';
import RetryButton from 'src/components/RetryButton';
import Table from '../../TableScopeSort';

interface IRegisterGuildProps {
  cityTitle?: any;
}
const RegisterGuild: React.FC<IRegisterGuildProps> = ({cityTitle}) => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState<any>([]);
  const [orgDataset, setOrgDataset] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [queryParams, setQueryParams] = useState({
    from: null,
    to: null,
    retry: false,
  });
  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
 



  return (
    <fieldset className="mb-16 rounded-xl border p-4 text-center">
      <legend className="mx-auto px-3 text-black">
        {' '}
        اصناف ثبت نام شده در سامانه استان {cityTitle}
      </legend>

      <div className="align-center justify-spacebetween mb-8 flex space-x-5 rtl:space-x-reverse">
        <div className="align-center flex space-x-5 rtl:space-x-reverse">
          <div className="flex items-center">
            <DatepickerQuery query={queryParams} setQuery={setQueryParams} />
          </div>
        </div>

        <div className="align-center flex flex-grow justify-end">
          <div className="align-center relative inline-flex leading-3">
            <LocalTableSearch
              orgDataset={orgDataset}
              setData={setDataset}
              query={queryParams}
              placeholder="جستجوی واحد صنفی"
            />
          </div>
        </div>
      </div>

      <div className="align-center flex w-full flex-col justify-center rounded-xl bg-white p-4 shadow">
        {error && !loading ? (
          <div className="p-40">
            <div className="text-red-500">{error}</div>
            <RetryButton setQuery={setQueryParams} />
          </div>
        ) : (
          <Table
           
            dataSet={[...dataset]}
            pagination={{pageSize: 10, maxPages: 3}}
            columns={[
              {
                name: 'نام رسته',
                key: 'name',
                render: (v: any, record, index: number, page: number) => (
                  <div className="flex justify-center">
                    {((page - 1) * 10 + index + 1).toPersianDigits()}.{v}
                  </div>
                ),
              },
              {
                name: 'تعداد',
                key: 'registeredCount',
                sortable: true,
                render: (v: any) => (
                  <span>
                    {Number(v || 0)
                      .commaSeprator()
                      .toPersianDigits()}
                  </span>
                ),
              },
            ]}
            totalItems={(dataset || []).length}
          />
        )}
      </div>
    </fieldset>
  );
};

export default RegisterGuild;
