import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const HasilPerhitunganList = () => {
  const [hasilPerhitungan, setHasilPerhitungan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-pt-hcd.vercel.app/api/hasil");
        setHasilPerhitungan(response.data);
      } catch (error) {
        console.error("Error fetching hasil perhitungan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`https://backend-pt-hcd.vercel.app/api/hasil/${id}`);
        setHasilPerhitungan(prevData => prevData.filter(item => item.id !== id));
        toast.success("Data berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting hasil perhitungan:", error);
        toast.error("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hasil Perhitungan List</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600">ID</th>
            <th className="py-3 px-4 text-left text-gray-600">Marketing</th>
            <th className="py-3 px-4 text-left text-gray-600">Bulan</th>
            <th className="py-3 px-4 text-right text-gray-600">Omzet</th>
            <th className="py-3 px-4 text-right text-gray-600">Komisi Persen</th>
            <th className="py-3 px-4 text-right text-gray-600">Komisi Nominal</th>
            <th className="py-3 px-4 text-right text-gray-600">Hapus</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Skeleton Rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse border-b">
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))
          ) : (
            // Actual Data Rows
            hasilPerhitungan.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.marketing}</td>
                <td className="py-2 px-4">{item.bulan}</td>
                <td className="py-2 px-4 text-right">
                  {item.omzet.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-right">
                  {item.komisi_persen.toFixed(2)}%
                </td>
                <td className="py-2 px-4 text-right">
                  {item.komisi_nominal.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-right">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HasilPerhitunganList;
