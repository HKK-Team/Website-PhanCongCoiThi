import React from "react";
import "./SellingProducts.css";
// sản phẩm bán chạy nhất
export default function SellingProducts(props) {
  // style cho trạng thái material ui button
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  // chuyển vnd thành usd
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <img src={props.image} alt="" className="widgetLgImg" />
        <span className="widgetLgName">{props.codeproduct}</span>
      </td>
      <td className="widgetLgDate">{props.totalquality}</td>
      <td className="widgetLgAmount">
        {formatter.format((props.totalquality * props.price) / 23000)}
      </td>
      <td className="widgetLgStatus">
        <Button type="Approved" />
      </td>
    </tr>
  );
}
