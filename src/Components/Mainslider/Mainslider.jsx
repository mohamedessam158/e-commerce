import React from 'react';
import Slider from "react-slick";
import panner1 from "../../assets/images/1.gif"
import panner2 from "../../assets/images/2.gif"
import panner3 from "../../assets/images/3.gif"
import panner4 from "../../assets/images/4.gif"
import panner5 from "../../assets/images/5.gif"
import panner6 from "../../assets/images/6.gif"
import panner7 from "../../assets/images/7.gif"
import panner8 from "../../assets/images/8.gif"

export default function Mainslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500
  };
  return (
    <>
        <Slider {...settings}>
    
    <img src={panner1} alt="" />
    <img src={panner2} alt="" />
    <img src={panner3} alt="" />
    <img src={panner4} alt="" />
    <img src={panner5} alt="" />
    <img src={panner6} alt="" />
    <img src={panner7} alt="" />
    <img src={panner8} alt="" />
     

    </Slider>
    </>
  )
}
