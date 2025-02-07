'use client'
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Sidebar from "../components/sidebar";

const fetchOrder = async () => {
  return client.fetch(`
    *[_type=="order"]{
      orderId,
      city,
      paymentMethod,
      status,
      pickupLocation,
      dropoffLocation,
      phone
    }
  `);
};

const Orders = () => {
  interface Order {
    orderId: string;
    city: string;
    paymentMethod: string;
    status: string;
    pickupLocation: string;
    dropoffLocation: string;
    phone: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrder();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Orders</h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Order ID</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">City</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Payment Method</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Status</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Pickup Location</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Dropoff Location</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Phone</th>
                <th className="py-2 px-4 text-left border whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.orderId} className="border">
                    <td className="py-2 px-4 border">{order.orderId}</td>
                    <td className="py-2 px-4 border">{order.city}</td>
                    <td className="py-2 px-4 border">{order.paymentMethod}</td>
                    <td className="py-2 px-4 border">{order.status}</td>
                    <td className="py-2 px-4 border">{order.pickupLocation}</td>
                    <td className="py-2 px-4 border">{order.dropoffLocation}</td>
                    <td className="py-2 px-4 border">{order.phone}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
