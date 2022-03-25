import { makeStyles } from "@material-ui/styles";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import GiangVien1 from "./../../images/GiangVien1.png";
import GiangVien2 from "./../../images/GiangVien2.png";
import goBackSchool from "./../../images/goBackSchool.png";
import GoodMorning from "./../../images/GoodMorning.png";
import GS25 from "./../../images/GS25.png";
import HopMatDoanHoi from "./../../images/HopMatDoanHoi.png";
import ICPC from "./../../images/ICPC.png";
import KhoanhKhac from "./../../images/KhoanhKhac.png";
import KPOP from "./../../images/KPOP.png";
import leTotNghiep from "./../../images/leTotNghiep.png";
import MuaHaNo from "./../../images/MuaHaNo.png";
import NuSinhba from "./../../images/NuSinhBa.png";
import NuSinhLao from "./../../images/NuSinhLao.png";
import NuSinhLao2 from "./../../images/NuSinhLao2.png";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: 10,
      backgroundColor: "#f5f5f5",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: 4,
      backgroundColor: "#0ae",
      backgroundImage: "linear-gradient(to bottom, #00b4db, #0083b0)",
    },
    "*::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#f5f5f5",
      borderRadius: 4,
    },
  },
  img: {
    objectFit: "cover !important",
  },
}));
export default function Landingpage() {
  const styles = useStyles();
  return (
    <ImageList sx={{ width: "95vw", height: "89vh" }} className={styles.root}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          sx={{ fontSize: 25, fontWeight: 600, color: "blue" }}
        >
          News Feed TDMU
        </ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=500&fit=crop&auto=format`}
            srcSet={`${item.img}?w=500&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            className={styles.img}
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: NuSinhLao,
    title: "Nữ sinh Lào Vilayphone Somvang",
    author: "Sinh viên năm thứ 4 ngành Quản trị kinh doanh.Đại học Thủ Dầu Một",
  },
  {
    img: NuSinhLao2,
    title: "Nữ sinh Lào Vilayphone Somvang",
    author: "Sinh viên năm thứ 4 ngành Quản trị kinh doanh.Đại học Thủ Dầu Một",
  },
  {
    img: ICPC,
    title: "ICPC 2021 AISA HANOI",
    author:
      "Sinh viên Viện Kỹ thuật - Công nghệ đại diện cho trường Đại học Thủ Dầu Một tham gia vòng chung kết Olympic và ICPC 2021 tại Hà Nội",
  },
  {
    img: GiangVien2,
    title: "Khoa Kỹ Thuật Công Nghệ",
    author: "Giảng viên Trần Cẩm Tú",
  },
  {
    img: MuaHaNo,
    title: "TDMU",
    author: "Mùa Hoa Giấy Nở Rộ",
    cols: 2,
  },
  {
    img: GiangVien1,
    title: "Khoa kiến trúc",
    author: "Giảng viên: Lê Thanh Bình",
    cols: 2,
  },
  {
    img: KhoanhKhac,
    title: "Khoảnh khắc sinh viên",
    author: "Những hành động đẹp",
    cols: 2,
  },
  {
    img: KPOP,
    title: "Sinh viên TDMU",
    author: "Sinh viên TDMU đạt giải 3 cuộc thi K-POP COVER DANCE CONTEST",
  },
  {
    img: GS25,
    title: "GS25 TMDU",
    author:
      "Căn tin mới do chuỗi cửa hàng tiện lợi GS25 phối hợp cùng Đại học Thủ Dầu Một",
    cols: 2,
  },
  {
    img: goBackSchool,
    title: "Go back school",
    author:
      "Trường Đại học Thủ Dầu Một đón các bạn sinh viên trở lại trường học trực tiếp trong không khí nhộn nhịp, vui tươi của những ngày đầu năm Nhâm Dần",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: GoodMorning,
    title: "Good Morning ",
    author: "Chào buổi sáng TDMU ☀️☀️☀️",
  },

  {
    img: HopMatDoanHoi,
    title: "Đoàn Viên",
    author:
      "❤️ Chương trình ngày đoàn viên và họp mặt kỉ niêm 91 năm ngày thành lập đoàn TNCS HỒ CHÍ MINH TRƯỜNG ĐẠI HỌC THỦ DẦU MỘT❤️",
    rows: 2,
    cols: 2,
  },
  {
    img: leTotNghiep,
    title: "TDMU Tốt Nghiệp",
    author: "Lễ tốt nghiệp",
  },
  {
    img: NuSinhba,
    title: "Khoa sư phạm",
    author: "Giảng viên: Nguyễn Thị Ngọc Tâm",
  },
];
