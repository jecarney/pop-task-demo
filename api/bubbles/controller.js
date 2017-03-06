var Bubble = require('./model.js');

exports.index = function(req, res, next) {
  Bubble.find()
  .then((bubbles) => {

    res.send(bubbles)
  })
  .catch((err) => res.send(404));
}

exports.show = function(req, res) {
  Bubble.findById(req.params.id)
  .then((bubbles) => res.send(bubbles))
  .catch((err) => res.send(404));
}

exports.update = function(req, res) {
  Bubble.findById(req.params.id)
  .then((bubble) => {
    Object.assign(bubble, req.body);
    bubble.save()
    .then(function(bubble) {
      res.send(bubble);
    })
    .catch(function(err) {
      res.status(422);
      res.send(err);
    });
  })
  .catch(() => res.send(404))
}

exports.create = function(req, res) {
  var bubble = new Bubble();

  Object.assign(bubble, req.body);

  bubble.save()
  .then(()=> {
    res.send(bubble);
  }).catch((err)=> {
    res.status(422);
    res.send(err);
  });
}

exports.delete = function(req, res, next) {

  if (req.params.id === 'all'){
    Bubble.remove({}, function(err) {
      console.log(err);
    })
    .then(() => {res.sendStatus(200)})
    .catch((err)=> {
      console.log(err);
      res.status(500);
      res.send(err);
    });
  }else{
    Bubble.findOneAndRemove({_id: req.params.id})
    .then(() => {res.sendStatus(200)})
    .catch((err)=> {
      console.log(err);
      res.status(500);
      res.send(err);
    });
  }
}
