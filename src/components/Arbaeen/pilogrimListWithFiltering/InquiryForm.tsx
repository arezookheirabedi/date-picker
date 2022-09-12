import React, {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import cogoToast from 'cogo-toast';
import arbaeenService from 'src/services/arbaeen.service';
import {onPress} from 'src/helpers/utils';
import DotLoading from 'src/components/DotLoading';

interface IProps {
  openModal: () => void;
  setData: (data: any) => void;
}
interface IFormValue {
  nationalId: string | null;
}

const InquiryForm: React.FC<IProps> = ({openModal, setData}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    nationalId: Yup.string().required('کد ملی زائر را وارد نمایید.').length(10, 'dfdsfdsfdsfds'),
  });

  const {handleSubmit, register, formState, reset} = useForm<any>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nationalId: null,
    },
  });

  const onSubmit = async (values: IFormValue) => {
    const newNumber = values.nationalId ? values.nationalId.toEnglishDigits() : null;

    setSubmitted(true);
    try {
      const res = await arbaeenService.pilgrimsInquiryByNationalId({
        nationalId: newNumber,
      });
      setData(res.data);
      openModal();
      reset();
    } catch (errors: any) {
      reset();
      if (errors.errors && errors.errors.length) {
        cogoToast.error(errors.errors[0].message || 'خطا در ارسال اطلاعات');
      }
      if (errors.message) {
        cogoToast.error(errors.message || '');
      }
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <form className="w-full space-y-4 ml-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-3 rtl:space-x-reverse">
        <div className="w-full">
          <input
            onKeyPress={onPress}
            type="text"
            {...register('nationalId')}
            placeholder="کد ملی  "
            className="rtl  relative block w-full rounded-full  bg-white px-5 py-2 placeholder-gray-400 shadow-lg focus:outline-none disabled:bg-gray-50 sm:text-sm  focus-visible disabled:shadow-none"
          />
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            type="submit"
            disabled={submitted}
            className="flex w-full items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-sm text-white rtl:space-x-reverse"
            style={{backgroundColor: !formState.isValid ? 'gray' : '#175A76'}}
          >
            <span>{!submitted ? 'جستجوی زائر' : <DotLoading />}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
export default InquiryForm;
