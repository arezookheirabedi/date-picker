import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import authenticationService from 'src/services/authentication.service';
import publicService from 'src/services/public.service';
import Svg from '../Svg';
// import DotLoading from '../DotLoading';

const {RefreshLogo} = Svg;

type ContactUsForm = {
  email: string;
  name: string;
  content: string;
  captchaCode: string;
  captchaId: string;
};

const ContactUs: React.FC<{}> = () => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [inputCaptchaId, setInputCaptchaId] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: {errors},
    // setError,
  } = useForm<ContactUsForm>();

  const handleCaptcha = async () => {
    try {
      const {data} = await authenticationService.captcha();
      setCaptchaCode(data.captchaBase64);
      setInputCaptchaId(data.id);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  // eslint-disable-next-line
  const onSubmit = async (data: any) => {
    try {
      const res = await publicService.sendMessage({...data, captchaId: inputCaptchaId});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    // {
    // "captchaCode": "foobar",
    // "captchaId": "1234567890",
    // "content": "sample content",
    // "email": "foo@bar.com",
    // "name": "Arthur Morgan"
    // }
  };

  useEffect(() => {
    handleCaptcha();

    return () => {
      setCaptchaCode('');
      setInputCaptchaId('');
    };
  }, []);

  return (
    <div className="contact-us-form" id="contact-us-form">
      <div className="u-center-text u-margin-bottom-medium">
        <h6>با ما در تماس باشید</h6>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="u-margin-bottom-small-3">
          <div className="input-holder">
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              {...register('name', {
                required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
              })}
            />

            <input
              type="text"
              placeholder="پست الکترونیکی"
              {...register('email', {
                required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
              })}
            />
          </div>
        </div>

        <textarea
          cols={20}
          rows={5}
          placeholder="متن پیام..."
          {...register('content', {
            required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
          })}
        />

        <div className="input-holder captcha-input ">
          <div className="captcha-input__img">
            <img
              className="captcha-input__img--base64"
              src={`data:image/png;base64, ${captchaCode}`}
              alt=""
            />
            <RefreshLogo onHandleRefreshLogo={handleCaptcha} />
          </div>
          <input
            style={{border: '1px solid #b2b2b2'}}
            {...register('captchaCode', {
              required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
            })}
            maxLength={7}
            autoComplete="off"
            type="text"
            placeholder="  کد امنیتی"
            className={`${errors.captchaCode ? 'u-border-red u-color-red' : ''}`}
          />
          {errors.captchaCode && <span className="inputError">{errors.captchaCode.message}</span>}
        </div>

        <div className="direction-ltr">
          <button className="btn btn--primary medium phone-block" type="submit">
            ارسال پیام
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
