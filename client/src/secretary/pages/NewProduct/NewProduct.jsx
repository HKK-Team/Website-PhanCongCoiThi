import "./NewProduct.css";
import logo from './../../../images/tdmu-elearning-banner.png'

// thêm sản phẩm mới
export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm Môn Học</h1>
      <form className="addProductForm">
        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Mã học phần</label>
            <input type="text" placeholder="Mã học phần" />
          </div>
          <div className="addProductItem">
            <label>Tên học phần</label>
            <input type="text" placeholder="Tên học phần" />
          </div>
          <div className="addProductItem">
            <label>Nhóm kiểm tra</label>
            <input type="text" placeholder="Nhóm kiểm tra" />
          </div>
          <div className="addProductItem">
            <label>Tổ kiểm </label>
            <input type="text" placeholder="Tổ kiểm" />
          </div>
          <div className="addProductItem">
            <label>Số lượng SV</label>
            <input type="text" placeholder="Số lượng SV" />
          </div>
          <div className="addProductItem">
            <label>Đơn vị tổ chức kiểm tra</label>
            <input type="text" placeholder="Đơn vị tổ chức kiểm tra" />
          </div>
        </div>
        <div className="addProductForm-warrper">
          <div className="addProductItem">
            <label>Chương trình/Bộ môn</label>
            <input
              type="text"
              placeholder="Chương trình/Bộ môn"
            />
          </div>
          <div className="addProductItem">
            <label>Hình thức kiểm tra</label>
            <input type="text" placeholder="Hình thức kiểm tra" />
          </div>
          <div className="addProductItem">
            <label>GVGD</label>
            <input type="text" placeholder="GVGD" />
          </div>
          <div className="addProductItem">
            <label>MGV</label>
            <input type="text" placeholder="MGV" />
          </div>
          <div className="addProductItem">
            <label>Hệ đào tạo</label>
            <input type="text" placeholder="Hệ đào tạo" />
          </div>
          <button className="addProductButton">Tạo môn học</button>
        </div>
        <div className="addProductForm-warrper">
          <img src={logo} alt="" style={{width:600,height:300,objectFit:'cover'}}/>
        </div>
      </form>
    </div>
  );
}
