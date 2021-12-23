const monThi = require("../models/MonThiModal");
const MonThiCtrl = {
  check: async (req, res) => {
    if (Object.keys(req.body).length===0) {
      res.status(400).json({
        msg: "Lỗi đường truyền mạng , hãy thử lại 1 lần nữa",
      });
    } else {
      try {
        for (var key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            item = req.body[key];
            let maKhoa = req.body.maKhoa;
            let nhomKT = item.nhomKT;
            let maHp = item.maHp;
            let check = await monThi.findOne({ nhomKT, maHp });
            if (check) {
              continue;
            } else {
              const newMonThi = new monThi({
                maHp: item.maHp,
                tenHp: item.tenHp,
                nhomKT: item.nhomKT,
                hinhThucKT: item.hinhThucKT,
                GVGD: item.GVGD,
                maGV: item.maGV,
                heDT: item.heDT,
                chuongTrinh: item.chuongTrinh,
                doViToChuc: item.doViToChuc,
                toKiem: item.toKiem,
                soLuong: item.soLuong,
                maKhoa: maKhoa,
              });
              await newMonThi.save();
            }
          }
        }
        res.status(200).json({ msg: "imported" });
      } catch (err) {
        res.status(400).json({ msg: err?.message });
      }
    }
  },
  getMonThi: async (req, res) => {
    try {
      const MonThi = await monThi.find();
      res.json(MonThi);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editMonThi: async (req, res) => {
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
        doViToChuc,
        toKiem,
        soLuong,
        maKhoa,
      } = req.body;
      await monThi.findOneAndUpdate(
        { _id: req.body.param.subjectsId },
        {
          maHp,
          tenHp,
          nhomKT,
          hinhThucKT,
          GVGD,
          maGV,
          heDT,
          chuongTrinh,
          doViToChuc,
          toKiem,
          soLuong,
          maKhoa,
        }
      );
      res.json({ msg: "Cập nhật thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createMonThi: async (req, res) => {
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
        doViToChuc,
        toKiem,
        soLuong,
        maKhoa,
      } = req.body;
      const newMonThi = new monThi({
        maHp: maHp,
        tenHp: tenHp,
        nhomKT: nhomKT,
        hinhThucKT: hinhThucKT,
        GVGD: GVGD,
        maGV: maGV,
        heDT: heDT,
        chuongTrinh: chuongTrinh,
        doViToChuc: doViToChuc,
        toKiem: toKiem,
        soLuong: soLuong,
        maKhoa: "",
      });
      await newMonThi.save();
      res.json({ msg: "Thêm thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteMonThi: async (req, res) => {
    try {
      await monThi.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = MonThiCtrl;
