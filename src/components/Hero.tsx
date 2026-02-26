"use client";

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from './Slide'; // Asegúrate de tener este componente creado

const Hero = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  // Array de datos para cada slide
  const slides = [
    {
      src: "/assets/s1final.jpg",
      caption: "Descubre la mejor forma de aprender francés",
    },
    {
      src: "/assets/s2final.jpg",
      caption: "Cursos intensivos y personalizados",
    },
    {
      src: "/assets/s3nuevo3.jpg",
      caption: "Evalúa tu nivel con una prueba rápida",
    },
  ];

  return (
    <section className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            src={slide.src}
            alt={`Slide ${index + 1}`}
            caption={slide.caption}
          />
        ))}
      </Slider>
    </section>
  );
};

export default Hero;

