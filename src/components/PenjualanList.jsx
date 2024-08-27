import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PenjualanList = () => {
  const [penjualan, setPenjualan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-pt-hcd.vercel.app/api/penjualan"
        );
        setPenjualan(response.data);
      } catch (error) {
        console.error("Error fetching penjualan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Penjualan List</h1>
      <div className="my-4 flex justify-end">
        <Link
          to="/penjualan"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Test Logika Pembayaran
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600">ID</th>
            <th className="py-3 px-4 text-left text-gray-600">
              Transaction Number
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Marketing ID</th>
            <th className="py-3 px-4 text-left text-gray-600">Date</th>
            <th className="py-3 px-4 text-right text-gray-600">Cargo Fee</th>
            <th className="py-3 px-4 text-right text-gray-600">Total Balance</th>
            <th className="py-3 px-4 text-right text-gray-600">Grand Total</th>
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
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3 text-right"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 text-right"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 text-right"></div>
                </td>
              </tr>
            ))
          ) : (
            penjualan.map((penjualan) => (
              <tr key={penjualan.id} className="border-b">
                <td className="py-2 px-4">{penjualan.id}</td>
                <td className="py-2 px-4">{penjualan.transaction_number}</td>
                <td className="py-2 px-4">{penjualan.marketingId}</td>
                <td className="py-2 px-4">
                  {new Date(penjualan.date).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4 text-right">
                  {penjualan.cargo_fee.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-right">
                  {penjualan.total_balance.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-right">
                  {penjualan.grand_total.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PenjualanList;
