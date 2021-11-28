const Schedules = require('../models/scheduleModels')

const scheduleCrtl = {
    getschedule:async(req, res) =>{
        try {
            const schedule = await Schedules.aggregate([
              {
                $project: {
                  _id: 1,
                  toKiem: 1,
                  maHocPhan:1,
                  soLuongSinhVien: 1,
                  donViToChucKiemTra: 1,
                  ngayKiemTra: { $dateToString: { format: "%d-%m-%Y", date: "$ngayKiemTra" } },
                  gioBatDau: { $dateToString: { format: "%H:%M", date: "$gioBatDau", timezone: "America/New_York"}},
                  maPhong: 1,
                  hinhThucKiemTra: 1,
                  soPhutKiemTra: 1,
                  giangVien: 1,
                  chuongTrinhBoMon: 1,
                  heDaoTao: 1
                },
              },
            ]);
            res.json(schedule);
          } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
    },
}

module.exports = scheduleCrtl