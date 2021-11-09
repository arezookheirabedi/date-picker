import {useEffect, useState} from "react";
// import { ILoginForm } from "../../../models/authentication.model";
// import { ICaptcha } from "../../../models/captcha.model";
// import { authenticateService } from "../../../services/authentication.service";
// import { setToken } from "../../../services/BaseService/servicesUtils";
// import useForm from "./useForm";
import eyes from "../../../assets/images/icons/eye_icon.svg";
import Svg from "../../../components/Svg";


import Checkbox from "../../../shared/Checkbox";

export enum EInputLogin {
  USERNAME = "username",
  PASSWORD = "pasword",
  CAPTCHACODE = "captchaCode",
}

const {RefreshLogo} = Svg;

export default function Login() {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [submitted, setSubmitted] = useState<boolean>(false);
  // const [captcha, setCaptcha] = useState<ICaptcha>({ id: "", code: "" });
  const [typeInputText, setTypeInputText] = useState(false);
  const [remember, setRemember] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<{
  //   errorMsg: string;
  //   showMsg: boolean;
  // }>({ errorMsg: "", showMsg: false });
  /**
   * @params form value
   * @return token
   */
  // const Login = async (values: ILoginForm) => {
  //   setSubmitted(true);
  //   try {
  //     let res = await authenticateService.login(values);
  //     setToken(res.data);
  //     let storagePass = JSON.stringify({
  //       depatrmentPass: values.password,
  //       depdepartmentUsername: values.username,
  //     });
  //     let remmberme = JSON.stringify({ rememberme: remember });
  //     localStorage.setItem("remmberme", remmberme);
  //     remember
  //       ? localStorage.setItem("storageRemember", storagePass)
  //       : localStorage.removeItem("storageRemember");
  //   } catch (error) {
  //     getCaptcha();
  //     setSubmitted(false);
  //     handleErrorMessage(error.response.data.message);
  //   }
  // };

  /**
   * @params set error msg
   * @return show msg box
   */
  // const handleErrorMessage = (value: string) => {
  //   if (value !== "") {
  //     setErrorMessage({ errorMsg: value, showMsg: true });
  //     setTimeout(() => {
  //       setErrorMessage({ errorMsg: "", showMsg: false });
  //     }, 2000);
  //   }
  // };
  /**
   * @params  Login, captcha.id
   * @return handleChange, values, handleSubmit, formValid, error
   */
  // const {handleChange, values, handleSubmit, formValid, error} = useForm(
  //   Login,
  //   captcha.id
  // );
  /**
   * @params  checked value
   * @return store  user pass in local storage if it is true
   */
  useEffect(() => {
    // let remmberme = localStorage.getItem("remmberme");
    // let checkremember = JSON.parse(remmberme!);
    // if (checkremember) {
    //   setRemember(checkremember.rememberme);
    // }
    // setTypeInputText(false);
    // getCaptcha();
  }, []);

  // const getCaptcha = async () => {
  //   setLoading(true);
  //   try {
  //     let res = await authenticateService.captcha();
  //     setCaptcha({ id: res.data.id, code: res.data.captchaBase64 });
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const refreshCaptchaHandler = () => {
    console.log('refresh captcha')
    // getCaptcha();
  };
  /**
   * @params  checked value
   * @return setRemember true or false
   */
  const onChange = (e: any) => {
    const newRemember = e.target.checked;
    setRemember(newRemember);
  };

  const handleSubmit = () => {
    console.log('submit');
  }

  const handleChange = () => {
    console.log('submit');
  }

  return (
    <>
      {/* {errorMessage.showMsg && */}
      {/* <Message msg={errorMessage.errorMsg}/> */}
      {/* } */}


      <form className="loginWrapper" onSubmit={handleSubmit}>
        <div className="login2">ورود به سامانه</div>

        <div className="inputwraper">
          <input
            style={{border: "1px solid #b2b2b2"}}
            type="text"
            name="username"
            placeholder="پست الکترونیکی"
            value=""
            onChange={handleChange}
          />
          {/* <span className="inputError">{error.email}</span> */}
        </div>

        <div className="inputwraper icon ">
          <input
            style={{border: "1px solid #b2b2b2"}}
            autoComplete="new-password"
            type={`${typeInputText ? "text" : "password"}`}
            name="password"
            placeholder="رمز عبور"
            value=""
            onChange={handleChange}
          />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={eyes}
            alt=""
            onClick={() => setTypeInputText(!typeInputText)}
          />
        </div>

        <div className="inputwraper captcha-input ">
          <div className="captcha-input__img">
            <img
              className="captcha-input__img--base64"
              src={`data:image/png;base64, `}
              alt=""
            />
            <RefreshLogo onHandleRefreshLogo={refreshCaptchaHandler}/>
          </div>
          <input
            style={{border: "1px solid #b2b2b2"}}
            name="captchaCode"
            value=""
            onChange={handleChange}
            maxLength={7}
            autoComplete="off"
            type="text"
            placeholder="  کد امنیتی"
          />
        </div>

        <Checkbox checked={remember} onChange={onChange}/>
        <div className="landscape_button">

          <button
            type="submit"
            className={`login_button ${
              !1 ? " deactive" : " active"
            }`}
            disabled={!1}
          >
            ورود
          </button>
        </div>
      </form>
    </>
  );
}
