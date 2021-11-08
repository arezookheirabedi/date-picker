const ContactUs = () => {
  return (
    <div className="contact-us-form" id="contact-us-form">
      <div className="u-center-text u-margin-bottom-medium">
        <h6>با ما در تماس باشید</h6>
      </div>

      <form action="">
        <div className="u-margin-bottom-small-3">
          <div className="input-holder">
            <input type="text" placeholder="نام و نام خانوادگی" />

            <input type="text" placeholder="پست الکترونیکی" />
          </div>
        </div>

        <textarea name="" id="" cols={20} rows={5} placeholder="متن پیام..." />

        <div className="direction-ltr">
          <button className="btn btn--primary medium phone-block" type="button" >ارسال پیام</button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
