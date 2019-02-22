const timeLog = function (req, res, next) {
  let date = new Date()
  req.requestTime = date
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }

  console.log(date.toLocaleTimeString("en-us", options))
  next()
}

module.exports = timeLog
