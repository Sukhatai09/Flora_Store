import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const bockData = {
  name: "cream",
  email: "65112429@dpu.ac.th",
  phone: "085258697",
  image: "../../assets/images/cream2.jpg",
  Addess: "1234",
};

const editProfile = () => {
  const route = useRouter();
  const [name, setName] = useState(bockData.name);
  const [image, setImage] = useState(bockData.image);
  const [email, setEmail] = useState(bockData.email);
  const [phone, setPhone] = useState(bockData.phone);
  const [addess, setAddess] = useState(bockData.Addess);

  const handleUpdate = () => {
    alert(
      "name : " + name + "\n" + "email: " + email + "\n" + "phone: " + phone
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
          <Image
            source={require("../../assets/images/cream2.jpg")}
            className="w-44 h-44 rounded-full"
            resizeMode="cover"
          />
        </View>

        {/* Input Fields */}
        <View className="gap-6 items-center w-full">
          {/* Name */}
          <View>
            <Text className="text-2xl font-Prompt">Name :</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Email */}
          <View>
            <Text className="text-2xl font-Prompt">Email :</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Phone */}
          <View>
            <Text className="text-2xl font-Prompt">Phone :</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
            />
          </View>

          {/* Address */}
          <View>
            <Text className="text-2xl font-Prompt">Address :</Text>
            <TextInput
              value={addess}
              onChangeText={setAddess}
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full text-center text-xl mt-2"
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

export default editProfile;
