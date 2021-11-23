import { Link } from "react-router-dom";
import "./Product.css";
import { Publish } from "@material-ui/icons";

// chỉnh sửa sản phẩm
export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Chỉnh sửa môn học</h1>
        <Link to="/newSubjects">
          <button className="productAddButton">Thêm môn học</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">Cơ sở lập trình</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Mã học phần:</span>
                      <span className="productInfoValue">CSLT123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Nhóm kiểm tra:</span>
                      <span className="productInfoValue">D21CNTT01_HK1.CQ.01</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Tổ kiểm:</span>
                      <span className="productInfoValue">001</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Số lượng SV:</span>
                      <span className="productInfoValue">60</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Hình thức kiểm tra:</span>
                      <span className="productInfoValue">Trắc nghiệm trực tuyến</span>
                  </div>
              </div>
          </div>
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
                  <input type="text" placeholder="Công nghệ thông tin và trí tuệ nhân tạo" />
                  <label>Hình thức kiểm tra</label>
                  <input type="text" placeholder="Trắc nghiệm trực tuyến" />
                  <label>GVGD</label>
                  <input type="text" placeholder="Trần Văn Tài" />
                  <label>MGV</label>
                  <input type="text" placeholder="TDMU269" />
                  <label>Hệ đào tạo</label>
                  <input type="text" placeholder="Chinh quy" />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://product.hstatic.net/1000230642/product/ahuh00300trg__3__3988f87ca24d4588b3531392ff2df45e_1024x1024.jpg" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}