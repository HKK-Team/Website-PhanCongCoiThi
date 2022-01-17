import React, { Fragment, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const style = StyleSheet.create({
  ViewBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  TextBox: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#808080",
    textAlign: "center",
  },
  InputBox: {
    marginBottom: 10,
  },
  input: {
    width: 265,
    height: 40,
    padding: 10,
    borderBottomWidth: 2,
    marginBottom: 3,
  },
  button: {
    width: 265,
    borderRadius: 25,
    padding: 5,
  },
  buttonLogin: {
    width: 265,
    borderRadius: 25,
  },
});

export default function HomePage() {
  const navigation = useNavigation();
  const [keyWord, SetKeyWord] = useState("");
  return (
    <Fragment>
      <View style={style.ViewBox}>
        <View style={style.TextBox}>
          <Text style={style.title}>Hệ thống tra cứu lịch thi</Text>
          <Text style={style.title}>Đại học</Text>
        </View>
        <View style={style.InputBox}>
          <TextInput
            style={style.input}
            value={keyWord}
            onChange={(e) => SetKeyWord(e.nativeEvent.text)}
            placeholder="Mã giảng viên hoặc tên lớp"
          />
          <Button
            title="Tìm"
            style={style.button}
            onPress={() => {
              if (keyWord !== "") {
                navigation.navigate("SearchSchudele", {
                  keyWord: keyWord.toUpperCase(),
                });
              } else {
                Alert.alert("Thông báo", "Bạn chưa nhập từ khóa");
              }
            }}
          />
        </View>
        <Text>OR</Text>
        <View>
          <Button
            title="Login"
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(90, 154, 230, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />
        </View>
      </View>
    </Fragment>
  );
}
