import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import "./global.css";
import { useState } from "react";
import axios from "axios";
import Contants from 'expo-constants';


const API_URL = Contants.expoConfig?.extra?.API_URL ;

export default function Register() {
  const route = useRouter();
  const screenHeight = Dimensions.get("window").height;

  // STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // 👁️ เพิ่ม states สำหรับ toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePress = async()=> {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const first_name = name.split(" ")[0];
    const last_name = name.split(" ")[1];
    await axios.post(`${API_URL}/register`, {
      email,
      password,
      first_name,
      last_name,
      phone_number: phone,
    })
    
    alert(
      "Name: " +
        first_name +
        "\n" +
        "Last Name: " +
        last_name +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Password: " +
        password +
        "\n" +
        "Phone: " +
        phone
    );
    route.push("/");
  };

  return (
    <View className="flex-1 bg-[#FAEBC3]">
      <ImageBackground
        source={require("../assets/images/backgroundindex.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{ height: screenHeight * 0.5 }}
            className="px-6 pb-8 bg-transparent"
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              {/* Name */}
              <View className="mb-4">
                <Text className="text-2xl font-Prompt text-black">Name :</Text>
                <TextInput
                  className="bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2"
                  placeholder="name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#000000"
                />
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-2xl font-Prompt text-black">Email :</Text>
                <TextInput
                  className="bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2"
                  placeholder="email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#000000"
                />
              </View>

              {/* Password */}
              <View className="mb-4">
                <Text className="text-2xl font-Prompt text-black">Password :</Text>
                <View className="flex-row items-center bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2 pr-4">
                  <TextInput
                    className="flex-1"
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#000000"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text className="text-[#888] font-bold">
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View className="mb-4">
                <Text className="text-2xl font-Prompt text-black">Confirm Password :</Text>
                <View className="flex-row items-center bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2 pr-4">
                  <TextInput
                    className="flex-1"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#000000"
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text className="text-[#888] font-bold">
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Phone */}
              <View className="mb-4">
                <Text className="text-2xl font-Prompt text-black">Phone Number:</Text>
                <TextInput
                  className="bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2"
                  placeholder="phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="#000000"
                />
              </View>

              {/* Register Button */}
              <TouchableOpacity
                className="bg-[#FF85A1] w-[300px] h-[50px] rounded-full items-center justify-center"
                onPress={handlePress}
              >
                <Text className="text-xl font-bold text-white">Register</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
