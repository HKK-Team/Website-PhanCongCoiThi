const tieuluan = require("./../Models/TieuLuanModal");
const tieuluanCtrl = {
  Create: async (req, res) => {
    try {
      const {
        maHp,
        tenHp,
        nhomKT,
        hinhThucKT,
        GVGD,
        maGV,
        heDT,
        chuongTrinh,
        soLuong,
        doViToChuc,
        toKiem,
        maKhoa,
        maChuongTrinh,
      } = req.body.data;
      const { ngayKiemTra, gioBatDau, maPhong, soPhutKiemTra, moTa, status } =
        req.body;

      const newTieuluan = new tieuluan({
        tenHocPhan: tenHp,
        maHocPhan: maHp,
        nhomKiemTra: nhomKT,
        hinhThucKiemTra: hinhThucKT,
        GVGD: GVGD,
        maGV: maGV,
        heDaoTao: heDT,
        chuongTrinhBoMon: chuongTrinh,
        donViToChucKiemTra: doViToChuc,
        toKiem: toKiem,
        soLuongSinhVien: soLuong,
        maKhoa: maKhoa,
        maChuongTrinh: maChuongTrinh,
        ngayKiemTra: ngayKiemTra,
        gioBatDau: gioBatDau,
        maPhong: maPhong,
        soPhutKiemTra: soPhutKiemTra,
        moTa: moTa,
        status: status,
        phanHoi: false,
        deXuat: {
          mota: "",
          ngayKiemTra: "",
          gioBatDau: "",
          toKiem: "",
          maPhong: "",
          soPhutKiemTra: "",
        },
        tenHocKi: "",
      });
      await newTieuluan.save();
      res.json({ msg: "Thêm thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSubjectTieuLuan: async (req, res) => {
    try {
      const TieuLuan = await tieuluan.find();
      res.json(TieuLuan);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editTieuLuan: async (req, res) => {
    try {
      const {
        maHocPhan,
        tenHocPhan,
        nhomKiemTra,
        hinhThucKiemTra,
        GVGD,
        maGV,
        heDaoTao,
        chuongTrinhBoMon,
        soLuongSinhVien,
        donViToChucKiemTra,
        toKiem,
        maKhoa,
        maChuongTrinh,
      } = req.body.data;
      const { ngayKiemTra, gioBatDau, maPhong, soPhutKiemTra, moTa, status } =
        req.body;
      await tieuluan.findOneAndUpdate(
        { _id: req.body.param.id },
        {
          maHocPhan,
          tenHocPhan,
          nhomKiemTra,
          hinhThucKiemTra,
          GVGD,
          maGV,
          heDaoTao,
          chuongTrinhBoMon,
          donViToChucKiemTra,
          toKiem,
          soLuongSinhVien,
          maKhoa,
          maChuongTrinh,
          soLuongSinhVien,
          ngayKiemTra,
          gioBatDau,
          maPhong,
          soPhutKiemTra,
          moTa,
          status,
          phanHoi: false,
        }
      );
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  successTieuLuan: async (req, res) => {
    try {
      const { id, status } = req.body;
      await tieuluan.findOneAndUpdate({ _id: id }, { status });
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  cancelTieuLuan: async (req, res) => {
    try {
      const { id, status } = req.body;
      await tieuluan.findOneAndUpdate({ _id: id }, { status });
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  suggestTieuLuan: async (req, res) => {
    try {
      const { id, status, phanHoi } = req.body;
      const { ngayKiemTra, gioBatDau, maPhong, soPhutKiemTra, moTa } = req.body;
      await tieuluan.findOneAndUpdate(
        { _id: id },
        {
          status,
          phanHoi,
          deXuat: { ngayKiemTra, gioBatDau, maPhong, soPhutKiemTra, moTa },
        }
      );
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteTieuLuan: async (req, res) => {
    try {
      await tieuluan.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = tieuluanCtrl;
