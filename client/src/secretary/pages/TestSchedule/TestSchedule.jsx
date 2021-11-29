
import { useEffect } from "react";

export default function TestSchedule() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Chỉnh sửa lịch thi </h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Mã học phần</label>
            <input type="text" placeholder="CSLT001" />
            <label>Tên học phần</label>
            <input type="text" placeholder="CSLT" />
            <label>Nhóm kiểm tra</label>
            <input type="text" placeholder="D21CNTT01_HK1.CQ.01" />
            <label>Tổ kiểm </label>
            <input type="text" placeholder="001" />
            <label>Số lượng SV</label>
            <input type="text" placeholder="60" />
            <label>Đơn vị tổ chức kiểm tra</label>
            <input type="text" placeholder="Viện KT-CN" />
            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              placeholder="Công nghệ thông tin và trí tuệ nhân tạo"
            />
            <label>Ngày kiểm tra</label>
            <input type="text" />
            <label>Giờ kiểm tra</label>
            <input type="text" placeholder="13h" />
            <label>Teamcode/Phòng</label>
            <input type="text" placeholder="1234" />
          </div>
          <div className="productFormLeft">
            <label>Hình thức kiểm tra</label>
            <input type="text" placeholder="Trắc nghiệm trực tuyến" />
            <label>Số phút kiểm tra</label>
            <input type="text" placeholder="60" />
            <label>Cán bộ coi kiểm tra 01(CB02)</label>
            <input type="text" />
            <label>Mã viên chức CB02</label>
            <input type="text" />
            <label>Cán bộ coi kiểm tra 02(CB02)</label>
            <input type="text" />
            <label>Mã viên chức CB02</label>
            <input type="text" />
            <label>GVGD</label>
            <input type="text" placeholder="Trần Văn Tài" />
            <label>MGV</label>
            <input type="text" placeholder="TDMU269" />
            <label>Hệ đào tạo</label>
            <input type="text" placeholder="Chinh quy" />
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
