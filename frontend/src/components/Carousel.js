import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // arrow icons

// Add your images inside this array
const slides = [
  {
    src: "/images/1.jpg",
    text: "Discover secret coffee recipes from around the world ☕",
  },
  {
    src: "/images/2.jpg",
    text: "Join PerfectCup and learn to brew like a pro 🍵",
  },
  {
    src: "/images/3.jpg",
    text: "Make an account today and explore tasty coffee & tea blends! 🌍",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Image */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={slides[index].src}
          alt={`slide-${index}`}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg shadow-md">
        <p className="text-lg font-semibold">{slides[index].text}</p>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-yellow-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
