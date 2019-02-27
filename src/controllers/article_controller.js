import ArticleModel from '../models/article'

export default class Article {
  index(req, res, next) {
    ArticleModel.find()
    .then(articles => {
      res.send(articles);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving articles."
      })
    })
  }

  create(req, res, next) {
    if(!req.body.content) {
      return res.status(400).send({
        message: "Article content can not be empty"
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

  get(req, res) {
    ArticleModel.findById(req.params.id)
    .then(article => {
      if(!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.id
        })
      }
      res.send(article)
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Article not found with id " + req.params.id
        })
      }
      return res.status(500).send({
        message: "Error retrieving article with id " + req.params.id
      })
    })
  }

  update(req, res) {
    if(!req.body.content) {
      return res.status(400).send({
        message: "Article content can not be empty"
      })
    }

    ArticleModel.findOneAndUpdate(req.params.id, {
      title: req.body.title || "Untitled article",
      content: req.body.content
    }, {new: true})
    .then(article => {
      if(!article) {
        return res.status(404).send({
          message: "Article not found with id " + req.params.id
        })
      }
      res.send(article)
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Article not found with id " + req.params.id
        })
      }
      return res.status(500).send({
        message: "Error updating article with id " + req.params.id
      })
    })
  }
}
