const Excel = require("exceljs");
const { truncateSync } = require("fs");

class excelController {
  #data = [];
  #key = ""; // key of the data

  getData = async (req, res) => {
    this.#data = req.body.schudele;
    this.#key = req.body.hocky;
    if (this.#data.length === 0) {
      return res.status(400).json({
        message: "Data is empty",
      });
    } else {
      res.status(200).json({ message: "get data success" });
    }
  };
  dowloadingExcel = async (req, res) => {
    this.#data.forEach((element) => {
      let FullNameOne = element?.giangVien[0]?.hoTen;
      let CodeOne = element?.giangVien[0]?.maVienChuc;
      let FullNameTwo = element?.giangVien[1]?.hoTen;
      let CodeTwo = element?.giangVien[1]?.maVienChuc;
      element.FullNameOne = FullNameOne;
      element.CodeOne = CodeOne;
      element.FullNameTwo = FullNameTwo;
      element.CodeTwo = CodeTwo;
      element.ngayKiemTra = element.ngayKiemTra.slice(0, 10);
    });

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(`Lich Thi ${this.#key}`, {
      views: [{ state: "frozen", xSplit: 3 }],
    });

    // Set style for header
    worksheet.columns = [
      {
        header: "Mã học phần",
        key: "maHocPhan",
        width: 5.7,
      },
      {
        header: "Tên học phần",
        key: "tenHocPhan",
        width: 37.4,
      },
      { header: "Nhóm kiểm tra", key: "nhomKiemTra", width: 17 },
      { header: "Tổ kiểm", key: "toKiem", width: 6.3 },
      { header: "Số lượng SV", key: "soLuongSinhVien", width: 5.5 },
      {
        header: "Đơn vị tổ chức kiểm tra",
        key: "donViToChucKiemTra",
        width: 18,
      },
      {
        header: "Chương trình/Bộ môn",
        key: "chuongTrinhBoMon",
        width: 26,
      },
      { header: "Ngày kiểm tra", key: "ngayKiemTra", width: 13.11 },
      { header: "Giờ bắt đầu", key: "gioBatDau", width: 6.5 },
      { header: "Teamcode/Phòng", key: "maPhong", width: 9 },
      { header: "Hình thức kiểm tra", key: "hinhThucKiemTra", width: 16 },
      { header: "Số phút kiểm tra", key: "soPhutKiemTra", width: 6.3 },
      {
        header: "Cán bộ coi kiểm tra 01(CB01)",
        key: "FullNameOne",
        width: 16,
      },
      { header: "Mã viên chức CB01", key: "CodeOne", width: 10 },
      {
        header: "Cán bộ coi kiểm tra 02(CB02)",
        key: "FullNameTwo",
        width: 16,
      },
      { header: "Mã viên chức CB02", key: "CodeTwo", width: 10 },
      { header: "GVGD", key: "GVGD", width: 16 },
      { header: "MGV", key: "maGV", width: 10 },
      { header: "Hệ đào tạo", key: "heDaoTao", width: 10 },
      { header: "Cán bộ giám sát", key: "canBoCoiKiem3", width: 16 },
      { header: "Mã cán bộ giám sát", key: "maCanBoCoiKiem3", width: 10 },
      { header: "Cán bộ dự bị", key: "canBoDuBi", width: 16 },
      { header: "Mã cán bộ dự bị", key: "maCanBoDuBi", width: 10 },
    ];

    // set header filter for column
    worksheet.autoFilter = "A2:W2";

    // loop column set alignment center and font size excel js
    for (let i = 1; i <= worksheet.columns.length; i++) {
      worksheet.getColumn(i).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      worksheet.getColumn(i).font = {
        name: "Times New Roman",
        family: 2,
        size: 8,
      };
    }

    //get row A2 set alignment center and fonts bold
    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    worksheet.getRow(1).font = {
      name: "Times New Roman",
      family: 2,
      size: 8,
      bold: true,
    };

    // set background color for row A2
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffff00" },
    };
    worksheet.getRow(1).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Splicing row excel js
    worksheet.spliceRows(1, 0, {});
    //merger cell
    worksheet.mergeCells("A1:W1");
    worksheet.getCell("A1").value = `PHÂN CÔNG COI THI TRA KẾT THÚC HỌC PHẦN
          ${this.#key}`;
    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      wrapText: true,
      vertical: "bottom",
    };
    worksheet.getCell("A1").font = {
      name: "Times New Roman",
      family: 2,
      size: 16,
      bold: true,
    };
    worksheet.getRow(1).height = 56;
    // add row data
    this.#data.forEach((e) => {
      worksheet.addRow(e);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + `PhanCongLichThi.xlsx`
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  };
}

module.exports = new excelController();
