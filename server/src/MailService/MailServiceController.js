const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Sercetarys = require("../secretarys/Models/secretaryModel");

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
      <strong>Mã của bạn sẽ hết hạn sau 5 phút</strong>`,
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
  sendMailContext = async (req, res) => {
    try {
      if (req.params.email === null || req.params.email === undefined) {
        res.status(400).json("Email null");
      }
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.params.email,
        subject: `Xác nhận đăng ký tài khoản `,
        html: `<h1>Xin chào.</h1> 
        <h3>Tài khoản với email <strong>${req.params.email}</strong> của bạn đã được đăng ký bên chúng tôi.<h3>
        <h3>Cảm ơn bạn đã sử dụng dịch vụ. Chúc bạn một ngày tốt lành</h3>
        <h2>Trân trọng.</h2>`,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json("Send email successfully");
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  // gửi mail tình trạng đơn hàng
  // [put] /sendMail/:email
  sendMailOrderStatust = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json("Email null");
      }
      let context = req.body.context;
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: this.#mailManage,
          pass: this.#passWordManage,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: req.body.title,
        html: `<div style="">
        <h1>Xin chào</h1>
        <h3>${req.body.contextTitle}, hãy kiểm tra đơn hàng</h3>
        <h2>Chi tiết đơn hàng</h2>
          ${context.map(
            (item) =>
              `
              <div style="background-color: white;padding: 50px;margin: 0 auto;">
                <div  style="display: flex;border-bottom: 1px solid gray; padding-bottom: 10px;">
                  <div className="product-thumbnail">
                    <div className="product-thumbnail-wrapper">
                      <img src=${
                        item.image
                      } alt="" style="width: 150px;height: 150px;object-fit: cover;" />
                    </div>
                  </div>
                  <div style="display: grid;  grid-gap: 20px;grid-template-columns: repeat(1);padding-left: 20px;">
                    <span style="color: black;font-size: 16px;">
                      số lượng : ${item.quantity}
                    </span>
                    <span style="color: black;font-size: 16px;">${
                      item.nameProduct
                    }</span>
                    <span style="color: black;font-size: 16px;">
                      ${item.color} / ${item.size}
                    </span>
                    <div  style="color: red;font-size: 16px;">
                      <span>${item.price.toLocaleString()} đ</span>
                    </div>
                  </div>
                </div>
              </div>`
          )}
          <div>
          <h4>Dear</h4>
          <p style="font-size: 16px">Họ và tên : ${req.body.fullName}</p>
          <p style="font-size: 16px">Địa chỉ : ${req.body.address}</p>
          <p style="font-size: 16px">Số điện thoại : ${
            req.body.phone_number
          }</p>
            <h3 style="color:red;font-size: 18px">Tổng tiền : ${
              req.body.total_price
            } VND</h3>
          </div>
        <h3>${req.body.contextStatus}</h3>
        <h2>Trân trọng.</h2>
        <h3>Ngày giờ : ${req.body.orderDate}</h3>
        </div>`,
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
