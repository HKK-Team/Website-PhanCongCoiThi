import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function Profiles() {
  const user = useSelector((state) => state?.Users?.UserApi?.data);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={style.conTactCard}>
        <View style={{ marginLeft: 15 }}>
          <Image
            style={style.image}
            source={{
              uri: user[0]?.image,
            }}
          ></Image>
        </View>
        <View style={style.contact}>
          <Text style={style.name}>{user[0]?.fullName}</Text>
          <Text style={style.email}>{user[0]?.email}</Text>
        </View>
      </View>
      <View style={style.box}>
        <Text style={style.boxTitle}>Accout</Text>
      </View>
      <View style={style.functionBox}>
        <View style={style.functionCard}>
          <Text
            onPress={(e) => {
              navigation.navigate("Tài khoản");
            }}
          >
            Settings
          </Text>
        </View>
        <View style={style.functionCard}>
          <Text
            onPress={async (e) => {
              await AsyncStorage.removeItem("UserEmail");
              await AsyncStorage.setItem("UserLogin", "false");
              navigation.navigate("Trang chủ");
            }}
          >
            Logout
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  conTactCard: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  contact: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  email: {
    fontSize: 13,
    color: "gray",
  },

  box: {
    padding: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },

  functionBox: {
    backgroundColor: "#fff",
  },
  functionCard: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
