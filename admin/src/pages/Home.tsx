import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface Flower {
  flower_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

const Home: React.FC = () => {
  const [newflowers, setNewFlowers] = useState<Flower[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flower?page=1&limit=30');
        setNewFlowers(response.data.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('กรุณาเลือกรูปภาพก่อน');
      return;
    }

    if (!price || isNaN(Number(price)) || !stockQuantity || isNaN(Number(stockQuantity))) {
      alert('กรุณากรอกตัวเลขให้ถูกต้องในช่องราคาและจำนวนสต็อก');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price).toString());
    formData.append('stock_quantity', parseInt(stockQuantity).toString());
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:5000/api/flower', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('เพิ่มดอกไม้เรียบร้อยแล้ว');
      setNewFlowers([...newflowers, response.data.data]);
      setName('');
      setDescription('');
      setPrice('');
      setStockQuantity('');
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Error uploading:', error);
      alert('เกิดข้อผิดพลาดในการอัปโหลด');
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#f00784] mb-10">
        🌸 ร้านดอกไม้ของเรา 🌸
      </h1>

      <div>
        <h2 className="text-2xl font-bold text-[#f00784] mb-4">ADD NEW FLOWER</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ชื่อดอกไม้</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อดอกไม้"
              className="w-full border rounded px-3 py-2 shadow focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">รายละเอียด</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="รายละเอียด"
              className="w-full border rounded px-3 py-2 shadow focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">ราคา</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="ราคา"
                className="w-full border rounded px-3 py-2 shadow focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">จำนวนสต็อก</label>
              <input
                type="text"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="จำนวนที่มีในสต็อก"
                className="w-full border rounded px-3 py-2 shadow focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">เลือกรูปภาพ</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full"
              required
            />
          </div>

          {preview && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">ตัวอย่างรูปภาพ:</p>
              <img src={preview} alt="preview" className="w-48 h-48 object-cover rounded-lg" />
            </div>
          )}

          <button
            type="submit"
            className="bg-[#f00784] hover:bg-pink-700 text-white font-bold py-2 px-6 rounded transition"
          >
            ➕ ADD
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newflowers.map((item) => (
          <div
            key={item.flower_id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition transform hover:scale-105 duration-300"
          >
            <img
              src={`http://localhost:5000/${item.image_url}`}
              alt={item.name}
              className="w-[200px] h-64 object-cover rounded-xl shadow mb-4"
            />
            <h2 className="text-xl font-bold text-[#f00784] mb-1">{item.name}</h2>
            <p className="text-gray-600 text-sm text-center mb-2">{item.description}</p>
            <p className="text-lg font-semibold text-[#f00784]">฿{item.price}</p>
            <p className="text-sm text-gray-500 mb-4">คงเหลือ: {item.stock_quantity} ชิ้น</p>
            <button className="bg-[#f00784] hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300">
              แก้ไข
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
