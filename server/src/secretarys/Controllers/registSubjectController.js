const Danhsachdangkis = require("../models/registSubjectModel");

const rgSubjectsCrtl = {
  getdata: async (req, res) => {
    try {
      const data = await Danhsachdangkis.aggregate([
        {
          $project: {
            _id: 1,
            maGiangVien: 1,
            maKhoa: 1,
            hoTen: 1,
            maVienChuc: 1,
            email: 1,
            dsDangKi:  {
              maHp:1,
              tenHp:1,
              nhomKT:1,
              hinhThucKT:1,
              thoiGianBatDau:1,
              thoiGianKetThuc:1,
              maPhong:1,
              ngayDangKi: {$dateToString: { format: "%d-%m-%Y", date: "$dsDangKi.ngayDangKi" } }
          }
        },
      }
      ]);
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = rgSubjectsCrtl;
