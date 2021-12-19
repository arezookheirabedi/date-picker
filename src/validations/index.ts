export const loginValidation = {
  username: {
    required: {value: true, message: "* وارد کردن شناسه کاربری اجباری است."},
    maxLength: {value: 60, message: "* شناسه کاربری نمیتواند بیشتر از ۳۰ کاراکتر باشد."},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  password: {
    required: {value: true, message: "* وارد کردن رمز عبور اجباری است."},
    maxLength: {value: 60, message: "* رمز عبور نمیتواند بیشتر از ۶۰ کاراکتر باشد."}
  },
  captcha: {
    required: {value: true, message: "* وارد کردن کدامنیتی اجباری است."}
  }
}