import React from "react";
import Spinner from "../Spinner";

export interface IPyramid {
  data: Array<IDetail>;
  loading: boolean
}

export interface IDetail {
  title: string;
  percentage: number;
  color: string
}

const Pyramid: React.FC<IPyramid> = ({data, loading}) => {
  return (
    <>
      <ul className="pyramid-chart">
        {
          // eslint-disable-next-line no-nested-ternary
          loading ? <div className="p-20"><Spinner/></div> : data.length ? data.map((item: IDetail, ind: number) => {
            return <li key={ind} style={{width: `${(90 - (ind * 10))}%`, backgroundColor: `${item.color}`}}>
              <span className="ml-1">{(item.percentage || 0).toLocaleString('fa')}%</span>
              <span>{item.title}</span>
            </li>
          }) : <li style={{width: `100%`, backgroundColor: `red`}}>موردی برای نمایش وجود ندارد.</li>
        }
      </ul>
    </>
  )
}
export default Pyramid;