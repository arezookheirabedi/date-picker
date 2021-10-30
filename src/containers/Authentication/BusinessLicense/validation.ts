import * as Yup from "yup";


 const validationSchema = Yup.object().shape({
	guildCode:Yup.string().required('شماره پروانه کسب را وارد نمایید'),
})
export default validationSchema

