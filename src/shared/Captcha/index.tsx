 
import React from 'react';
import Icon from '../Icon/Icon';


interface IProps  {
    styles?:{[key in string]:any};
    loading:boolean
    refreshCaptchaHandler():void
    captcha:string
};
export default function (props: IProps)  {
    return (
        <>

       
           <div className="d-flex " style={{position:'absolute' ,left:'0'}}>
      <div
        className={`overflow-hidden rounded ml-2 d-flex justify-content-center align-items-center`}
        // style={{ width: "120px", height: "38px" }}
         style={{ height: "22px" }}
      >
        {props.loading ? (
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <img
            src={props.captcha ? `${props.captcha}` : ""}
            alt="captcha"
            style={{ height: "auto" }}
            className="img-fluid w-100"
          />
        )}
      </div>
      <div className="ml-2">
        <button
          tabIndex={-1}
          type="button"
          className="btn btn-sm p-0"
          // style={{ width: "37px", height: "37px" }}
          onClick={props.refreshCaptchaHandler}
          disabled={props.loading}
        >
           <Icon icon="refresh-icon" color={"#6d6d6d"}
           width={22.5} height={22.5}
           /> 

 
        </button>
      </div>
    </div>
        </>
    );
};

