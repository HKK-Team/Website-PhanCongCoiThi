import React, { Fragment, useEffect } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSchedulesApiAsync } from "../ApiSlice/schudeleSlice";

export default function SearchSchudele({ route }) {
  const { keyWord } = route.params;
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.Schedules.SchedulesApi);
  const data = useSelector((state) =>
    state.Schedules.SchedulesApi.data.filter((items) =>
      items.public === true
        ? items.giangVien.find((item) => item.maVienChuc === keyWord) ||
          items.nhomKiemTra.indexOf(keyWord) !== -1
        : null
    )
  );

  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={style.loading} />
    );
  }
  return (
    <Fragment>
      <View style={style.titleBox}>
        <Text style={style.title}>Key Word: {keyWord}</Text>
      </View>
      <View style={style.ListDataBox}>
        {data.map((item, index) => {
          return (
            <View style={style.DataBox} key={index}>
              <Text style={style.fieldText}>Mã MH: {item?.maHocPhan}</Text>
              <Text style={style.fieldText}>Tên MH: {item?.tenHocPhan}</Text>
              <Text style={style.fieldText}>
                Ngày Thi: {item?.ngayKiemTra.slice(0, 10)}
              </Text>
              <Text style={style.fieldText}>
                Giờ Bắt Đầu: {item?.gioBatDau}
              </Text>
              <Text style={style.fieldText}>Phút: {item?.soPhutKiemTra}</Text>
              <Text style={style.fieldText}>
                Phòng Thi / trực tuyến: {item?.maPhong}
              </Text>
              <Text style={style.fieldText}>
                Hình thức thi: {item?.hinhThucKiemTra}
              </Text>
            </View>
          );
        })}
      </View>
    </Fragment>
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
  },
  DataBox: {
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    width: 350,
    height: 200,
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
