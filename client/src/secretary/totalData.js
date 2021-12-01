import { useContext } from "react";
import { GlobalState } from "./../GlobalState";
import MostPopularProducts from "./components/MostPopularProducts/MostPopularProducts";
import SellingProducts from "./components/SellingProducts/SellingProducts";
import WidgetLg from "./components/WidgetLg/WidgetLg";

export var getdata = {};
export default function GetData() {
  const state = useContext(GlobalState);
  const [getLecturersApi] = state.getLecturersApi.getLecturers;
  const [getSubjectApi] = state.getSubjectsApi.getSubjects;
  const [getSchedulesApi] = state.getSchedulesApi.getSchedules;
  getdata = {
    getLecturersApi: [...getLecturersApi],
    getSubjectApi: [...getSubjectApi],
    getSchedulesApi : [...getSchedulesApi]
  };
  return getdata;
}

// khởi tạo dữ liêu hoạt động của người dùng dạng biểu đồ
export const userData = [
  {
    name: "Jan",
    "Active User": 4000,
  },
  {
    name: "Feb",
    "Active User": 3000,
  },
  {
    name: "Mar",
    "Active User": 5000,
  },
  {
    name: "Apr",
    "Active User": 4000,
  },
  {
    name: "May",
    "Active User": 3000,
  },
  {
    name: "Jun",
    "Active User": 2000,
  },
  {
    name: "Jul",
    "Active User": 4000,
  },
  {
    name: "Agu",
    "Active User": 3000,
  },
  {
    name: "Sep",
    "Active User": 4000,
  },
  {
    name: "Oct",
    "Active User": 1000,
  },
  {
    name: "Nov",
    "Active User": 4000,
  },
  {
    name: "Dec",
    "Active User": 3000,
  },
];
// khởi tạo dữ liêu doanh thu hàng tháng của dạng biểu đồ
export const monthlyRevenueData = [
  {
    name: "Jan",
    "Doanh Thu": 4000,
  },
  {
    name: "Feb",
    "Doanh Thu": 3000,
  },
  {
    name: "Mar",
    "Doanh Thu": 5000,
  },
  {
    name: "Apr",
    "Doanh Thu": 4000,
  },
  {
    name: "May",
    "Doanh Thu": 3000,
  },
  {
    name: "Jun",
    "Doanh Thu": 2000,
  },
  {
    name: "Jul",
    "Doanh Thu": 4000,
  },
  {
    name: "Agu",
    "Doanh Thu": 3000,
  },
  {
    name: "Sep",
    "Doanh Thu": 4000,
  },
  {
    name: "Oct",
    "Doanh Thu": 1000,
  },
  {
    name: "Nov",
    "Doanh Thu": 4000,
  },
  {
    name: "Dec",
    "Doanh Thu": 3000,
  },
];
// khởi tạo dữ liêu doanh thu các quý của dạng biểu đồ
export const quarterlyRevenueData = [
  {
    name: "Quý 1",
    Sales: 40000,
  },
  {
    name: "Quý 2",
    Sales: 30000,
  },
  {
    name: "Quý 3",
    Sales: 50000,
  },
  {
    name: "Quý 4",
    Sales: 50000,
  },
];
// khởi tạo dữ liêu doanh thu các năm của dạng biểu đồ
export const annualRevenueData = [
  {
    name: "2017",
    Sales: 90000,
  },
  {
    name: "2018",
    Sales: 100000,
  },
  {
    name: "2019",
    Sales: 350000,
  },
  {
    name: "2020",
    Sales: 330000,
  },
  {
    name: "2021",
    Sales: 450000,
  },
];
// khởi tạo dữ liêu sản phẩm dạng biểu đồ
export const productData = [
  {
    name: "Jan",
    Sales: 4000,
  },
  {
    name: "Feb",
    Sales: 3000,
  },
  {
    name: "Mar",
    Sales: 5000,
  },
];

// khởi tạo dữ liêu bảng người dùng
export const userRows = [
  {
    id: "613604a85baff7dc5fe145e1",
    firstname: "Khanh",
    lastname: "Doan Minh",
    email: "kdoan696@gmail.com",
    bornday: "2021-09-06T12:15:14.183+00:00",
    transaction: "$120.00",
  },
];
// khởi tạo dữ liệu loại mặt hàng bán chạy dạng biểu đồ ( / sản phẩm )
export const bestSellingItemData = [
  {
    name: "Hunter Nam",
    Sales: 40000,
  },
  {
    name: "Hunter Nữ",
    Sales: 30000,
  },
  {
    name: "Gosto",
    Sales: 50000,
  },
  {
    name: "Giày Bé Trai",
    Sales: 50000,
  },
  {
    name: "Giày Bé Gái",
    Sales: 50000,
  },
  {
    name: "Phụ Kiện",
    Sales: 50000,
  },
];
// khởi tạo dữ liệu doanh thu các loại mặt hàng quý 1 dạng biểu đồ
export const itemTypeRevenueData_Precious1 = [
  {
    name: "Hunter Nam",
    Sales: 400000,
  },
  {
    name: "Hunter Nữ",
    Sales: 300000,
  },
  {
    name: "Gosto",
    Sales: 500000,
  },
  {
    name: "Giày Bé Trai",
    Sales: 500000,
  },
  {
    name: "Giày Bé Gái",
    Sales: 500000,
  },
  {
    name: "Phụ Kiện",
    Sales: 500000,
  },
];
// khởi tạo dữ liệu doanh thu các loại mặt hàng quý 2 dạng biểu đồ
export const itemTypeRevenueData_Precious2 = [
  {
    name: "Hunter Nam",
    Sales: 400000,
  },
  {
    name: "Hunter Nữ",
    Sales: 300000,
  },
  {
    name: "Gosto",
    Sales: 500000,
  },
  {
    name: "Giày Bé Trai",
    Sales: 500000,
  },
  {
    name: "Giày Bé Gái",
    Sales: 500000,
  },
  {
    name: "Phụ Kiện",
    Sales: 500000,
  },
];
// khởi tạo dữ liệu doanh thu các loại mặt hàng quý 3 dạng biểu đồ
export const itemTypeRevenueData_Precious3 = [
  {
    name: "Hunter Nam",
    Sales: 400000,
  },
  {
    name: "Hunter Nữ",
    Sales: 300000,
  },
  {
    name: "Gosto",
    Sales: 500000,
  },
  {
    name: "Giày Bé Trai",
    Sales: 500000,
  },
  {
    name: "Giày Bé Gái",
    Sales: 500000,
  },
  {
    name: "Phụ Kiện",
    Sales: 500000,
  },
];
// khởi tạo dữ liệu doanh thu các loại mặt hàng quý 4 dạng biểu đồ
export const itemTypeRevenueData_Precious4 = [
  {
    name: "Hunter Nam",
    Sales: 400000,
  },
  {
    name: "Hunter Nữ",
    Sales: 300000,
  },
  {
    name: "Gosto",
    Sales: 500000,
  },
  {
    name: "Giày Bé Trai",
    Sales: 500000,
  },
  {
    name: "Giày Bé Gái",
    Sales: 500000,
  },
  {
    name: "Phụ Kiện",
    Sales: 500000,
  },
];

// khởi tạo dữ liêu bảng sản phẩm
export const productRows = [
  {
    id: "61263c32cd0782f5f0743775",
    idCategory_product: "DSMH02400CAM47",
    name: "Giày Thể Thao Nam Biti’s Hunter Core Z Collection Stone DSMH06400DEN",
    image:
      "https://product.hstatic.net/1000230642/product/dsc_0016_7dcbe3d255e843...",
    nameCategoryProduct: "Hunter Nam",
    color: "Đen",
    price: "699000",
  },
];
// khởi tạo dữ liêu bảng hóa đơn
export const billRows = [
  {
    id: "61418541fe13317461458808",
    user_id: "6135998ac8727f629ac60f11",
    fullName: "Huỳnh Đức Huy",
    email: "huynhduchuy2001@gmail.com",
    address: "Bình Phước",
    phone_number: "0336755506",
    total_price: 1897000,
    Cart: [
      { id_product: "DSMH02400CAM34", quality: 1 },
      { id_product: "DSMH02400CAM34", quality: 1 },
      { id_product: "DSMH02400CAM34", quality: 1 },
    ],
    createdAt: "2021-09-15T05:31:45.273+00:00",
  },
];

// dữ liêu sản phẩm bán chạy nhất
export const sellingProductsData = [];
for (let i = 0; i < 5; i++) {
  sellingProductsData.push(
    <SellingProducts
      image="https://product.hstatic.net/1000230642/product/03900cam__2__5ed808cd7e35480dbb0340cf7e57c71a_1024x1024.jpg"
      codeproduct="DSMH03900CAM44"
      totalquality={200}
      price={990000}
    />
  );
}

// dữ liêu sản phẩm yêu thích nhất
export const mostPopularProductsData = [];
for (let i = 0; i < 5; i++) {
  mostPopularProductsData.push(
    <MostPopularProducts
      image="https://product.hstatic.net/1000230642/product/03900cam__2__5ed808cd7e35480dbb0340cf7e57c71a_1024x1024.jpg"
      codeproduct="DSMH03900CAM44"
      totallike={2000}
      totalquality={200}
      price={990000}
    />
  );
}

// dữ liêu giao dịch gần nhất
export const mostRecentTransactionDate = [];
for (let i = 0; i < 5; i++) {
  mostRecentTransactionDate.push(
    <WidgetLg
      fullname="Đoàn Minh Khánh"
      date="20-09-2001"
      totalprice={20000}
      codebill="121231231212"
    />
  );
}
