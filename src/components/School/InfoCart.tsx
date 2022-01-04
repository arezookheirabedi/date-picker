import React, {ReactNode, useEffect, useState} from 'react';
import Statistic from 'src/containers/Guild/components/Statistic';

interface InfoCartProps {
  icon?: string | ReactNode;
  fetcher: (params: any) => any;
  setData: (params: any) => any;
  title: string;
  params: {};
}

const InfoCart: React.FC<InfoCartProps> = ({icon, title, fetcher, setData, params}) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await fetcher(params);
      setCount(setData(res.data));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [params]);

  return (
    <>
      <Statistic icon={icon} text={title} count={count} loading={loading} />
    </>
  );
};

export default InfoCart;
