import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Modal, Button, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const CheckoutScreen = () => {
  const [dateText, setDateText] = useState('2025-04-06')   // วันที่เริ่มต้น
  const [timeText, setTimeText] = useState('14:30')         // เวลาเริ่มต้น
  const [showDateModal, setShowDateModal] = useState(false) // แสดง Modal สำหรับเลือกวันที่
  const [showTimeModal, setShowTimeModal] = useState(false) // แสดง Modal สำหรับเลือกเวลา

  // สร้างตัวเลือกวันที่และเวลา
  const dateOptions = ['2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10', '2025-04-11', '2025-04-12']
  const timeOptions = ['14:30', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']

  // ฟังก์ชันเลือกวันที่
  const handleDateInput = () => {
    setShowDateModal(true)
  }

  // ฟังก์ชันเลือกเวลา
  const handleTimeInput = () => {
    setShowTimeModal(true)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 16 }}>

      {/* Address */}
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 8, }}>Address</Text>
      <View style={{ borderWidth: 2, borderColor: '#AEE2FF', borderRadius: 10, padding: 16, marginBottom: 24 }}>
        <Text>ชื่อ: John Doe ที่อยู่: 123 Maple Street</Text>
        <Text>เมือง: Springfield จังหวัด: CA</Text>
        <Text>รหัสไปรษณีย์: 90210</Text>
        <Text>เบอร์: 022222223</Text>
      </View>

      {/* Date / Time */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={handleDateInput} style={{ padding: 12 }}>
          <FontAwesome name="calendar" size={32} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTimeInput} style={{ padding: 12 }}>
          <FontAwesome name="clock-o" size={32} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
        📅 {dateText} 🕒 {timeText}
      </Text>

      {/* Date Modal */}
      <Modal visible={showDateModal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, width: '80%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>เลือกวันที่</Text>
            <ScrollView>
              {dateOptions.map((date, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  setDateText(date)
                  setShowDateModal(false)
                }} style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                  <Text style={{ fontSize: 18 }}>{date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowDateModal(false)} style={{ marginTop: 16, padding: 12, backgroundColor: '#4A90E2', borderRadius: 8 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Modal */}
      <Modal visible={showTimeModal} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, width: '80%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>เลือกเวลา</Text>
            <ScrollView>
              {timeOptions.map((time, index) => (
                <TouchableOpacity key={index} onPress={() => {
                  setTimeText(time)
                  setShowTimeModal(false)
                }} style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                  <Text style={{ fontSize: 18 }}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowTimeModal(false)} style={{ marginTop: 16, padding: 12, backgroundColor: '#4A90E2', borderRadius: 8 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Summary */}
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 8 }}>Summary</Text>
      <View style={{ borderWidth: 2, borderColor: '#D9B9FF', borderRadius: 10, padding: 16, marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text>Rose bouquet x2</Text>
          <Text>$1000</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text>shipping</Text>
          <Text>free</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <Text>2 items</Text>
          <Text>total: $1000</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: '#4A90E2', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckoutScreen


