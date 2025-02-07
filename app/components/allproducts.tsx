'use client';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Sidebar from './sidebar';

// Fetch all cars from Sanity
const fetchAllCars = async () => {
  return await client.fetch(
    `*[_type == "car"]{
      _id,
      name,
      "image": image.asset->url,
      type,
      pricePerDay,
      fuelCapacity,
      seatingCapacity,
      transmission,
      tags
    }`
  );
};

const AllProducts = () => {
  interface Car {
    _id: string;
    name: string;
    image: string;
    type: string;
    pricePerDay: number;
    fuelCapacity: string;
    seatingCapacity: number;
    transmission: string;
    tags: string[];
  }

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchAllCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    getCars();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 w-full">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">All Cars</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl p-5"
              >
                {/* Car Image */}
                <div className="relative  bg-gray-100">
                  <Image
                    src={car.image}
                    alt={car.name}
                   
                    width={400}
  height={300

  }
  style={{ objectFit: 'cover' }}

                    className="rounded-t-lg image"
                  />
                </div>

                {/* Car Details */}
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{car.name}</h3>
                  <p className="text-gray-500 text-sm">{car.type}</p>
                  <p className="text-gray-800 font-bold text-lg mt-2">${car.pricePerDay} / day</p>

                  {/* Car Specs */}
                  <div className="mt-3 flex flex-wrap gap-2 text-gray-600 text-sm">
                    <span>🚗 {car.fuelCapacity} Fuel</span>
                    <span>🧑‍🤝‍🧑 {car.seatingCapacity} Seats</span>
                    <span>⚙ {car.transmission}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {car.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No cars available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
