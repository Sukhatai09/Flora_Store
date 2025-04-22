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

  const [editingFlowerId, setEditingFlowerId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Flower>>({});
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

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
    formData.append('image_url', imageFile);

    try {
      const response = await axios.post('http://localhost:5000/api/flower', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  const startEditing = (flower: Flower) => {
    setEditingFlowerId(flower.flower_id);
    setEditValues({ ...flower });
    setEditImagePreview(null);
    setEditImageFile(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: name === 'price' || name === 'stock_quantity' ? Number(value) : value }));
  };

  const handleEditSubmit = async (flower_id: string) => {
    try {
      const formData = new FormData();
      if (editValues.name) formData.append('name', editValues.name);
      if (editValues.description) formData.append('description', editValues.description);
      if (editValues.price !== undefined) formData.append('price', editValues.price.toString());
      if (editValues.stock_quantity !== undefined) formData.append('stock_quantity', editValues.stock_quantity.toString());
      if (editImageFile) {
        formData.append('image', editImageFile);
      }

      const response = await axios.put(`http://localhost:5000/api/flower/${flower_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updatedFlower = response.data.data;

      setNewFlowers((prev) =>
        prev.map((flower) => (flower.flower_id === flower_id ? updatedFlower : flower))
      );

      setEditingFlowerId(null);
      setEditValues({});
      setEditImageFile(null);
      setEditImagePreview(null);
    } catch (error) {
      console.error('Error updating flower:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตดอกไม้');
    }
  };

  const handleDelete = async (flower_id: string) => {
    const confirmDelete = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบดอกไม้นี้?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/flower/${flower_id}`);
      setNewFlowers((prev) => prev.filter((flower) => flower.flower_id !== flower_id));
      alert('ลบข้อมูลเรียบร้อยแล้ว');
    } catch (error) {
      console.error('Error deleting flower:', error);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#f00784] mb-10">🌸 ร้านดอกไม้ของเรา 🌸</h1>

      <div>
        <h2 className="text-2xl font-bold text-[#f00784] mb-4">ADD NEW FLOWER</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อดอกไม้" className="w-full mb-2 border rounded px-3 py-2" required />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="รายละเอียด" className="w-full mb-2 border rounded px-3 py-2" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="ราคา" className="border rounded px-3 py-2" required />
            <input type="text" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} placeholder="จำนวนในสต็อก" className="border rounded px-3 py-2" required />
          </div>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }} className="w-full mt-2" required />
          {preview && <img src={preview} alt="preview" className="w-48 h-48 object-cover mt-2 rounded-lg" />}
          <button type="submit" className="bg-[#f00784] hover:bg-pink-700 text-white font-bold py-2 px-6 rounded mt-4">➕ ADD</button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newflowers.map((item) => (
          <div key={item.flower_id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
            <img src={`http://localhost:5000/${item.image_url}`} alt={item.name} className="w-[200px] h-64 object-cover rounded-xl shadow mb-4" />
            {editingFlowerId === item.flower_id ? (
              <div className="w-full">
                <input type="text" name="name" value={editValues.name || ''} onChange={handleEditChange} placeholder="ชื่อดอกไม้" className="w-full border px-2 py-1 mb-2" />
                <input type="text" name="description" value={editValues.description || ''} onChange={handleEditChange} placeholder="รายละเอียด" className="w-full border px-2 py-1 mb-2" />
                <input type="number" name="price" value={editValues.price || ''} onChange={handleEditChange} placeholder="ราคา" className="w-full border px-2 py-1 mb-2" />
                <input type="number" name="stock_quantity" value={editValues.stock_quantity || ''} onChange={handleEditChange} placeholder="จำนวนสต็อก" className="w-full border px-2 py-1 mb-2" />
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditImageFile(file);
                    setEditImagePreview(URL.createObjectURL(file));
                  }
                }} className="w-full mb-2" />
                {editImagePreview && <img src={editImagePreview} className="w-32 h-32 object-cover rounded mb-2" />}
                <div className="flex gap-2">
                  <button onClick={() => handleEditSubmit(item.flower_id)} className="bg-green-500 text-white px-4 py-1 rounded">บันทึก</button>
                  <button onClick={() => setEditingFlowerId(null)} className="bg-gray-400 text-white px-4 py-1 rounded">ยกเลิก</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#f00784] mb-1">{item.name}</h2>
                <p className="text-gray-600 text-sm text-center mb-2">{item.description}</p>
                <p className="text-lg font-semibold text-[#f00784]">฿{item.price}</p>
                <p className="text-sm text-gray-500 mb-4">คงเหลือ: {item.stock_quantity} ชิ้น</p>
                <div className="flex gap-2">
                  <button className="bg-[#f00784] hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold" onClick={() => startEditing(item)}>แก้ไข</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold" onClick={() => handleDelete(item.flower_id)}>ลบ</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
