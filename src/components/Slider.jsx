import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './slider.css'; // Custom styles for animation and layout

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&h=350', // Mountain scenery
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&h=350', // City skyline
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&h=350', // Traditional building
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&h=350', // Countryside road
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&h=350', // Lake and boat
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="slider-container">
      <button className="nav left" onClick={prevSlide}><FaChevronLeft /></button>
      <img src={slides[current].image} alt={`Slide ${current}`} className="slide-img" />
      <button className="nav right" onClick={nextSlide}><FaChevronRight /></button>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
