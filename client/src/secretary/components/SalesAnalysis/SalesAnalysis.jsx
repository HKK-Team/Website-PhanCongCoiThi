import React from 'react'
import {
    userData,
    sellingProductsData,
    mostPopularProductsData,
  } from "../../totalData";
  import Chart from "../../components/Chart/Chart";

// sản phẩm bán chạy
var sellingProducts = [...sellingProductsData];
// sản phẩm yêu thích nhất
var mostPopularProducts = [...mostPopularProductsData];
export default function SalesAnalysis() {
    return (
        <div className="MarketAnaly">
        <Chart
          data={userData}
          color="#5550bd"
          title="Phân tích tần suất hoạt động của người dùng"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          {/* sản phẩm bán chạy */}
          <div className="widgetLg">
            <h3 className="widgetLgTitle">Sản phẩm bán chạy nhất</h3>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">MÃ sản phẩm</th>
                <th className="widgetLgTh">Số lượng</th>
                <th className="widgetLgTh">Trị giá</th>
                <th className="widgetLgTh">Trạng thái</th>
              </tr>
              {sellingProducts}
            </table>
          </div>
          {/* sản phâm yêu thích nhất */}
          <div className="widgetLg">
            <h3 className="widgetLgTitle">Sản phẩm được yêu thích nhất</h3>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Mã sản phẩm</th>
                <th className="widgetLgTh">Lượt thích</th>
                <th className="widgetLgTh">Bán được</th>
                <th className="widgetLgTh">Trị giá</th>
                <th className="widgetLgTh">Trạng thái</th>
              </tr>
              {mostPopularProducts}
            </table>
          </div>
        </div>
      </div>
    )
}
