const article = require('../models/article')

const test = function(req, res, next) {
  res.status(200).json({
    articles: [
      {
        name: 'Paige',
        points: 100
      }
    ]
  })
}

module.exports = {
  test: test
}
