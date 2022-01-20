import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useSelector } from "react-redux";

export default function ChangeProfiles() {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.Users?.UserApi?.data[0]);
  const loading = useSelector((state) => state.Users.UserApi.loading);
  const [maVienChuc, setMaVienChuc] = useState(user?.maVienChuc);
  const [maKhoa, setMaKhoa] = useState(user?.maKhoa);

  const handleChangeProfiles = (e) => {
    const profile = { ...user, maVienChuc, maKhoa };
    axios.post("http://10.0.2.2:5000/lecturer/edituser", { ...profile });
    Alert.alert("Thông báo", "Cập nhật thành công");
    navigation.navigate("Lịch Thi");
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" />
    );
  }
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold", paddingBottom: 20 }}>
        ChangeProfiles
      </Text>
      <Input
        placeholder={user.maKhoa}
        value={maKhoa}
        onChange={(e) => setMaKhoa(e.nativeEvent.text)}
      />
      <Input
        placeholder={user.maVienChuc}
        value={maVienChuc}
        onChange={(e) => setMaVienChuc(e.nativeEvent.text)}
      />
      <Button
        title="Lưu"
        buttonStyle={{
          backgroundColor: "rgba(78, 116, 289, 1)",
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={handleChangeProfiles}
      />
    </View>
  );
}
