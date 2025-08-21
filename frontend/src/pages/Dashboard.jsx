import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const [email, setEmail] = useState("");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Decode JWT and extract email
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect if not logged in
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.sub.username); // backend uses username as email
    } catch (err) {
      console.error("Error decoding token", err);
      navigate("/signin");
    }

    // Fetch recipes from backend
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recipes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes", err);
      }
    };
    fetchRecipes();
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Welcome to PerfectCup ☕</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <p className="mt-2 text-gray-700">Logged in as: <strong>{email}</strong></p>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Coffee Recipes</h3>
        {recipes.length === 0 ? (
          <p className="text-gray-600">No recipes yet. Check back later!</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="border p-3 rounded shadow-sm bg-white">
                <h4 className="font-semibold">{recipe.title}</h4>
                <p>{recipe.instructions}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
