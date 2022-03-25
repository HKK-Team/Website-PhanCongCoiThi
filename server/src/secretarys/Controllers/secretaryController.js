const Secretary = require("../Models/secretaryModel");
const bcrypt = require("bcrypt");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }
}
const secretaryCtrl = {
  loginEmail: async (req, res) => {
    const secretaryEmail = await Secretary.findOne({
      email: { $eq: req.body.email },
    });
    if (!secretaryEmail) {
      return res.status(400).json({ msg: "email doesn't Exist!" });
    }
    return res.status(200).json({ msg: "Login SuccessFully!" });
  },

  login: async (req, res) => {
    const secretary = await Secretary.findOne({
      username: { $eq: req.body.username },
    });
    const checkPassWord = bcrypt.compare(req.body.password, secretary.passWord);
    if (!secretary) {
      return res.status(400).json({ msg: "username doesn't Exist!" });
    }
    if (!checkPassWord) {
      return res.status(400).json({ msg: "Password incorrect!" });
    }
    return res.status(200).json({ msg: "Login SuccessFully!" });
  },

  getUser: async (req, res) => {
    try {
      const features = new APIfeatures(Secretary.find(), req.query).filtering();
      const user = await features.query;
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  EditUser: async (req, res) => {
    // check your id
    user = req.body;
    // update to mongodb
    const editUser = new Secretary(user);
    try {
      await Secretary.updateOne({ _id: req.body._id }, editUser);
      return res.status(200).json("Bạn đã update thông tin thành công!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // edit password
  EditPassword: async (req, res) => {
    // check password
    let user = await Secretary.findById(req.body._id);

    const check = await bcrypt.compare(req.body.old_password, user.passWord);
    if (!check)
      return res
        .status(400)
        .json({ msg: "Old_password incorrect, please try again." });
    if (req.body.confirm_password !== req.body.password)
      return res
        .status(400)
        .json({ msg: "Confirm_password incorrect, please try again." });
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    try {
      await Secretary.findOneAndUpdate(
        { email: req.body.email },
        { passWord: passwordHash }
      );
      return res.status(200).json("Bạn đã đổi mật khẩu thành công!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = secretaryCtrl;
