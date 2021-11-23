import "./MarketAnalysis.css";
import {
  itemTypeRevenueData_Precious1,
  itemTypeRevenueData_Precious2,
  itemTypeRevenueData_Precious3,
  itemTypeRevenueData_Precious4,
  bestSellingItemData,
} from "../../totalData";
import Chart from "../../components/Chart/Chart";

// phân tích
export default function MarketAnalysis() {
  return (
    <div className="MarketAnaly">
      <Chart
        data={bestSellingItemData}
        color="#5550bd"
        title="Thống kê loại mặt hàng bán chạy (sản phẩm)"
        grid
        dataKey="Sales"
      />
      <Chart
        data={itemTypeRevenueData_Precious1}
        color="#7FFF00"
        title="Thống kê doanh thu các mặt hàng quý 1 (USD)"
        grid
        dataKey="Sales"
      />
      <Chart
        data={itemTypeRevenueData_Precious2}
        color="#E74C3C"
        title="Thống kê doanh thu các mặt hàng quý 2 (USD)"
        grid
        dataKey="Sales"
      />
      <Chart
        data={itemTypeRevenueData_Precious3}
        color="#F1C40F"
        title="Thống kê doanh thu các mặt hàng quý 3 (USD)"
        grid
        dataKey="Sales"
      />
      <Chart
        data={itemTypeRevenueData_Precious4}
        color="#ABB2B9"
        title="Thống kê doanh thu các mặt hàng quý 4 (USD)"
        grid
        dataKey="Sales"
      />
    </div>
  );
}
