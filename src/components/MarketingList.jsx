import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MarketingList = () => {
  const [marketing, setMarketing] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        const response = await axios.get(
          "https://backend-pt-hcd.vercel.app/api/marketing"
        );
        setMarketing(response.data);
      } catch (error) {
        console.error("Error fetching marketing", error);
        toast.error("Failed to fetch marketing.");
      } finally {
        setLoading(false);
      }
    };
    fetchMarketing();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-marketing/${id}`);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Apakah yakin ingin menghapus data ini?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`https://backend-pt-hcd.vercel.app/api/marketing/${id}`);
      setMarketing(marketing.filter((marketing) => marketing.id !== id));
      toast.success("Marketing deleted successfully.");
    } catch (error) {
      console.error("Error deleting marketing", error);
      toast.error("Failed to delete marketing.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marketing List</h1>
      <div className="my-4 flex justify-end">
        <Link
          to="/add-marketing"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Tambah Nama Marketing
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600">ID</th>
            <th className="py-3 px-4 text-left w-full text-gray-600">Name</th>
            <th className="py-3 pr-8 text-right text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse border-b">
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex justify-end space-x-2">
                    <div className="h-8 bg-gray-200 rounded w-12"></div>
                    <div className="h-8 bg-gray-200 rounded w-12"></div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            marketing.map((marketing) => (
              <tr key={marketing.id} className="border-b">
                <td className="py-2 px-4">{marketing.id}</td>
                <td className="py-2 px-4">{marketing.name}</td>
                <td className="py-2 px-4">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(marketing.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(marketing.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingList;
