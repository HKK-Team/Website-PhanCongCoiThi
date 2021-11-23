import "./WidgetLg.css";
// giao dịch gần nhất
export default function WidgetLg(props) {
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
        <img
          src="https://as2.ftcdn.net/v2/jpg/02/50/31/95/500_F_250319577_BuOE8gd49LUD41DFH6eY3mahs0Q6n8Jp.jpg"
          alt=""
          className="widgetLgImg"
        />
        <span className="widgetLgName">{props.fullname}</span>
      </td>
      <td className="widgetLgDate">{props.date}</td>
      <td className="widgetLgAmount">
        {formatter.format(props.totalprice / 23000)}
      </td>
      <td className="widgetLgDate">{props.codebill}</td>
      <td className="widgetLgStatus">
        <Button type="Approved" />
      </td>
    </tr>
  );
}
