/* eslint-disable @typescript-eslint/no-shadow */

import React, {useEffect, useRef, useState} from 'react';
// import {Combobox, Transition} from '@headlessui/react';
// import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import {cancelTokenSource, msgRequestCanceled} from 'src/helpers/utils';
import recruitmentServices from 'src/services/recruitment.service';
import {ListInfinity} from './ListInfinity';

interface IProps {
  tag: string;
  category: string;
  queryParams: any;
  placeholder?: any;
  setQueryParams: (v: any) => void;
}
export interface ISelect {
  key: string | null;
  value: any;
}
const listSize = 10;
const SearchableSingleSelect: React.FC<IProps> = ({
  placeholder,
  tag,
  category,
  setQueryParams,
  queryParams,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<{key: number | string | null; value: string}>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totlaPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [data, setData] = useState<Array<ISelect>>([{key: null, value: placeholder}]);
  const [tags, setTags] = useState<any[]>([{key: null, value: placeholder}]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<any>(null);

  const cancelToken = cancelTokenSource();

  function cancelRequest() {
    cancelToken.cancel(msgRequestCanceled);
  }
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };
  const fetcher = async () => {
    try {
      const res = await recruitmentServices.tags({tag, category}, {cancelToken: cancelToken.token});
      const newData = [...tags, ...res.data];
      // we add 1 to data.lenght because of null for place holder
      const dataLenght = res.data.lenght + 1 / listSize;
      const newTotlaPages = Math.floor(dataLenght);
      const data = newData.slice((page - 1) * listSize, page * listSize);
      setData(data);
      if (page === newTotlaPages) setHasMore(false);
      if (page === 1) {
        scrollToBottom();
      }
      setTotalPage(newTotlaPages);
      setTags([...newData]);
    } catch (error: any) {
      console.log(error);
    }
  };
  function handleInfinityScroll(e: Event) {
    e.stopPropagation();
    const scrollTop = listRef.current?.scrollTop || 0;

    if (hasMore && scrollTop === 0) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    fetcher();

    return () => {
      cancelRequest();
      setTags([]);
    };
  }, []);

  // const filteredPeople =
  //   query === ''
  //     ? tags
  //     : tags.filter(tag => {
  //         return tag.value.toLowerCase().includes(query.toLowerCase());
  //       });

  useEffect(() => {
    let params = {...queryParams};
    if (selected) {
      params = {...queryParams, categoryValue: selected.key};
    } else {
      params = {...queryParams, categoryValue: null};
    }
    setQueryParams(params);
  }, [selected]);
  return (
    <div className="flex  flex-col space-y-3 items-center justify-center">
      <div className="w-72 relative">
        <ListInfinity
          onScroll={handleInfinityScroll}
          ref={listRef}
          className="d-flex flex-column flex-fill p-3 pb-5 bg-light overflow-y-scroll justify-content-end"
          style={{maxHeight: 'calc(100vh - 22.5rem)'}}
        >
          {data && data.length > 0 ? (
            <div>
              {data.map((item: any) => (
                <div>{item.key}</div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="d-flex flex-fill justify-content-center align-items-center  ">
              nodta
            </div>
          )}
        </ListInfinity>
      </div>
    </div>
  );
};
export default SearchableSingleSelect;
