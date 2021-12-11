import React from 'react';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import ProgressBar from './ProgressBar';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface ProgressProjectProps {
  progressBarF: (x: number, y: number, z: number) => void;
}

const ProgressProject: React.FC<ProgressProjectProps> = ({progressBarF}) => {
  return (
    <section className="progress-project" id="progress-project">
      <div className="u-center-text u-margin-bottom-big">
        <h3 className="heading-tertiary">
          وضعیت پیشرفت پروژه
          <span className="heading-tertiary--sub">
            اخذ تصمیمات صحیح در حوزه‌ی مدیریت بحران نیازمند به ایجاد مجموعه سامانه‌هایی است که ضمن
            افزایش مشارکت شهروندان در کنترل بحران بستر‌های داده‌کاوی مناسبی را در راستای تصمیم‌سازی
            نهادهای متولی ایجاد نماید.
          </span>
        </h3>
      </div>

      <div className="progress-slider">
        <Swiper
          pagination={{
            el: '.slider__dots',
            type: 'bullets',
            bulletActiveClass: 'slider__dots--active',
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
          onSlideChange={() => {
            progressBarF(80, 100, 1);
            progressBarF(85, 100, 2);
            progressBarF(100, 100, 3);
            progressBarF(90, 100, 4);
            progressBarF(100, 100, 5);
            progressBarF(100, 100, 6);
            progressBarF(100, 100, 7);
            progressBarF(100, 100, 8);
            progressBarF(100, 100, 9);
            progressBarF(65, 100, 10);
          }}
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
        >
          <SwiperSlide key={0} virtualIndex={0}>
            <div className="d-block">
              <div className="progress-slider__holder">
                <ProgressBar percentage={0} text="تامین سخت افزار" p_id={3} />
                <ProgressBar percentage={0} text="نصب و راه اندازی سامانه ها" p_id={2} />
                <ProgressBar percentage={0} text="اتصال به مبادی داده" p_id={1} />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide key={1} virtualIndex={1}>
            <div className="d-block">
              <div className="progress-slider__holder">
                <ProgressBar percentage={0} text="سکوی مدیریت اصناف" p_id={4} />
                <ProgressBar percentage={0} text="سکوی مسافران (مرزبانی)" p_id={5} />
                <ProgressBar percentage={0} text="حمل و نقل عمومی" p_id={6} />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide key={2} virtualIndex={2}>
            <div className="d-block">
              <div className="progress-slider__holder">
                <ProgressBar percentage={0} text="آموزش و پرورش" p_id={7} />
                <ProgressBar percentage={0} text="آموزش عالی" p_id={8} />
                <ProgressBar percentage={0} text="فروش بلیط اماکن ورزشی" p_id={9} />
                <ProgressBar percentage={0} text="LIS" p_id={10} />
              </div>
            </div>
          </SwiperSlide>
          <div className="slider__dots two u-margin-top-big" />
        </Swiper>
      </div>
    </section>
  );
};
export default ProgressProject;
