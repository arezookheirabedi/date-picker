import React from "react";

export interface IPyramid {
  data: Array<IDetail>;
}

export interface IDetail {
  title: string;
  percentage: number;
  color: string
}

const Pyramid: React.FC<IPyramid> = ({data}) => {
  return (
    <>
      <ul className="pyramid-chart">
        {
          data.map((item: IDetail, ind: number) => {
            return <li key={ind} style={{width: `${(90 - (ind * 10))}%`, backgroundColor: `${item.color}`}}>
              <span className="ml-1">{(item.percentage || 0).toLocaleString('fa')}%</span>
              <span>{item.title}</span>
            </li>
          })
        }
      </ul>
    </>
  )
}
export default Pyramid;