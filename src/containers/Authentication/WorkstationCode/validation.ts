import * as Yup from "yup";


 const validationSchema = Yup.object().shape({
	workshopCode: Yup.string().required('شماره کد گارکاه واحد صنفی را وارد نمایید'),
	branchCode: Yup.string().required('شماره کد شعبه تامین اجتماعی را وارد نمایید'),



})
export default validationSchema

