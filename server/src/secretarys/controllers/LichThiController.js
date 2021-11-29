const Schedules = require("./../models/scheduleModels");
const lichThiCtrl = {
  createLichThi: async (req, res) => {
    try {
      const {
        GVGD,
        chuongTrinh,
        doViToChuc,
        email1,
        email2,
        gioBatDau,
        heDT,
        hinhThucKT,
        hoTen1,
        hoTen2,
        maGV,
        maHp,
        maKhoa,
        maKhoa1,
        maKhoa2,
        maPhong,
        maVienChuc1,
        maVienChuc2,
        ngayKiemTra,
        nhomKT,
        soLuong,
        soPhutKiemTra,
        tenHp,
        toKiem,
        tenHocKy,
      } = req.body;
      for (var key in req.body.datas) {
        if (req.body.datas.hasOwnProperty(key)) {
          item = req.body.datas[key];
          item.tenHocKy = req.body.tenHocKy;
          const newSchedules = new Schedules({
            GVGD: item.GVGD,
            chuongTrinhBoMon: item.chuongTrinh,
            donViToChucKiemTra: item.doViToChuc,
            gioBatDau: item.gioBatDau,
            heDaoTao: item.heDT,
            hinhThucKiemTra: item.hinhThucKT,
            maGV: item.maGV,
            maHocPhan: item.maHp,
            maPhong: item.maPhong,
            ngayKiemTra: item.ngayKiemTra,
            nhomKiemTra: item.nhomKT,
            soLuongSinhVien: item.soLuong,
            soPhutKiemTra: item.soPhutKiemTra,
            tenHocKi: item.tenHocKy,
            tenHocPhan: item.tenHp,
            toKiem: item.toKiem,
            giangVien: [
              {
                hoTen: item.hoTen1,
                maVienChuc: item.maVienChuc1,
                maKhoa: item.maKhoa1,
                email: item.email1,
              },
              {
                hoTen: item.hoTen2,
                maVienChuc: item.maVienChuc2,
                maKhoa: item.maKhoa2,
                email: item.email2,
              },
            ],
            maKhoa: item.maKhoa,
          });
          await newSchedules.save();
        }
      }
      res.status(200).json({ msg: "imported" });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },

  getLichThi: async (req, res) => {
    try {
      const schedules = await Schedules.find();
      res.json(schedules);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = lichThiCtrl;
