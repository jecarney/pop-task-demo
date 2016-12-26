var Popped = require('./model.js');

exports.index = function(req, res, next) {
  Popped.find()
  .then((popped) => {
    // hello();
    res.send(popped)
  })
}

exports.show = function(req, res) {
  Popped.findById(req.params.id)
  .then((popped) => res.send(popped))
  .catch((err) => res.send(404));
}

exports.update = function(req, res) {
  // console.log('update in controller')
  // console.log(req.body)
  Popped.findById(req.params.id)
  .then((popped) => {
    // console.log('popped before assign');
    // console.log(popped);
    Object.assign(popped, req.body);
    // console.log('popped after assign');
    // console.log(popped);

    popped.save()
    .then(function(popped) {
      // console.log('update success')
      res.send(popped);
    })
    .catch(function(err) {
      // console.log('err')
      // console.log(err)
      res.status(422);
      res.send(err);
    });
  })
  .catch(() => res.send(404))
}

exports.create = function(req, res) {
  var popped = new Popped();

  Object.assign(popped, req.body);

  popped.save()
  .then(()=> {
    res.send(popped);
  }).catch((err)=> {
    res.status(422);
    res.send(err);
  });
}

exports.delete = function(req, res, next) {
  if (req.params.id === 'all'){
    Popped.remove({}, function(err) {
      console.log(err);
    });
  }else{
  Popped.findOneAndRemove({_id: req.params.id})
  .then(() => {res.sendStatus(200)})
  .catch((err)=> {
    console.log(err);
  }
  )
}
}
