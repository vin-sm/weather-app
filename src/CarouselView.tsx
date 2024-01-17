import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeatherDeatailViewCard from "./WeatherDeatailViewCard";

interface CarouselProps {
  weatherInfo: WeatherData[];
  onRemoveClick: (data: WeatherData) => void;
}
const CarouselView: React.FC<CarouselProps> = ({
  weatherInfo,
  onRemoveClick,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClick = (data: WeatherData) => {
    console.log(data);
    onRemoveClick(data);
  };

  return (
    <Slider {...settings}>
      {weatherInfo.map((item) => (
        <div key={item.id}>
          <WeatherDeatailViewCard
            weatherData={item}
            isFromDashboard={true}
            onRemoveClick={handleClick}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselView;
