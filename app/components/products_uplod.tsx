'use client'
import { client } from '@/sanity/lib/client';
import Sidebar from '../components/sidebar';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const SuccessComponent = ({ onGoBack }: { onGoBack: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">Product Uploaded Successfully!</h2>
        <p className="mt-2 text-gray-600">Your product has been successfully added.</p>
        <p className="mt-2 text-gray-600">check on your website or your total products.</p>

        <button
          onClick={onGoBack}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Upload Another Product
        </button>
      </div>
    </div>
  );
};

type FormData = {
  image: FileList;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: string;
  tags: string;
};

const ProductUpload = () => {
  const [isUploaded, setIsUploaded] = useState(false); // State to track upload status

  // Always call hooks at the top level
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleProductUpload = async (data: FormData) => {
    try {
      // Upload image to Sanity
      const imageFile = data.image[0]; // Get file from input
      const imageAsset = await client.assets.upload('image', imageFile);
      
      // Create product with uploaded image reference
      const product = {
        _type: 'car',
        name: data.name,
        brand: data.brand,
        type: data.type,
        fuelCapacity: data.fuelCapacity,
        transmission: data.transmission,
        seatingCapacity: data.seatingCapacity,
        pricePerDay: data.pricePerDay,
        originalPrice: '80,000 USD',
        tags: data.tags.split(','), // Convert comma-separated tags into an array
        image: {
          _type: 'image',
          asset: {
            _ref: imageAsset._id, // Use the uploaded image reference ID
          },
        },
      };

      const response = await client.create(product);
      console.log('Product Created Successfully:', response);
      setIsUploaded(true);
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {isUploaded ? (
          <SuccessComponent onGoBack={() => setIsUploaded(false)} />
        ) : (
          <form className="mt-4" onSubmit={handleSubmit(handleProductUpload)}>
                      <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Upload Product</h2>

            <div className="mb-4">
              <label className="block text-lg">Car Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.name &&
                typeof errors.name.message === 'string' && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Car Brand</label>
              <input
                type="text"
                {...register('brand', { required: 'Brand is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.brand &&
                typeof errors.brand.message === 'string' && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Type</label>
              <input
                type="text"
                {...register('type', { required: 'Type is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.type &&
                typeof errors.type.message === 'string' && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Fuel Capacity</label>
              <input
                type="text"
                {...register('fuelCapacity', { required: 'Fuel Capacity is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.fuelCapacity ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.fuelCapacity && (
                <p className="text-red-500 text-sm">{errors.fuelCapacity.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Transmission</label>
              <input
                type="text"
                {...register('transmission', { required: 'Transmission is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.transmission ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.transmission && (
                <p className="text-red-500 text-sm">{errors.transmission.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Seating Capacity</label>
              <input
                type="text"
                {...register('seatingCapacity', { required: 'Seating Capacity is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.seatingCapacity ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.seatingCapacity && (
                <p className="text-red-500 text-sm">{errors.seatingCapacity.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Price Per Day</label>
              <input
                type="text"
                {...register('pricePerDay', { required: 'Price Per Day is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.pricePerDay ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.pricePerDay && (
                <p className="text-red-500 text-sm">{errors.pricePerDay.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Tags (comma-separated)</label>
              <input
                type="text"
                {...register('tags', { required: 'Tags are required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.tags ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-lg">Image</label>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 rounded-md`}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Upload Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductUpload;
