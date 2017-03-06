var BackLogBubble = require('./model.js');

exports.index = function(req, res, next) {
  BackLogBubble.find()
  .then((backlogbubbles) => {
    res.send(backlogbubbles)
  })
}

exports.show = function(req, res) {
  BackLogBubble.findById(req.params.id)
  .then((backlogbubbles) => res.send(backlogbubbles))
  .catch((err) => res.send(404));
}

exports.update = function(req, res) {
  BackLogBubble.findById(req.params.id)
  .then((backlogbubble) => {
    Object.assign(backlogbubble, req.body);
    backlogbubble.save()
    .then(function(backlogbubble) {
      res.send(backlogbubble);
    })
    .catch(function(err) {
      res.status(422);
      res.send(err);
    });
  })
  .catch(() => res.send(404))
}

exports.create = function(req, res) {
  var backlogbubble = new BackLogBubble();

  Object.assign(backlogbubble, req.body);

  backlogbubble.save()
  .then(()=> {
    res.send(backlogbubble);
  }).catch((err)=> {
    res.status(422);
    res.send(err);
  });
}

exports.delete = function(req, res, next) {
  if (req.params.id === 'all'){
    BackLogBubble.remove({}, function(err) {
      console.log(err);
    })
    .then(() => {res.sendStatus(200)})
    .catch((err)=> {
      console.log(err);
      res.status(500);
      res.send(err);
    });
  }else{
  BackLogBubble.findOneAndRemove({_id: req.params.id})
  .then(() => {res.sendStatus(200)})
  .catch((err)=> {
    console.log(err);
    res.status(500);
    res.send(err);
  });
}
}
