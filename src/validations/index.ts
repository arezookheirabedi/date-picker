export const loginValidation = {
  username: {
    required: {value: true, message: '* وارد کردن شناسه کاربری اجباری است.'},
    maxLength: {value: 60, message: '* شناسه کاربری نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  password: {
    required: {value: true, message: '* وارد کردن رمز عبور اجباری است.'},
    maxLength: {value: 60, message: '* رمز عبور نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
  },
  captcha: {
    required: {value: true, message: '* وارد کردن کدامنیتی اجباری است.'},
  },
};

export const addUserValidation = {
  firstName: {
    required: {value: true, message: '* وارد کردن نام اجباری است.'},
    maxLength: {value: 60, message: '* نام نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  lastName: {
    required: {value: true, message: '* وارد کردن نام خانوادگی اجباری است.'},
    maxLength: {value: 60, message: '* نام خانوداگی نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  mobileSet: {
    // required: {value: true, message: '* وارد کردن شماره موبایل اجباری است.'},
    maxLength: {value: 60, message: '* شماره موبایل نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
    pattern: {value: /^$|^09\d{9}$/i, message: '* فرمت  شماره موبایل درست نمیباشد.'},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  username: {
    required: {value: true, message: '* وارد کردن نام کاربری اجباری است.'},
    maxLength: {value: 60, message: '* نام کاربری نمیتواند بیشتر از ۶۰ کاراکتر باشد.'},
    // pattern: {value: /^\S+@\S+$/i, message: "* فرمت ایمیل درست نمیباشد."}
  },
  email: {
    // required: {value: true, message: '* وارد کردن ایمیل اجباری است.'},
    pattern: {value: /^\S+@\S+$/i, message: '* فرمت ایمیل درست نمیباشد.'},
  },
  nationalId: {
    // required: {value: true, message: '* وارد کردن کدملی اجباری است.'},
    // maxLength: {value: 30, message: "* شناسه کاربری نمیتواند بیشتر از ۳۰ کاراکتر باشد."},
    pattern: {value: /^$|^\d{10}$/i, message: '* فرمت کد ملی درست نمیباشد.'},
  },
  password: {
    required: {value: true, message: '* وارد کردن رمز عبور اجباری است.'},
    // maxLength: {value: 30, message: "* شناسه کاربری نمیتواند بیشتر از ۳۰ کاراکتر باشد."},
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,500}$/i,
      message: '* فرمت رمز عبور درست نمیباشد.',
    },
  },
};
