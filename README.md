# 🌸 Flower Shop App

## 📌 Overview
**Flower Shop App** เป็นแอปพลิเคชันสำหรับขายช่อดอกไม้ ลูกค้าสามารถเลือกซื้อช่อดอกไม้ที่จัดเตรียมไว้แล้ว โดยแยกตามเทศกาล เช่น 🎉 งานมงคล 💖 ความรัก และโอกาสพิเศษอื่นๆ

## ✨ Features
✅ เลือกซื้อช่อดอกไม้ตามเทศกาล
✅ แสดงรายการสินค้า พร้อมรายละเอียดและราคา
✅ ระบบแนะนำช่อดอกไม้ยอดนิยม
✅ ระบบตะกร้าสินค้าและการชำระเงิน
✅ ติดตามสถานะการสั่งซื้อ
✅ รองรับการเข้าสู่ระบบและจัดการบัญชีผู้ใช้

## 🛠 Tech Stack
### 🌍 Frontend
- **React Native (Expo + NativeWind)** - สำหรับพัฒนา UI/UX
- **Zustand หรือ Redux** - สำหรับจัดการสถานะของแอป
- **React Navigation** - สำหรับการนำทางภายในแอป

### 🏗 Backend
- **Node.js (Express.js)** - สำหรับจัดการ API และเซิร์ฟเวอร์
- **Prisma ORM** - สำหรับจัดการฐานข้อมูล
- **PostgreSQL** - เป็นระบบจัดเก็บข้อมูลหลัก
- **Docker Compose** - สำหรับจัดการคอนเทนเนอร์ของแอปพลิเคชัน

---
## 🚀 Installation & Setup
### 📌 Prerequisites
🔹 [Node.js](https://nodejs.org/) (แนะนำให้ใช้เวอร์ชันล่าสุด)
🔹 [Docker](https://www.docker.com/) สำหรับจัดการฐานข้อมูล
🔹 [Expo CLI](https://expo.dev/) สำหรับรันแอปบนมือถือ

### ⚙ Backend Setup
```sh
# 1️⃣ Clone โปรเจค
git clone https://github.com/your-repo/flower-shop-app.git
cd flower-shop-app/backend

# 2️⃣ สร้างไฟล์ .env และตั้งค่าต่างๆ เช่น ฐานข้อมูลและพอร์ต

# 3️⃣ รัน Docker Compose เพื่อสร้างฐานข้อมูล
docker-compose up -d

# 4️⃣ ติดตั้ง dependencies และเริ่มเซิร์ฟเวอร์
npm install
npx prisma migrate dev
npm start
```

### 📱 Frontend Setup
```sh
# 1️⃣ ไปที่โฟลเดอร์ frontend
cd ../frontend

# 2️⃣ ติดตั้ง dependencies
npm install

# 3️⃣ รันแอปด้วย Expo
npx expo start
```

---
## 🔌 API Endpoints (ตัวอย่าง)
📍 `GET /flowers` - ดึงรายการช่อดอกไม้ทั้งหมด
📍 `POST /order` - สร้างคำสั่งซื้อใหม่
📍 `GET /order/:id` - ดูรายละเอียดคำสั่งซื้อ

---
## 📜 License
This project is licensed under the **MIT License**.

## 👤 Author

- *Sukhatai09*  
  - Email: [65112429@dpu.ac.th](mailto:65112429@dpu.ac.th)  
  - GitHub: [Sukhatai09](https://github.com/Sukhatai09)  

- *piyathidaa*  
  - Email: [65112193@dpu.ac.th](mailto:65112193@dpu.ac.th)  
  - GitHub: [piyathidaa](https://github.com/Bhumipax)  

---

🌷 _Made with ❤️ for flower lovers!_

