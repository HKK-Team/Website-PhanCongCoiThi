const monThi = require("../model/MonThiModal");
const MonThiCtrl = {
  check: async (req, res) => {
    if (req.body === {}) {
      res.status(400).json({
        message: "Lỗi đường truyền mạng , hãy thử lại 1 lần nữa",
      });
    } else {
      try {
        for (var key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            item = req.body[key];
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
                maKhoa: "",
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
};
module.exports = MonThiCtrl;
