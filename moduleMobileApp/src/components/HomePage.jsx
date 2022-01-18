import React, { Fragment, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [keyWord, SetKeyWord] = useState(null);

  const handleGoogleLogin = () => {
    const config = {
      androidClientId: `430133284141-aripstm3g93ktpocm2mv473sgiaj34c0.apps.googleusercontent.com`,
      scopes: [`profile`, `email`],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user, accessToken, idToken } = result;
        const users = {
          email: user.email,
          fullName: user.name,
          firstName: user.familyName,
          lastName: user.givenName,
          ID: user.id,
          image: user.photoUrl,
          accessToken: accessToken,
          token_ID: idToken,
          Api: "Google",
        };
        let reg = /^([0-9]{13})+@student.tdmu.edu.vn$/i;
        if (type === "success" && reg.test(users.email)) {
          axios
            .post("http://localhost:5000/lecturer/login", {
              ...users,
            })
            .then((res) => {
              async function saveDataUser() {
                try {
                  await AsyncStorage.setItem("UserLogin", `${true}`);
                  await AsyncStorage.setItem("UserEmail", `${users.email}`);
                } catch (error) {
                  console.log(error);
                }
              }
              saveDataUser();
              navigation.navigate("Lịch thi");
            });
        } else {
          console.log("Google sign in was cancelled");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <View style={style.ViewBox}>
        <View style={style.TextBox}>
          <Text style={style.title}>Hệ thống tra cứu lịch thi</Text>
          <Text style={style.title}>Đại học Thủ Dầu Một</Text>
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
              if (keyWord !== null) {
                navigation.navigate("Tìm lịch thi", {
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
            onPress={handleGoogleLogin}
            // loading
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
