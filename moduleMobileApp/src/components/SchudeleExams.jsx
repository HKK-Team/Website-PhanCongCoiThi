import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSchedulesApiAsync } from "../ApiSlice/schudeleSlice";
import { getUserApiAsync } from "../ApiSlice/userAccSlide";

export default function SchudeleExams() {
  const navigation = useNavigation();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserApiAsync());
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user?.maVienChuc === "" || user?.maKhoa === "") {
      Alert.alert("Vui lòng cập nhật mã khoa hoặc mã viện chức");
      navigation.navigate("Tài khoản");
    }
  }, [user]);

  const user = useSelector((state) => state?.Users?.UserApi?.data[0]);
  const loading = useSelector((state) => state.Schedules.SchedulesApi.loading);
  const loading2 = useSelector((state) => state?.Users?.UserApi?.loading);
  const data = [];
  const datas = useSelector((state) =>
    state.Schedules.SchedulesApi.data.forEach((items) => {
      if (items.public === true) {
        items.giangVien.filter((item) =>
          item.maVienChuc === user.maVienChuc ? data.push(items) : null
        );
      }
    })
  );

  if (loading || loading2) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={style.loading} />
    );
  } else if (data.length === 0) {
    return (
      <ScrollView>
        <View style={style.ListDataBox}>
          <Text style={style.title}>Chưa có lịch thi</Text>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <View style={style.ListDataBox}>
        {data.map((item, index) => (
          <View style={style.DataBox} key={index}>
            <Text style={style.fieldText}>Mã MH: {item?.maHocPhan}</Text>
            <Text style={style.fieldText}>Tên MH: {item?.tenHocPhan}</Text>
            <Text style={style.fieldText}>
              Nhóm Kiểm tra: {item?.nhomKiemTra}
            </Text>
            <Text style={style.fieldText}>
              Ngày Thi: {item?.ngayKiemTra.slice(0, 10)}
            </Text>
            <Text style={style.fieldText}>Giờ Bắt Đầu: {item?.gioBatDau}</Text>
            <Text style={style.fieldText}>Phút: {item?.soPhutKiemTra}</Text>
            <Text style={style.fieldText}>
              Phòng Thi / trực tuyến: {item?.maPhong}
            </Text>
            <Text style={style.fieldText}>
              Hình thức thi: {item?.hinhThucKiemTra}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  titleBox: {
    width: "100%",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  ListDataBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    overflow: "scroll",
  },
  DataBox: {
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    width: 350,
    height: 220,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  fieldText: {
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
