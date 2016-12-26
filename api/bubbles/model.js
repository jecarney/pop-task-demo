var mongoose = require('mongoose');

var BubbleSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Bubble', BubbleSchema);
