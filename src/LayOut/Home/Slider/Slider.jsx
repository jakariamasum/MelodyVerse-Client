import { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides=[
    "https://img.freepik.com/free-photo/volumetric-musical-background-with-treble-clef-notes-generative-ai_169016-29575.jpg?w=1380&t=st=1686283245~exp=1686283845~hmac=820524001ddf6490eac093453016fdaed7ccc2d0e17d2ba0122c6165c7ca9e48",
    "https://img.freepik.com/free-photo/texture-treble-clef-dark-background-isolated-generative-ai_169016-29582.jpg?w=1380&t=st=1686283308~exp=1686283908~hmac=0944be73df91603939ee5925476a93841d4d8701b1ffa1522e43021be96ee662"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full h-[100vh] relative overflow-hidden border border-gray-300">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
        >
          <img className="w-full h-full object-cover" src={slide} alt={`Image ${index + 1}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl">lets party</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
