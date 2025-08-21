import { useState, useEffect } from "react";

const messages = [
  "Discover secret coffee recipes from around the world ☕",
  "Join PerfectCup and learn to brew like a pro 🍵",
  "Make an account today and explore tasty coffee & tea blends! 🌍"
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100 p-8 text-center rounded-lg shadow-md">
      <p className="text-xl font-semibold">{messages[index]}</p>
    </div>
  );
}
