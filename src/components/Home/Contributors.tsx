import React from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';

// import Swiper core and required modules
import SwiperCore, {Autoplay} from 'swiper/core';
// normal images

import airbus from '../../assets/images/contributors/main/airbus.png';
import asnaf from '../../assets/images/contributors/main/asnaf.png';
import bus from '../../assets/images/contributors/main/bus.png';
import marzbani from '../../assets/images/contributors/main/marzbani.png';
import naja from '../../assets/images/contributors/main/naja.png';
import president from '../../assets/images/contributors/main/president.png';
import taminEjtemai from '../../assets/images/contributors/main/tamin-ejtemai.png';
import taxirani from '../../assets/images/contributors/main/taxirani.png';
import vezaratBehdasht from '../../assets/images/contributors/main/vezarat-behdasht.png';
import vezaratErtebatat from '../../assets/images/contributors/main/vezarat-ertebatat.png';
import vezaratKeshvar from '../../assets/images/contributors/main/vezarat-keshvar.png';
import vezaratRah from '../../assets/images/contributors/main/vezarat-rah.png';
import vezaratSanatMadan from '../../assets/images/contributors/main/vezarat-sanat-madan-t.png';
import xyxy from '../../assets/images/contributors/main/xyxy.png';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

// install Swiper modules
SwiperCore.use([Autoplay]);

const Contributors = () => {
  const images = [
    marzbani,
    naja,
    president,
    taminEjtemai,
    taxirani,
    airbus,
    vezaratBehdasht,
    vezaratErtebatat,
    asnaf,
    vezaratKeshvar,
    vezaratRah,
    bus,
    vezaratSanatMadan,
    xyxy,
  ];
  return (
    <section className="contributors" id="contributors">
      <div className="u-center-text u-margin-bottom-big">
        <h3 className="heading-forth">
          مشارکت کنندگان
          <span className="heading-forth--sub">
            اخذ تصمیمات صحیح در حوزه‌ی مدیریت بحران نیازمند به ایجاد مجموعه سامانه‌هایی است. اجرای
            این پروژه ملی، تنها با همکاری نزدیک دستگاه‌ها و سازمان‌های ذیل میسر شده است.
          </span>
        </h3>
      </div>
      <div className="contributors-slider">
        <ul>
          <Swiper
            centeredSlides
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            breakpoints={{
              '300': {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              '640': {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              '890': {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              '1298': {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              '1700': {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
            loop
          >
            {images.map((image, index) => {
              return (
                // eslint-disable-next-line
                <SwiperSlide key={index}>
                  <li>
                    <img src={image} alt="" />
                  </li>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default Contributors;
