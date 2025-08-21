import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username: email, password });
      localStorage.setItem("token", res.data.token);

      // Decode JWT role (basic way if backend sends role)
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      if (payload.sub.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Signin failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Signin to PerfectCup</h2>
      <form onSubmit={handleSignin} className="flex flex-col gap-2 w-64">
        <input type="email" placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} className="border p-2"/>
        <input type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} className="border p-2"/>
        <button type="submit" className="bg-brown-700 text-white py-2">Signin</button>
      </form>
      <p className="mt-2">Don’t have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
