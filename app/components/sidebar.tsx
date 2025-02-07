'use client';
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu toggle

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 fixed top-4 left-4 z-50 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen bg-blue-500 text-white w-64 p-4 
          transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-[999]`}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="mt-6 space-y-3">
          <li><Link href="/" className="block py-2 hover:bg-blue-600 px-4 rounded-md" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          <li><Link href="/Upload" className="block py-2 hover:bg-blue-600 px-4 rounded-md" onClick={() => setIsOpen(false)}>Product Upload</Link></li>
          <li><Link href="/orders" className="block py-2 hover:bg-blue-600 px-4 rounded-md" onClick={() => setIsOpen(false)}>Orders</Link></li>
          <li><Link href="/Allproducts" className="block py-2 hover:bg-blue-600 px-4 rounded-md" onClick={() => setIsOpen(false)}>All Products</Link></li>
          <li> <Link href="/Delete" className="block py-2 hover:bg-red-600 px-4 rounded-md">Delete Product</Link></li>

        </ul>
      </div>

      {/* Overlay when Sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-[998]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
