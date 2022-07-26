import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import authService from '../../../services/authentication.service';
// import { ILoginForm } from "../../../models/authentication.model";
// import { ICaptcha } from "../../../models/captcha.model";
// import  authenticateService  from "../../../services/authentication.service";
import {setToken} from '../../../helpers/utils';
import {loginValidation} from '../../../validations';

import eyes from '../../../assets/images/icons/eye_icon.svg';
import Svg from '../../../components/Svg';
import DotLoading from '../../../components/DotLoading';

// import Checkbox from '../../../shared/Checkbox';

export enum EInputLogin {
  USERNAME = 'username',
  PASSWORD = 'pasword',
  CAPTCHACODE = 'captchaCode',
}

const {RefreshLogo} = Svg;

type LoginForm = {
  username: string | number;
  password: string;
  captcha: string;
};

export default function Login() {
  const history = useHistory();
  const [typeInputText, setTypeInputText] = useState(false);
  // const [remember, setRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginForm>();
  const [inputCaptchaId, setInputCaptchaId] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const handleCaptcha = async () => {
    try {
      const {data} = await authService.captcha();
      setCaptchaCode(data.captchaBase64);
      setInputCaptchaId(data.id);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: any) => {
    const finalData = {
      captchaCode: data.captcha,
      captchaId: inputCaptchaId,
      password: data.password,
      username: data.username,
    };

    try {
      setIsLoading(true);
      const response = await authService.login(finalData);
      setToken(response.data);
      window.localStorage.setItem('ministers-username', data.username);
      window.localStorage.setItem('ministers-first-login', String(new Date().getTime()));
      // localStorage.setItem(
      //   "loginInfo",
      //   JSON.stringify({
      //     ...response.data,
      //   })
      // );
      // eslint-disable-next-line
      console.log('you are logged in');
      history.push('/dashboard/health/vaccination/public');
    } catch (error: any) {
      handleCaptcha();
      const {message} = error;

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const {errors} = error;
      if (message) {
        if (message.includes('کد امنیتی')) {
          return setError('captcha', {
            message,
          });
        }
        return setError('username', {
          message,
        });
      }
      if (errors && errors.length) {
        errors.map((item: any) => {
          return setError(item.field, {
            message: item.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const onRememberChange = (e: any) => {
  //   const newRemember = e.target.checked;
  //   setRemember(newRemember);
  // };

  useEffect(() => {
    handleCaptcha();

    return () => {
      setCaptchaCode('');
      setInputCaptchaId('');
    };
  }, []);

  return (
    <>
      <form className="loginWrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="login2">ورود به سامانه</div>

        <div className="inputwraper">
          <input
            style={{border: '1px solid #b2b2b2'}}
            className={`${
              errors.username ? 'u-border-red u-color-red' : ''
            } ltr placeholder-rtl py-5 px-2.5`}
            type="text"
            {...register('username', loginValidation.username)}
            placeholder="پست الکترونیکی/نام کاربری"
          />
          {errors.username && <span className="inputError">{errors.username.message}</span>}
        </div>

        <div className="inputwraper icon ">
          <input
            style={{border: '1px solid #b2b2b2', paddingLeft: '40px'}}
            autoComplete="new-password"
            className={`${
              errors.password ? 'u-border-red u-color-red' : ''
            } ltr placeholder-rtl py-5 px-2.5`}
            type={`${typeInputText ? 'text' : 'password'}`}
            {...register('password', loginValidation.password)}
            placeholder="رمز عبور"
          />

          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img src={eyes} alt="" onClick={() => setTypeInputText(!typeInputText)} />
          {errors.password && <span className="inputError"> {errors.password.message}</span>}
        </div>

        <div className="inputwraper captcha-input ">
          <div className="captcha-input__img">
            <img
              className="captcha-input__img--base64"
              src={`data:image/png;base64, ${captchaCode}`}
              alt=""
            />
            <RefreshLogo onHandleRefreshLogo={handleCaptcha} />
          </div>
          <input
            style={{border: '1px solid #b2b2b2', paddingLeft: '200px'}}
            {...register('captcha', loginValidation.captcha)}
            maxLength={7}
            autoComplete="off"
            type="text"
            placeholder="  کد امنیتی"
            className={`${
              errors.captcha ? 'u-border-red u-color-red' : ''
            } ltr placeholder-rtl py-5 px-2.5 `}
          />
          {errors.captcha && <span className="inputError">{errors.captcha.message}</span>}
        </div>

        {/* <Checkbox checked={remember} onChange={onRememberChange}/> */}
        <div className="landscape_button">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            // eslint-disable-next-line
            type={`${isLoading ? 'button' : 'submit'}`}
            // eslint-disable-next-line
            className={`login_button ${!true ? ' deactive' : ' active'}`}
            disabled={!true}
          >
            {!isLoading ? 'ورود' : <DotLoading />}
          </button>
        </div>
      </form>
    </>
  );
}
