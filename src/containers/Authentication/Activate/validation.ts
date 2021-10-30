import * as Yup from "yup";
import AppRegex from 'src/helpers/regex';

const validationSchema = Yup.object().shape({
	activationCode: Yup.string().matches(AppRegex.smsCode, 'کد فعال سازی را وارد نمایید'),
})
export default validationSchema

