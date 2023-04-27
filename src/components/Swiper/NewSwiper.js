import {React, useState, useRef} from 'react';
import * as Icon from 'react-bootstrap-icons';
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';

export default function NewSwiper({children}) {
  
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },  
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 41
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 41
          },
          881: {
            slidesPerView: 3,
            spaceBetween: 41
          },
          1210: {
            slidesPerView: 4,
            spaceBetween: 41
          },
        }
      });

    return (
        <>
            <div className="swiper">
              <div className="swiper-wrapper">
                    {children}
              </div>
              <span>
                <Icon.ArrowLeftCircleFill className="swiper-button-prev"/>
              </span>
              <span>
                <Icon.ArrowRightCircleFill className="swiper-button-next"/>
              </span>
            </div>
        </>
    )
}
