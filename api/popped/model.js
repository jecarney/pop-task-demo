var mongoose = require('mongoose');

var PoppedSchema = new mongoose.Schema({
  name: {type: String, default: ""},
  priority: {type: Number, default: 1},
  duedate: {type: Date, default: Date.now},
  taskStartDate: {type: Date, default: Date.now},
  intervalStart: {type: Number, required: true,default: Date.now},
  duration_seconds: {type: Number, default: 0}
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
});

module.exports = mongoose.model('Popped', PoppedSchema);

// 0
// _id
// :
// "58463ec9b64613595fc15612"
// duedate
// :
// "2016-12-06T04:30:01.764Z"
// duration_seconds
// :
// 3
// intervalStart
// :
// 1480998602736
// name
// :
// "refresh"
// priority
// :
// 1
// taskStartDate
// :
// "2016-12-06T04:30:01.764Z"
