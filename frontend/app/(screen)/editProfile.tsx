import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/flora_store";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Contants from "expo-constants";

const API_URL = Contants.expoConfig?.extra?.API_URL;

const EditProfile = () => {
  const refresh = useAuthStore((state) => state.refresh);
  const customer = useAuthStore((state) => state.customer);
  const route = useRouter();

  const imageUri = `${API_URL?.replace(/\/api$/, "").replace(
    /\/$/,
    ""
  )}/${customer?.image_url?.replace(/^(\.\/)/, "").replace(/\\/g, "/")}`;

  const [name, setName] = useState(customer?.first_name + " " + customer?.last_name);
  const [image, setImage] = useState(imageUri);
  const [email, setEmail] = useState(`${customer?.email}`);
  const [phone, setPhone] = useState(`${customer?.phone_number}`);
  const [address, setAddress] = useState(`${customer?.address}`);
  const [imageFile, setImageFile] = useState<ImagePicker.ImagePickerAsset | null>(null); // <- เพิ่มตัวแปรเก็บไฟล์ใหม่

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
      setImageFile(selectedAsset); // เก็บไฟล์ไว้ใช้ตอนอัพโหลด
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("first_name", name.split(" ")[0]);
    formData.append("last_name", name.split(" ")[1]);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("address", address);

    if (imageFile) {
      const uri = imageFile.uri;
      const filename = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image_url", {
        uri,
        name: filename,
        type,
      } as any);
    }

    await axios.put(`${API_URL}/user/${customer?.customer_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await refresh();
    alert(
      "name : " + name +
      "\nemail: " + email +
      "\nphone: " + phone +
      "\naddress: " + address
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="absolute top-0 left-0 w-full h-[109] bg-[#FEACA6] z-10">
        <TouchableOpacity
          className="flex-1 items-start justify-center ml-5 mt-10 mb-3"
          onPress={() => route.back()}
        >
          <Text>
            <AntDesign name="arrowleft" size={40} color="black" />{" "}
            <Text className="text-4xl font-bold">Edit Profile</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 160,
          paddingBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View className="flex-row items-center justify-center mb-10">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: image
                  ? image
                  : "https://media.istockphoto.com/id/1278459951/th/เวคเตอร์/ตัวการ์ตูนดอกไม้น่ารัก.jpg",
              }}
              className="w-44 h-44 rounded-full mr-15 items-center"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View className="gap-6 items-center w-full">
          {/* Name */}
          <View>
            <Text className="text-2xl font-Prompt">Name :</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Email */}
          <View>
            <Text className="text-2xl font-Prompt">Email :</Text>
            <TextInput
              readOnly
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Phone */}
          <View>
            <Text className="text-2xl font-Prompt">Phone :</Text>
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Address */}
          <View>
            <Text className="text-2xl font-Prompt">Address :</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
              multiline={true}
              scrollEnabled={true}
            />
          </View>

          {/* Update Button */}
          <View className="mt-8">
            <TouchableOpacity
              className="bg-[#B4D4F9] w-[200px] h-[50px] rounded-full items-center justify-center"
              onPress={handleUpdate}
            >
              <Text className="text-xl font-bold text-black">Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
