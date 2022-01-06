const Schedules = require("./../models/scheduleModels");
const lichThiCtrl = {
  createLichThi: async (req, res) => {
    try {
      for (var key in req.body.datas) {
        if (req.body.datas.hasOwnProperty(key) && key !== "maKhoa") {
          item = req.body.datas[key];
          tenHocKy = `${req.body.namHoc} - ${req.body.hocKy}`;
          nhomKiemTra = item.nhomKT;
          maHocPhan = item.maHp;
          let check = await Schedules.findOne({
            tenHocKi: tenHocKy,
            nhomKiemTra,
            maHocPhan,
          });
          if (check) {
            return res.status(400).json({ msg: "lịch thi đã tồn tại" });
          } else {
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
              tenHocKi: tenHocKy,
              tenHocPhan: item.tenHp,
              toKiem: item.toKiem,
              giangVien: [
                {
                  hoTen: item.hoTen1,
                  maVienChuc: item.maVienChuc1,
                  maKhoa: item.maKhoa1,
                  email: item.email1,
                  maChuongTrinh: item.maChuongTrinh1,
                },
                {
                  hoTen: item.hoTen2,
                  maVienChuc: item.maVienChuc2,
                  maKhoa: item.maKhoa2,
                  email: item.email2,
                  maChuongTrinh: item.maChuongTrinh2,
                },
              ],
              maKhoa: item.maKhoa,
              maChuongTrinh: item.maChuongTrinh,
              canBoCoiKiem3: item.canBoCoiKiem3,
              maCanBoCoiKiem3: item.maCanBoCoiKiem3,
              canBoDuBi: item.canBoDuBi,
              maCanBoDuBi: item.maCanBoDuBi,
              public: false,
            });
            await newSchedules.save();
          }
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
  eidtLichThi: async (req, res) => {
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
        canBoCoiKiem3,
        maCanBoCoiKiem3,
        canBoDuBi,
        maCanBoDuBi,
      } = req.body;
      await Schedules.findOneAndUpdate(
        { _id: req.body.param.testScheduleID },
        {
          GVGD: GVGD,
          chuongTrinhBoMon: chuongTrinh,
          donViToChucKiemTra: doViToChuc,
          gioBatDau: gioBatDau,
          heDaoTao: heDT,
          hinhThucKiemTra: hinhThucKT,
          maGV: maGV,
          maHocPhan: maHp,
          maPhong: maPhong,
          ngayKiemTra: ngayKiemTra,
          nhomKiemTra: nhomKT,
          soLuongSinhVien: soLuong,
          soPhutKiemTra: soPhutKiemTra,
          tenHocKi: tenHocKy,
          tenHocPhan: tenHp,
          toKiem: toKiem,
          giangVien: [
            {
              hoTen: hoTen1,
              maVienChuc: maVienChuc1,
              maKhoa: maKhoa1,
              email: email1,
            },
            {
              hoTen: hoTen2,
              maVienChuc: maVienChuc2,
              maKhoa: maKhoa2,
              email: email2,
            },
          ],
          maKhoa: maKhoa,
          canBoCoiKiem3: canBoCoiKiem3,
          maCanBoCoiKiem3:maCanBoCoiKiem3,
          canBoDuBi: canBoDuBi,
          maCanBoDuBi: maCanBoDuBi,
          public: false,
        }
      );
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteLichThi: async (req, res) => {
    try {
      console.log(req.params.id);
      await Schedules.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllLichThi: async (req, res) => {
    try {
      let collectionNames = await Schedules.find();
      for (let i = 0, len = collectionNames.length; i < len; i++) {
        let collectionName = collectionNames[i];
        if (collectionName.tenHocKi === req.params.key) {
          await Schedules.findByIdAndDelete(collectionName._doc._id);
        }
      }
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  publicLichThi: async (req, res) => {
    try {
      let collectionNames = await Schedules.find();
      let isPublic = req.params.isChecked;
      let key = req.params.key;
      if (key === "undefined") {
        return res.status(500).json({ msg: "Vui lòng chọn lịch thi" });
      } else {
        for (let i = 0, len = collectionNames.length; i < len; i++) {
          let collectionName = collectionNames[i];
          if (collectionName.tenHocKi === req.params.key) {
            await Schedules.findByIdAndUpdate(collectionName._doc._id, {
              public: isPublic,
            });
          }else{
            await Schedules.findByIdAndUpdate(collectionName._doc._id, {
              public: false,
            });
          }
        }
        res.json({ msg: "public thành công" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = lichThiCtrl;
