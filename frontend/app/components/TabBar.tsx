import { View, StyleSheet, Image } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();

  const icon = {
    homepage: (
        <AntDesign name="home" size={24} color="white" />
    ),
    allproduct: (
        <Feather name="shopping-bag" size={24} color="white" />
    ),
    user: (
        <AntDesign name="user" size={24} color="white" />
    ),
  };

  return (
    <View className="items-center">
      <View style={styles.tabbar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // console.log(route.name); //ดูชื่อไฟล์ที่ต้องการแสดงใน tab bar พวก homepage,allproduct ,user
          // if (["[name].tsx"].includes(route.name)) { // //ถ้าไม่ต้องการให้แสดงใน tab bar ให้ใส่ชื่อไฟล์ที่ต้องการแสดงใน tab bar ลงไปใน array
          //   return null;
          // }  

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabbarItem}
            >
              <View
                className={
                  isFocused
                    ? "bg-[#D83546] h-[55] w-[55] rounded-full items-center justify-center"
                    : ""
                }
              >
                {
                  // @ts-ignore
                  icon[route.name]
                }
              </View>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEACA6",
    height: 65,
    width: 370,
    borderRadius: 74 / 2,
    borderCurve: "continuous",
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
