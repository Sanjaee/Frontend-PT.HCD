import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const PenjualanForm = () => {
  const [formData, setFormData] = useState({
    marketingId: '',
    cargo_fee: '0',
    total_balance: '',
  });
  const [marketingOptions, setMarketingOptions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketingOptions = async () => {
      try {
        const response = await axios.get('https://backend-pt-hcd.vercel.app/api/marketing');
        const options = response.data.map((marketing) => ({
          value: marketing.id,
          label: marketing.name,
        }));
        setMarketingOptions(options);
      } catch (err) {
        console.error('Error fetching marketing options:', err);
        setError('Failed to load marketing options.');
      }
    };

    fetchMarketingOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      marketingId: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tambahkan date 
      const currentDate = new Date().toISOString();

      const dataToSubmit = {
        ...formData,
        date: currentDate,
      };

      const response = await axios.post('https://backend-pt-hcd.vercel.app/api/penjualan', dataToSubmit);
      setSuccess('Penjualan berhasil ditambahkan!');
      toast.success('Penjualan added successfully!');
      navigate('/');
      setFormData({
        marketingId: '',
        cargo_fee: '',
        total_balance: '',
      });
    } catch (err) {
      setError('Gagal menambahkan penjualan. Coba lagi.');
      console.error('Error adding penjualan:', err);
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Hanya mengizinkan angka
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <div className="h-screen mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Tambah Penjualan</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="marketingId" className="block text-sm font-medium text-gray-700">Marketing</label>
          <Select
            id="marketingId"
            name="marketingId"
            options={marketingOptions}
            value={marketingOptions.find(option => option.value === formData.marketingId)}
            onChange={handleSelectChange}
            className="mt-1"
            placeholder="Pilih Nama Marketing"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cargo_fee" className="block text-sm font-medium text-gray-700">Biaya Cargo</label>
          <input
            type="text"
            id="cargo_fee"
            name="cargo_fee"
            value={formData.cargo_fee}
            placeholder='Masukan nominal biaya cargo'
            onChange={handleNumberInput}
            className="mt-1 block w-full border-gray-600 border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="total_balance" className="block text-sm font-medium text-gray-700">Total Balance</label>
          <input
            type="text"
            id="total_balance"
            name="total_balance"
            value={formData.total_balance}
            placeholder='Masukan nominal total balance'
            onChange={handleNumberInput}
            className="mt-1 block w-full border-gray-600 border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Tambah Penjualan
        </button>
      </form>
    </div>
  );
};

export default PenjualanForm;
