const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1, -1)
}

export const controller = model => {
  const name = formatName(model.collection.name)

  const index = (req, res, next) => {
    model.find()
    .then(items => {
      res.send(items)
    }).catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving ${name}s.`
      })
    })
  }
  
  const get = (req, res, next) => {
    model.findById(req.params.id)
    .then(item => {
      if(!item) {
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      res.send(item)
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      return res.status(500).send({
        message: `Error retrieving ${name} with id ` + req.params.id
      })
    })
  }

  const create = (req, res, next) => {
    // check here if it has fields of the model
    if(!req.body.content) {
      return res.status(400).send({
        message: `${name} content can not be empty`
      })
    }
    
    const modelToAdd = new model({
      ...req.body
    })

    modelToAdd.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while creating the ${name}.`
      })
    })
  }

  const update = (req, res, next) => {
    // this has all the keys of the model
    // console.log(model.schema.paths)
    if(!req.body.content) {
      return res.status(400).send({
        message: `${name} content can not be empty`
      })
    }

    // validate req body- check if the model has the key
    model.findOneAndUpdate(req.params.id, {
      ...req.body
    }, {new: true})
    .then(item => {
      if(!item) {
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      res.send(item)
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      return res.status(500).send({
        message: `Error updating ${name} with id ` + req.params.id
      })
    })
  }

  const remove = (req, res, next) => {
    model.findByIdAndRemove(req.params.id)
    .then(item => {
      if(!item) {
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      res.send({
        message: `${name} deleted successfully!`
      })
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        console.log(model)
        return res.status(404).send({
          message: `${name} not found with id ` + req.params.id
        })
      }
      return res.status(500).send({
        message: `Could not delete ${name} with id ` + req.params.id
      })
    })
  }

  return {
    index,
    get,
    create,
    update,
    remove
  }
}
