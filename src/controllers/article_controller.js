import ArticleModel from '../models/article'

export default class Article {
  index(req, res, next) {
    console.log('retrieving all notes...')
    ArticleModel.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving articles."
        })
    })
  }

  create(req, res, next) {
    if(!req.body.content) {
      return res.status(400).send({
          message: "Note content can not be empty"
      })
    }

    const article = new ArticleModel({
        title: req.body.title || "Untitled article",
        content: req.body.content
    })

    article.save()
    .then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the article."
        })
    })
  }
}
