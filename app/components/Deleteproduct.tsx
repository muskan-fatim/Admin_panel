'use client';
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import Sidebar from "./sidebar";

const DeleteProduct = () => {
  const [carName, setCarName] = useState("");
  const [message, setMessage] = useState("");

  // Function to find and delete product by car name
  const handleDelete = async () => {
    if (!carName) {
      setMessage("⚠️ Please enter a car name!");
      return;
    }

    try {
      // Find product by car name
      const product = await client.fetch(
        `*[_type=="car" && name == $name][0]{_id}`,
        { name: carName }
      );

      if (!product) {
        setMessage("❌ No product found with this name!");
        return;
      }

      // Delete the product by ID
      await client.delete(product._id);
      setMessage("✅ Product deleted successfully! check on All products or your website");
      setCarName(""); // Clear input after success
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      setMessage("❌ Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md mt-20">
      <h2 className="text-xl font-bold text-red-600 mb-4">Delete Product</h2>

      <input
        type="text"
        placeholder="Enter Car Name"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded-md w-full"
      >
        Delete Product
      </button>

      {message && (
        <p className={`mt-4 text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
    </div>
  );
};

export default DeleteProduct;
