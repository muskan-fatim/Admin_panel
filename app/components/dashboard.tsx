'use client';
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Cookies from "js-cookie";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// Fetch orders count
const fetchOrderCount = async () => {
  const orders = await client.fetch(`*[_type=="order"]`);
  return orders.length;
};

// Fetch products count
const fetchProductsCount = async () => {
  const products = await client.fetch(`*[_type=="car"]`);
  return products.length;
};

const Dashboard = () => {
  const [countOrder, setCountOrder] = useState<number | null>(null);
  const [countProducts, setCountProducts] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getOrderCount = async () => {
      setCountOrder(await fetchOrderCount());
    };
    
    const getProductsCount = async () => {
      setCountProducts(await fetchProductsCount());
    };

    getOrderCount();
    getProductsCount();
  }, []);

  const handleLogout = () => {
    Cookies.remove("admin"); // Remove admin session
    router.replace("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Dashboard Overview
          </h2>
          
         
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium">Total Products</h3>
            <p className="text-2xl font-bold">
              {countProducts !== null ? countProducts : "Loading..."}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium">Total Orders</h3>
            <p className="text-2xl font-bold">
              {countOrder !== null ? countOrder : "Loading..."}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium">Total Users</h3>
            <p className="text-2xl font-bold">200</p>
          </div>
        </div>

        {/* Logout Button for Large Screens */}
        <div className=" flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
