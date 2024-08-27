// components/MarketingForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MarketingForm = () => {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchMarketing = async () => {
        try {
          const response = await axios.get(`https://backend-pt-hcd.vercel.app/api/marketing/${id}`);
          setName(response.data.name);
        } catch (error) {
          console.error('Error fetching marketing', error);
          toast.error('Failed to fetch marketing data.');
        }
      };
      fetchMarketing();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://backend-pt-hcd.vercel.app/api/marketing/${id}`, { name });
        toast.success('Marketing updated successfully!');
      } else {
        await axios.post('https://backend-pt-hcd.vercel.app/api/marketing', { name });
        toast.success('Marketing added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving marketing', error);
      toast.error('Failed to save marketing.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Add'} Marketing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukan nama.."
            className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    
    </div>
  );
};

export default MarketingForm;
