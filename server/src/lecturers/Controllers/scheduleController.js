const Schedules = require('../Models/scheduleModels')

class ApiFeatures {
  constructor(query, queryString) {
          this.query = query;
          this.queryString = queryString;
      }
      //filtering
  filtering() {
          const queryObj = {...this.queryString } //queryString = req.query

          const excludedFields = ['page', 'sort', 'limit','search']
          excludedFields.forEach(el => delete(queryObj[el]))

          let queryStr = JSON.stringify(queryObj)
          queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|eq)\b/g, match => '$' + match)
          this.query.find(JSON.parse(queryStr))

          return this;
      }
      //sorting product
  sort() {
      if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(',').join(' ')
          this.query = this.query.sort(sortBy)
      } else {
          this.query = this.query.sort('-dateCreate')
      }
      return this;
  }
}

const scheduleCrtl = {
    getschedule:async(req, res) =>{
        try {
          const features = new ApiFeatures(Schedules.find()
                .lean(), req.query).filtering().sort()
            const schedule = await features.query
            res.json(schedule);

            // res.json({
            //     status: 'success',
            //     result: schedule.length,
            //     schedule: schedule
            // })
          } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
    },
}

module.exports = scheduleCrtl