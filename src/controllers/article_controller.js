export function test(req, res, next) {
  res.status(200).json({
    articles: [
      {
        name: 'Paige',
        points: 100
      }
    ]
  })
}
