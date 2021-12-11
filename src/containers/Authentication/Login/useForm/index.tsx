import React, { FormEvent, useState } from "react";

export interface ILogin {
  [key: string]: any;
  username: { value: string; isValid: boolean };
  password: { value: string; isValid: boolean };
  captchaCode: { value: string; isValid: boolean };
}

const userPass = localStorage.getItem("storageRemember");
const val = JSON.parse(userPass!);

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const initialValues = {
  username: val
    ? { value: val.depdepartmentUsername, isValid: true }
    : { value: "", isValid: false },
  password: val
    ? { value: val.depatrmentPass, isValid: true }
    : { value: "", isValid: false },
  captchaCode: { value: "", isValid: false },
};
export default function useForm(Login: any, captchaId: string) {
  const [values, setValuse] = useState<ILogin>(initialValues);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState({ email: "" });

  const Validation = (name: string, isValid: boolean) => {
    let valid = isValid;
    const inputs = ["username", "password", "captchaCode"];
    const otherInputs = inputs.filter((i) => i !== name);
    otherInputs.forEach((g) => {
      console.log(values[g].isValid, name);
      valid = valid && values[g].isValid;
    });
    return valid;
  };

  const checkValidate = (name: string, value: string) => {
    switch (name) {
      case "username":
        return emailRegex.test(value);
      case "password":
        return !!value;
      case "captchaCode":
        return !!value;
      default:
        return false;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const isValid = checkValidate(name, value);

    if (!isValid && name === "username") {
      setError({ email: "فرمت ایمیل  صحیح نمی باشد." });
    } else if (isValid && name==="username") {
      setError({ email: "" });
    }

    setValuse({ ...values, [name]: { value, isValid } });

    setFormValid(Validation(name, isValid));

  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data = {
      password: values.password.value,
      captchaCode: values.captchaCode.value,
      username: values.username.value,
      captchaId,
    };
    Login(Data);
  };

  return { handleChange, values, handleSubmit, formValid, error };
}
