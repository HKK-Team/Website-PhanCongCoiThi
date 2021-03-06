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
    title: "N??? sinh L??o Vilayphone Somvang",
    author: "Sinh vi??n n??m th??? 4 ng??nh Qu???n tr??? kinh doanh.?????i h???c Th??? D???u M???t",
  },
  {
    img: NuSinhLao2,
    title: "N??? sinh L??o Vilayphone Somvang",
    author: "Sinh vi??n n??m th??? 4 ng??nh Qu???n tr??? kinh doanh.?????i h???c Th??? D???u M???t",
  },
  {
    img: ICPC,
    title: "ICPC 2021 AISA HANOI",
    author:
      "Sinh vi??n Vi???n K??? thu???t - C??ng ngh??? ?????i di???n cho tr?????ng ?????i h???c Th??? D???u M???t tham gia v??ng chung k???t Olympic v?? ICPC 2021 t???i H?? N???i",
  },
  {
    img: GiangVien2,
    title: "Khoa K??? Thu???t C??ng Ngh???",
    author: "Gi???ng vi??n Tr???n C???m T??",
  },
  {
    img: MuaHaNo,
    title: "TDMU",
    author: "M??a Hoa Gi???y N??? R???",
    cols: 2,
  },
  {
    img: GiangVien1,
    title: "Khoa ki???n tr??c",
    author: "Gi???ng vi??n: L?? Thanh B??nh",
    cols: 2,
  },
  {
    img: KhoanhKhac,
    title: "Kho???nh kh???c sinh vi??n",
    author: "Nh???ng h??nh ?????ng ?????p",
    cols: 2,
  },
  {
    img: KPOP,
    title: "Sinh vi??n TDMU",
    author: "Sinh vi??n TDMU ?????t gi???i 3 cu???c thi K-POP COVER DANCE CONTEST",
  },
  {
    img: GS25,
    title: "GS25 TMDU",
    author:
      "C??n tin m???i do chu???i c???a h??ng ti???n l???i GS25 ph???i h???p c??ng ?????i h???c Th??? D???u M???t",
    cols: 2,
  },
  {
    img: goBackSchool,
    title: "Go back school",
    author:
      "Tr?????ng ?????i h???c Th??? D???u M???t ????n c??c b???n sinh vi??n tr??? l???i tr?????ng h???c tr???c ti???p trong kh??ng kh?? nh???n nh???p, vui t????i c???a nh???ng ng??y ?????u n??m Nh??m D???n",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: GoodMorning,
    title: "Good Morning ",
    author: "Ch??o bu???i s??ng TDMU ??????????????????",
  },

  {
    img: HopMatDoanHoi,
    title: "??o??n Vi??n",
    author:
      "?????? Ch????ng tr??nh ng??y ??o??n vi??n v?? h???p m???t k??? ni??m 91 n??m ng??y th??nh l???p ??o??n TNCS H??? CH?? MINH TR?????NG ?????I H???C TH??? D???U M???T??????",
    rows: 2,
    cols: 2,
  },
  {
    img: leTotNghiep,
    title: "TDMU T???t Nghi???p",
    author: "L??? t???t nghi???p",
  },
  {
    img: NuSinhba,
    title: "Khoa s?? ph???m",
    author: "Gi???ng vi??n: Nguy???n Th??? Ng???c T??m",
  },
];
