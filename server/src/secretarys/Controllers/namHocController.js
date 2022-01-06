const namHoc = require("../models/namHocModal");
const namHocCrl = {
  getNamHoc: async (req, res) => {
    try {
      const NamHoc = await namHoc.find();
      res.json(NamHoc);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = namHocCrl;
