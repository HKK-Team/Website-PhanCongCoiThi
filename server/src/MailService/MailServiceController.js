const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Sercetarys = require("../secretarys/Models/secretaryModel");
const Excel = require("exceljs");

class MailSevice {
  #codeOTP; // lưu trữ mã otp
  #mailManage = "hkkteamsp@gmail.com"; // Mail quản lý
  #passWordManage = "khanhvlcm12"; // password quản lý
  #isResetOtp = false; // Mã otp đã được gửi chưa

  // tạo mail quản lý
  addMailManage(user = "hkkteamsp@gmail.com", password = "khanhvlcm12") {
    this.#mailManage = user;
    this.#passWordManage = password;
  }

  //reset mã otp
  resetOtpCode(time = 300000) {
    if (this.#isResetOtp) {
      setTimeout(() => {
        this.#isResetOtp = false;
        return (this.#codeOTP = Math.round(
          Math.random() * (999999 - 100000 + 1) + 100000
        ));
      }, time);
    }
  }

  // khởi tạo mã otp
  createtOptCode() {
    return (this.#codeOTP = Math.round(
      Math.random() * (999999 - 100000 + 1) + 100000
    ));
  }

  // xác nhận mã otp
  // [post] /sendMail/:otp/confrimOtp
  conFirmOtpCode = async (req, res) => {
    try {
      let otpCodeValue = req.params.otp;
      let isOtp = false;
      if (Number(otpCodeValue) === this.#codeOTP) {
        isOtp = true;
      }
      res.status(200).json(isOtp);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // xác thực email
  // [post] /sendMail/:email/conFirmEmail
  conFirmEmail = async (req, res) => {
    let isEmail = true;
    const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(req.params.email)) {
      isEmail = false;
      return res.status(400).json({ msg: "Trường này phải là Email." });
    }

    const email = req.params.email;
    const user = await Sercetarys.findOne({ email });
    // check email
    if (user === null) {
      isEmail = false;
      return res.status(400).json({ msg: "Email này không tồn tại." });
    }
    res.status(200).json(isEmail);
  };

  // gửi mail mã otp xác nhận
  // [put] /sendMail/:email
  sendMailOtpcode = async (req, res) => {
    try {
      if (req.params.email === null || req.params.email === undefined) {
        res.status(400).json("Email null");
      }
      this.createtOptCode();
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.params.email,
        subject: `Xác nhập mã otp đến từ HKK team`,
        html: `<h1>Xin chào.</h1><h2>Chúng tôi nhận được yêu cầu xác nhận, Mã OTP của bạn là: ${
          this.#codeOTP
        }</h2>
      <h3>Vui lòng không chia sẽ mã cho bất kỳ ai</h3>
      <h3>Mã của bạn sẽ hết hạn sau 5 phút</h3>`,
      };
      transporter.sendMail(mailOptions);
      res.status(200).json({ msg: "Send email otp code successfully" });
      this.resetOtpCode();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  // gửi mail context
  // [put] /sendMail/:email
  sendMailConfirmEmail = async (req, res) => {
    try {
      if (req.params.email === null || req.params.email === undefined) {
        res.status(400).json("Email null");
      }
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.params.email,
        subject: `Email đã được xác nhận hệ thống phân công lịch thi Đại Học Thủ Dầu Một`,
        html: `<h1>Xin chào.</h1> 
        <h3>Email <strong>${req.params.email}</strong> thư ký của bạn đã được xác nhận.<h3>
        <h3>Cảm ơn bạn đã sử dụng dịch vụ. Chúc bạn một ngày tốt lành</h3>
        <h2>Trân trọng.</h2>`,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  // gửi mail lịch thi
  // [put] /sendMail/:email
  sendMailSchedule = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json("Email null");
      }

      const data = req.body.schudele;
      const key = req.body.hocky;

      data.forEach((element) => {
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

      const filename = `PhanCongLichThi_${key}.xlsx`;
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet("Lich Thi", {
        views: [{ state: "frozen", xSplit: 3 }],
      });

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
      [
        "A1",
        "B1",
        "C1",
        "D1",
        "E1",
        "F1",
        "G1",
        "H1",
        "I1",
        "J1",
        "K1",
        "L1",
        "M1",
        "N1",
        "O1",
        "P1",
        "Q1",
        "R1",
        "S1",
        "T1",
        "U1",
        "V1",
        "W1",
      ].map((key) => {
        worksheet.getCell(key).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffff00" },
        };
      });

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

      // set background color and border for row A2
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
          ${key}`;
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

      data.forEach((e) => {
        worksheet.addRow(e);
      });
      const buffer = await workbook.xlsx.writeBuffer();

      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: "Thông báo lịch gác thi Đại Học Thủ Dầu Một",
        html: `<div>
        <h1>Dear thầy cô,</h1>
        <h3>Xin gửi thầy cô lịch gác thi ${key}</h3>
        </div>`,
        attachments: [
          {
            filename,
            content: buffer,
            contentType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        ],
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // thay đổi pass word
  // [put]/editPassword
  editPassword = async (req, res) => {
    // check password
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(req.body.password))
      return res.status(400).json({
        msg: `Mật khẩu phải chứa ít nhất một chữ số [0-9]. Một ký tự Latinh viết thường [a-z]. Một ký tự Latinh viết hoa [A-Z]. Độ dài ít nhất 6 ký tự và tối đa 20 ký tự.`,
      });

    if (req.body.confirm_password !== req.body.password)
      return res
        .status(400)
        .json({ msg: "Xác nhận mật khẩu không chính xác , vui lòng thử lại" });

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    try {
      await Sercetarys.findOneAndUpdate(
        { email: req.body.email },
        { passWord: passwordHash }
      );
      return res.status(200).json("Bạn đã đổi mật khẩu thành công!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
}

module.exports = new MailSevice();
