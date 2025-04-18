import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface OrderItem {
  order_item_id: string;
  flower_id: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: string;
  customer_id: string;
  order_date: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  payment_method: string;
  OrderItems: OrderItem[];
}

interface CustomerInfo {
  [customerId: string]: string; // customer_id => "First Last"
}

const ConfirmOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerNames, setCustomerNames] = useState<CustomerInfo>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order');
        const allOrders: Order[] = response.data;
        const paddingOrders = allOrders.filter(order => order.status === 'padding');
        setOrders(paddingOrders);

        // Load customer names
        const uniqueCustomerIds = [...new Set(paddingOrders.map(order => order.customer_id))];

        const nameMap: CustomerInfo = {};
        await Promise.all(
          uniqueCustomerIds.map(async (id) => {
            try {
              const res = await axios.get(`http://localhost:5000/api/user/${id}`);
              const data = res.data.data;
              nameMap[id] = `${data.first_name} ${data.last_name}`;
            } catch (error) {
              nameMap[id] = 'ไม่ทราบชื่อ';
              console.error(`Error loading customer ${id}:`, error);
            }
          })
        );
        setCustomerNames(nameMap);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-8 py-10 font-sans bg-pink-50 min-h-screen">
      <div className="grid grid-cols-7 text-center bg-gradient-to-r from-pink-300 to-pink-400 rounded-xl p-4 shadow-md text-white font-bold text-lg overflow-hidden min-h-[80px]">
        <div className="border-l-4 border-white first:border-0 flex items-center justify-center">Order ID</div>
        <div className="border-l-4 border-white flex items-center justify-center">Total Items</div>
        <div className="border-l-4 border-white flex items-center justify-center">Total Price</div>
        <div className="border-l-4 border-white flex items-center justify-center">Address</div>
        <div className="border-l-4 border-white flex items-center justify-center">Payment</div>
        <div className="border-l-4 border-white flex items-center justify-center">Customer</div>
        <div className="border-l-4 border-white flex items-center justify-center">Action</div>
      </div>

      {orders.map((order) => (
        <div
          key={order.order_id}
          className="grid grid-cols-7 text-center bg-pink-100 rounded-xl p-4 mt-3 shadow-inner items-center overflow-hidden min-h-[100px]"
        >
          <div className="border-l-4 border-white first:border-0 flex justify-center items-center text-pink-700 font-semibold">{order.order_id}</div>
          <div className="border-l-4 border-white flex justify-center items-center text-pink-700 font-semibold">
            {order.OrderItems.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น
          </div>
          <div className="border-l-4 border-white flex justify-center items-center text-pink-700 font-semibold">
            ฿{order.OrderItems.reduce((sum, item) => sum + item.price, 0)}
          </div>
          <div className="border-l-4 border-white flex justify-center items-center text-pink-700 font-semibold">
            {order.shipping_address}
          </div>
          <div className="border-l-4 border-white flex justify-center items-center text-pink-700 font-semibold">
            {order.payment_method}
          </div>
          <div className="border-l-4 border-white flex justify-center items-center text-pink-700 font-semibold">
            {customerNames[order.customer_id] || 'Loading...'}
          </div>
          <div className="border-l-4 border-white flex flex-col gap-2 items-center justify-center">
            <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-1 px-4 rounded-full shadow">
              ✅ Confirm
            </button>
            <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-4 rounded-full shadow">
              ❌ Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfirmOrder;
