import React, { Fragment, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSchedulesApiAsync } from "../ApiSlice/schudeleSlice";

// SearchSchudele container component
export default function SearchSchudele({ route }) {
  const { keyWord } = route.params;
  const { loading } = useSelector((state) => state.Schedules.SchedulesApi);

  const data = useSelector((state) =>
    state.Schedules.SchedulesApi.data.filter((items) =>
      items.public === true
        ? items.giangVien.find((item) => item.maVienChuc === keyWord) ||
          items.nhomKiemTra.indexOf(keyWord) !== -1
        : null
    )
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedulesApiAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00ff00" style={style.loading} />
    );
  } else
    return (
      <ScrollView>
        <View style={style.titleBox}>
          <Text style={style.title}>Key Word: {keyWord}</Text>
        </View>
        <View style={style.ListDataBox}>
          {data.map((items, index) => {
            const item = {index : index, ...items};
            return <DataBox {...item} />;
          })}
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

// DataBox presentational componet
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
      <Text style={style.fieldText}>M?? MH: {maHocPhan}</Text>
      <Text style={style.fieldText}>T??n MH: {tenHocPhan}</Text>
      <Text style={style.fieldText}>Nh??m Ki???m tra: {nhomKiemTra}</Text>
      <Text style={style.fieldText}>Ng??y Thi: {ngayKiemTra.slice(0, 10)}</Text>
      <Text style={style.fieldText}>Gi??? B???t ?????u: {gioBatDau}</Text>
      <Text style={style.fieldText}>Ph??t: {soPhutKiemTra}</Text>
      <Text style={style.fieldText}>Ph??ng Thi / tr???c tuy???n: {maPhong}</Text>
      <Text style={style.fieldText}>H??nh th???c thi: {hinhThucKiemTra}</Text>
    </View>
  );
}
