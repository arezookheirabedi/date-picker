import * as Yup from "yup";
import AppRegex from 'src/helpers/regex';

 const validationSchema = Yup.object().shape({
	mobileNumber: Yup.string().matches(AppRegex.mobileIran,'موبایل خود را با فرمت صحیح وارد نمایید'),
	nationalId: Yup.string().matches(AppRegex.nationalId,'لطفا کد ملی را وارد نمایید'),
	captcha: Yup.string().required('لطفا کد امنیتی را وارد نمایید'),


})
export default validationSchema

/*  checkbox yup	acceptAgreement: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'), 
if i have a function js for check validation input name=tcid
	 tcid: Yup.string().test(
		'tcid',
		'tcid number is not correct',
		(tcid) => 
			 TCNumberValidate(tcid?.toString()) 
		
	)

*/