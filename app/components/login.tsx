'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    Cookies.set("admin", "true", { expires: 1 }); // Expires in 1 day
  window.location.href = "/"; // Redirect after login
    const validAdminKey = '9819'; 
    const validPassword = 'mornet98'; 
    if (adminKey === validAdminKey && password === validPassword) {
      router.push('/'); 
    } else if (password !== validPassword) {
      setError('Invalid password');
    } else {
      setError('Invalid Admin Key');
    }
  };

  if (!isClient) {
    // This ensures the page is only rendered on the client-side
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-500 to-blue-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800" id="admin-login-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4" aria-labelledby="admin-login-title">
          <motion.label whileFocus={{ scale: 1.05 }} className="block text-gray-700">
            Admin Email
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required 
              aria-required="true"
              aria-label="Admin Email"
            />
          </motion.label>
          <motion.label whileFocus={{ scale: 1.05 }} className="block text-gray-700">
            Password
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              aria-required="true"
              aria-label="Password"
            />
          </motion.label>
          <motion.label whileFocus={{ scale: 1.05 }} className="block text-gray-700">
            Admin Key
            <input 
              type="text" 
              placeholder="Enter admin key" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={adminKey} 
              onChange={(e) => setAdminKey(e.target.value)} 
              required 
              aria-required="true"
              aria-label="Admin Key"
            />
          </motion.label>
          {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            aria-label="Login"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          <Link href="https://hackthone-3-two.vercel.app/" className="text-blue-500 hover:underline" aria-label="Back to Home">Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}
