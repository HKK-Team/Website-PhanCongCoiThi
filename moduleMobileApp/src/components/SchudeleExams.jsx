import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
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

//set up notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

//SchudeleExams container component
export default function SchudeleExams() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserApiAsync());
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  const user = useSelector((state) => state?.Users?.UserApi?.data[0]);
  useEffect(() => {
    if (user?.maVienChuc === "" || user?.maKhoa === "") {
      Alert.alert("Vui lòng cập nhật mã khoa hoặc mã viện chức");
      navigation.navigate("Tài khoản");
    }
  }, [user]);

  const loading = useSelector((state) => state.Schedules.SchedulesApi.loading);
  const loading2 = useSelector((state) => state?.Users?.UserApi?.loading);
  const data = [];
  const datas = useSelector((state) =>
    state.Schedules.SchedulesApi.data.forEach((items) => {
      if (items.public === true) {
        items.giangVien.filter((item) =>
          item.maVienChuc === user?.maVienChuc ? data.push(items) : null
        );
      }
    })
  );

  //function get yesterday
  const CheckDateYesterday = (DateSchudele) => {
    const today = new Date(); // get today
    const yesterday = new Date(DateSchudele)
    // yesterday.setDate(yesterday.getDate() - 2); // get yesterday of schudele
    return today.getDate() === yesterday.getDate()-2;
  };

  // function notification schudele
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc nhở lịch thi 📬",
        body: "Lịch thi của bạn sẽ bắt đầu vào ngày mai",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  // event send notification schudele to user when schudele start one day before
  useEffect(() => {
    //test is one day away
    if (data.length > 0) {
      data.forEach((item) => {
        if (CheckDateYesterday(item.ngayKiemTra)) {
          schedulePushNotification();
          return;
        }
      });
    }
  }, [data]);

  if (loading || loading2) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={style.loading} />
    );
  } else if (data.length === 0) {
    return <ViewNull />;
  }
  return (
    <ScrollView>
      <View style={style.ListDataBox}>
        {data.map((item, index) => (
          <DataBox index={index} {...item} />
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

// DataNull persentational component
function ViewNull({}) {
  return (
    <ScrollView>
      <View style={style.ListDataBox}>
        <Text style={style.title}>Chưa có lịch thi</Text>
      </View>
    </ScrollView>
  );
}

// dataBox persentational component
function DataBox({
  index,
  maHocPhan,
  tenHocPhan,
  nhomKiemTra,
  ngayKiemTra,
  gioBatDau,
  soPhutKiemTra,
  maPhong,
  hinhThucKiemTra,
}) {
  return (
    <View style={style.DataBox} key={index}>
      <Text style={style.fieldText}>Mã MH: {maHocPhan}</Text>
      <Text style={style.fieldText}>Tên MH: {tenHocPhan}</Text>
      <Text style={style.fieldText}>Nhóm Kiểm tra: {nhomKiemTra}</Text>
      <Text style={style.fieldText}>Ngày Thi: {ngayKiemTra.slice(0, 10)}</Text>
      <Text style={style.fieldText}>Giờ Bắt Đầu: {gioBatDau}</Text>
      <Text style={style.fieldText}>Phút: {soPhutKiemTra}</Text>
      <Text style={style.fieldText}>Phòng Thi / trực tuyến: {maPhong}</Text>
      <Text style={style.fieldText}>Hình thức thi: {hinhThucKiemTra}</Text>
    </View>
  );
}
