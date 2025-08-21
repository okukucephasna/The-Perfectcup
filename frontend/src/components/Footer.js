// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-8">
      <p className="text-sm">☕ PerfectCup © {year} | Brew Happiness in Every Cup</p>
    </footer>
  );
}
