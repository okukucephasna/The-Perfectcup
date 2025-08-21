import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", { username: email, password });
      alert("Signup successful! Please login.");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Create an Account</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-2 w-64">
        <input type="email" placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} className="border p-2"/>
        <input type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} className="border p-2"/>
        <button type="submit" className="bg-brown-700 text-white py-2">Signup</button>
      </form>
      <p className="mt-2">Already have an account? <Link to="/signin">Signin</Link></p>
    </div>
  );
}
