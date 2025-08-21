// src/components/Home.jsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const carouselText = [
  "☕ Welcome to PerfectCup – Learn how to brew coffee like a pro!",
  "✨ Create an account to unlock exclusive coffee and tea recipes.",
  "📖 New recipes are uploaded regularly by the admin – don’t miss out!",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselText.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + carouselText.length) % carouselText.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="relative w-full max-w-2xl">
          <div className="bg-amber-100 rounded-2xl shadow-lg p-8 min-h-[200px] flex items-center justify-center">
            <p className="text-xl font-medium text-gray-700">{carouselText[current]}</p>
          </div>
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            ⬅
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            ➡
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
