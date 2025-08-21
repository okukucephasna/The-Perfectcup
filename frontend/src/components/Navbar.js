import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-brown-700 text-white flex justify-between px-6 py-3">
      <h1 className="font-bold text-lg">PerfectCup</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </nav>
  );
}
