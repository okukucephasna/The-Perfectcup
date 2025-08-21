import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ title: "", instructions: "" });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode JWT to get admin email
  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.sub.username);
    } catch (err) {
      navigate("/signin");
    }

    fetchData();
  }, [navigate]);

  // Fetch recipes and users
  const fetchData = async () => {
    try {
      const resRecipes = await axios.get("http://localhost:5000/recipes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecipes(resRecipes.data);

      const resUsers = await axios.get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(resUsers.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // Add Recipe
  const handleAddRecipe = async () => {
    try {
      await axios.post("http://localhost:5000/recipes", newRecipe, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddModal(false);
      setNewRecipe({ title: "", instructions: "" });
      fetchData();
    } catch (err) {
      console.error("Error adding recipe", err);
    }
  };

  // Edit Recipe
  const handleEditRecipe = async (id) => {
    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, newRecipe, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEditModal(null);
      fetchData();
    } catch (err) {
      console.error("Error editing recipe", err);
    }
  };

  // Delete Recipe/User
  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`http://localhost:5000/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDeleteModal(null);
      fetchData();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  // Pagination helpers
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <p className="text-gray-600">Logged in as: <strong>{email}</strong></p>

      {/* Recipes Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Manage Recipes</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Recipe
          </button>
        </div>
        <table className="w-full mt-3 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Instructions</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipes.map((recipe) => (
              <tr key={recipe.id} className="border-b">
                <td className="p-2">{recipe.title}</td>
                <td className="p-2">{recipe.instructions}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setNewRecipe(recipe);
                      setShowEditModal(recipe.id);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal({ id: recipe.id, type: "recipes" })}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-2 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(recipes.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-brown-700 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Users Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Manage Users</h3>
        <table className="w-full mt-3 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  <button
                    onClick={() => setShowDeleteModal({ id: user.id, type: "users" })}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-2 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-brown-700 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl mb-4">Add Recipe</h3>
            <input
              type="text"
              placeholder="Title"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Instructions"
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddRecipe} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl mb-4">Edit Recipe</h3>
            <input
              type="text"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowEditModal(null)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => handleEditRecipe(showEditModal)} className="px-3 py-1 bg-blue-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this {showDeleteModal.type.slice(0, -1)}?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowDeleteModal(null)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => handleDelete(showDeleteModal.id, showDeleteModal.type)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
