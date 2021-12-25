const danhSachGiangVien = require("../models/GiangVienModal");
const GiangVienCtrl = {
  check: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        msg: "Lỗi đường truyền mạng , hãy thử lại 1 lần nữa",
      });
    } else {
      try {
        for (let key in req.body) {
          if (req.body.hasOwnProperty(key) && key !== 'maKhoa') {
            item = req.body[key];
            let maKhoa = req.body.maKhoa;
            let maVienChuc = item.maVienChuc;
            let check = await danhSachGiangVien.findOne({ maVienChuc });
            if (check) {
              continue;
            } else {
              const newGiangVien = new danhSachGiangVien({
                hoTen: item.hoTen,
                maVienChuc: item.maVienChuc,
                email: item.emailGV,
                maKhoa: maKhoa,
              });
              await newGiangVien.save();
            }
          }
        }
        res.status(200).json({ msg: "imported" });
      } catch (err) {
        res.status(400).json({ msg: err?.message });
      }
    }
  },

  getGiangVien: async (req, res) => {
    try {
      const GiangVien = await danhSachGiangVien.find();
      res.json(GiangVien);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editGiangVien: async (req, res) => {
    try {
      const { maVienChuc, hoTen, email } = req.body;
      await danhSachGiangVien.findOneAndUpdate(
        { _id: req.body.params.lecturersId },
        { maVienChuc, hoTen, email }
      );
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createGiangVien: async (req, res) => {
    try {
      const { maVienChuc, hoTen, email } = req.body;
      const newGiangVien = danhSachGiangVien({
        hoTen: hoTen,
        maVienChuc: maVienChuc,
        email: email,
        maKhoa: "",
      });
      await newGiangVien.save();
      res.json({ msg: "Thêm thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteGiangVien: async (req, res) => {
    try {
      await danhSachGiangVien.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = GiangVienCtrl;
